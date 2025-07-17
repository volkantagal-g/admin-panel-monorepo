import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import { Filter, SuspicionOrdersTable } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { filtersSelector } from './redux/selectors';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.FRAUD_SUSPICION_ORDERS;

function FraudSuspicionOrders() {
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_FRAUD_SUSPICION_ORDERS.name,
    squad: ROUTE.GETIR_MARKET_FRAUD_SUSPICION_ORDERS.squad,
  });
  const dispatch = useDispatch();
  const domainType = useSelector(filtersSelector.getSelectedDomainType);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    if (domainType) {
      dispatch(Creators.getFraudSuspicionOrdersRequest({ domainType }));
    }
  }, [dispatch, domainType]);

  return (
    <>
      <Filter />
      <SuspicionOrdersTable />
    </>
  );
}

export default FraudSuspicionOrders;
