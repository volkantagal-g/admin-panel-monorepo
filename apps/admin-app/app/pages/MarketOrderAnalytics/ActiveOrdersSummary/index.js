import { useEffect, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import {
  Header,
  Filter,
  ChartFilters,
  PieCharts,
  StatCards,
  PromoTable,
  ProductsListModal,
} from './components';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

function ActiveOrdersForExecutiveDashboard() {
  usePageViewAnalytics({
    name: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD.name,
    squad: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD.squad,
  });
  const dispatch = useDispatch();
  const { canAccess, pagesAndComponentsByPermKey } = usePermission();
  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(
    () => {
      if (isEmpty(pagesAndComponentsByPermKey)) return;
      dispatch(Creators.fetchInitialData({ canAccess }));
    },
    [dispatch, canAccess, pagesAndComponentsByPermKey],
  );

  return (
    <div>
      <Header />
      <Filter />
      <ChartFilters />
      <div>
        <StatCards />
        <PieCharts />
      </div>
      <PromoTable />
      <ProductsListModal />
    </div>
  );
}

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ActiveOrdersForExecutiveDashboard);
