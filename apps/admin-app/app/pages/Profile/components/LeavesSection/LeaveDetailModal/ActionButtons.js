import { useTranslation } from 'react-i18next';
import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';

import { EMPLOYEE_PERMIT_STATUSES } from '@app/pages/Employee/constants';
import { actionButtonSelector } from '@app/pages/Employee/Home/redux/selectors';

const ActionButtons = ({
  onApprove,
  onReject,
  onCancel,
  isDisabled,
  status,
}) => {
  const { t } = useTranslation(['global', 'employeePage']);
  const isActionResultPending = useSelector(actionButtonSelector.getIsPending);

  return (
    <>
      {
        status === EMPLOYEE_PERMIT_STATUSES.REQUESTED && (
          <>
            <Popconfirm
              disabled={isDisabled}
              title={t('global:COMMON_CONFIRM_TEXT')}
              okText={t('global:OK')}
              cancelText={t('global:CANCEL')}
              onConfirm={onReject}
              key="reject"
            >
              <Button loading={isActionResultPending} key="reject" type="danger">{t('global:REJECT')}</Button>
            </Popconfirm>
            <Popconfirm
              disabled={isDisabled}
              title={t('global:COMMON_CONFIRM_TEXT')}
              okText={t('global:OK')}
              cancelText={t('global:CANCEL')}
              onConfirm={onApprove}
              key="approve"
            >
              <Button loading={isActionResultPending} key="approve" type="success">{t('global:APPROVE')}</Button>
            </Popconfirm>
          </>
        )
      }
      {
        status === EMPLOYEE_PERMIT_STATUSES.APPROVED && (
          <Popconfirm
            disabled={isDisabled}
            title={t('global:COMMON_CONFIRM_TEXT')}
            okText={t('global:OK')}
            cancelText={t('global:CANCEL')}
            onConfirm={onCancel}
            key="cancel"
          >
            <Button loading={isActionResultPending} key="cancel" type="danger">{t('employeePage:CANCEL_PERMIT')}</Button>
          </Popconfirm>
        )
      }
    </>
  );
};

export default ActionButtons;
