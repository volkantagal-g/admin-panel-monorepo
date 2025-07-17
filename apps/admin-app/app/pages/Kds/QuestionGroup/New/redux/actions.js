import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createKdsQuestionGroupRequest: {
    name: undefined,
    status: undefined,
    auditFormType: undefined,
  },
  createKdsQuestionGroupSuccess: null,
  createKdsQuestionGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.KDS.QUESTION_GROUP.NEW}_` });