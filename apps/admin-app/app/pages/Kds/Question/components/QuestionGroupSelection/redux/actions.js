import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION.SELECT_QUESTION_GROUP}_`;

export const { Types, Creators } = createActions({
  getQuestionGroupListRequest: null,
  getQuestionGroupListSuccess: { data: [] },
  getQuestionGroupListFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
