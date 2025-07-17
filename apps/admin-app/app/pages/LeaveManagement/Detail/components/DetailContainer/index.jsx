import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../../redux/actions';
import {
  approveLeaveRequestSelector,
  cancelLeaveRequestSelector,
  leaveDetailSelector,
  leaveTypesSelector,
  rejectLeaveRequestSelector,
} from '../../../redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import { EMPLOYEE_LEAVE_STATUSES } from '@shared/shared/constants';
import { getLeaveCalculations } from './utils';
import DownloadAttachment from '../DownloadAttachment';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const { Title } = Typography;

function LeaveDetail({ leaveRequestId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['leaveManagement']);
  const { APPROVED, DECLINED, CANCELED } = EMPLOYEE_LEAVE_STATUSES;

  const [isVisible, setVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const data = useSelector(leaveDetailSelector.getData);
  const isDataPending = useSelector(leaveDetailSelector.getIsPending);
  const isApprovePending = useSelector(
    approveLeaveRequestSelector.getIsPending,
  );
  const isRejectPending = useSelector(rejectLeaveRequestSelector.getIsPending);
  const isCancelPending = useSelector(cancelLeaveRequestSelector.getIsPending);
  const isApproveSuccess = useSelector(
    approveLeaveRequestSelector.getIsSuccess,
  );
  const isRejectSuccess = useSelector(rejectLeaveRequestSelector.getIsSuccess);
  const isCancelSuccess = useSelector(cancelLeaveRequestSelector.getIsSuccess);
  const leaveTypes = useSelector(leaveTypesSelector.getData);
  const isLeaveTypesPending = useSelector(leaveTypesSelector.getIsPending);

  const leaveTranslations = useMemo(() => {
    return leaveTypes?.reduce((acc, { code, name }) => ({ ...acc, [code]: name }), {});
  }, [leaveTypes]);

  const { timezone } = useSelector(getSelectedCountryV2).timezones[0];

  const isPending =
    isDataPending || isApprovePending || isRejectPending || isCancelPending || isLeaveTypesPending;

  const {
    person = {},
    status,
    type,
    startDatetime,
    endDatetime,
    note,
    attachments = [],
    workableTime,
  } = data;

  const isCanceled = status === CANCELED;
  const isDisabled = status === APPROVED || status === DECLINED || isCanceled;

  const { leaveDates, leaveDuration } = getLeaveCalculations({
    t,
    timezone,
    startDatetime,
    endDatetime,
    workableTime,
  });

  useEffect(() => {
    if (isApproveSuccess && isRejectSuccess && isCancelSuccess) {
      dispatch(Creators.getLeaveDetailRequest({ leaveRequestId }));
    }
  }, [
    dispatch,
    leaveRequestId,
    isApproveSuccess,
    isRejectSuccess,
    isCancelSuccess,
  ]);

  const handleCancelModal = () => {
    setVisible(false);
    setRejectReason('');
  };

  const handleApprove = () => {
    dispatch(Creators.approveLeaveRequestRequest({ leaveRequestId }));
  };

  const handleReject = () => {
    dispatch(
      Creators.rejectLeaveRequestRequest({
        leaveRequestId,
        description: rejectReason,
      }),
    );
    handleCancelModal();
  };

  const handleRemove = () => {
    dispatch(Creators.cancelLeaveRequestRequest({ leaveRequestId }));
  };

  return (
    <AntCard
      data-testid="LEAVE_REQUEST_DETAIL_CARD"
      footer={(
        <div data-testid="LEAVE_REQUEST_DETAIL_FOOTER">
          <Popconfirm
            disabled={isPending || isDisabled}
            placement="topRight"
            title={t('COMMON_CONFIRM_TEXT')}
            okText={t('OK')}
            cancelText={t('CANCEL')}
            onConfirm={handleApprove}
          >
            <Button disabled={isPending || isDisabled}>
              {t('APPROVE')}
            </Button>
          </Popconfirm>
          <Button
            disabled={isPending || isDisabled}
            onClick={setVisible}
          >
            {t('REJECT')}
          </Button>
          <Popconfirm
            disabled={isPending || isCanceled}
            placement="topRight"
            title={t('COMMON_CONFIRM_TEXT')}
            okText={t('OK')}
            cancelText={t('CANCEL')}
            onConfirm={handleRemove}
          >
            <Button disabled={isPending || isCanceled}>{t('CANCEL')}</Button>
          </Popconfirm>
          <Modal
            title={t('leaveManagement:REJECTION_REASON')}
            visible={isVisible}
            onOk={handleReject}
            okButtonProps={{ disabled: !rejectReason.length }}
            onCancel={handleCancelModal}
            okText={t('OK')}
            cancelText={t('CANCEL')}
          >
            <Input.TextArea
              value={rejectReason}
              type="text"
              onChange={e => setRejectReason(e.target.value)}
            />
          </Modal>
        </div>
      )}
    >
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:NAME')}</Title>
            {person.name}
          </Col>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:COLUMNS.LEAVE_TYPE')}</Title>
            {leaveTranslations[type]}
          </Col>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:LEAVE_DATES')}</Title>
            {leaveDates}
          </Col>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:LEAVE_DURATION')}</Title>
            {leaveDuration}
          </Col>
        </Col>
        <Col lg={12} xs={24}>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:DOCUMENTS')}</Title>
            {attachments.length
              ? attachments.map((item, idx) => (
                <Col key={`${item.fileKey.toString()}_${idx.toString()}`}>
                  <DownloadAttachment {...item} personId={person._id} />
                </Col>
              ))
              : '-'}
          </Col>
          <Col span={24}>
            <Title level={5}>{t('leaveManagement:NOTE')}</Title>
            {note}
          </Col>
        </Col>
      </Row>
    </AntCard>
  );
}

export default LeaveDetail;
