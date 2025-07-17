import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createStoreAuditRequest: {
    auditorId: null,
    franchiseId: null,
    warehouseId: null,
    auditFormTypeId: null,
    round: undefined,
  },
  createStoreAuditSuccess: null,
  createStoreAuditFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.STORE_AUDIT.NEW}_` });
