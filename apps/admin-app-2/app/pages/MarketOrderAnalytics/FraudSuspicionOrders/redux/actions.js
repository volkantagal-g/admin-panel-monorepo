import { createActions } from 'reduxsauce';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { getSelectedDomainTypeFromLocalStorage } from './localStorage';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.FRAUD_SUSPICION_ORDERS}_`;
export const defaultRowsPerPage = 100;
const defaultCurrentPage = 1;
export const defaultDomainType = GETIR_10_DOMAIN_TYPE;

export const { Types, Creators } = createActions(
  {
    getFraudSuspicionOrdersRequest: { domainType: defaultDomainType, offset: 0, limit: defaultRowsPerPage },
    getFraudSuspicionOrdersSuccess: { data: [] },
    getFraudSuspicionOrdersFailure: { error: null },
    setSelectedDomainType: { domainType: defaultDomainType },
    setPagination: { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage },

    initPage: () => {
      const action = {
        initialDomainType: getSelectedDomainTypeFromLocalStorage(),
        type: `${prefix}INIT_PAGE`,
      };

      return action;
    },
    destroyPage: null,
  },
  { prefix },
);
