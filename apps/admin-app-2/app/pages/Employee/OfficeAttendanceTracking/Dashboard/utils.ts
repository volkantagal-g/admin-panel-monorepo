import moment from 'moment';
import { get as _get, uniq as _uniq } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { percentFormat } from '@shared/utils/localization';
import { SORT_OPTIONS } from '@shared/shared/constants';
import { CommonClientSideFilters, TableFiltersType } from './d';
import { IEmployeeDailyStatsWithEmployeeDetails } from '../global';

export const getEmployeeStatsCSVColumns = () => [
  { title: t('officeAttendanceTracking:CSV_HEADERS.DATE'), key: 'day' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.EMPLOYEE_EMAIL'), key: 'employeeEmail' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.EMPLOYEE_NAME'), key: 'name' },
  { title: t('officeAttendanceTracking:INVITATION_STATUS'), key: 'inviteStatus' },
  { title: t('officeAttendanceTracking:EMPLOYEE_DAILY_STAT_STATUS'), key: 'status' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.DEPARTMENT'), key: 'department' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.LINE_MANAGER'), key: 'lineManager' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.BUSINESS_UNIT'), key: 'businessUnit' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.OFFICE'), key: 'office' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.ARRIVAL'), key: 'arrival' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.EXIT'), key: 'exit' },
  { title: t('officeAttendanceTracking:CSV_HEADERS.DURATION'), key: 'duration' },
];

export const getFormattedEmployeeStats = ({ dailyStats }: { dailyStats: Array<IEmployeeDailyStatsWithEmployeeDetails> }): Array<{
  day: string;
  employeeEmail: string;
  name: string | undefined;
  inviteStatus: string;
  status: string;
  department: string | undefined;
  lineManager: string | undefined;
  businessUnit: string | undefined;
  office: string | undefined;
  arrival: string;
  exit: string;
  duration: string;
}> => dailyStats.map(stat => {
  const durationMoment: moment.Duration = moment.duration(stat?.durationInSec, 'seconds');

  return {
    day: moment.utc(stat?.day).format('DD/MM/YYYY'),
    employeeEmail: stat?.employeeEmail,
    name: stat?.employeeDetail?.fullName,
    inviteStatus: t(`officeAttendanceTracking:DAILY_STATS_INVITE_STATUSES.${stat?.inviteStatus}`),
    status: t(`officeAttendanceTracking:DAILY_STATS_STATUSES.${stat?.status}`),
    department: stat?.employeeDepartmentName,
    lineManager: stat?.employeeDetail?.lineManager?.fullName,
    businessUnit: stat?.employeeBusinessUnitName,
    office: stat?.employeeDetail?.mainWorkLocation?.name?.[getLangKey()],
    arrival: stat?.firstCheckInLocal && moment.utc(stat?.firstCheckInLocal).format('HH:mm'),
    exit: (
      stat?.lastCheckOutLocal && moment(stat.lastCheckOutLocal).valueOf() > moment(stat.lastCheckInLocal).valueOf() &&
      moment.utc(stat?.lastCheckOutLocal).format('HH:mm')
    ),
    duration: `${Math.floor(durationMoment.asHours())}:${durationMoment.minutes() < 10 ? 0 : ''}${durationMoment.minutes()}`,
  };
});

export const getDayDiff = (startDate: moment.Moment, endDate: moment.Moment) => moment.duration(moment(endDate).diff(startDate)).days();

export const getFormattedPhone = (phone: string = '') => {
  const index: number = phone.indexOf('(');
  const regex: RegExp = /\D/g;
  if (index !== -1) {
    return phone.substring(index).replace(regex, '');
  }

  return phone.replace(regex, '');
};

type GetAttendanceRatioTextFuncParams = {
  invited: number;
  onLeave: number;
  noShowExcuse: number;
  noShow: number;
};
export const getAttendanceRatioText = ({
  invited,
  onLeave,
  noShowExcuse,
  noShow,
}: GetAttendanceRatioTextFuncParams): string => {
  if (!invited) {
    return 'N/A';
  }

  const divisor = (invited || 0) - (onLeave || 0) - (noShowExcuse || 0);
  const dividend = ((invited || 0) - (onLeave || 0) - (noShowExcuse || 0) - (noShow || 0)) || 0;

  if (!divisor) {
    return 'N/A';
  }

  // undefined values are handled with early return
  const ratio: number = (
    dividend / divisor
  );
  const formatted: string = percentFormat({ maxDecimal: 0, minDecimal: 0 }).format(ratio);

  return formatted.includes('NaN') ? 'N/A' : formatted;
};

