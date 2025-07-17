import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getRunnerByIdRequest: { id: null },
  getRunnerByIdSuccess: { data: {} },
  getRunnerByIdFailure: { error: null },
  getTasksByRunnerIdRequest: { id: null },
  getTasksByRunnerIdSuccess: { data: {} },
  getTasksByRunnerIdFailure: { error: null },
  updateRunnerRequest: { id: null, updateData: {} },
  updateRunnerSuccess: { data: {} },
  updateRunnerFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GL_RUNNER_DETAIL}_` });
