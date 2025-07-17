import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SERVICE_AVAILABILITY_AREA.LIST}_`;

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    toggleShowWarehouses: null,
    toggleShowAutoCreatedSaas: null,
    setDomainType: { domainType: null },
    getSaasRequest: { domainType: null },
    getSaasSuccess: { data: null },
    getSaasFailure: { error: null },
  },
  { prefix },
);