type GetCurrentRatioTextFuncParams = {
  employeesAtTheOfficeCount: number;
  invited: number;
  onLeave: number;
  noShowExcuse: number;
};
export const getCurrentRatioText = ({
  employeesAtTheOfficeCount,
  invited,
  onLeave,
  noShowExcuse,
}: GetCurrentRatioTextFuncParams): string => {
  if (!employeesAtTheOfficeCount || !invited) {
    return 'N/A';
  }

  const divisor = (invited || 0) - (onLeave || 0) - (noShowExcuse || 0);

  if (!divisor) {
    return 'N/A';
  }

  const ratio: number = (
    employeesAtTheOfficeCount / divisor
  );

  const formatted: string = percentFormat({ maxDecimal: 0, minDecimal: 0 }).format(ratio);

  return formatted.includes('NaN') ? 'N/A' : formatted;
};

type GetNoShowRatioTextFuncParams = {
  invited: number;
  onLeave: number;
  noShow: number;
  noShowExcuse: number;
};
export const getNoShowRatioText = ({
  invited,
  onLeave,
  noShow,
  noShowExcuse,
}: GetNoShowRatioTextFuncParams): string => {
  if (!noShow || !invited) {
    return 'N/A';
  }

  const divisor = (invited || 0) - (onLeave || 0) - (noShowExcuse || 0);

  if (!divisor) {
    return 'N/A';
  }

  const ratio: number = noShow / divisor;
  const formatted: string = percentFormat({ maxDecimal: 0, minDecimal: 0 }).format(ratio);

  return formatted.includes('NaN') ? 'N/A' : formatted;
};

type GetAverageDurationSpentAtTheOfficeTextFuncParams = {
  totalInvitedOfficeDurationAsSeconds: number;
  invited: number;
  onLeave: number;
  noShow: number;
  noShowExcuse: number;
};
export const getAverageDurationSpentAtTheOfficeText = ({
  invited,
  onLeave,
  noShowExcuse,
  noShow,
  totalInvitedOfficeDurationAsSeconds,
}: GetAverageDurationSpentAtTheOfficeTextFuncParams): string => {
  if (!totalInvitedOfficeDurationAsSeconds || !invited) {
    return '-';
  }
  // undefined values are handled with early return
  const divider = (invited || 0) - (onLeave || 0) - (noShowExcuse || 0) - (noShow || 0);
  const averageDurationAsSeconds: number = totalInvitedOfficeDurationAsSeconds / divider;
  const duration = moment.duration(averageDurationAsSeconds, 'seconds');

  return `${Math.floor(duration.asHours())}:${duration.minutes() < 10 ? 0 : ''}${duration.minutes()}`;
};

const dateFieldsSet = new Set(['firstCheckInUtc', 'firstCheckInLocal', 'lastCheckOutUtc', 'lastCheckOutLocal']);
const numberFieldsSet = new Set(['durationInSec', 'totalOfficeDurationAsSeconds', 'uniqueEmployeeVisitingDayCount', 'atOfficeDays']);
const applySortForDailyStatsMUTABLE = (
  {
    records,
    sortKey,
    sortDirection,
    isSingleDay,
  }: {
    records: Array<IEmployeeDailyStatsWithEmployeeDetails>;
    sortKey: keyof IEmployeeDailyStatsWithEmployeeDetails;
    sortDirection: number;
    isSingleDay: boolean;
  },
): Array<IEmployeeDailyStatsWithEmployeeDetails> => {
  const langKey = getLangKey();
  if (dateFieldsSet.has(sortKey) || numberFieldsSet.has(sortKey)) {
    return records.sort((a, b) => {
      let firstValue: any = _get(a, sortKey);
      let secondValue: any = _get(b, sortKey);

      if (sortKey === 'durationInSec') {
        if (a.isCheckedInIrregularOffice) {
          firstValue = 0;
        }
        if (!isSingleDay) {
          firstValue = ((firstValue || 0) / (a.atOfficeDays as number)) || undefined;
          secondValue = ((secondValue || 0) / (b.atOfficeDays as number)) || undefined;
        }
      }

      if (sortDirection === SORT_OPTIONS.DIRECTIONS.NUMBER.ASC) {
        // @ts-ignore
        return (firstValue === undefined) - (secondValue === undefined) ||
          -(firstValue < secondValue) ||
          +(firstValue > secondValue);
      }
      // @ts-ignore
      return (firstValue === undefined) - (secondValue === undefined) ||
        -(secondValue < firstValue) ||
        +(secondValue > firstValue);
    });
  }

  return records.sort((a, b) => {
    const firstValue: string = _get(a, sortKey);
    const secondValue: string = _get(b, sortKey);
    if (sortDirection === SORT_OPTIONS.DIRECTIONS.NUMBER.ASC) {
      return firstValue?.localeCompare(secondValue, langKey);
    }

    return secondValue?.localeCompare(firstValue, langKey);
  });
};

