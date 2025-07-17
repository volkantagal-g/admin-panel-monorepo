import { EMPLOYEE_LEAVE_STATUSES, REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT;

export const leaveRequestsSelector = {
  ...Object.values(EMPLOYEE_LEAVE_STATUSES).reduce(
    (acc, key) => ({
      ...acc,
      [`getData${key}`]: state => state[reduxKey]?.[`leaveRequests_${key}`]?.data,
      [`getTotal${key}`]: state => state[reduxKey]?.[`leaveRequests_${key}`]?.total,
      [`getIsPending${key}`]: state => state[reduxKey]?.[`leaveRequests_${key}`]?.isPending,
    }),
    {},
  ),
};

export const batchLeaveRequestsSelector = {
  getIsPending: state => state[reduxKey]?.batchLeaveRequests.isPending,
  getIsSuccess: state => state[reduxKey]?.batchLeaveRequests.isSuccess,
};

export const leaveDetailSelector = {
  getIsPending: state => state[reduxKey]?.leaveDetail.isPending,
  getData: state => state[reduxKey]?.leaveDetail.data,
};

export const approveLeaveRequestSelector = {
  getIsPending: state => state[reduxKey]?.approveLeaveRequest.isPending,
  getIsSuccess: state => state[reduxKey]?.approveLeaveRequest.isSuccess,
};

export const rejectLeaveRequestSelector = {
  getIsPending: state => state[reduxKey]?.rejectLeaveRequest.isPending,
  getIsSuccess: state => state[reduxKey]?.rejectLeaveRequest.isSuccess,
};

export const cancelLeaveRequestSelector = {
  getIsPending: state => state[reduxKey]?.cancelLeaveRequest.isPending,
  getIsSuccess: state => state[reduxKey]?.cancelLeaveRequest.isSuccess,
};

export const leaveTypesSelector = {
  getIsPending: state => state[reduxKey]?.leaveTypes.isPending,
  getData: state => state[reduxKey]?.leaveTypes.data,
};

export const signedUrlSelector = { getIsPending: state => state[reduxKey]?.signedUrl.isPending };

export const leaveExcelSelector = { getIsPending: state => state[reduxKey]?.leaveExcel.isPending };
