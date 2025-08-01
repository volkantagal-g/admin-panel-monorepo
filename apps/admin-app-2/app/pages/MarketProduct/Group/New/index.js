import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  NewForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga, { useInjectSaga } from '@shared/utils/injectSaga';
import injectReducer, { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import productGroupCommonReducer from '@app/pages/MarketProduct/Group/redux/reducer';
import productGroupCommonSaga from '@app/pages/MarketProduct/Group/redux/saga';
import { Creators as ProductGroupCommonCreators } from '@app/pages/MarketProduct/Group/redux/actions';

const MarketProductGroupNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_GROUP_NEW.name, squad: ROUTE.MARKET_PRODUCT_GROUP_NEW.squad });
  const dispatch = useDispatch();

  useInjectReducer({ key: REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON, reducer: productGroupCommonReducer });
  useInjectSaga({ key: REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON, saga: productGroupCommonSaga });
  useInitAndDestroyPage({ dispatch, Creators: ProductGroupCommonCreators });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(ProductGroupCommonCreators.getRankingScenarioNamesRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <NewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.GROUP.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductGroupNewPage);
