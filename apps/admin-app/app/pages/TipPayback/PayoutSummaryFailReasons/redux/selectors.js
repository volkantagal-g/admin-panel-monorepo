import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TIP_PAYBACK.SUMMARY_FAIL_REASONS;

export const summaryFailReasonsSelector = {
  getIsPending: state => state[reduxKey]?.summaryFailReasons?.isPending,
  getData: state => state[reduxKey]?.summaryFailReasons?.data?.content,
  getTotalDataCount: state => state[reduxKey].summaryFailReasons?.data?.totalElements,
  getTotalAmount: state => state[reduxKey]?.summaryFailReasons?.data?.totalAmount,
};
