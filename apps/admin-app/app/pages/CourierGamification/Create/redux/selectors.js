import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.CREATE;

export const createCourierGamificationTaskSelector = {
  getIsPending: state => state[reduxKey]?.createCourierGamificationTask.isPending,
  getPendingStateForImageUploadToS3: state => state[reduxKey]?.createCourierGamificationTask.isPendingStateForImageUploadToS3,
  getData: state => state[reduxKey]?.createCourierGamificationTask.data,
};
