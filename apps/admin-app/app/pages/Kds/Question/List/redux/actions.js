import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.KDS.QUESTION.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getKdsQuestionListRequest: {
      limit: null,
      offset: null,
    },
    getKdsQuestionListSuccess: { data: null, total: 0 },
    getKdsQuestionListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix }
);
