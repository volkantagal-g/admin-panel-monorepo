import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.SELECT_AUDIT_FORM_TYPE}_`;

export const { Types, Creators } = createActions({
  getAuditFormTypeRequest: null,
  getAuditFormTypeSuccess: { data: [] },
  getAuditFormTypeFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
