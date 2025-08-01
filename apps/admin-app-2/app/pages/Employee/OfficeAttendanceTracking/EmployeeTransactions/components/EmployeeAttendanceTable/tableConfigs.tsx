import moment from 'moment';
import { isEmpty, has } from 'lodash';
import { Button, Tag, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, ToolOutlined } from '@ant-design/icons';

import { LOCAL_DATE_FORMAT } from '@shared/shared/constants';
import {
  CHECKIN_CHECKOUT_TYPES,
  DAILY_STATS_STATUSES,
  TRANSACTION_SOURCE_TYPE,
} from '../../../constants';

import RemoteReasonType from '../../../Dashboard/components/RemoteReasonTooltip';
import { getLangKey } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { ATTENDANCE_ENABLED_OFFICES } from '../../constants';
import {
  IEmployeeDailyStatsRecord,
  IEmployeeDailyStatsWithEmployeeDetails,
  ITransactions,
} from '../../../global';
import { isScreenSizeLarge } from '@shared/utils/common';

const STATUS_TO_COLOR_MAP: { [x: string]: string } = {
  [DAILY_STATS_STATUSES.ON_SITE]: '#5d3ebc',
  [DAILY_STATS_STATUSES.ON_LEAVE]: 'gold',
  [DAILY_STATS_STATUSES.REMOTE]: 'green',
  [DAILY_STATS_STATUSES.NO_SHOW]: 'red',
  [DAILY_STATS_STATUSES.NOT_PLANNED]: '#9f9f9f',
};

const EVENTS_COLOR_MAP: { [x: number]: string } = {
  [CHECKIN_CHECKOUT_TYPES.CHECK_IN]: 'green',
  [CHECKIN_CHECKOUT_TYPES.CHECK_OUT]: 'orange',
  [CHECKIN_CHECKOUT_TYPES.CHECK_IN_OUT]: 'purple',
};

