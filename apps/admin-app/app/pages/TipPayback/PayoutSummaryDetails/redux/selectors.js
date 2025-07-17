import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TIP_PAYBACK.SUMMARY_DETAILS;

export const summaryDetailsSelector = {
  getIsPending: state => state[reduxKey]?.summaryDetails?.isPending,
  getData: state => state[reduxKey]?.summaryDetails?.data?.content,
  getTotalDataCount: state => state[reduxKey]?.summaryDetails?.data?.totalElements,
  getTotalAmount: state => state[reduxKey]?.summaryDetails?.data?.totalAmount,
  getTotalPaidAmount: state => state[reduxKey]?.summaryDetails?.data?.totalPaidAmount,
  getTotalUnpaidAmount: state => state[reduxKey]?.summaryDetails?.data?.totalUnpaidAmount,
  getPayoutSummaryStatus: state => state[reduxKey]?.summaryDetails?.data?.payoutSummaryStatus,
};
