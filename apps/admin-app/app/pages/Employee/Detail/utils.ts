import moment from 'moment';
import { isEmpty as _isEmpty, isFunction as _isFunction } from 'lodash';

import { getDiffObj } from '@shared/utils/common';
import { getLangKey, t } from '@shared/i18n';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { DEPARTMENT_LEVELS } from '../constants';

import { IPersonalInfoFormValues } from './types';

export const getFormattedPersonalInfoFormData = (employeeData: any): IPersonalInfoFormValues => {
  return {
    name: employeeData?.name,
    surname: employeeData?.surname,
    uniqueIdentifier: employeeData?.uniqueIdentifier,
    birthdate: moment(employeeData?.birthdate),
    gender: employeeData?.gender,
    nationality: employeeData?.nationality,
    picURL: employeeData?.picURL,
  };
};

export const getFormattedPersonalInfoRequestParams = (employeeData: IPersonalInfoFormValues) => {
  return {
    name: employeeData?.name,
    surname: employeeData?.surname,
    uniqueIdentifier: employeeData?.uniqueIdentifier,
    birthdate: toFakeLocalDate(moment(employeeData?.birthdate).startOf('day').valueOf()).toISOString(),
    gender: employeeData?.gender,
    nationality: employeeData?.nationality,
    picURL: employeeData?.picURL,
  };
};

export const getFormattedContactInfoFormData = (employeeData: any) => {
  return {
    residentialAddress: {
      address: employeeData?.residentialAddress?.address,
      city: employeeData?.residentialAddress?.city,
      country: employeeData?.residentialAddress?.country,
      district: employeeData?.residentialAddress?.district,
    },
    emergencyContact: {
      relationsType: employeeData?.emergencyContact?.relationsType ? Number(employeeData?.emergencyContact?.relationsType) : undefined,
      name: employeeData?.emergencyContact?.name,
      gsm: Number(employeeData?.emergencyContact?.gsm),
      dialCode: employeeData?.emergencyContact?.dialCode,
    },
    personalEmail: employeeData?.personalEmail,
    personalGSMNumber: employeeData?.personalGSM?.number,
    personalGSMDialCode: employeeData?.personalGSM?.dialCode,
  };
};

export const getFormattedContactInfoRequestParams = (employeeData: any) => {
  return {
    residentialAddress: {
      address: employeeData?.residentialAddress?.address,
      city: employeeData?.residentialAddress?.city,
      country: employeeData?.residentialAddress?.country,
      district: employeeData?.residentialAddress?.district,
    },
    emergencyContact: {
      relationsType: employeeData?.emergencyContact?.relationsType,
      name: employeeData?.emergencyContact?.name,
      gsm: employeeData?.emergencyContact?.gsm?.toString(),
      dialCode: employeeData?.emergencyContact?.dialCode,
    },
    personalEmail: employeeData?.personalEmail,
    ...(employeeData?.personalGSMNumber ? {
      personalGSM: {
        number: employeeData?.personalGSMNumber?.toString(),
        dialCode: employeeData?.personalGSMDialCode,
      },
      // to remove personalGSM
    } : { personalGSM: null }),
  };
};

export const getFormattedEmployeeInfoFormData = (employeeData: any) => {
  return {
    workEmail: employeeData?.workEmail,
    workGSMNumber: employeeData?.workGSM?.number,
    workGSMDialCode: employeeData?.workGSM?.dialCode,
    payrollCountryCode: employeeData?.payrollCountryCode,
    officeAccessCardId: employeeData?.officeAccessCardId,
    payrollStatus: employeeData.payrollStatus,
  };
};

export const getFormattedEmployeeInfoRequestParams = (employeeData: any) => {
  return {
    workEmail: employeeData.workEmail,
    payrollCountryCode: employeeData.payrollCountryCode,
    officeAccessCardId: employeeData.officeAccessCardId,
    payrollStatus: employeeData.payrollStatus,
    ...(employeeData.workGSMNumber ? {
      workGSM: {
        number: employeeData.workGSMNumber?.toString(),
        dialCode: employeeData.workGSMDialCode,
      },
    } : { workGSM: null }),
  };
};

export const getFormattedOrganizationInfoFormData = (employeeData: any) => {
  return {
    businessUnit: { value: employeeData?.businessUnit?._id, label: employeeData?.businessUnit?.name?.[getLangKey()] },
    company: { value: employeeData?.company?._id, label: employeeData?.company?.name?.[getLangKey()] },
    department: employeeData?.department?._id,
    subDepartments: { [DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST]: employeeData?.subDepartments?.firstLevelSub?._id },
    jobTitle: employeeData?.jobTitle,
    positionLevel: employeeData?.positionLevel,
    lineManager: { value: employeeData?.lineManager?._id, label: employeeData?.lineManager?.fullName },
    secondManager: { value: employeeData?.lineManager?.lineManager?._id, label: employeeData?.lineManager?.lineManager?.fullName },
    matrixManager: employeeData?.matrixManager ? { value: employeeData?.matrixManager?._id, label: employeeData?.matrixManager?.fullName } : undefined,
    businessCountryCodes: employeeData.businessCountryCodes?.length === 0 ? ['global'] : employeeData.businessCountryCodes,
    businessPartner: employeeData?.businessPartner ? { value: employeeData?.businessPartner?._id, label: employeeData?.businessPartner?.fullName } : undefined,
  };
};

