import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getKdsAuditFormTypeDetailRequest: { id: null },
  getKdsAuditFormTypeDetailSuccess: { data: {} },
  getKdsAuditFormTypeDetailFailure: { error: null },
  updateKdsAuditFormTypeRequest: { data: undefined },
  updateKdsAuditFormTypeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.AUDIT_FORM_TYPE.DETAIL}_` });