export function getStatsTableColumns(
  { t, classes, hasDeleteSchedulePermission, handleDeleteSchedule }: {
    t: Function; classes: { [x: string]: any }; hasDeleteSchedulePermission: boolean; handleDeleteSchedule: Function,
  },
) {
  return [
    {
      title: <>{t('global:DATE')} - {t('global:DAY')}</>,
      dataIndex: 'day',
      key: 'day',
      width: 180,
      sorter: true,
      defaultSortOrder: 'descend',
      render: (day: string) => {
        const date = moment.utc(day);
        return (<span>{date.format(LOCAL_DATE_FORMAT[getLangKey().toUpperCase()])} - {date.format('ddd')}</span>);
      },
    },
    {
      title: t('officeAttendanceTracking:EMPLOYEE_DAILY_STAT_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status: string, _row: any) => {
        const isDailyStatManipulated = _row.isManipulated;
        const endOfRowDate = moment.utc(_row.day).endOf('day');
        const currentTime = moment.utc();
        const dayDifference = endOfRowDate.diff(currentTime, 'days');

        const isRowIndicatesFuture = dayDifference > 0;

        if (isRowIndicatesFuture && status === DAILY_STATS_STATUSES.NO_SHOW) return '-';

        return (
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
            {isDailyStatManipulated && (
              <Tooltip title={t('officeAttendanceTracking:TOOLTIP.MANIPULATED_DAILY_STAT')}>
                <ToolOutlined className={classes.manipulatedDailyStatIcon} />
              </Tooltip>
            )}
          </>
        );
      },
    },
    {
      title: t('officeAttendanceTracking:INVITED_OFFICE'),
      dataIndex: 'invitedOfficeName',
      key: 'invitedOfficeName',
      width: 150,
    },
    {
      title: t('officeAttendanceTracking:LAST_ATTENDED_OFFICE'),
      dataIndex: 'checkInOfficeName',
      key: 'checkInOfficeName',
      width: 150,
    },
    {
      title: t('officeAttendanceTracking:OFFICE_ARRIVAL_TIME'),
      dataIndex: 'firstCheckInLocal',
      key: 'firstCheckInLocal',
      width: 100,
      align: 'right',
      render: (firstCheckInLocal: IEmployeeDailyStatsRecord['firstCheckInLocal'], record: IEmployeeDailyStatsRecord) => {
        if (!firstCheckInLocal || record.isCheckedInIrregularOffice) {
          return '-';
        }

        return moment.utc(firstCheckInLocal).format('HH:mm');
      },
    },
    {
      title: t('officeAttendanceTracking:OFFICE_EXIT_TIME'),
      dataIndex: 'lastCheckOutLocal',
      key: 'lastCheckOutLocal',
      width: 100,
      align: 'right',
      render: (lastCheckOutLocal: IEmployeeDailyStatsRecord['lastCheckOutLocal'], record: IEmployeeDailyStatsRecord) => {
        if (!lastCheckOutLocal || record.isAtTheOffice || record.isCheckedInIrregularOffice) {
          return '-';
        }
        return moment.utc(lastCheckOutLocal).format('HH:mm');
      },
    },
    {
      title: t('global:DURATION'),
      dataIndex: 'durationInSec',
      key: 'durationInSec',
      align: 'right',
      width: 100,
      render: (durationInSec: number, record: IEmployeeDailyStatsRecord) => {
        if (record.isCheckedInIrregularOffice) {
          return '-';
        }
        if (!durationInSec) {
          return '0:00';
        }

        const duration = moment.duration(durationInSec, 'seconds');
        return `${Math.floor(duration.asHours())}:${duration.minutes() < 10 ? 0 : ''}${duration.minutes()}`;
      },
    },
    ...(hasDeleteSchedulePermission ? [{
      title: t('global:DELETE'),
      align: 'right',
      width: 70,
      render: (data: IEmployeeDailyStatsRecord) => (
        (hasDeleteSchedulePermission && data.status === DAILY_STATS_STATUSES.NO_SHOW) && (
          <Popconfirm
            title={t('officeAttendanceTracking:CONFIRMATION.DELETE_A_PLAN')}
            onConfirm={() => handleDeleteSchedule({ data })}
            okText={t('global:YES')}
            cancelText={t('global:NO')}
          >
            <Button
              icon={(<DeleteOutlined />)}
              size="small"
            />
          </Popconfirm>
        )
      ),
    }] : [{ key: '4', width: 70 }]),
  ];
}

export function getTransactionsTableColumns(
  { t, classes, isCheckedInIrregularOffice }:
    { t: Function; classes: { [x: string]: any }; hasDeleteSchedulePermission: boolean; isCheckedInIrregularOffice: boolean; },
) {
  return [
    {
      key: '1',
      width: isScreenSizeLarge() ? 205 : 202,
    },
    {
      title: t('officeAttendanceTracking:EVENTS'),
      dataIndex: 'checkinOrCheckout',
      width: 180,
      render: (checkinOrCheckout: number) => (
        <Tag color={EVENTS_COLOR_MAP[checkinOrCheckout]} className={classes.tableTag}>
          {t(`officeAttendanceTracking:CHECKIN_CHECKOUT_TYPES.${checkinOrCheckout}`)}
        </Tag>
      ),
    },
    {
      key: '2',
      width: 150,
    },
    {
      title: (
        <Tooltip title={t('officeAttendanceTracking:TOOLTIP.LAST_ATTENDED_OFFICE')}>
          {t('officeAttendanceTracking:LAST_ATTENDED_OFFICE_SHORT')}
        </Tooltip>
      ),
      key: 'officeName',
      dataIndex: 'officeName',
      width: 150,
      showSorterTooltip: false,
    },
    {
      title: t('officeAttendanceTracking:OFFICE_ARRIVAL_TIME'),
      key: 'arrival',
      dataIndex: 'localDate',
      align: 'right',
      width: 100,
      render: (localDate: string, { checkinOrCheckout }: any) => {
        if (isCheckedInIrregularOffice) {
          return '-';
        }

        return (<span>{checkinOrCheckout === 100 || checkinOrCheckout === 300 ? moment.utc(localDate).format('HH:mm') : '-'}</span>);
      },
    },
    {
      title: t('officeAttendanceTracking:OFFICE_EXIT_TIME'),
      key: 'exit',
      dataIndex: 'localDate',
      align: 'right',
      width: 100,
      render: (localDate: string, { checkinOrCheckout }: any) => (<span>{checkinOrCheckout === 200 ? moment.utc(localDate).format('HH:mm') : '-'}</span>),
    },
    { key: '3', align: 'right', width: 100 },
    {
      title: t('global:SOURCE'),
      key: 'sourceType',
      dataIndex: 'sourceType',
      width: 70,
      render: (sourceType: string) => (t(`officeAttendanceTracking:TRANSACTION_SOURCE_TYPES.${sourceType}`)),
    },
  ];
}

