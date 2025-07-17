import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION.NEW}_`;

export const { Types, Creators } = createActions({
  createKdsQuestionRequest: { requestBody: {} },
  createKdsQuestionSuccess: null,
  createKdsQuestionFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
