import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';

import {
  Header,
  MarketProductMasterCategoryDetailForm,
  ChildrenOfMasterCategoryTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePrevious } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Spinner from '@shared/components/Spinner';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { getMarketProductMasterCategorySelector } from '@app/pages/MarketProduct/MasterCategory/Detail/redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const MarketProductMasterCategoryDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_DETAIL.name,
    squad: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id: masterCategoryId } = useParams();
  const prevMasterCategoryId = usePrevious(masterCategoryId);
  const marketProductMasterCategory = useSelector(getMarketProductMasterCategorySelector.getData);
  const isPending = useSelector(getMarketProductMasterCategorySelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductMasterCategoryRequest({ id: masterCategoryId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  useEffect(() => {
    if (!!prevMasterCategoryId && prevMasterCategoryId !== masterCategoryId) {
      dispatch(Creators.getMarketProductMasterCategoryRequest({ id: masterCategoryId }));
    }
  }, [masterCategoryId]);

  const countryId = _.get(getSelectedCountry(), '_id');
  const isCountryCategory = countryId === marketProductMasterCategory.country;

  return (
    <>
      <Header />
      {isPending && !marketProductMasterCategory._id ? (
        <Spinner />
      ) : (
        <>
          {isCountryCategory ? (
            <>
              <MarketProductMasterCategoryDetailForm />
              <ChildrenOfMasterCategoryTable />
            </>
          ) : (
            <CountrySelectionAlert
              itemCountryId={marketProductMasterCategory.country}
              translationKey="marketProductMasterCategoryPage:ALERT_COUNTRY_MASTER_CATEGORY_TITLE"
            />
          )}
        </>
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductMasterCategoryDetailPage);
