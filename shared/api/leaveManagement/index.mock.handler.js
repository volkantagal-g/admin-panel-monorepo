import { leaveRequestDetail, leaveRequests, testDetailId } from './index.mock.data';

const leaveRequestApi = {
  url: '/leaveManagement/filter',
  method: 'post',
  successData: leaveRequests,
};

const leaveRequestDetailApi = {
  url: `/leaveManagement/${testDetailId}`,
  method: 'get',
  successData: leaveRequestDetail,
};

export default [leaveRequestApi, leaveRequestDetailApi];
