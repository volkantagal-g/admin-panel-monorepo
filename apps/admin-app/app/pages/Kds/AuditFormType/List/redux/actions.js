import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.AUDIT_FORM_TYPE.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getKdsAuditFormTypeListRequest: {
      limit: undefined,
      offset: undefined,
    },
    getKdsAuditFormTypeListSuccess: { data: null, total: 0 },
    getKdsAuditFormTypeListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  }, { prefix });
