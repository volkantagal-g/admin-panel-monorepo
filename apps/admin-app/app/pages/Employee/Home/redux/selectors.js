import moment from 'moment';

import { REDUX_KEY } from '@shared/shared/constants';

const YEAR_FORMAT = 'YYYY/MM/DD';
const reduxKey = REDUX_KEY.EMPLOYEE.HOME;

export const pageSelector = { getIsPageInitialized: state => state[reduxKey]?.isPageInitialized };

export const permitsForCalendarFormDataSelector = { getFormData: state => state[reduxKey]?.permitsForCalendarFormData || {} };

export const permitsForCalendarSelector = {
  getIsPending: state => state[reduxKey]?.permitsForCalendar?.isPending,
  getData: state => state[reduxKey]?.permitsForCalendar?.data,
};

export const permitRequestsForSupervisorSelector = {
  getIsPending: state => state[reduxKey]?.getPermitRequestsForSupervisor?.isPending,
  getData: state => state[reduxKey]?.getPermitRequestsForSupervisor?.data,
  getPaginationData: state => state?.[reduxKey]?.getPermitRequestsForSupervisor?.pagination || {},
  getFilters: state => state?.[reduxKey]?.getPermitRequestsForSupervisor?.filters || {},
};

export const employeesForManagerSelector = {
  getData: state => state[reduxKey]?.employeesForManager?.data,
  getIsPending: state => state[reduxKey]?.employeesForManager?.isPending,
};

export const newPermitRequestSelector = {
  getIsPending: state => state[reduxKey]?.newPermitRequest?.isPending,
  getIsCreateSucceeded: state => state[reduxKey]?.newPermitRequest?.isCreateSucceeded,
};

export const getPermitHistorySelector = {
  getData: state => state?.[reduxKey]?.getPermitHistory?.data,
  getIsPending: state => state?.[reduxKey]?.getPermitHistory?.isPending,
  getPaginationData: state => state?.[reduxKey]?.getPermitHistory?.pagination || {},
  getFilters: state => state?.[reduxKey]?.getPermitHistory?.filters || {},
};

export const getUploadDocumentUrlSelector = {
  getData: state => state?.[reduxKey]?.uploadDocumentUrl?.data,
  getFile: state => state?.[reduxKey]?.uploadDocumentUrl?.file,
  getIsPending: state => state?.[reduxKey]?.uploadDocumentUrl?.isPending,
};

export const actionButtonSelector = {
  getIsPending: state => state?.[reduxKey]?.actionButtonResult?.isPending,
  getIsSucceeded: state => state?.[reduxKey]?.actionButtonResult?.isSucceeded,
};

export const getUsedAndVestedPermitCountsSelector = {
  getData: state => state?.[reduxKey]?.getUsedAndVestedPermitCounts?.data,
  getIsPending: state => state?.[reduxKey]?.getUsedAndVestedPermitCounts?.isPending,
};

export const getPermitInfoOfManagersTeamSelector = {
  getData: state => {
    const data = state?.[reduxKey]?.permitInfoOfManagersTeam?.data;
    return data?.map(item => ({
      fullName: item.fullName,
      workEmail: item.workEmail,
      workStartDate: moment(item.workStartDate).format(YEAR_FORMAT),
      vested: (item.vested || 0).toString(),
      used: (item.used || 0).toString(),
      remaining: ((item.vested || 0) - (item.used || 0)).toString(),
    })) || [];
  },
  getIsPending: state => state?.[reduxKey]?.permitInfoOfManagersTeam?.isPending,
};
