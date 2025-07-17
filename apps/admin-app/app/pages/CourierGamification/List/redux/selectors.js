import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.LIST;

export const courierGamificationTasksSelector = {
  getIsPending: state => state[reduxKey]?.courierGamificationTasks.isPending,
  getData: state => state[reduxKey]?.courierGamificationTasks.data,
};
