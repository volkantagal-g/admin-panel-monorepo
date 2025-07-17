import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.GENERAL.SELECT_FEEDBACK_SOURCE}_`;

export const { Types, Creators } = createActions({
  getFeedbackSourceRequest: null,
  getFeedbackSourceSuccess: { data: [] },
  getFeedbackSourceFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
