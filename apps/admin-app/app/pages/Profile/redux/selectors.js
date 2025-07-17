import moment from 'moment';

import { REDUX_KEY } from '@shared/shared/constants';

import {
  getFormattedCompanyInfoFormData,
  getFormattedContactInfoFormData,
  getFormattedEmployeeInfoFormData,
  getFormattedOrganizationInfoFormData,
  getFormattedPersonalInfoFormData,
} from '../utils';

const YEAR_FORMAT = 'YYYY/MM/DD';
const reducerKey = REDUX_KEY.PROFILE;

export const panelUserEmployeeSummarySelector = {
  getData: state => state[reducerKey]?.panelUserEmployeeSummary?.data,
  getSelected: state => state[reducerKey]?.panelUserEmployeeSummary?.selected,
  getIsPending: state => state[reducerKey]?.panelUserEmployeeSummary?.isPending,
};

export const getActiveSessionsSelector = {
  getData: state => state[reducerKey]?.activeSessions?.data,
  getIsPending: state => state[reducerKey]?.activeSessions?.isPending,
};

export const getEmployeeAssetsForProfileSelector = {
  getData: state => state[reducerKey]?.employeeAssets?.data,
  getIsPending: state => state[reducerKey]?.employeeAssets?.isPending,
};

export const getEmployeeVehiclesForProfileSelector = {
  getData: state => state[reducerKey]?.employeeVehicles?.data,
  getIsPending: state => state[reducerKey]?.employeeVehicles?.isPending,
  getTotalCount: state => state[reducerKey]?.employeeVehicles?.count,
};

export const getEmployeeDetailsSelector = {
  getData: state => state[reducerKey]?.employeeDetail?.data,
  getIsPending: state => state[reducerKey]?.employeeDetail?.isPending,
  getOrganizationInfoData: state => getFormattedOrganizationInfoFormData(state[reducerKey]?.employeeDetail?.data),
  getPersonalInfoData: state => getFormattedPersonalInfoFormData(state[reducerKey]?.employeeDetail?.data),
  getContactInfoData: state => getFormattedContactInfoFormData(state[reducerKey]?.employeeDetail?.data),
  getEmployeeInfoData: state => getFormattedEmployeeInfoFormData(state[reducerKey]?.employeeDetail?.data),
  getCompanyInfoData: state => getFormattedCompanyInfoFormData(state[reducerKey]?.employeeDetail?.data),
};

export const getEmployeeEducationSelector = {
  getData: state => state[reducerKey]?.educations?.data,
  getIsPending: state => state[reducerKey]?.educations?.isPending,
  getIsAddEducationPending: state => state[reducerKey]?.addEducation?.isPending,
  getIsRemoveEducationPending: state => state[reducerKey]?.addEducation?.isPending,
  getIsUpdateEducationPending: state => state[reducerKey]?.addEducation?.isPending,
};

export const getPermitHistorySelector = {
  getData: state => state?.[reducerKey]?.getPermitHistory?.data,
  getIsPending: state => state?.[reducerKey]?.getPermitHistory?.isPending,
  getPaginationData: state => state?.[reducerKey]?.getPermitHistory?.pagination || {},
  getFilters: state => state?.[reducerKey]?.getPermitHistory?.filters || {},
};

export const actionButtonSelector = {
  getIsPending: state => state?.[reducerKey]?.actionButtonResult?.isPending,
  getIsSucceeded: state => state?.[reducerKey]?.actionButtonResult?.isSucceeded,
};

export const permitRequestsForSupervisorSelector = {
  getIsPending: state => state[reducerKey]?.getPermitRequestsForSupervisor?.isPending,
  getData: state => state[reducerKey]?.getPermitRequestsForSupervisor?.data,
  getPaginationData: state => state?.[reducerKey]?.getPermitRequestsForSupervisor?.pagination || {},
  getFilters: state => state?.[reducerKey]?.getPermitRequestsForSupervisor?.filters || {},
};

export const employeesForManagerSelector = {
  getData: state => state[reducerKey]?.employeesForManager?.data,
  getIsPending: state => state[reducerKey]?.employeesForManager?.isPending,
};

export const getUsedAndVestedPermitCountsSelector = {
  getData: state => state?.[reducerKey]?.getUsedAndVestedPermitCounts?.data,
  getIsPending: state => state?.[reducerKey]?.getUsedAndVestedPermitCounts?.isPending,
};

export const getPermitInfoOfManagersTeamSelector = {
  getData: state => {
    const data = state?.[reducerKey]?.permitInfoOfManagersTeam?.data;
    return data?.map(item => ({
      fullName: item.fullName,
      workEmail: item.workEmail,
      workStartDate: moment(item.workStartDate).format(YEAR_FORMAT),
      vested: (item.vested || 0).toString(),
      used: (item.used || 0).toString(),
      remaining: ((item.vested || 0) - (item.used || 0)).toString(),
    })) || [];
  },
  getIsPending: state => state?.[reducerKey]?.permitInfoOfManagersTeam?.isPending,
};
