import axios from '@shared/axios/common';

export const getLeaveRequests = async ({ franchiseId, status, startDatetime, endDatetime, limit, offset, isEmailRequired }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/leaveManagement/filter',
    data: { franchiseId, status, startDatetime, endDatetime, limit, offset, isEmailRequired },
  });
  return data;
};

export const getLeaveDetail = async ({ leaveRequestId }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/leaveManagement/${leaveRequestId}`,
  });
  return data;
};

export const getLeaveTypes = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/leaveManagement/leave/types',
  });
  return data;
};

export const approveLeaveRequest = async ({ leaveRequestId }) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/leaveManagement/accept/${leaveRequestId}`,
    data: { leaveRequestId },
  });
  return data;
};

export const rejectLeaveRequest = async ({ leaveRequestId, description }) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/leaveManagement/reject/${leaveRequestId}`,
    data: { leaveRequestId, description },
  });
  return data;
};

export const cancelLeaveRequest = async ({ leaveRequestId }) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/leaveManagement/cancel/${leaveRequestId}`,
    data: { leaveRequestId },
  });
  return data;
};

/**
 * @param {{
 * leaves: {leaveId: string, personId: string}[];
 * status: string;
 * }} args
 */
export const batchLeaveRequests = async ({ leaves, status }) => {
  const { data } = await axios({
    method: 'PUT',
    url: '/leaveManagement/batch',
    data: { leaves, status },
  });
  return data;
};

export const getSignedUrl = async ({ fileKey, personId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/leaveManagement/get-signed-url',
    data: { fileKey, personId },
  });
  return data;
};

export const getLeaveExcel = async ({ franchiseIds, utcOffset, startDatetime, endDatetime }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/leaveManagement/excel',
    data: { franchiseIds, utcOffset, startDatetime, endDatetime },
  });
  return data;
};