export const getFormattedOrganizationInfoRequestParams = (employeeData: any) => {
  return {
    businessUnit: employeeData?.businessUnit?.value,
    company: employeeData?.company?.value,
    department: employeeData?.department,
    subDepartments: { [DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST]: employeeData?.subDepartments?.[DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST] },
    jobTitle: employeeData?.jobTitle,
    positionLevel: employeeData?.positionLevel,
    lineManager: employeeData?.lineManager?.value,
    matrixManager: employeeData?.matrixManager?.value || null,
    businessCountryCodes: employeeData.businessCountryCodes?.includes('global') ? [] : employeeData.businessCountryCodes,
    businessPartner: employeeData?.businessPartner?.value || null,
  };
};

export const getFormattedCompanyInfoFormData = (employeeData: any) => {
  return {
    workStartDate: employeeData.workStartDate ? moment(employeeData.workStartDate) : undefined,
    workEndDate: employeeData.workEndDate ? moment(employeeData.workEndDate) : undefined,
    seniorityStartDate: employeeData.seniorityStartDate ? moment(employeeData.seniorityStartDate) : undefined,
    annualLeaveCalculationStartDate: employeeData.annualLeaveCalculationStartDate ? moment(employeeData.annualLeaveCalculationStartDate) : undefined,
    mainWorkLocation: {
      value: employeeData?.mainWorkLocation?._id,
      label: `${employeeData?.mainWorkLocation?.name?.[getLangKey()]}, (${t(`employeePage:LOCATION_TYPES.${employeeData?.mainWorkLocation?.type}`)})`,
      data: employeeData?.mainWorkLocation,
    },
    employmentType: employeeData?.employmentType,
    contractType: employeeData?.contractType,
    annualLeaveCalculations: employeeData?.annualLeaveCalculations || {},
    sgkCity: employeeData?.sgkCity,
  };
};

export const getFormattedCompanyInfoRequestParams = (employeeData: any) => {
  return {
    workStartDate: toFakeLocalDate(moment(employeeData?.workStartDate).startOf('day').valueOf()).toISOString(),
    seniorityStartDate: employeeData.seniorityStartDate ?
      toFakeLocalDate(moment(employeeData?.seniorityStartDate).startOf('day').valueOf()).toISOString() :
      null,
    annualLeaveCalculationStartDate: employeeData.annualLeaveCalculationStartDate ?
      toFakeLocalDate(moment(employeeData?.annualLeaveCalculationStartDate).startOf('day').valueOf()).toISOString() :
      null,
    mainWorkLocation: employeeData?.mainWorkLocation?.value,
    employmentType: Number(employeeData.employmentType),
    contractType: Number(employeeData.contractType),
    workEndDate: employeeData.workEndDate && toFakeLocalDate(moment(employeeData.workEndDate).startOf('day').valueOf()).toISOString(),
    isTerminationCancelled: employeeData.isTerminationCancelled,
    sgkCity: employeeData.sgkCity,
  };
};

export const getFormattedAddEducationRequestParams = (employeeData: any) => {
  return {
    level: employeeData?.level,
    status: employeeData?.status,
    institute: employeeData?.institute,
    graduationYear: Number(moment(employeeData?.graduationYear).format('YYYY')),
    academicProgram: employeeData?.academicProgram || '',
  };
};

/**
 * Get the changed fields between two objects.
 *
 * @param {object} oldValues - The original values.
 * @param {object} newValues - The new values to compare against the original values.
 * @param {object} [options] - Optional parameters.
 * @param {Function} [options.formatterFunc] - A function to format the values before comparison.
 * @returns {string[]} - An array of keys representing the fields that have changed.
 */
export const getChangedFields = (
  oldValues: object,
  newValues: object,
  { formatterFunc = (value: object) => value } = {},
): string[] => {
  const formatter = _isFunction(formatterFunc) ? formatterFunc : (value: object) => value;
  const diffs = getDiffObj(formatter(oldValues), formatter(newValues));

  // @ts-ignore
  return Object.keys(diffs?.newValues || {});
};

export const getConvertDotNotationToObject = (obj: Record<string, any>): Record<string, any> => {
  const result = {};

  Object.entries(obj || {}).forEach(([key, value]) => {
    const paths = key.split('.');
    // @ts-ignore
    Object.assign(result, { [paths[0]]: result[paths[0]] || {} });
    // @ts-ignore
    Object.assign(result[paths[0]], { [paths[1]]: value });
  });

  return result;
};
