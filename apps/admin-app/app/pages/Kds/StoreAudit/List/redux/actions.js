import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.STORE_AUDIT.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getKdsStoreAuditListRequest: { filters: undefined, limit: undefined, offset: undefined },
    getKdsStoreAuditListSuccess: { data: null, total: 0 },
    getKdsStoreAuditListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  }, { prefix });
