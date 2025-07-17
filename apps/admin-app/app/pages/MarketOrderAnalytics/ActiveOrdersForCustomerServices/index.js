import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';

import { Filter, Table } from './components';

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES;

const ActiveOrdersForCustomerServices = () => {
  const { t } = useTranslation('activeOrdersForCustomerServicesPage');
  const dispatch = useDispatch();
  const { canAccess, pagesAndComponentsByPermKey } = usePermission();

  useEffect(() => {
    if (isEmpty(pagesAndComponentsByPermKey)) return;
    dispatch(Creators.fetchInitialData({ canAccess }));
  }, [dispatch, canAccess, pagesAndComponentsByPermKey]);

  usePageViewAnalytics({
    name: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES.name,
    squad: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('TITLE')} />
      <Filter />
      <Table />
    </>
  );
};

export default ActiveOrdersForCustomerServices;
