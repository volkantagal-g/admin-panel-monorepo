import * as Yup from 'yup';
import moment from 'moment';

import { t } from '@shared/i18n';

import {
  isUploadDocumentMandatory,
  getCalculatedDatesOfPermitBySelectedDateRange,
  getMaxAllowedDays,
  getMaxAllowedHours,
  convertPermitTypeConstantsToSelectOptions,
} from '@app/pages/Employee/Home/utils';
import { EMPLOYEE_PERMIT_REASONS, EMPLOYEE_PERMIT_TYPES } from '@app/pages/Employee/constants';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { VALID_BIRTHDAY_LEAVE_DAY, VALID_TAKE_CARE_OF_YOURSELF_LEAVE_DAY } from '@app/pages/Employee/Home/constants';

export const getValidationSchema = ({ permitRequestGroupType }) => {
  if (permitRequestGroupType === 'REGULAR_LEAVE') {
    return Yup.object().shape({
      startDateL: Yup.date().required(t('error:REQUIRED')),
      endDateL: Yup.date().required(t('error:REQUIRED')),
      permitType: Yup.number().required(t('error:REQUIRED')),
      reason: Yup.number().when('permitType', (permitType, schema) => {
        if (permitType === EMPLOYEE_PERMIT_TYPES.OTHER) {
          return schema.required(t('error:REQUIRED'));
        }
        return schema;
      }),
      otherReasonDescription: Yup.string().trim().when('reason', (reason, schema) => {
        if (reason === EMPLOYEE_PERMIT_REASONS.OTHER) {
          return schema.required(t('error:REQUIRED'));
        }
        return schema;
      }),
      totalDay: Yup.number().when('permitType', (permitType, schema) => {
        if (permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO) {
          return schema.min(0.5).required(t('error:REQUIRED'));
        }
        return schema;
      }),
      totalWorkDay: Yup.number().when('permitType', (permitType, schema) => {
        if (permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO) {
          return schema.min(0).required(t('error:REQUIRED'));
        }
        return schema;
      }),
      requestedPermitDay: Yup.number().when(['permitType', 'reason', 'totalWorkDay'], (permitType, reason, totalWorkDay, schema) => {
        if (permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO
          && reason !== EMPLOYEE_PERMIT_REASONS.BIRTHDAY_LEAVE
          && reason !== EMPLOYEE_PERMIT_REASONS.TAKE_CARE_OF_YOURSELF_LEAVE) {
          return schema.required(t('error:REQUIRED')).min(0.5).max(getMaxAllowedDays(permitType, reason, totalWorkDay));
        }
        if (reason === EMPLOYEE_PERMIT_REASONS.BIRTHDAY_LEAVE) {
          return schema
            .required(t('error:REQUIRED'))
            .max(getMaxAllowedDays(permitType, reason, totalWorkDay))
            .oneOf(VALID_BIRTHDAY_LEAVE_DAY, t('employeePage:ERROR_MESSAGES.TOTAL_LEAVE_DAYS_FOR_BIRTHDAY_LEAVE'));
        }
        if (reason === EMPLOYEE_PERMIT_REASONS.TAKE_CARE_OF_YOURSELF_LEAVE) {
          return schema
            .required(t('error:REQUIRED')).max(getMaxAllowedDays(permitType, reason, totalWorkDay))
            .oneOf(VALID_TAKE_CARE_OF_YOURSELF_LEAVE_DAY, t('employeePage:ERROR_MESSAGES.TOTAL_LEAVE_DAYS_FOR_TAKE_CARE_OF_YOURSELF_LEAVE'));
        }
        return schema;
      }),
      requestedPermitHours: Yup.number().when(['permitType'], (permitType, schema) => {
        if (permitType === EMPLOYEE_PERMIT_TYPES.HOURLY_PTO) {
          return schema.required(t('error:REQUIRED')).min(0.5).max(getMaxAllowedHours(permitType));
        }
        return schema;
      }),
      employeeNote: Yup.string(),
      employeeDocument: Yup.string().when(['permitType', 'reason', 'requestedPermitDay'], {
        is: isUploadDocumentMandatory,
        then: schema => schema.required(t('error:REQUIRED')),
        otherwise: schema => schema,
      }),
    });
  }
  return Yup.object().shape({
    startDateL: Yup.date().required(t('error:REQUIRED')),
    endDateL: Yup.date().required(t('error:REQUIRED')),
    permitType: Yup.number().required(t('error:REQUIRED')),
    reason: Yup.number().when('permitType', (permitType, schema) => {
      if (
        permitType === EMPLOYEE_PERMIT_TYPES.OTHER ||
        permitType === EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE
      ) {
        return schema.required(t('error:REQUIRED'));
      }
      return schema;
    }),
    totalDay: Yup.number().when('permitType', (permitType, schema) => {
      if (permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO) {
        return schema.min(0.5).required(t('error:REQUIRED'));
      }
      return schema;
    }),
    employeeNote: Yup.string().when(['reason'], (reason, schema) => {
      if (reason === EMPLOYEE_PERMIT_REASONS.NO_SHOW_EXCUSE_EXCUSE) {
        return schema.required(t('error:REQUIRED'));
      }
      return schema;
    }),
    employeeDocument: Yup.string().when(['permitType', 'reason', 'requestedPermitDay'], {
      is: isUploadDocumentMandatory,
      then: schema => schema.required(t('error:REQUIRED')),
      otherwise: schema => schema,
    }),
  });
};

