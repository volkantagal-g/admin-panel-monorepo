import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION.DETAIL}_`;

export const { Types, Creators } = createActions({
  getKdsQuestionDetailRequest: { id: undefined },
  getKdsQuestionDetailSuccess: { data: {} },
  getKdsQuestionDetailFailure: { error: null },
  updateKdsQuestionRequest: { data: undefined },
  updateKdsQuestionFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
