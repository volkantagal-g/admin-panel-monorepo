import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { useTheme } from 'react-jss';

import {
  Header,
  MarketProductGroupDetailForm,
  AdditionalInfo,
  ImageInfo,
  ProductsOfProductGroupTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga, { useInjectSaga } from '@shared/utils/injectSaga';
import injectReducer, { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getMarketProductGroupSelector } from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import Spinner from '@shared/components/Spinner';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import WeekMinPickerInfo from '@app/pages/MarketProduct/Group/Detail/components/WeekMinPickerInfo';
import productGroupCommonSaga from '@app/pages/MarketProduct/Group/redux/saga';
import productGroupCommonReducer from '@app/pages/MarketProduct/Group/redux/reducer';
import { Creators as ProductGroupCommonCreators } from '@app/pages/MarketProduct/Group/redux/actions';

const MarketProductGroupDetailPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_GROUP_DETAIL.name, squad: ROUTE.MARKET_PRODUCT_GROUP_DETAIL.squad });

  useInjectReducer({ key: REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON, reducer: productGroupCommonReducer });
  useInjectSaga({ key: REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON, saga: productGroupCommonSaga });
  useInitAndDestroyPage({ dispatch, Creators: ProductGroupCommonCreators });

  const { id: marketProductGroupId } = useParams();
  const theme = useTheme();
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const isPending = useSelector(getMarketProductGroupSelector.getIsPending);
  const selectedCountry = useSelector(getSelectedCountryV2);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductGroupRequest({ id: marketProductGroupId }));
    dispatch(ProductGroupCommonCreators.getRankingScenarioNamesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, marketProductGroupId]);

  const isCountryGroup = selectedCountry?._id === marketProductGroup.country;
  const isAlgorithmGroup = marketProductGroup.type === 'algorithm';

  return (
    <>
      <Header />
      {isPending && !marketProductGroup._id ? (
        <Spinner />
      ) : (
        <div>
          {isCountryGroup ? (
            <Row gutter={[theme.spacing(3)]}>
              <Col xs={24} md={24} lg={18}>
                <MarketProductGroupDetailForm />
                <WeekMinPickerInfo />
                {!isAlgorithmGroup && <ProductsOfProductGroupTable />}
              </Col>
              <Col xs={24} md={24} lg={6}>
                <AdditionalInfo />
                <ImageInfo />
              </Col>
            </Row>
          ) : (
            <CountrySelectionAlert
              itemCountryId={marketProductGroup.country}
              translationKey="marketProductGroupPage:ALERT_COUNTRY_PRODUCT_GROUP_TITLE"
            />
          )}
        </div>
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.GROUP.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductGroupDetailPage);
