import moment from 'moment';

import { t, getLangKey } from '@shared/i18n';
import { LOCAL_DATE_TIME_FORMAT, LOCAL_DATE_FORMAT } from '@shared/shared/constants';
import { isNullOrUndefined } from '@shared/utils/common';
import { EMPLOYEE_CHANGE_LOG_CHANGE_MODELS } from '@app/pages/Employee/constants';

export function formatDataToExport(data: any) {
  const langKey = getLangKey();

  return data.map((log: any) => ({
    createdAt: moment(log?.createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-',
    effectiveDate: moment(log?.effectiveDate).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-',
    reason: log?.reason ? t(`employeePage:EMPLOYEE_CHANGE_LOG_REASONS.${log.reason}`) : '-',
    employeeId: log?.employee?._id || '-',
    employeeFullName: log?.employee?.fullName || '-',
    actionById: log?.actionBy?.id || '-',
    actionByName: log?.actionBy?.name || '-',
    fieldPath: log.fieldPath,
    oldValue: getFormattedValue(log.oldValue, { fieldPath: log.fieldPath, changeModel: log.changeModel }),
    newValue: getFormattedValue(log.newValue, { fieldPath: log.fieldPath, changeModel: log.changeModel }),
  }));
}

export const EMPLOYEE_LOGS_COLUMNS = (translate: Function) => [
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.TIMESTAMP'),
    key: 'createdAt',
    default: '-',
  },
  {
    title: translate('employeePage:EFFECTIVE_DATE'),
    key: 'effectiveDate',
    default: '-',
  },
  {
    title: translate('global:REASON'),
    key: 'reason',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_EMPLOYEE_ID'),
    key: 'employeeId',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_EMPLOYEE'),
    key: 'employeeFullName',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.ACTION_BY_ID'),
    key: 'actionById',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.ACTION_BY'),
    key: 'actionByName',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_FIELD'),
    key: 'fieldPath',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.OLD_VALUE'),
    key: 'oldValue',
    default: '-',
  },
  {
    title: translate('employeeLogsPage:LOGS_TABLE.COLUMNS.NEW_VALUE'),
    key: 'newValue',
    default: '-',
  },
];

export function getFormattedValue(value: any, {
  fieldPath,
  changeModel = EMPLOYEE_CHANGE_LOG_CHANGE_MODELS.EMPLOYEE,
}: { fieldPath: string, changeModel: string }) {
  const langKey = getLangKey();

  if (isNullOrUndefined(value)) return '-';

  if (changeModel === EMPLOYEE_CHANGE_LOG_CHANGE_MODELS.EDUCATION) {
    switch (fieldPath) {
      case 'employee':
        return value?.fullName || '-';
      case 'level':
        return t(`employeePage:EDUCATION_LEVELS.${value}`) || '-';
      case 'status':
        return t(`employeePage:EDUCATION_STATUSES.${value}`) || '-';
      case 'institute':
      case 'academicProgram':
      case 'graduationYear':
        return value;
      case 'isDeleted':
        return value ? t('global:YES') : t('global:NO');
      default: return value;
    }
  }

  switch (fieldPath) {
    case 'supervisor':
    case 'lineManager':
    case 'matrixManager':
    case 'businessPartner':
      return value?.fullName || '-';
    case 'birthdate':
      return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
    case 'workStartDate':
    case 'workEndDate':
    case 'seniorityStartDate':
    case 'annualLeaveCalculationStartDate':
      return moment(value).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-';
    case 'positionLevel':
      return t(`employeePage:POSITION_LEVELS.${value}`) || '-';
    case 'employmentStatus':
      return t(`employeePage:EMPLOYMENT_STATUSES.${value}`) || '-';
    case 'endOfEmploymentLeaveReason':
      return t(`employeePage:LEAVE_TYPES.${value}`) || '-';
    case 'payrollStatus':
      return t(`employeePage:PAYROLL_STATUSES.${value}`) || '-';
    case 'payrollCountryCode':
      return value?.toUpperCase() || '-';
    case 'employmentType':
      return t(`employeePage:EMPLOYMENT_TYPES.${value}`) || '-';
    case 'contractType':
      return t(`employeePage:CONTRACT_TYPES.${value}`) || '-';
    case 'businessUnit':
    case 'department':
    case 'subDepartments.firstLevelSub':
    case 'mainWorkLocation':
    case 'company':
      return value?.name?.[langKey] || '-';
    case 'businessCountryCodes':
      return value?.map((countryCode: string) => countryCode.toUpperCase()).join(', ') || '-';
    case 'gender':
      return t(`employeePage:GENDER_TYPES.${value}`) || '-';
    case 'isInternationalBusinessEmployee':
    case 'shouldImmediatelyTerminate':
    case 'onboardingInfo.hasInvalidEmail':
    case 'onboardingInfo.isGWSAccountCreated':
    case 'onboardingInfo.isGWSPasswordSent':
    case 'onboardingInfo.isAdminPanelUserCreated':
      return value ? t('employeePage:YES') : t('employeePage:NO');
    case 'workGSM':
    case 'personalGSM':
      return `${value?.dialCode} ${value?.number}` || '-';
    case 'mainWorkLocationType':
      return t(`employeePage:LOCATION_TYPES.${value}`) || '-';
    case 'residentialAddress':
      return value?.address || '-';
    case 'emergencyContact.relationsType':
      return t(`employeePage:RELATION_TYPES.${value}`) || '-';
    case 'residentialAddress.country':
    case 'residentialAddress.city':
    case 'sgkCity':
      return value?.name?.[langKey] || '-';
    default:
      return value;
  }
}
