import { createActions } from 'reduxsauce';

import { EMPLOYEE_LEAVE_STATUSES, REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT}_`;

export const { Types, Creators } = createActions(
  {
    ...Object.values(EMPLOYEE_LEAVE_STATUSES).reduce(
      (acc, key) => ({
        ...acc,
        [`getLeaveRequestsRequest${key}`]: {
          franchiseId: undefined,
          status: undefined,
          startDatetime: undefined,
          endDatetime: undefined,
          currentPage: 1,
          rowsPerPage: 10,
          isEmailRequired: true,
        },
        [`getLeaveRequestsSuccess${key}`]: { data: [], total: 0 },
        [`getLeaveRequestsFailure${key}`]: { error: null },
      }),
      {},
    ),
    batchLeaveRequestsRequest: { leaves: undefined, status: undefined },
    batchLeaveRequestsSuccess: { data: [] },
    batchLeaveRequestsFailure: { error: null },
    getLeaveDetailRequest: { leaveRequestId: undefined },
    getLeaveDetailSuccess: { data: {} },
    getLeaveDetailFailure: { error: null },
    approveLeaveRequestRequest: { leaveRequestId: undefined },
    approveLeaveRequestSuccess: { data: {} },
    approveLeaveRequestFailure: { error: null },
    rejectLeaveRequestRequest: {
      leaveRequestId: undefined,
      description: undefined,
    },
    rejectLeaveRequestSuccess: { data: {} },
    rejectLeaveRequestFailure: { error: null },
    cancelLeaveRequestRequest: { leaveRequestId: undefined },
    cancelLeaveRequestSuccess: { data: {} },
    cancelLeaveRequestFailure: { error: null },
    getSignedUrlRequest: { fileKey: undefined, personId: undefined },
    getSignedUrlSuccess: {},
    getSignedUrlFailure: { error: null },
    getLeaveTypesRequest: {},
    getLeaveTypesSuccess: { data: [] },
    getLeaveTypesFailure: { error: null },
    getLeaveExcelRequest: {
      franchiseIds: undefined,
      utcOffset: undefined,
      startDatetime: undefined,
      endDatetime: undefined,
    },
    getLeaveExcelSuccess: {},
    getLeaveExcelFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
