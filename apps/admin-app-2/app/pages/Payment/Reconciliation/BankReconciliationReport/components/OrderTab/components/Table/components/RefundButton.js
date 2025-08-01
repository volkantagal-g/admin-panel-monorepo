import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RedoOutlined } from '@ant-design/icons';

import { useState } from 'react';

import permKey from '@shared/shared/permKey.json';
import { refundsTransactionSelector, selectedRowsSelector } from '../../../../../redux/selectors';
import { usePermission } from '@shared/hooks';
import RefundModal from './RefundModal';
import { refundStatuses } from '../constants';

export default function RefundButton() {
  const { Can } = usePermission();
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);

  const [isModalVisible, setModalVisible] = useState(false);

  const basketIds = useSelector(selectedRowsSelector.getSelectedBasketIds);
  const orderIds = useSelector(selectedRowsSelector.getSelectedOrderIds);
  const selectedRowsData = useSelector(selectedRowsSelector.getSelectedRows);
  const refundsTransactionIsPending = useSelector(refundsTransactionSelector.getIsPending);

  const allPending = selectedRowsData.every(row => row.primaryRefundStatus === refundStatuses.pending);

  const refundDisabled = (basketIds.length === 0 && orderIds.length === 0) || !allPending;

  return (
    <Can permKey={permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_REFUND_BUTTON}>
      <Button
        data-testid="reconciliation-refund-button"
        loading={refundsTransactionIsPending}
        onClick={() => setModalVisible(true)}
        icon={<RedoOutlined />}
        danger
        type="primary"
        disabled={refundDisabled}
      >
        {t('REFUND')}
      </Button>
      <RefundModal
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
      />
    </Can>
  );
}
