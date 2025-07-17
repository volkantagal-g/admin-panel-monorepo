import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_GAMIFICATION_TASK.DETAIL}_`;

export const { Types, Creators } = createActions({
  detailCourierGamificationTaskByIdRequest: { currId: '' },
  detailCourierGamificationTaskByIdSuccess: { taskData: {}, courierCount: 0, status: null },
  detailCourierGamificationTaskByIdFailure: { error: null },
  updateTaskDetailCourierGMFCRequest: { requestBody: {} },
  updateTaskDetailCourierGMFCSuccess: null,
  updateTaskDetailCourierGMFCFailure: { error: null },
  deleteTaskByIdRequest: null,
  deleteTaskByIdSuccess: null,
  deleteTaskByIdFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
