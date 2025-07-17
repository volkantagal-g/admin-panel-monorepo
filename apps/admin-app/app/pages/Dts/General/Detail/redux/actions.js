import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.GENERAL.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDtsDetailRequest: { id: undefined },
  getDtsDetailSuccess: { data: {} },
  getDtsDetailFailure: { error: null },
  updateDtsDetailRequest: { data: undefined },
  updateDtsDetailFailure: { error: null },
  downloadSignedFileRequest: { url: undefined },
  downloadSignedFileSuccess: { },
  downloadSignedFileFailure: { error: null },

  updateDtsDecisionRequest: { data: undefined },
  updateDtsDecisionFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
