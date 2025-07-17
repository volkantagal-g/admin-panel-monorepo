import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.GENERAL.SELECT_RULE}_`;

export const { Types, Creators } = createActions({
  getRuleRequest: null,
  getRuleSuccess: { data: [] },
  getRuleFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
