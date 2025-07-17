import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getKdsQuestionGroupDetailRequest: { id: null },
  getKdsQuestionGroupDetailSuccess: { data: {} },
  getKdsQuestionGroupDetailFailure: { error: null },
  updateKdsQuestionGroupRequest: { data: undefined },
  updateKdsQuestionGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.QUESTION_GROUP.DETAIL}_` });