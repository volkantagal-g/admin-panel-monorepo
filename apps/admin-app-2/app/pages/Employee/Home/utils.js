import moment from 'moment';
import { set as _set, get as _get, cloneDeep as _cloneDeep, find as _find, isEmpty as _isEmpty } from 'lodash';

import { Tooltip } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';
import {
  EMPLOYEE_PAYROLL_COUNTRY_PERMITS,
  EMPLOYEE_PERMIT_REASONS,
  EMPLOYEE_PERMIT_STATUSES,
  EMPLOYEE_PERMIT_TYPES,
  HOLIDAYS_WITH_NAMES,
  PERMIT_DATES,
  NON_MATCHED_PAYROLL_COUNTRY_PERMITS,
} from '../constants';
import { DATE_FORMAT } from './constants';
import { getUser } from '@shared/redux/selectors/auth';
import { toFakeLocalDate } from '@shared/utils/dateHelper';

export const getEmployeePayrollCountryCode = () => {
  const user = getUser();

  return user?.employee?.payrollCountryCode;
};

export const getEmployeeWorkingLocation = () => {
  const user = getUser();

  return user?.employee?.employmentLocation;
};

export const getConvertedSpecialHolidaysForCalendar = () => {
  const convertedHolidays = {};

  Object.entries(HOLIDAYS_WITH_NAMES).forEach(([key, value]) => {
    if (Array.isArray(value.constantHolidays)) {
      value.constantHolidays.forEach(({ month, day, isHalfDay, translationKey }) => {
        for (let y = PERMIT_DATES.SPECIAL_HOLIDAYS.START; y <= PERMIT_DATES.SPECIAL_HOLIDAYS.END; y++) {
          const date = (
            moment()
              .year(y)
              .month(month - 1) // 0 is January 11 is December
              .date(day)
              .format(DATE_FORMAT)
          );

          if (!_get(convertedHolidays, [key, date])) {
            _set(convertedHolidays, [key, date], []);
          }

          convertedHolidays[key][date].push({
            date,
            translationKey,
            isHalfDay: !!isHalfDay,
            isSpecialHoliday: true,
            key: date,
          });
        }
      });
    }
    if (Array.isArray(value.specialHolidays)) {
      value.specialHolidays.forEach(({ start, end, isHalfDay, translationKey, isLocal, cities }) => {
        const endDate = end ?? start;
        for (let date = moment(start); date.diff(endDate, 'days') <= 0; date.add(1, 'days')) {
          const dateString = date.format(DATE_FORMAT);

          if (!_get(convertedHolidays, [key, dateString])) {
            _set(convertedHolidays, [key, dateString], []);
          }

          convertedHolidays[key][dateString].push({
            date: dateString,
            translationKey,
            isHalfDay: !!isHalfDay,
            isSpecialHoliday: true,
            key: date.valueOf(),
            isLocal,
            cities,
          });
        }
      });
    }
  });

  return convertedHolidays;
};

export const getConvertedPermitsForCalendar = ({ permits = [], existingPermits }) => {
  const allPermits = { ...existingPermits };

  permits?.forEach(permit => {
    const { startDateL, endDateL } = permit;

    for (let date = moment(startDateL.split('T')[0]); date.diff(endDateL.split('T')[0], 'days') <= 0; date.add(1, 'days')) {
      const dateString = date.format(DATE_FORMAT);

      if (!allPermits[dateString]) {
        _set(allPermits, [dateString], []);
      }

      allPermits[dateString].push({
        _id: permit._id,
        date: dateString,
        title: permit.employee?.fullName,
        isHalfDay: false,
        isSpecialHoliday: false,
        key: `${permit.employee?._id}-${permit._id}-${dateString}`,
      });
    }
  });

  return allPermits;
};

export const getHolidaysAndPermitsMapByDate = (permits, selectedPayrollCountryCode) => {
  const specialHolidays = getConvertedSpecialHolidaysForCalendar();
  let payrollCountryCode = selectedPayrollCountryCode;
  if (!payrollCountryCode) {
    payrollCountryCode = getEmployeePayrollCountryCode();
  }

  let existingPermits = {};
  if (payrollCountryCode) {
    existingPermits = _cloneDeep(specialHolidays[payrollCountryCode?.toUpperCase()]);
  }
  const formattedPermits = getConvertedPermitsForCalendar({ permits, existingPermits });
  return formattedPermits;
};

