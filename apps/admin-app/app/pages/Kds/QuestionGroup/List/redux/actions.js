import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION_GROUP.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getKdsQuestionGroupListRequest: {
      limit: undefined,
      offset: undefined,
    },
    getKdsQuestionGroupListSuccess: { data: null, total: 0 },
    getKdsQuestionGroupListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  }, { prefix });