const applyPaginationForDailyStats = (
  {
    records,
    paginationOptions,
  }: {
    records: Array<IEmployeeDailyStatsWithEmployeeDetails>;
    paginationOptions: AntDCustomPaginationObjectType;
  },
): Array<IEmployeeDailyStatsWithEmployeeDetails> => (
  records.slice(
    (paginationOptions.currentPage - 1) * paginationOptions.rowsPerPage,
    paginationOptions.currentPage * paginationOptions.rowsPerPage,
  )
);

const applyFiltersForSingleDayDailyStats = (
  {
    records,
    commonClientSideFilters,
    tableFilters,
    isSingleDay,
  }: {
    records: Array<IEmployeeDailyStatsWithEmployeeDetails>;
    commonClientSideFilters: CommonClientSideFilters,
    tableFilters: TableFiltersType;
    isSingleDay: boolean;
  },
): Array<IEmployeeDailyStatsWithEmployeeDetails> => {
  return records?.filter(record => {
    const {
      employeeId,
      status,
      inviteStatus,
      employeeDetail,
      employeeBusinessUnitId,
      employeeDepartmentId,
      employeeLeaveDetails,
    } = record;

    if (tableFilters.employee && tableFilters.employee !== employeeId) {
      return false;
    }

    if (tableFilters.lineManager && tableFilters.lineManager !== employeeDetail?.lineManager?._id) {
      return false;
    }

    if (commonClientSideFilters?.businessUnit && commonClientSideFilters.businessUnit !== employeeBusinessUnitId) {
      return false;
    }

    const departmentId = commonClientSideFilters?.department?.[0];
    if (commonClientSideFilters?.department && departmentId !== employeeDepartmentId) {
      return false;
    }

    if (isSingleDay) {
      if (tableFilters.status && tableFilters.status !== status) {
        return false;
      }

      if (tableFilters.inviteStatus && tableFilters.inviteStatus !== inviteStatus) {
        return false;
      }

      if (tableFilters.leaveType && tableFilters.leaveType !== employeeLeaveDetails?.type) {
        return false;
      }
    }

    return true;
  });
};

type FilterSingleDayDailyStatsFuncParams = {
  records: Array<IEmployeeDailyStatsWithEmployeeDetails>;
  sortOptions: { sortKey: keyof IEmployeeDailyStatsWithEmployeeDetails, sortDirection: number };
  commonClientSideFilters: CommonClientSideFilters,
  tableFilters: TableFiltersType;
  paginationOptions: AntDCustomPaginationObjectType;
  isSingleDay: boolean;
};

type FilterSingleDayDailyStatsFuncResponse = {
  records: Array<IEmployeeDailyStatsWithEmployeeDetails>;
  totalCount: number;
};

export const filterSingleDayDailyStats = (
  {
    records,
    commonClientSideFilters,
    tableFilters,
    sortOptions,
    paginationOptions,
    isSingleDay,
  }: FilterSingleDayDailyStatsFuncParams,
): FilterSingleDayDailyStatsFuncResponse => {
  let finalRecords: Array<IEmployeeDailyStatsWithEmployeeDetails> = applyFiltersForSingleDayDailyStats({
    records,
    commonClientSideFilters,
    tableFilters,
    isSingleDay,
  });

  if (isSingleDay) {
    finalRecords = finalRecords.map(record => ({
      ...record,
      lastCheckOutLocal: record.isAtTheOffice ? undefined : record.lastCheckOutLocal,
      lastCheckOutUtc: record.isAtTheOffice ? undefined : record.lastCheckOutUtc,
    }));
  }

  if (sortOptions?.sortKey && sortOptions?.sortDirection) {
    finalRecords = applySortForDailyStatsMUTABLE({
      records: finalRecords,
      sortKey: sortOptions.sortKey,
      sortDirection: sortOptions.sortDirection,
      isSingleDay,
    });
  }

  const totalCount: number = finalRecords.length;
  const dataRequested: Array<IEmployeeDailyStatsWithEmployeeDetails> = paginationOptions ? applyPaginationForDailyStats({
    records: finalRecords,
    paginationOptions,
  }) : finalRecords;

  return { records: dataRequested, totalCount };
};