export const getInitialValues = ({ permitRequestGroupType }) => {
  const startDate = moment().startOf('day');
  const endDate = moment().endOf('day');
  const { totalDay, totalWorkDay } = getCalculatedDatesOfPermitBySelectedDateRange({ startDate, endDate });

  if (permitRequestGroupType === 'REGULAR_LEAVE') {
    const initialPermitType = convertPermitTypeConstantsToSelectOptions({ permitRequestGroupType })?.[0]?.value;
    return {
      totalDay,
      totalWorkDay,
      startDateL: startDate,
      endDateL: endDate,
      requestedPermitDay: undefined,
      requestedPermitHours: undefined,
      permitType: initialPermitType,
      reason: undefined,
      otherReasonDescription: undefined,
      employeeNote: undefined,
      employeeDocument: undefined,
    };
  }
  return {
    totalDay,
    startDateL: startDate,
    endDateL: endDate,
    permitType: EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE,
    reason: undefined,
    employeeNote: undefined,
    employeeDocument: undefined,
  };
};

export const manipulateValuesAfterSubmit = (values, { permitRequestGroupType }) => {
  const { otherReasonDescription, startDateL, endDateL, employeeNote, ...newValues } = values;
  newValues.startDateL = toFakeLocalDate(startDateL).toISOString();
  newValues.endDateL = toFakeLocalDate(endDateL).toISOString();
  if (newValues.reason === EMPLOYEE_PERMIT_REASONS.OTHER) {
    newValues.otherReasonDescription = otherReasonDescription;
  }
  if (employeeNote) {
    newValues.employeeNote = employeeNote;
  }

  if (permitRequestGroupType === 'REGULAR_LEAVE') {
    let returnToWorkDateL = toFakeLocalDate(moment(endDateL).add(1, 'day')).toISOString();
    const isoWeekdayOfReturnToWorkDateL = moment(returnToWorkDateL).isoWeekday();
    if (isoWeekdayOfReturnToWorkDateL === 6 || isoWeekdayOfReturnToWorkDateL === 7) {
      returnToWorkDateL = toFakeLocalDate(moment(startDateL).clone().add(8 - returnToWorkDateL, 'days').startOf('day'));
    }
    newValues.returnToWorkDateL = returnToWorkDateL;
    if (employeeNote) {
      newValues.employeeNote = employeeNote;
    }

    return newValues;
  }

  return newValues;
};
