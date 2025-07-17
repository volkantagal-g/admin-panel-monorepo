import { useEffect, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Header, OrderTable, ProductsListModal } from './components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';

function ActiveOrdersForManagement() {
  usePageViewAnalytics({
    name: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT.name,
    squad: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('activeOrdersForManagementPage');
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
    <>
      <PageTitleHeader title={t('PAGE_TITLE.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_MANAGEMENT')} />
      <Header />
      <OrderTable />
      <ProductsListModal />
    </>
  );
}

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_MANAGEMENT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ActiveOrdersForManagement);
