import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.SUMMARY;

export const courierGamificationTaskSummarySelector = {
  getIsPending: state => state[reduxKey]?.courierGamificationTaskSummary.isPending,
  getIsPendingSummaryTable: state => state[reduxKey]?.courierGamificationTaskSummary.isPendingSummaryTable,
  getData: state => state[reduxKey]?.courierGamificationTaskSummary.data,
};
