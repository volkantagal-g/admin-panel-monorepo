import moment from 'moment';

import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.DETAIL;

export const detailCourierGamificationTaskByIdSelector = {
  getIsPending: state => state[reduxKey]?.courierGMFCTaskById.isPending,
  getData: state => state[reduxKey]?.courierGMFCTaskById.data,
  getCurrId: state => state[reduxKey]?.courierGMFCTaskById.currentId,
  getIsAfterStart: state => {
    const startDate = state[reduxKey]?.courierGMFCTaskById?.data?.taskData?.startDate;
    return moment(startDate).isBefore(moment());
  },
  getIsAfterEnd: state => {
    const endDate = state[reduxKey]?.courierGMFCTaskById?.data?.taskData?.endDate;
    return moment(endDate).isBefore(moment());
  },
};
