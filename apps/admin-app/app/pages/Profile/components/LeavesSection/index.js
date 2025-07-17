/* eslint-disable */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import LeaveDetailModal from './LeaveDetailModal'
import { Creators } from '../../redux/actions';
import { actionButtonSelector } from '../../redux/selectors';

import LeaveSectionWrapper from './LeaveSectionWrapper';

const LeavesSection = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const [selectedPermit, setSelectedPermit] = useState();

  const isActionSucceeded = useSelector(actionButtonSelector?.getIsSucceeded);
  const isActionResultPending = useSelector(actionButtonSelector?.getIsPending);

  const memoizedHandlePermitDetailBtnClick = useCallback(({ permit }) => {
    setSelectedPermit(permit._id);
  }, []);

  const handlePermitDetailModalClose = () => {
    setSelectedPermit();
  };

  const handleApprove = ({ permitId }) => {
    dispatch(Creators.approvePermitRequest({ permitId }));
  };

  const handleReject = ({ permitId }) => {
    dispatch(Creators.rejectPermitRequest({ permitId }));
  };

  const handleCancel = ({ permitId }) => {
    dispatch(Creators.cancelPermitRequest({ permitId }));
  };

  const handleCancelRequest = ({ permitId }) => {
    dispatch(Creators.cancelRequestedPermitRequest({ permitId }));
  };

  const handleActionSucceeded = () => {
    dispatch(Creators.resetActionButton());
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.HOME')} />
      <Row gutter={[4, 4]}>
        <Col xs={24}>
          <LeaveSectionWrapper onPermitDetailClick={memoizedHandlePermitDetailBtnClick} />
        </Col>
      </Row>
      {
        selectedPermit && (
          <LeaveDetailModal
            permitId={selectedPermit}
            onClose={handlePermitDetailModalClose}
            onActionSucceeded={handleActionSucceeded}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
            onCancelRequest={handleCancelRequest}
            isActionSucceeded={isActionSucceeded}
            isActionResultPending={isActionResultPending}
          />
        )
      }
    </>
  );
};

export default LeavesSection;
