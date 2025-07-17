import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TIP_PAYBACK.SUMMARY_LIST;

export const summariesSelector = {
  getIsPending: state => state[reduxKey].summaries.isPending,
  getData: state => state[reduxKey].summaries?.data?.content,
  getTotalDataCount: state => state[reduxKey].summaries?.data?.totalElements,
};

export const cancelPayoutSelector = {
  getPendingList: state => state[reduxKey].pendingList?.cancel,
  getData: state => state[reduxKey].cancelPayout?.data,
};

export const calculateSelector = {
  getIsPending: state => state[reduxKey].calculate.isPending,
  getData: state => state[reduxKey].calculate?.data,
};
export const payoutPayoutSelector = {
  getData: state => state[reduxKey].payout?.data,
  getPendingList: state => state[reduxKey].pendingList?.payout,
};

export const statusUpdatePayoutSelector = {
  getPendingList: state => state[reduxKey].pendingList?.statusUpdate,
  getData: state => state[reduxKey].statusUpdate?.data,
};

export const triggerReportPayoutSelector = {
  getPendingList: state => state[reduxKey].pendingList?.triggerReport,
  getData: state => state[reduxKey].triggerReport?.data,
};
