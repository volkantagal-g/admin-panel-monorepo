import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import Filter from './components/Filter';
import OdometerWrapper from './components/Odometer';

const reduxKey = REDUX_KEY.ORDER_COUNTER;

const OrderCounter = () => {
  const { t } = useTranslation(['orderCounter']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.ORDER_COUNTER.name, squad: ROUTE.ORDER_COUNTER }); // düzeltilecek

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getTotalOrderCountsDataRequest());
  }, [dispatch]);

  return (
    <>
      <Filter />
      <PageTitleHeader title={t('global:ORDER_COUNTER')} />
      <OdometerWrapper />
    </>
  );
};

export default OrderCounter;
