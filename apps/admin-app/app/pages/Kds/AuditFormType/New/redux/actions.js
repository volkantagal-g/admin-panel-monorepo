import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createKdsAuditFormTypeRequest: { name: undefined, isSendToFranchise: undefined },
  createKdsAuditFormTypeSuccess: null,
  createKdsAuditFormTypeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.AUDIT_FORM_TYPE.NEW}_` });
