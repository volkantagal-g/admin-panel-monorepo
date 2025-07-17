import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createRunnerRequest: { body: null },
  createRunnerSuccess: { data: [] },
  createRunnerFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GL_RUNNER_NEW}_` });