export function expandedRowRender(
  { row, t, classes, hasDeleteSchedulePermission }: { row: any; t: Function, classes: { [x: string]: any }; hasDeleteSchedulePermission: boolean; },
) {
  if (!isEmpty(row.transactions)) {
    return (
      <AntTableV2
        data={row.transactions}
        columns={getTransactionsTableColumns({ t, classes, hasDeleteSchedulePermission, isCheckedInIrregularOffice: row.isCheckedInIrregularOffice })}
      />
    );
  }

  return false;
}

export function getFormattedData({ transactions, dailyStats }:
  { dailyStats: IEmployeeDailyStatsWithEmployeeDetails[]; transactions: ITransactions[] }) {
  const dailyStatsMap: any = {};
  dailyStats.forEach((stat: any) => {
    dailyStatsMap[stat.day] = { ...stat };
  });

  const sortedTransactions = transactions.sort((a: ITransactions, b: ITransactions) => (
    new Date(a.localDate).valueOf() - new Date(b.localDate).valueOf()
  ));

  const dayBasedVPNAndQRStatus: {[key:string]: { isFirstVPNCheckInPushed: boolean; isFirstQRCheckInPushed: boolean }} = {};

  sortedTransactions.forEach((transaction: any) => {
    const dayKey = moment.utc(transaction.localDate).startOf('day').toISOString();
    const stat = dailyStatsMap[dayKey] || {};

    if (!stat?.transactions) {
      stat.transactions = [];
    }

    if (!has(dayBasedVPNAndQRStatus, dayKey)) {
      dayBasedVPNAndQRStatus[dayKey] = {
        isFirstQRCheckInPushed: false,
        isFirstVPNCheckInPushed: false,
      };
    }

    if (transaction.sourceType === TRANSACTION_SOURCE_TYPE.TURNGATE) {
      stat.transactions.push(transaction);
    }
    else if (
      !dayBasedVPNAndQRStatus[dayKey].isFirstVPNCheckInPushed &&
      transaction.checkinOrCheckout === CHECKIN_CHECKOUT_TYPES.CHECK_IN &&
      transaction.sourceType === TRANSACTION_SOURCE_TYPE.VPN
    ) {
      stat.transactions.push(transaction);
      dayBasedVPNAndQRStatus[dayKey].isFirstVPNCheckInPushed = true;
    }
    else if (
      !dayBasedVPNAndQRStatus[dayKey].isFirstQRCheckInPushed &&
      transaction.checkinOrCheckout === CHECKIN_CHECKOUT_TYPES.CHECK_IN &&
      transaction.sourceType === TRANSACTION_SOURCE_TYPE.QR
    ) {
      stat.transactions.push(transaction);
      dayBasedVPNAndQRStatus[dayKey].isFirstQRCheckInPushed = true;
    }
  });

  return Object.values(dailyStatsMap).map((ds: any) => {
    ds?.transactions?.reverse(); // to sort transactions in descending order
    return ds;
  });
}
