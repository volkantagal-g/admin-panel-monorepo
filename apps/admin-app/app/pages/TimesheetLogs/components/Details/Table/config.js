import moment from 'moment';

import { Badge, Popover, Tag } from 'antd';

import { convertMinToHr, getRowClassNames, translateInfo, translateColumn, getLabels }
  from '../utils';
import TimePeriod from '../CellControls/TimePeriod';
import Breaks from '../CellControls/Breaks';
import { LEAVE_STATUSES, TIMESHEET_DATE_FORMAT } from '../constants';

export const getTableColumns = ({ classes, leaveTranslations, t }) => {
  const columns = [
    {
      width: 110,
      dataIndex: 'date',
      title: translateColumn('DATE', t),
      render: value => <>{moment(value).format(TIMESHEET_DATE_FORMAT)}</>,
    },
    {
      width: 250,
      dataIndex: 'times',
      title: `${translateColumn('START', t)}/${translateColumn('FINISH', t)}`,
      render: (_, rowData) => {
        const { isOld, compareData, clockTimes, scheduleTimes } = rowData;

        return (
          <div className={classes.wrapperTimePeriod}>
            <TimePeriod compareData={!isOld ? compareData : null} compareKey="clockTimes" period={clockTimes} keepLocalTime>
              <b>{translateColumn('CLOCKED_TIME', t)}</b>
            </TimePeriod>

            <div className={classes.divider} />

            <TimePeriod compareData={!isOld ? compareData : null} compareKey="scheduleTimes" period={scheduleTimes}>
              <b>{translateColumn('SCHEDULED_TIME', t)}</b>
            </TimePeriod>
          </div>
        );
      },
    },
    {
      width: 230,
      dataIndex: 'breaks',
      title: translateColumn('BREAKS_MIN', t),
      render: (_, rowData) => {
        const { isOld, breaks, compareData } = rowData;

        return (
          <Breaks spans={breaks} compareData={!isOld ? compareData : null} compareKey="breaks">
            <b>{translateColumn('BREAKS', t)}</b>
          </Breaks>
        );
      },
    },
    {
      width: 100,
      dataIndex: 'timesheetTotal',
      title: translateColumn('TIME_TOTAL', t),
      render: (value, rowData) => {
        const { isOld, compareData } = rowData;
        const isDifferent = !isOld ? compareData?.timesheetTotal !== value : false;

        return <span className={isDifferent ? classes.redColor : undefined}>{value ? convertMinToHr(+Number(value).toFixed(0), t) : '-'}</span>;
      },
    },
    {
      width: 100,
      dataIndex: 'scheduledTotalTime',
      title: translateColumn('SCHEDULE_TOTAL_TIME', t),
      render: (value, rowData) => {
        const { isOld, compareData } = rowData;
        const isDifferent = !isOld ? compareData?.scheduledTotalTime !== value : false;

        return <span className={isDifferent ? classes.redColor : undefined}>{value ? convertMinToHr(+Number(value).toFixed(0), t) : '-'}</span>;
      },
    },
    {
      width: 120,
      dataIndex: 'varianceTotal',
      title: translateColumn('VARIANCE_TOTAL', t),
      render: (_, { oldData, compareData, scheduledTotalTime = 0, timesheetTotal = 0 }) => {
        const varianceTotal = convertMinToHr(Math.abs(+Number(scheduledTotalTime - timesheetTotal).toFixed(0)), t) || 0;

        const compareScheduleTotalTime = !oldData ? compareData?.scheduledTotalTime : null;
        const compareTimesheetTotal = !oldData ? compareData?.timesheetTotal : null;
        const compareValue = !oldData ? convertMinToHr(Math.abs(+Number(compareScheduleTotalTime - compareTimesheetTotal).toFixed(0)), t) || 0 : null;

        const isDifferent = !oldData ? compareValue !== varianceTotal : false;

        return (
          <span className={isDifferent ? classes.redColor : undefined}>{varianceTotal}</span>
        );
      },
    },
    {
      width: 120,
      dataIndex: 'leaveType',
      title: translateColumn('LEAVE', t),
      render: (_, { leaveType, leaveStatus }) => (leaveType ? (
        <div>
          {leaveTranslations[leaveType]}
          <Tag color={leaveStatus === LEAVE_STATUSES.APPROVED ? 'success' : 'warning'}>{t(`TIMESHEET_LOGS_MODAL.LEAVE_STATUSES.${leaveStatus}`)}</Tag>
        </div>
      ) : (
        t('TIMESHEET_LOGS_MODAL.NO')
      )),
    },
    {
      width: 160,
      dataIndex: 'label',
      title: '',
      render: (_, rowData) => {
        const { hasAtLeastOneLateClockIn, hasEmptyValue } = getLabels(rowData);

        return (
          <>
            {hasAtLeastOneLateClockIn ? <Badge style={{ backgroundColor: '#FEF7E8', color: '#97670F' }} count={translateColumn('LATE_CLOCK_IN', t)} /> : null}
            {hasEmptyValue ? <Badge count={t(translateInfo('NO_INFORMATION'), t)} /> : null}
          </>
        );
      },
    },
    {
      dataIndex: 'note',
      title: translateColumn('NOTE', t),
      render: (_, rowData) => {
        if (rowData.note && (rowData.isApproved || rowData.isLocked)) {
          return rowData.note.length > 20 ? <Popover content={rowData.note}>{`${rowData.note.substring(0, 20)}...`}</Popover> : rowData.note;
        }
        return <>-</>;
      },
    },
    {
      width: 150,
      fixed: 'right',
      title: '',
      dataIndex: 'isOld',
      onCell: row => ({ className: `${classes.actionColumn} ${getRowClassNames(row, classes)}` }),
      render: isOld => <Tag color={isOld ? 'warning' : 'success'}>{t(`TIMESHEET_LOGS_MODAL.${isOld ? 'OLD' : 'NEW'}`)}</Tag>,
    },
  ]
    .filter(Boolean)
    .map(m => ({ ...m, width: m.width ?? 150 }));
  return columns;
};
