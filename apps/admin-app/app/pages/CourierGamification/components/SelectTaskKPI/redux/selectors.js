import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.SELECT_KPI;

export const courierGamificationKPISelector = {
  getIsPending: state => state[reduxKey]?.courierGamificationKPI.isPending,
  getData: state => state[reduxKey]?.courierGamificationKPI.data,
};
