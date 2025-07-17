import { useEffect, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';

import { Header, Filter, OrderTable } from './components';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { StatsCard } from './components/StatsCard';

function ActiveOrdersForOperation() {
  usePageViewAnalytics({
    name: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION.name,
    squad: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION.squad,
  });
  const dispatch = useDispatch();
  const { canAccess, pagesAndComponentsByPermKey } = usePermission();

  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isEmpty(pagesAndComponentsByPermKey)) return;
    dispatch(Creators.fetchInitialData({ canAccess }));
  }, [dispatch, canAccess, pagesAndComponentsByPermKey]);

  return (
    <div>
      <Header />
      <Filter />
      <StatsCard />
      <OrderTable />
    </div>
  );
}

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_OPERATION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ActiveOrdersForOperation);
