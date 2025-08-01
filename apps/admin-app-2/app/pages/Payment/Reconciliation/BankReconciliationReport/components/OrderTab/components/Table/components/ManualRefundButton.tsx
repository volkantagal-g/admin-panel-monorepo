import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RedoOutlined } from '@ant-design/icons';

import { useState } from 'react';

import permKey from '@shared/shared/permKey.json';
import { manualRefundSelector, selectedRowsSelector } from '../../../../../redux/selectors';
import { usePermission } from '@shared/hooks';
import ManualRefundModal from './ManualRefundModal';

import useStyles from '../styles';

export interface IRefundResponseDetails {
    transactionId?: string;
    refundStatus?: string;
    refundDate?: string;
    errorMessage?: string;
    amount?: string;
    source?: string;
}

export interface ISelectedRows {
    orderId?: string;
    basketId?: string;
    primaryRefundStatus?: string;
    refundResponse?: {
        refundResponseDetails?: IRefundResponseDetails[];
    }
}

export default function ManualRefundButton() {
  const { Can } = usePermission();
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);

  const classes = useStyles();

  const [isModalVisible, setModalVisible] = useState(false);

  const basketIds = useSelector(selectedRowsSelector.getSelectedBasketIds);
  const orderIds = useSelector(selectedRowsSelector.getSelectedOrderIds);
  const selectedRowsData = useSelector(state => selectedRowsSelector.getSelectedRows(state) as ISelectedRows[]);
  const manualRefundIsPending = useSelector(state => manualRefundSelector.getIsPending(state) as boolean);

  const allFailed = selectedRowsData.every(row => row.primaryRefundStatus === 'Failed');

  const manualRefundDisabled = (basketIds.length === 0 && orderIds.length === 0) || !allFailed;

  return (
    <Can permKey={permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_MANUAL_REFUND_BUTTON}>
      <Button
        data-testid="reconciliation-manual-refund-button"
        loading={manualRefundIsPending}
        onClick={() => setModalVisible(true)}
        icon={<RedoOutlined />}
        className={classes.manualRefundButton}
        type="primary"
        disabled={manualRefundDisabled}
      >
        {t('MANUAL_REFUND')}
      </Button>
      <ManualRefundModal
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
      />
    </Can>
  );
}
