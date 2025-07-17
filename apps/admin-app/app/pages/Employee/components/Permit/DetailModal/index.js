import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isFunction as _isFunction } from 'lodash';
import { Modal, Descriptions, Spin, Card, Tag, Popconfirm, Button } from 'antd';
import moment from 'moment';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLocalDateFormat, getLocalDateTimeFormat } from '@shared/utils/localization';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import {
  EMPLOYEE_PERMIT_ACTIONS,
  EMPLOYEE_PERMIT_REASONS,
  EMPLOYEE_PERMIT_TYPES,
  PERMIT_STATUS_TAG_COLORS,
} from '../../../constants';
import { getHistoryTableColumns, getIsPermitCancellationRequestPossible } from './utils';
import { Creators } from './redux/actions';
import { getPermitDetailSelector } from './redux/selectors';
import reducer from './redux/reducer';
import saga from './redux/saga';
import ActionButtons from './ActionButtons';
import { getUser } from '@shared/redux/selectors/auth';

const reduxKey = REDUX_KEY.EMPLOYEE.MODAL.PERMIT.DETAIL;

const PermitDetailModal = ({
  permitId,
  onClose,
  changeStatusPermKey,
  onActionSucceeded,
  onApprove,
  onReject,
  onCancel,
  onCancelRequest,
  isActionSucceeded,
  isActionResultPending,
}) => {
  const { t } = useTranslation(['global', 'employeePage']);
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const [visible, setVisible] = useState(false);
  const isPermitDataPending = useSelector(getPermitDetailSelector.getIsPending);
  const permitData = useSelector(getPermitDetailSelector.getData);
  const permitHistory = useSelector(getPermitDetailSelector.getHistory);
  const statementOptions = useSelector(getPermitDetailSelector.getStatementOptions);
  const historyTableColumns = getHistoryTableColumns({ t });
  const { canAccess } = usePermission();
  const hasPermissionToChangeStatus = canAccess(changeStatusPermKey);
  const localDateFormat = getLocalDateFormat();
  const localDateTimeFormat = getLocalDateTimeFormat();
  const dateFormat = permitData?.permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO ? localDateFormat : localDateTimeFormat;
  const hasSupervisorAccess = statementOptions.isSupervisor || hasPermissionToChangeStatus;
  const user = getUser();

  const isCancelRequestButtonVisible = getIsPermitCancellationRequestPossible({
    user,
    permitData,
    hasSupervisorAccess,
  });

  useEffect(() => {
    if (permitId) {
      setVisible(true);
      dispatch(Creators.getPermitDetailRequest({ permitId }));
    }
    else {
      setVisible(false);
    }
  }, [dispatch, permitId]);

  useEffect(() => {
    if (isActionSucceeded) {
      onClose({ isDataNeedToBeRefresh: true });
      if (_isFunction(onActionSucceeded)) {
        onActionSucceeded({});
      }
    }
  }, [dispatch, isActionSucceeded, onClose, onActionSucceeded]);

  const handleClose = () => {
    onClose();
  };
  const handleApprove = () => {
    if (_isFunction(onApprove)) {
      onApprove({ permitId });
    }
  };
  const handleReject = () => {
    if (_isFunction(onReject)) {
      onReject({ permitId });
    }
  };
  const handleCancel = () => {
    if (_isFunction(onCancel)) {
      onCancel({ permitId });
    }
  };

  const handleCancelRequest = () => {
    if (_isFunction(onCancelRequest)) {
      onCancelRequest({ permitId });
    }
  };

  return (
    <Modal
      visible={visible}
      title={t('employeePage:PERMIT_DETAIL')}
      onCancel={handleClose}
      footer={!isPermitDataPending ? (
        <>
          {hasSupervisorAccess && (
            <ActionButtons
              isDisabled={isPermitDataPending}
              status={permitData.status}
              onCancel={handleCancel}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
          {isCancelRequestButtonVisible && (
            <Popconfirm
              disabled={isPermitDataPending}
              title={t('global:COMMON_CONFIRM_TEXT')}
              okText={t('global:OK')}
              cancelText={t('global:CANCEL')}
              onConfirm={handleCancelRequest}
              key="cancel"
            >
              <Button loading={isActionResultPending} key="cancel" type="danger">{t('employeePage:CANCEL_PERMIT')}</Button>
            </Popconfirm>
          )}
        </>
      ) : null}
      closable
      destroyOnClose
    >
      <Spin spinning={isPermitDataPending} tip={t('global:LOADING_TIP')}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label={t('global:GETIRIAN')}>{permitData?.employee?.fullName}</Descriptions.Item>
          <Descriptions.Item label={t('global:TYPE')}>
            {permitData?.permitType && t(`employeePage:PERMIT_TYPES.${permitData?.permitType?.toString()}`)}
          </Descriptions.Item>
          {
            (
              permitData?.permitType === EMPLOYEE_PERMIT_TYPES.OTHER ||
              permitData?.permitType === EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE
            ) && (
              <Descriptions.Item label={t('global:REASON')}>
                {permitData?.reason && t(`employeePage:PERMIT_REASONS.${permitData?.reason?.toString()}`)}
              </Descriptions.Item>
            )
          }
          {
            permitData?.reason === EMPLOYEE_PERMIT_REASONS.OTHER && permitData?.otherReasonDescription && (
              <Descriptions.Item label={t('global:DESCRIPTION')}>{permitData?.otherReasonDescription}</Descriptions.Item>
            )
          }
          <Descriptions.Item label={t('global:START_DATE')}>
            {permitData?.startDateL && moment.utc(permitData?.startDateL).format(dateFormat)}
          </Descriptions.Item>
          <Descriptions.Item label={t('global:END_DATE')}>
            {permitData?.endDateL && moment.utc(permitData?.endDateL).format(dateFormat)}
          </Descriptions.Item>
          {permitData?.permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO ? (
            <>
              <Descriptions.Item label={t('employeePage:TOTAL')}>{permitData?.totalDay}</Descriptions.Item>
              <Descriptions.Item label={t('employeePage:WORK_DAY')}>{permitData?.totalWorkDay}</Descriptions.Item>
              <Descriptions.Item label={t('employeePage:REQUESTED_DAY')}>{permitData?.requestedPermitDay}</Descriptions.Item>
            </>
          ) :
            <Descriptions.Item label={t('employeePage:REQUESTED_HOURS')}>{permitData?.requestedPermitHours}</Descriptions.Item>}
          {
            permitData?.employeeNote && statementOptions.hasPermission && (
              <Descriptions.Item label={t('global:NOTE')}>{permitData?.employeeNote}</Descriptions.Item>
            )
          }
          {
            permitData?.employeeDocument && statementOptions.hasPermission && (
              <Descriptions.Item label={t('employeePage:DOCUMENT.LABEL')}>
                <a href={permitData?.employeeDocumentUrl} target="_blank" rel="noreferrer">{permitData?.employeeDocument}</a>
              </Descriptions.Item>
            )
          }
          <Descriptions.Item label={t('global:STATUS')}>
            {
              permitData?.status && (
                <Tag color={PERMIT_STATUS_TAG_COLORS[permitData.status]}>{t(`employeePage:PERMIT_STATUSES.${permitData.status.toString()}`)}</Tag>
              )
            }
          </Descriptions.Item>
          {
            hasSupervisorAccess && permitData?.actionsMap[EMPLOYEE_PERMIT_ACTIONS.APPROVE] && (
              <>
                <Descriptions.Item label={t('global:APPROVED_BY')}>
                  {permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.APPROVE].employeeName}
                </Descriptions.Item>
                <Descriptions.Item label={t('global:APPROVED_DATE')}>
                  {moment(permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.APPROVE].date).format(localDateFormat)}
                </Descriptions.Item>
              </>
            )
          }
          {
            hasSupervisorAccess && permitData?.actionsMap[EMPLOYEE_PERMIT_ACTIONS.REJECTED] && (
              <>
                <Descriptions.Item label={t('global:REJECTED_BY')}>
                  {permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.REJECTED].employeeName}
                </Descriptions.Item>
                <Descriptions.Item label={t('global:REJECTED_DATE')}>
                  {moment(permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.REJECTED].date).format(localDateFormat)}
                </Descriptions.Item>
              </>
            )
          }
          {
            hasSupervisorAccess && permitData?.actionsMap[EMPLOYEE_PERMIT_ACTIONS.CANCELED] && (
              <>
                <Descriptions.Item label={t('global:CANCELED_BY')}>
                  {permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.CANCELED].employeeName}
                </Descriptions.Item>
                <Descriptions.Item label={t('global:CANCELED_DATE')}>
                  {moment(permitData.actionsMap[EMPLOYEE_PERMIT_ACTIONS.CANCELED].date).format(localDateFormat)}
                </Descriptions.Item>
              </>
            )
          }
        </Descriptions>
        {
          permitHistory?.length > 0 && (
            <Card
              bordered
              size="small"
              title={t('employeePage:PERMIT_HISTORY_TABLE_HEADER')}
            >
              <AntTableV2 size="small" columns={historyTableColumns} data={permitHistory} />
            </Card>
          )
        }
      </Spin>
    </Modal>
  );
};

export default PermitDetailModal;
