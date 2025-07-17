import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { useParams } from 'react-router-dom';

import GeneralInfo from '@app/pages/MarketProduct/Pricing/Detail/components/GeneralInfo';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from '../redux/saga';
import reducer from '../redux/reducer';
import { Creators } from '../redux/actions';
import { ROUTE } from '@app/routes';
import Header from '@app/pages/MarketProduct/Pricing/Detail/components/Header';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from '@app/pages/MarketProduct/Pricing/Detail/styles';

const MarketProductPricingDiscountedDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_PRICING_DISCOUNTED_DETAIL.name, squad: ROUTE.MARKET_PRODUCT_PRICING_DISCOUNTED_DETAIL.squad });
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductDiscountedPriceDetailRequest({ discountedPriceId: id }));
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  return (
    <div className={classes.row}>
      <Header />
      <GeneralInfo />
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.PRICING;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductPricingDiscountedDetailPage);
