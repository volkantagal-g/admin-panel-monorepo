import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import {
  getFormattedCompanyInfoFormData,
  getFormattedContactInfoFormData,
  getFormattedEmployeeInfoFormData, getFormattedOrganizationInfoFormData,
  getFormattedPersonalInfoFormData,
} from '../utils';
import { State } from './reducer';

const reduxKey = REDUX_KEY.EMPLOYEE.DETAIL;

export const employeeSelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.isPending,
  getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
  getPersonalInfoFormData: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
    data => {
      return getFormattedPersonalInfoFormData(data || {});
    },
  ),
  getContactInfoFormData: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
    data => {
      return getFormattedContactInfoFormData(data || {});
    },
  ),
  getEmployeeInfoFormData: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
    data => {
      return getFormattedEmployeeInfoFormData(data || {});
    },
  ),
  getOrganizationInfoFormData: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
    data => {
      return getFormattedOrganizationInfoFormData(data || {});
    },
  ),
  getCompanyInfoFormData: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.data,
    data => {
      return getFormattedCompanyInfoFormData(data || {});
    },
  ),
  getLatestOrganizationalInfoChangeLogs: createSelector(
    (state: { [reduxKey: string]: State }) => state[reduxKey]?.employee.organizationalInfoChangeLogs,
    data => {
      const result = {};
      data?.forEach((log: any) => {
        if (log.latestChangeLog) {
          // @ts-ignore
          result[log.latestChangeLog.fieldPath] = log.latestChangeLog;
        }
      });

      return result;
    },
  ),
};

export const mainSelector = { getIsFirstLoadDone: (state: {[reduxKey: string]: State}) => state[reduxKey]?.isFirstLoadDone };

export const updateCompanyInfoSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateCompanyInfo.isPending };

export const updateContactInfoSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateContactInfo.isPending };

export const updateEmployeeInfoSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateEmployeeInfo.isPending };

export const updateOrganizationInfoSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateOrganizationInfo.isPending };

export const updatePersonalInfoSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updatePersonalInfo.isPending };

export const terminateEmployeeSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.terminateEmployee.isPending };

export const rehireEmployeeSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.rehireEmployee.isPending };

export const addEducationSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.addEducationRequest.isPending };

export const removeEducationSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.removeEducationRequest.isPending };

export const updateEducationSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateEducationRequest.isPending };

export const educationsSelector = {
  getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.educations.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.educations.isPending,
};

export const employeeSurveyHistorySelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.employeeSurveyHistory.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.employeeSurveyHistory.data,
};

export const addSurveyRequest = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.addSurveyRequest.isPending };

export const updateSurveyRequest = { getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.updateSurveyRequest.isPending };
