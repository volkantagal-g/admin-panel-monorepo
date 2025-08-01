import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { Col, Row } from 'antd';

import moment from 'moment';

import { createSortObject } from '@shared/utils/table';
import { officeAttendanceTrackingEmployeeAttendanceSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { getStatsTableColumns, getFormattedData, expandedRowRender } from './tableConfigs';
import useStyles from '../../../styles';
import { IPagination, ISortingObject } from '../../../constants';
import { Creators } from '../../redux/actions';
import { getLimitAndOffset, removeNullOrUndefinedDeep } from '@shared/utils/common';
import { IEmployeeDailyStatsRecord } from '../../../global';

type PropTypes = {
  onPaginationChange: (inputs: IPagination) => void;
  onTableSortChange: (inputs: ISortingObject) => void;
  pagination: IPagination;
}

function EmployeeAttendanceTable({ pagination, onPaginationChange, onTableSortChange }: PropTypes) {
  const { t } = useTranslation(['global', 'officeAttendanceTracking']);
  const classes = useStyles();
  const { canAccess } = usePermission();
  const hasDeleteSchedulePermission = canAccess(permKey.PAGE_EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS_COMPONENT_DELETE_ACTION);

  const dispatch = useDispatch();

  const transactions = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getTransactions);
  const isDeleteSchedulePending = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getDeleteScheduleIsPending);
  const dailyStats = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getDailyStatsData);
  const total = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getDailyStatsTotal);
  const dailyStatsIsPending = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getDailyStatsIsPending);
  const filters = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getFilters);

  const handleDeleteSchedule = ({ data }: { data: IEmployeeDailyStatsRecord }) => {
    dispatch(Creators.deleteScheduleAndUpdateInviteStatusRequest({
      body:
        { employeeEmail: data?.employeeEmail, day: moment.utc(data?.day).format('YYYY-MM-DD') },
      onSuccess: () => {
        dispatch(Creators.getOfficeAttendanceTrackingEmployeeDailyStatsRequest({
          body: {
            ...removeNullOrUndefinedDeep({
              employeeId: data?.employeeId,
              ...filters,
              ...getLimitAndOffset(pagination),
            }),
          },
        }));
      },
    }));
  };

  const formattedData = useMemo(() => getFormattedData({ transactions, dailyStats }) || [], [transactions, dailyStats]);

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} xxl={21}>
        <AntTableV2
          className={classes.commonTableContainer}
          data={formattedData}
          columns={getStatsTableColumns({ t, classes, hasDeleteSchedulePermission, handleDeleteSchedule })}
          total={total}
          onChange={handleOnChange}
          expandable={{
            expandedRowRender: (row: any) => expandedRowRender({ row, t, classes, hasDeleteSchedulePermission }),
            rowExpandable: (row: any) => !isEmpty(row.transactions),
          }}
          loading={dailyStatsIsPending || isDeleteSchedulePending}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          scroll={{ y: 'calc(100vh - 255px)' }}
        />
      </Col>
    </Row>
  );

  function handleOnChange(_paginationData: any, _filters: any, sorter: { order: string, field: string, columnKey: string }) {
    const { order, field, columnKey } = sorter;
    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    const sortObj = {
      // @ts-ignore
      sortKey,
      sortDirection,
    };

    onTableSortChange(sortObj);
  }
}

export default EmployeeAttendanceTable;
