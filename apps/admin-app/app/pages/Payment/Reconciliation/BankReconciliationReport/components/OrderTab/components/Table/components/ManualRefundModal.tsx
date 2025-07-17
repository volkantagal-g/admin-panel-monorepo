import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch } from 'react';

import { selectedRowsSelector } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/redux/selectors';

import { Creators } from '../../../../../redux/actions';
import { ISelectedRows } from './ManualRefundButton';
import { getEventDetailsToSend } from '../utils';

interface RefundModalProps {
    isModalVisible: boolean;
    setModalVisible: Dispatch<React.SetStateAction<boolean>>;
}

export default function ManualRefundModal({ isModalVisible, setModalVisible }: RefundModalProps) {
  const { t } = useTranslation(['bankReconciliationReportPage']);
  const selectedRowsData = useSelector(state => selectedRowsSelector.getSelectedRows(state) as ISelectedRows[]);

  const dispatch = useDispatch();
  const handleRefundOK = () => {
    const eventDetailsToSend = getEventDetailsToSend({ selectedRowsData });

    dispatch(Creators.manualRefundRequest({ eventDetailsToSend }));
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      width="420px"
      visible={isModalVisible}
      onOk={handleRefundOK}
      onCancel={handleCancel}
    >
      {t('MANUAL_REFUND_CONFIRM')}
    </Modal>
  );
}