export const extractBusinessUnitToDepartmentMappings = (records: any[]) => {
  const businessUnitToDepartmentMap: {[key: string]: Set<string> | string[]} = {};
  const businessIdToBusinessNameMap: {[key: string]: string} = {};
  const departmentIdToDepartmentNameMap: {[key: string]: string} = {};

  records.forEach(record => {
    const { employeeDetail } = record;
    const { businessUnitId, businessUnitName, departmentId, departmentName } = employeeDetail;

    const businessUnitExist = !!businessUnitId && !!businessUnitName;
    const departmentExist = !!departmentId && !!departmentName;

    if (businessUnitExist && !(businessUnitId in businessIdToBusinessNameMap)) {
      businessIdToBusinessNameMap[businessUnitId] = businessUnitName;
    }
    if (departmentExist && !(departmentId in departmentIdToDepartmentNameMap)) {
      departmentIdToDepartmentNameMap[departmentId] = departmentName;
    }

    if (businessUnitExist && departmentExist) {
      if (businessUnitId in businessUnitToDepartmentMap) {
        (businessUnitToDepartmentMap[businessUnitId] as Set<string>).add(departmentId);
      }
      else {
        businessUnitToDepartmentMap[businessUnitId] = new Set([departmentId]);
      }
    }
  });

  Object.keys(businessUnitToDepartmentMap).forEach(businessUnitId => {
    businessUnitToDepartmentMap[businessUnitId] = [...businessUnitToDepartmentMap[businessUnitId]] as string[];
  });

  return {
    businessUnitToDepartmentMap,
    businessIdToBusinessNameMap,
    departmentIdToDepartmentNameMap,
  };
};

export const getDepartmentOptionsBasedOnBusinessUnitSelection = (
  {
    businessUnitToDepartmentMap,
    departmentIdToDepartmentNameMap,
    businessUnitId,
  }: {
    businessUnitToDepartmentMap: {[key: string]: string[]},
    departmentIdToDepartmentNameMap: {[key: string]: string},
    businessUnitId: string,
  },
) => {
  let relatedDepartments: string[] = [];

  if (businessUnitId) {
    relatedDepartments = businessUnitToDepartmentMap[businessUnitId] as string[];
  }
  else {
    const allDepartments: string[] = [];

    Object.keys(businessUnitToDepartmentMap).forEach((buId: string) => {
      const departmentIds = businessUnitToDepartmentMap[buId];

      allDepartments.push(...departmentIds);
    });

    relatedDepartments = _uniq(allDepartments);
  }

  return relatedDepartments ? relatedDepartments.map((relatedDepartmentId: string) => {
    const departmentName = departmentIdToDepartmentNameMap[relatedDepartmentId];

    return {
      value: relatedDepartmentId,
      label: departmentName,
    };
  }) : [];
};

export const getOnSiteTooltipTexts = ({ officeFilterExists, atInvitedOffice, atAnotherOffice, invitedAnotherOffice, onSiteButNotInvited, total }: {
  officeFilterExists: boolean,
  atInvitedOffice?: number,
  atAnotherOffice?: number,
  invitedAnotherOffice?: number,
  onSiteButNotInvited?: number
  total?: number,
}) => {
  return officeFilterExists ?
    {
      atAnotherOfficeText: (
        atAnotherOffice
          ? t('officeAttendanceTracking:TOOLTIP.INVITED_SELECTED_OFFICE_BUT_AT_ANOTHER_OFFICE', { count: atAnotherOffice })
          : undefined
      ),
      invitedAnotherOfficeText: (
        invitedAnotherOffice
          ? t('officeAttendanceTracking:TOOLTIP.INVITED_ANOTHER_OFFICE_BUT_AT_SELECTED_OFFICE', { count: invitedAnotherOffice })
          : undefined
      ),
      onSiteButNotInvitedText: (
        onSiteButNotInvited
          ? t('officeAttendanceTracking:TOOLTIP.NOT_INVITED_BUT_AT_SELECTED_OFFICE', { count: onSiteButNotInvited })
          : undefined
      ),
      total: (
        total ? t('officeAttendanceTracking:TOOLTIP.TOTAL_NUMBER_OF_ON_SITE', { count: total }) : undefined
      ),
    }
    :
    {
      atInvitedOfficeText: (
        atInvitedOffice
          ? t('officeAttendanceTracking:TOOLTIP.IN_OFFICE_WHERE_THEY_ARE_INVITED', { count: atInvitedOffice })
          : undefined
      ),
      atAnotherOfficeText: (
        atAnotherOffice ?
          t('officeAttendanceTracking:TOOLTIP.IN_OFFICE_WHERE_THEY_ARE_NOT_INVITED', { count: atAnotherOffice })
          : undefined
      ),
      onSiteButNotInvitedText: (
        onSiteButNotInvited
          ? t('officeAttendanceTracking:TOOLTIP.ON_SITE_BUT_NOT_INVITED', { count: onSiteButNotInvited })
          : undefined
      ),
      total: (
        total ? t('officeAttendanceTracking:TOOLTIP.TOTAL_NUMBER_OF_ON_SITE', { count: total }) : undefined
      ),
    };
};
