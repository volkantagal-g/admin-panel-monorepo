import moment from 'moment';

import { getLangKey, t } from '@shared/i18n';
import { DEPARTMENT_LEVELS } from '../Employee/constants';

export const getSortedAssets = ({ assets }) => {
  const existingAssets = assets.filter(asset => !asset.returnDate);
  const returnedAssets = assets.filter(asset => !!asset.returnDate);

  const sortedExistingAssets = existingAssets.sort((a, b) => moment(b.assignDate).diff(moment(a.assignDate)));
  const sortedReturnedAssets = returnedAssets.sort((a, b) => moment(b.returnDate).diff(moment(a.returnDate)));

  return [...sortedExistingAssets, ...sortedReturnedAssets];
};

export const getFormattedPersonalInfoFormData = employeeData => {
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

export const getFormattedContactInfoFormData = employeeData => {
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

export const getFormattedEmployeeInfoFormData = employeeData => {
  return {
    workEmail: employeeData?.workEmail,
    workGSMNumber: employeeData?.workGSM?.number,
    workGSMDialCode: employeeData?.workGSM?.dialCode,
    payrollCountryCode: employeeData?.payrollCountryCode,
    officeAccessCardId: employeeData?.officeAccessCardId,
    payrollStatus: employeeData.payrollStatus,
  };
};

export const getFormattedOrganizationInfoFormData = employeeData => {
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

export const getFormattedCompanyInfoFormData = employeeData => {
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

export const getFormattedContactInfoRequestParams = employeeData => {
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

export const getFormattedAddEducationRequestParams = employeeData => {
  return {
    level: employeeData?.level,
    status: employeeData?.status,
    institute: employeeData?.institute,
    graduationYear: Number(moment(employeeData?.graduationYear).format('YYYY')),
    academicProgram: employeeData?.academicProgram || '',
  };
};
