import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  INTEGRATION_TYPE,
  INTEGRATION_TYPES,
  REDUX_KEY,
} from '@shared/shared/constants';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Filter, FilteredOrdersTable } from './components';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators, defaultRowsPerPage } from './redux/actions';
import { FILTER_STATUSES } from './components/Filter/constants';
import {
  getFilterStatuses,
  getIntegrationType,
} from './components/Filter/utils';
import { getLimitAndOffset } from '@shared/utils/common';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

const reduxKey = REDUX_KEY.MARKET_ORDER.ORDER_FILTER;

const OrderFilter = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_ORDER_FILTER.name,
    squad: ROUTE.GETIR_MARKET_ORDER_FILTER.squad,
  });
  const dispatch = useDispatch();
  const isN11 = useLocation().pathname.includes('n11');

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(
      Creators.getFilteredOrdersRequest({
        ...getLimitAndOffset({ rowsPerPage: defaultRowsPerPage }),
        domainType: isN11 ? GETIR_MARKET_DOMAIN_TYPE : GETIR_10_DOMAIN_TYPE,
        statuses: getFilterStatuses(FILTER_STATUSES.SUCCESS),
        integrationType: isN11
          ? getIntegrationType(INTEGRATION_TYPE.N11.toString())
          : null,
        excludedIntegrationTypes: !isN11
          ? [INTEGRATION_TYPES.N11.toLowerCase()]
          : null,
      }),
    );
  }, [dispatch, isN11]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  return (
    <>
      <Filter isN11={isN11} />
      <FilteredOrdersTable isN11={isN11} />
    </>
  );
};

export default OrderFilter;
