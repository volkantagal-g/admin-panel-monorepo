import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_GAMIFICATION_TASK.SUMMARY}_`;

export const { Types, Creators } = createActions({
  detailCourierGamificationTaskByIdRequest: { currId: '' },
  detailCourierGamificationTaskByIdSuccess: { taskData: {}, courierCount: 0, status: null },
  detailCourierGamificationTaskByIdFailure: { error: null },
  getSummaryCourierGamificationByIdRequest: {
    requestBody: {},
    currId: '',
    offset: undefined,
    limit: undefined,
    sortKey: undefined,
    sortDirection: undefined,
  },
  getSummaryCourierGamificationByIdSuccess: { summaryData: [] },
  getSummaryCourierGamificationByIdFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