export const validatePermitPayrollCountry = () => {
  const user = getUser();
  const payrollCountryCode = user?.employee?.payrollCountryCode?.toUpperCase();

  const permits = EMPLOYEE_PAYROLL_COUNTRY_PERMITS[payrollCountryCode] || NON_MATCHED_PAYROLL_COUNTRY_PERMITS; // temporary fix
  const isValid = Object.keys(EMPLOYEE_PAYROLL_COUNTRY_PERMITS).includes(payrollCountryCode) && !_isEmpty(permits.types);

  return {
    isValid,
    permits,
  };
};

export const getMaxAllowedDays = (permitType, reason, totalWorkDay) => {
  const { isValid, permits } = validatePermitPayrollCountry();
  if (totalWorkDay > 0 && isValid) {
    if (reason && reason !== EMPLOYEE_PERMIT_REASONS.OTHER) {
      const { maxAllowedDays = totalWorkDay } = permits.otherLeaveTypeReasons[reason] || {};
      return maxAllowedDays;
    }
    if (permitType && permitType !== EMPLOYEE_PERMIT_TYPES.OTHER) {
      const { maxAllowedDays = totalWorkDay } = permits.types[permitType];
      return maxAllowedDays;
    }
  }

  return totalWorkDay;
};

export const getMaxAllowedHours = permitType => {
  const { isValid, permits } = validatePermitPayrollCountry();
  if (isValid && permitType && permitType === EMPLOYEE_PERMIT_TYPES.HOURLY_PTO) {
    const { maxAllowedHours = 0 } = permits.types[permitType];
    return maxAllowedHours;
  }
  return 0;
};

export const isUploadDocumentMandatory = (permitType, reason, requestedPermitDay) => {
  const { isValid, permits } = validatePermitPayrollCountry();
  if (requestedPermitDay > 0 && isValid) {
    if (reason && reason !== EMPLOYEE_PERMIT_REASONS.OTHER) {
      const { isDocumentRequired, minDaysRequireDocument = 1 } = permits.otherLeaveTypeReasons[reason] || {};
      return isDocumentRequired && requestedPermitDay >= minDaysRequireDocument;
    }
    if (permitType && permitType !== EMPLOYEE_PERMIT_TYPES.OTHER
          && permitType !== EMPLOYEE_PERMIT_TYPES.ANNUAL_PERMIT) {
      const { isDocumentRequired, minDaysRequireDocument = 1 } = permits.types[permitType];
      return isDocumentRequired && requestedPermitDay >= minDaysRequireDocument;
    }
  }

  return false;
};

export const convertConstantKeysToTranslatedSelectOptions = (constants, translationBaseKey) => {
  return Object.keys(constants).map(value => {
    return {
      value: parseInt(value, 10),
      label: t(`${translationBaseKey}.${value}`) || value,
    };
  });
};

export const convertPermitTypeConstantsToSelectOptions = ({ permitRequestGroup }) => {
  const { isValid, permits } = validatePermitPayrollCountry();
  if (isValid && permits.otherLeaveTypeReasons) {
    let permitTypes = permits.types;
    if (permitRequestGroup) {
      // default permitRequestGroup is OFF_SITE_WORK
      let filteredPermitTypeKeys = Object.keys(permitTypes)
        .filter(permitTypeKey => permitTypeKey.toString() === EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE.toString());
      if (permitRequestGroup === 'REGULAR_LEAVE') {
        filteredPermitTypeKeys = Object.keys(permitTypes)
          .filter(permitTypeKey => permitTypeKey.toString() !== EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE.toString());
      }
      const newPermitTypes = {};
      filteredPermitTypeKeys.forEach(permitKey => {
        newPermitTypes[permitKey] = permitTypes[permitKey];
      });
      permitTypes = newPermitTypes;
    }
    return convertConstantKeysToTranslatedSelectOptions(permitTypes, 'employeePage:PERMIT_TYPES');
  }

  return [];
};

