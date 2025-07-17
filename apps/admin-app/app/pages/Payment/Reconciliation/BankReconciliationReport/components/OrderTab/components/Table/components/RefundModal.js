import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { selectedRowsSelector } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/redux/selectors';

import { Creators } from '../../../../../redux/actions';

export default function RefundModal({ isModalVisible, setModalVisible }) {
  const { t } = useTranslation(['bankReconciliationReportPage']);
  const basketIds = useSelector(selectedRowsSelector.getSelectedBasketIds);
  const orderIds = useSelector(selectedRowsSelector.getSelectedOrderIds);

  const dispatch = useDispatch();
  const handleRefundOK = () => {
    dispatch(Creators.refundsTransactionRequest({ orderIds, basketIds }));
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
      {t('REFUND_CONFIRM')}
    </Modal>
  );
}
