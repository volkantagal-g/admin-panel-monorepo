import moment from 'moment';
import { isEmpty, sortBy } from 'lodash';

import {
  ATTENDANCE_ENABLED_OFFICE_IDS,
  ATTENDANCE_LEGEND,
  ATTENDANCE_STATUS,
  EXPORT_IMPORT_DATE_FORMAT,
  FIXED_HEADER_TITLES,
} from './constants';
import { isEmailValid } from '@shared/utils/common';
import { InvalidEmails } from '@app/pages/Employee/OfficeAttendanceTracking/global.d';

export function generateExcelColumns({ startDay, endDay }: { startDay: Date, endDay: Date }) {
  const dateColumns: { title: string }[] = [];

  for (let i = moment(startDay); i.isSameOrBefore(endDay); i.add(1, 'day')) {
    dateColumns.push({ title: i.format(EXPORT_IMPORT_DATE_FORMAT) });
  }

  return [
    { title: FIXED_HEADER_TITLES.EMAIL, key: 'workEmail' },
    { title: FIXED_HEADER_TITLES.EMPLOYEE_NAME, key: 'fullName' },
    { title: FIXED_HEADER_TITLES.BUSINESS_UNIT, key: 'businessUnit' },
    { title: FIXED_HEADER_TITLES.DEPARTMENT, key: 'department' },
    ...dateColumns,
  ];
}

export function getFormattedCapacityTemplateData({ filters, employees }) {
  const { startDay, endDay } = filters;

  const formattedData = employees.map(employee => ({
    workEmail: employee?.workEmail,
    fullName: employee?.fullName,
    businessUnit: employee?.businessUnitName,
    department: employee?.departmentName,
  }));

  return {
    formattedData,
    columns: generateExcelColumns({ startDay, endDay }),
  };
}

export function getDateColumnsFromImportData(sampleObj: { [key: string]: string | number }) {
  const keys = Object.keys(sampleObj);
  return keys.filter((key: string) => moment.utc(key).isValid());
}

export function getFormattedImportData({ data }) {
  if (isEmpty(data)) return [];

  const dates = getDateColumnsFromImportData(data[0]);

  const formattedImportData = data.map((row, index) => {
    let orderStatus = 1;

    dates.forEach(date => {
      if (!row[date]) orderStatus = 0;

      orderStatus = 1;
    });

    if (!row[FIXED_HEADER_TITLES.EMAIL]?.trim?.()) orderStatus = 0;

    return {
      ...row,
      key: index,
      orderStatus,
    };
  });

  return sortBy(formattedImportData, ['orderStatus']);
}

export function isImportedCapacityDataValid({ data }) {
  const dates = getDateColumnsFromImportData(data[0]);

  const isValidRow = (row: any) => {
    if (!row[FIXED_HEADER_TITLES.EMAIL]?.trim?.()) return false;

    return dates.every(date => (
      row[date] && moment(date, EXPORT_IMPORT_DATE_FORMAT, true).isValid()
    ));
  };

  const isValidData = data.every(isValidRow);

  return isValidData;
}

export function isImportedCapacityDateColumnsValid({ data }) {
  const dates = getDateColumnsFromImportData(data[0]);

  const isValidDateRow = (row: any) => {
    return dates.every(date => (
      row[date] && moment(date, EXPORT_IMPORT_DATE_FORMAT, true).isValid()
    ));
  };

  return data.every(isValidDateRow);
}

export function getPublicHolidaysInImportedCapacityDates({ dates, publicHolidays }) {
  const datesAsMomentObjects = dates.map((d: string) => moment.utc(d));
  const publicHolidaysWithMomentObjAsDate = publicHolidays.map(pHoliday => ({ ...pHoliday, date: moment.utc(pHoliday.date) }));

  const intersectedPublicholidays: any[] = [];

  datesAsMomentObjects.forEach((scheduledDate: moment.Moment) => {
    publicHolidaysWithMomentObjAsDate.forEach((pHoliday:any) => {
      const isRecurringHoliday = pHoliday.repeatsExactlySameDayInEveryYear;

      const isRecurringHolidayMatch = isRecurringHoliday &&
        pHoliday.date.month() === scheduledDate.month() &&
        pHoliday.date.date() === scheduledDate.date();

      const isNonRecurringHolidayMatch = pHoliday.date.isSame(scheduledDate);

      if (isRecurringHolidayMatch || isNonRecurringHolidayMatch) {
        intersectedPublicholidays.push(scheduledDate);
      }
    });
  });

  return intersectedPublicholidays;
}

export function manipulateCapacityDataBeforeSubmit({ data, exclusionFilters }) {
  const reqData: {
    schedules: any[],
    excludePublicHolidays: boolean,
    excludeWeekends: boolean,
    excludePastData: boolean,
  } = {
    schedules: [],
    ...(exclusionFilters),
  };
  const invalidEmails: InvalidEmails[] = [];
  const dates = getDateColumnsFromImportData(data[0]);

  dates.forEach((date: string) => {
    data.forEach((row: any) => {
      let status: string | undefined;
      const value: number = parseInt(row[date], 10);

      if (value === 1) {
        status = ATTENDANCE_STATUS.REMOTE_WORKING;
      }

      if (value === 2) {
        status = ATTENDANCE_STATUS.FIELD;
      }

      if (value >= 3 && value <= 6) {
        status = ATTENDANCE_STATUS.INVITED;
      }

      if (!isEmailValid(row[FIXED_HEADER_TITLES.EMAIL]?.trim?.())) {
        // to show which row has invalid email, we are adding rowId
        invalidEmails.push({ email: row[FIXED_HEADER_TITLES.EMAIL], rowId: (row.key + 1) });
      }
      else {
        reqData.schedules.push({
          employeeId: row['#'],
          employeeEmail: row[FIXED_HEADER_TITLES.EMAIL]?.trim?.(),
          day: moment.utc(date, EXPORT_IMPORT_DATE_FORMAT),
          status,
          officeId: status === ATTENDANCE_STATUS.INVITED ? ATTENDANCE_ENABLED_OFFICE_IDS[ATTENDANCE_LEGEND[value]] : undefined,
        });
      }
    });
  });

  return { reqData, invalidEmails };
}

export function isWeekend(date: string): boolean {
  // Parse the input date using Moment.js
  const parsedDate = moment.utc(date);

  // Check if the day of the week is Saturday (6) or Sunday (0)
  return parsedDate.day() === 0 || parsedDate.day() === 6;
}
