import moment from 'moment';

import { t } from '@shared/i18n';
import { getFormattedUTCDate, getFormattedUTCDateTime } from '@shared/utils/dateHelper';
import { EMPLOYMENT_ELIGIBILITY_DAYS, EMPLOYEE_PERMIT_TYPES } from './constants';
import { getScreenHeight } from '@shared/utils/common';

export const getFormattedDateByPermitType = (date, permitType) => (permitType === EMPLOYEE_PERMIT_TYPES.HOURLY_PTO
  ? getFormattedUTCDateTime(date) : getFormattedUTCDate(date));

export const getTableHeight = ({ defaultView, moreSpace, externalMonitor }) => {
  const screenHeight = getScreenHeight();

  // macbook more space
  if (screenHeight > 900 && screenHeight < 1000) {
    return moreSpace;
  }
  // external monitor
  if (screenHeight > 1000) {
    return externalMonitor;
  }
  // macbook default
  return defaultView;
};

export const generateFieldPathSelectOptions = (constants, { translationBaseKey, isConvertToInt = true }) => {
  return Object.entries(constants).map(([groupKey, groupValue]) => {
    return {
      label: t(`employeeLogsPage:${groupKey}`),
      options: Object.entries(groupValue).map(([key, value]) => {
        const manipulatedValue = value?.includes('_') ? value.replace('_', '.') : value;
        return {
          value: isConvertToInt ? parseInt(value, 10) : `${groupKey}-${manipulatedValue}`,
          label: t(`${translationBaseKey}.${groupKey}.${value}`) || `${key}-${value}`,
        };
      }),
    };
  });
};

export const convertConstantValuesToTranslatedSelectOptions = (constants, { translationBaseKey, isConvertToInt = true }) => {
  return Object.entries(constants).map(([key, value]) => {
    return {
      value: isConvertToInt ? parseInt(value, 10) : value,
      label: t(`${translationBaseKey}.${value}`) || `${key}-${value}`,
    };
  });
};

export const isEligibleForEmployment = ({ birthdate, workStartDate, setShowWarning }) => {
  const diff = moment(workStartDate)?.diff(moment(birthdate), 'days') || 0;
  if (diff < EMPLOYMENT_ELIGIBILITY_DAYS) {
    setShowWarning(true);
  }
  else {
    setShowWarning(false);
  }
};
