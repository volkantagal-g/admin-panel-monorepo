import { Tag, Tooltip } from 'antd';
import moment from 'moment';

import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { ROUTE } from '@app/routes';
import { isScreenSizeLarge } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';
import { IEmployeeDailyStatsRecord } from '../../../global';
import { getLangKey } from '@shared/i18n.ts';
import {
  DAILY_STATS_INVITE_STATUSES,
  DAILY_STATS_STATUSES,
} from '../../../constants';
import { getFormattedPhone } from '../../utils';
import RemoteReasonType from '../RemoteReasonTooltip';

const STATUS_TO_COLOR_MAP: { [x: string]: any } = {
  [DAILY_STATS_STATUSES.ON_SITE]: '#5d3ebc',
  [DAILY_STATS_STATUSES.ON_LEAVE]: 'gold',
  [DAILY_STATS_STATUSES.REMOTE]: 'green',
  [DAILY_STATS_STATUSES.NO_SHOW]: 'red',
  [DAILY_STATS_STATUSES.NOT_PLANNED]: '#9f9f9f',
};

export const getTableColumns = (
  { t, isSingleDay, classes, isLargeScreen, pagination, totalCount }:
    {
      t: Function;
      classes: { [x: string]: any };
      isLargeScreen: boolean;
      isSingleDay: boolean;
      pagination: { currentPage: number; rowsPerPage: number };
      totalCount: number;
    },
) => {
  const statusColumn = {
    title: t('officeAttendanceTracking:EMPLOYEE_DAILY_STAT_STATUS'),
    dataIndex: 'status',
    width: isLargeScreen ? 85 : 120,
    sorter: true,
    render: (status: string, _row: any) => (
      <>
        <Tag color={STATUS_TO_COLOR_MAP[status]} className={classes.tableTag}>
          {t(`officeAttendanceTracking:DAILY_STATS_STATUSES.${status}`)}
        </Tag>
        <RemoteReasonType
          isOnLeave={_row.isOnLeave}
          hasNoShowExcuse={_row.hasNoShowExcuse}
          employeeLeaveDetails={_row.employeeLeaveDetails}
          employeeNoShowExcuseDetails={_row.employeeNoShowExcuseDetails}
        />
      </>
    ),
  };
  const indexColumn = {
    title: `# ${totalCount}`,
    key: 'index',
    width: 50,
    render: (_val: undefined, _row: object, index: number) => {
      const { currentPage, rowsPerPage } = pagination;
      const firstIndex = (currentPage - 1) * rowsPerPage;
      return firstIndex + index + 1;
    },
  };
  const nameColumn = {
    title: t('employeePage:EMPLOYEE'),
    dataIndex: ['employeeDetail', 'fullName'],
    width: 150,
    sorter: true,
  };
  const departmentColumn = {
    title: t('employeePage:DEPARTMENT'),
    dataIndex: 'employeeDepartmentName',
    width: 130,
    sorter: true,
  };
  const supervisorColumn = {
    title: t('employeePage:SUPERVISOR'),
    dataIndex: ['employeeDetail', 'lineManager', 'fullName'],
    width: 135,
    sorter: true,
  };
  const locationColumn = {
    title: t('officeAttendanceTracking:MAIL_LOCATION'),
    dataIndex: ['employeeDetail', 'mainWorkLocation', 'name', getLangKey()],
    width: 109,
    sorter: true,
  };
  const attendedOfficeColumn = {
    title: (
      <Tooltip title={t('officeAttendanceTracking:TOOLTIP.LAST_ATTENDED_OFFICE')}>
        {t('officeAttendanceTracking:LAST_ATTENDED_OFFICE_SHORT')}
      </Tooltip>
    ),
    width: 115,
    sorter: true,
    dataIndex: 'checkInOfficeName',
    showSorterTooltip: false,
  };
  const inviteStatusColumn = {
    title: t('officeAttendanceTracking:INVITED'),
    dataIndex: 'inviteStatus',
    width: 65,
    render: (inviteStatus: string) => {
      if (!inviteStatus) {
        return '';
      }
      if (inviteStatus === DAILY_STATS_INVITE_STATUSES.INVITED) return t('YES');
      if (inviteStatus === DAILY_STATS_INVITE_STATUSES.NOT_INVITED) return t('NO');
      return t(`officeAttendanceTracking:DAILY_STATS_INVITE_STATUSES.${inviteStatus}`);
    },
    sorter: true,
  };
  const officeArrivalTimeColumn = {
    title: t('officeAttendanceTracking:OFFICE_ARRIVAL_TIME'),
    align: 'right',
    dataIndex: 'firstCheckInLocal',
    width: 65,
    sorter: true,
    defaultSortOrder: 'ascend',
    render: (firstCheckInLocal: string, record: IEmployeeDailyStatsRecord) => {
      if (!firstCheckInLocal || record.isCheckedInIrregularOffice) {
        return '-';
      }

      return firstCheckInLocal ? moment.utc(firstCheckInLocal).format('HH:mm') : '-';
    },
  };
  const officeExitTimeColumn = {
    title: t('officeAttendanceTracking:OFFICE_EXIT_TIME'),
    align: 'right',
    dataIndex: 'lastCheckOutLocal',
    width: 50,
    sorter: true,
    render: (lastCheckOutLocal: string, record: IEmployeeDailyStatsRecord) => {
      if (!lastCheckOutLocal || record.isAtTheOffice || record.isCheckedInIrregularOffice) {
        return '';
      }
      return moment.utc(lastCheckOutLocal).format('HH:mm');
    },
  };
  const durationColumn = {
    title: t('global:DURATION'),
    align: 'right',
    dataIndex: 'durationInSec',
    width: 75,
    sorter: true,
    render: (durationInSec: number, record: IEmployeeDailyStatsRecord): string => {
      if (record.isCheckedInIrregularOffice) {
        return '-';
      }
      if (!durationInSec) {
        return '0:00';
      }
      const durationMoment = moment.duration(durationInSec, 'seconds');
      return `${Math.floor(durationMoment.asHours())}:${durationMoment.minutes() < 10 ? 0 : ''}${durationMoment.minutes()}`;
    },
  };
  const phoneColumn = {
    title: t('global:GSM'),
    align: 'right',
    dataIndex: ['employeeDetail', 'personalGSM'],
    width: 90,
    render: (personalGSM: {dialCode:string, number: string}) => <a href={`tel:${personalGSM?.number}`}>{personalGSM?.number}</a>,
  };
  const actionColumn = {
    title: '#',
    dataIndex: 'employeeId',
    align: 'right',
    width: isScreenSizeLarge() ? 30 : 50,
    render: (employeeId: string) => (
      <RedirectButtonV2
        to={ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS.path.replace(':employeeId', employeeId)}
        text={t('global:DETAIL')}
        size={isLargeScreen ? 'large' : 'middle'}
        target="_blank"
        permKey={permKey.PAGE_EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS}
      />
    ),
  };

  if (isSingleDay) {
    const singleDayColumns = [
      indexColumn,
      statusColumn,
      nameColumn,
      departmentColumn,
      supervisorColumn,
      locationColumn,
      attendedOfficeColumn,
      inviteStatusColumn,
      officeArrivalTimeColumn,
      officeExitTimeColumn,
      durationColumn,
      phoneColumn,
      actionColumn,
    ];
    return singleDayColumns;
  }

  const atOfficeDaysColumn = {
    title: t('officeAttendanceTracking:AT_OFFICE_DAYS'),
    align: 'right',
    dataIndex: 'atOfficeDays',
    width: 80,
    sorter: true,
    render: (atOfficeDays: number | undefined) => (atOfficeDays || 0),
  };
  const averageDurationColumn = {
    title: `${t('global:AVERAGE')} ${t('global:DURATION')}`,
    align: 'right',
    dataIndex: 'durationInSec',
    width: 110,
    sorter: true,
    render: (durationInSec: number, record: any) => {
      if (!record.atOfficeDays || !durationInSec) {
        return '0:00';
      }
      const durationMoment = moment.duration(durationInSec / (record.atOfficeDays), 'seconds');
      return `${Math.floor(durationMoment.asHours())}:${durationMoment.minutes() < 10 ? 0 : ''}${durationMoment.minutes()}`;
    },
  };

  const multiDayColumns = [
    indexColumn,
    nameColumn,
    departmentColumn,
    supervisorColumn,
    locationColumn,
    atOfficeDaysColumn,
    averageDurationColumn,
    phoneColumn,
    actionColumn,
  ];

  return multiDayColumns;
};
