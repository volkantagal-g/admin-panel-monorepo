import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.HISTORY;

export const getTaskHistorySelector = {
  getIsPending: state => state?.[reducerKey]?.taskHistory?.isPending,
  getData: state => state?.[reducerKey]?.taskHistory?.data,
};
