import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Content, Tabs } from '@shared/components/GUI';
import Header from '@app/pages/MarketProduct/DetailV2/components/Header';
import SummaryInfo from '@app/pages/MarketProduct/DetailV2/components/SummaryInfo';

import { POPULATE_FIELDS_ON_GET_MARKET_PRODUCT, PRODUCT_DETAIL_TAB_ID } from '@app/pages/MarketProduct/constants';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import {
  getMarketProductByIdSelector,
  getProductActivationValidationErrorsSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import Spinner from '@shared/components/Spinner';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import InterceptCountryMismatch from '@shared/components/CorePanel/InterceptCountryMismatch';
import permKey from '@shared/shared/permKey.json';
import { getTabItems } from '@app/pages/MarketProduct/DetailV2/components/TabItems';
import { usePermission } from '@shared/hooks';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const { PAGE_MARKET_PRODUCT_DETAILV2 } = permKey;

const MarketProductDetailPageV2 = () => {
  const { t } = useTranslation('marketProductPageV2');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { id: marketProductId } = useParams();
  const { canAccess } = usePermission();

  const activeTab = searchParams.get('tab') || PRODUCT_DETAIL_TAB_ID.GENERAL_INFO;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const [activeKey, setActiveKey] = useState(activeTab);

  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const marketProductError = useSelector(getMarketProductByIdSelector.getError);
  const validationErrors = useSelector(getProductActivationValidationErrorsSelector.getValidationErrors);
  const enableValidationErrors = useSelector(updateMarketProductSelector.getValidationErrors);

  const memoizedTabsItems = useMemo(() => {
    return getTabItems({ t, validationErrors: [...validationErrors, ...enableValidationErrors], canAccess });
  }, [t, validationErrors, enableValidationErrors, canAccess]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductsPriceListRequest({ productIds: [marketProductId] }));
    dispatch(
      Creators.getMarketProductByIdRequest({
        id: marketProductId,
        populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
      }),
    );
    dispatch(CommonCreators.getCountriesRequest());
    dispatch(CommonCreators.getMarketProductCategoriesRequest({ fields: ['type', 'name', 'status', 'isSubCategory', 'parent'] }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, marketProductId]);

  const handleTabChange = key => {
    setActiveKey(key);
    setSearchParams({ tab: key });
  };

  return !Object.keys(marketProduct).length ? (
    <Spinner />
  ) : (
    <InterceptCountryMismatch
      countryCode={marketProduct?.countryCode}
      apiError={marketProductError}
      pagePermKey={PAGE_MARKET_PRODUCT_DETAILV2}
    >
      <Content>
        <Header />
        <SummaryInfo />
        <Tabs items={memoizedTabsItems} onChange={handleTabChange} activeKey={activeKey} destroyInactiveTabPane />
      </Content>
    </InterceptCountryMismatch>
  );
};

export default MarketProductDetailPageV2;