export const convertPermitReasonsConstantsToSelectOptions = ({ permitType }) => {
  const { isValid, permits } = validatePermitPayrollCountry();
  if (isValid && permits.types) {
    if (permitType === EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE) {
      return convertConstantKeysToTranslatedSelectOptions(permits.noShowExcuseReasons, 'employeePage:PERMIT_REASONS');
    }
    return convertConstantKeysToTranslatedSelectOptions(permits.otherLeaveTypeReasons, 'employeePage:PERMIT_REASONS');
  }

  return [];
};

export const getPermitTypeTableFilters = () => {
  const types = Object.values(EMPLOYEE_PERMIT_TYPES);
  return types.map(type => ({ text: t(`employeePage:PERMIT_TYPES.${type}`), value: type }));
};

export const getPermitStatusTableFilters = () => {
  const types = Object.values(EMPLOYEE_PERMIT_STATUSES);
  return types.map(type => ({ text: t(`employeePage:PERMIT_STATUSES.${type}`), value: type }));
};

export const getHourlyLeavesTitleWithTooltip = () => (
  <span className="d-flex justify-content-between align-items-baseline">
    <span className="mr-2">{t('employeePage:REQUESTED_HOURS')}</span>
    <Tooltip placement="topLeft" title={t('employeePage:REQUESTED_HOURS_TOOLTIP')} className="mt-1">
      <QuestionCircleOutlined />
    </Tooltip>
  </span>
);

const getIsGivenDateSpecialHoliday = ({ holidays, date }) => {
  const res = {};
  holidays?.forEach(holiday => {
    if (holiday.isHalfDay === true && moment(date).isSame(moment(holiday.start), 'day')) {
      res.isHalfDayHoliday = true;
      res.isLocal = holiday.isLocal;
      res.cities = (holiday.cities ?? []).map(city => city.toLowerCase());
    }
    if (!holiday.isHalfDay && moment(date).isBetween(holiday.start, holiday.end, 'day', '[]')) {
      res.isHoliday = true;
      res.isLocal = holiday.isLocal;
      res.cities = (holiday.cities ?? []).map(city => city.toLowerCase());
    }
  });
  return res;
};

export const getCalculatedDatesOfPermitBySelectedDateRange = ({ startDate, endDate }) => {
  const tempStartDate = toFakeLocalDate(startDate.clone()).utcOffset(0);
  const tempEndDate = toFakeLocalDate(endDate.clone()).utcOffset(0);

  const totalDay = moment(tempEndDate.format('YYYY-MM-DD')).diff(moment(tempStartDate.format('YYYY-MM-DD')), 'days') + 1;
  let totalWorkDay = totalDay;
  const payrollCountryCode = getEmployeePayrollCountryCode();
  const employeeWorkingLocation = getEmployeeWorkingLocation();

  let holidays = {};
  if (payrollCountryCode) {
    holidays = HOLIDAYS_WITH_NAMES[payrollCountryCode?.toUpperCase()] || {};
  }

  for (let date = moment(tempStartDate.format('YYYY-MM-DD')); date.diff(moment(tempEndDate.format('YYYY-MM-DD')), 'days') <= 0; date.add(1, 'days')) {
    const constantHoliday = _find(holidays?.constantHolidays, {
      month: date.month() + 1,
      day: date.date(),
    });

    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
      totalWorkDay -= 1;
    }
    else if (constantHoliday) {
      if (constantHoliday.isHalfDay) {
        totalWorkDay -= 0.5;
      }
      totalWorkDay -= 1;
    }
    else {
      const { isHoliday, isHalfDayHoliday, isLocal, cities } = getIsGivenDateSpecialHoliday({ holidays: holidays?.specialHolidays, date });
      if (isHalfDayHoliday && !isLocal) {
        totalWorkDay -= 0.5;
      }
      else if (isHalfDayHoliday && isLocal && cities.includes(employeeWorkingLocation.toLowerCase())) {
        totalWorkDay -= 0.5;
      }

      if (isHoliday && !isLocal) {
        totalWorkDay -= 1;
      }
      else if (isHoliday && isLocal && cities.includes(employeeWorkingLocation.toLowerCase())) {
        totalWorkDay -= 1;
      }
    }
  }

  return {
    totalDay,
    totalWorkDay,
  };
};
