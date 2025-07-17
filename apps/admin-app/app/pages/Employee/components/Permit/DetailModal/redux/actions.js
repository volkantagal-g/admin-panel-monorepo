import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.MODAL.PERMIT.DETAIL}_`;

export const {
  Types,
  Creators,
} = createActions({
  getPermitDetailRequest: { permitId: null },
  getPermitDetailSuccess: {
    permit: null,
    history: [],
    isSupervisor: null,
    hasPermission: null,
  },
  getPermitDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
