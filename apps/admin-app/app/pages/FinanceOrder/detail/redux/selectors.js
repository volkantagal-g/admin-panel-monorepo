import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.FINANCE.ORDER;

export const financeOrderDetailSelector = {
  getIsPending: state => state[reduxKey]?.financeOrderDetail?.isPending,
  getData: state => state[reduxKey]?.financeOrderDetail?.data,
  getIsNotePending: state => state[reduxKey]?.financeOrderDetail?.isNotePending,
  getNotes: state => state[reduxKey]?.financeOrderDetail?.notes,
  getIsCancelReasonsPending: state => state[reduxKey]?.financeOrderDetail?.isCancelReasonsPending,
  getCancelReasons: state => state[reduxKey]?.financeOrderDetail?.cancelReasons,
  getIsVendorAgt: state => state[reduxKey]?.financeOrderDetail?.isVenderAgt,
  getIsCancelPending: state => state[reduxKey]?.financeOrderDetail?.isCancelPending,
};
