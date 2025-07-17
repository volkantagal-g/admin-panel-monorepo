import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header } from './components';
import Filters from '@app/pages/MarketProduct/Pricing/components/Filters';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/MarketProduct/Pricing/redux/saga';
import reducer from '@app/pages/MarketProduct/Pricing/redux/reducer';
import { Creators } from '@app/pages/MarketProduct/Pricing/redux/actions';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import PricingTable from '@app/pages/MarketProduct/Pricing/components/PricingTable';

import useStyles from './styles';

const MarketProductPricingListPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_PRICING_LIST.name, squad: ROUTE.MARKET_PRODUCT_PRICING_LIST.squad });

  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductsPriceListRequest({ callbackForProducts: true }));
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const [formValues, setFormValues] = useState({});

  return (
    <div className={classes.row}>
      <Header />
      <Filters formValues={formValues} setFormValues={setFormValues} />
      <PricingTable formValues={formValues} />
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.PRICING;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductPricingListPage);
