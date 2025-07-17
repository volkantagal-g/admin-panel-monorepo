import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Popconfirm, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { Creators } from '../../../redux/actions';
import {
  cancelLeaveRequestSelector,
  leaveRequestsSelector,
  batchLeaveRequestsSelector,
  leaveTypesSelector,
} from '@app/pages/LeaveManagement/redux/selectors';
import { getTableColumns } from './columns';
import useStyles from './styles';
import { EMPLOYEE_LEAVE_STATUSES } from '@shared/shared/constants';
import { getFormattedData, getTableProps } from './utils';

const EmployeeLeaveRequests = ({ filters, status, setFiltersDisabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['global']);

  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const { APPROVED, DECLINED, CANCELED, PENDING, PENDING_DOCUMENT } =
    EMPLOYEE_LEAVE_STATUSES;
  const isRemovable = status !== CANCELED;
  const isStatusPending = status === PENDING || status === PENDING_DOCUMENT;

  const data = useSelector(leaveRequestsSelector[`getData${status}`]);
  const total = useSelector(leaveRequestsSelector[`getTotal${status}`]);
  const isLeaveRequestsPending = useSelector(
    leaveRequestsSelector[`getIsPending${status}`],
  );
  const isBatchPending = useSelector(batchLeaveRequestsSelector.getIsPending);
  const isBatchSuccess = useSelector(batchLeaveRequestsSelector.getIsSuccess);
  const isCancelPending = useSelector(cancelLeaveRequestSelector.getIsPending);
  const isCancelSuccess = useSelector(cancelLeaveRequestSelector.getIsSuccess);
  const leaveTypes = useSelector(leaveTypesSelector.getData);
  const isLeaveTypesPending = useSelector(leaveTypesSelector.getIsPending);

  const leaveTranslations = useMemo(() => {
    return leaveTypes?.reduce((acc, { code, name }) => ({ ...acc, [code]: name }), {});
  }, [leaveTypes]);

  const isPending = isLeaveRequestsPending || isCancelPending || isBatchPending || isLeaveTypesPending;

  useEffect(() => {
    dispatch(Creators.getLeaveTypesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (filters.franchiseId && (isBatchSuccess || isCancelSuccess)) {
      dispatch(
        Creators[`getLeaveRequestsRequest${status}`]({
          franchiseId: filters.franchiseId,
          startDatetime: filters.date[0],
          endDatetime: filters.date[1],
          status,
          isEmailRequired: true,
          ...pagination,
        }),
      );
    }
  }, [dispatch, filters, filters.franchiseId, pagination, status, isBatchSuccess, isCancelSuccess]);

  useEffect(() => {
    setFiltersDisabled(isPending);
  }, [isPending, setFiltersDisabled]);

  const handleBatch = ({ action }) => {
    const reqBody = {
      leaves: selectedLeaves,
      status: action,
    };
    dispatch(Creators.batchLeaveRequestsRequest(reqBody));
    setSelectedLeaves([]);
  };

  const handleRemove = leaveRequestId => {
    dispatch(Creators.cancelLeaveRequestRequest({ leaveRequestId }));
  };

  return (
    <>
      {isStatusPending ? (
        <Row gutter={[8, 8]}>
          <Col xs={24} className={classes.buttonsWrapper}>
            <Popconfirm
              disabled={isPending}
              placement="topRight"
              title={t('COMMON_CONFIRM_TEXT')}
              okText={t('OK')}
              cancelText={t('CANCEL')}
              onConfirm={() => handleBatch({ action: APPROVED })}
            >
              <Button disabled={isPending}>{t('APPROVE')}</Button>
            </Popconfirm>
            <Popconfirm
              placement="topRight"
              title={t('COMMON_CONFIRM_TEXT')}
              okText={t('OK')}
              cancelText={t('CANCEL')}
              onConfirm={() => handleBatch({ action: DECLINED })}
            >
              <Button disabled={isPending}>{t('REJECT')}</Button>
            </Popconfirm>
          </Col>
        </Row>
      ) : null}
      <AntTableV2
        data={getFormattedData(data)}
        total={total}
        loading={isPending}
        columns={getTableColumns({ t, isRemovable, handleRemove, leaveTranslations })}
        pagination={pagination}
        onPaginationChange={setPagination}
        totalBadge={{
          total,
          label: t('RESULT'),
        }}
        {...getTableProps({
          isStatusPending,
          setSelectedLeaves,
          selectedLeaves,
        })}
      />
    </>
  );
};

export default EmployeeLeaveRequests;
