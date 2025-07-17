import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import TransactionsTable from './TransactionsTable';
import RefundDetail from './RefundDetail';
import {
  refundDetailForm,
  refundTable,
  userRefundPending,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';

export type EventType = {
  balance: number;
  amount: number;
  payment: {
    method: string;
    provider: string;
  };
  fullRefund: boolean;
  key: string;
  eventId: string;
};

export type CurrencyType = {
  codeAlpha2: string,
  codeAlpha3: string,
  codeName: string,
  codeNumeric: string,
  decimalSeparator: string,
  precision: string,
  precisprefixSymbolion: string,
  suffixSymbol: string,
  symbol: string,
  thousandSeparator: string,
};

export type RefundModalDataType = {
  events: EventType[];
  merchantId: string;
  transactionId: string;
  currency: CurrencyType;
};

type RefundModalProps = {
  data: RefundModalDataType;
  isButtonDisabled: boolean;
  totalProcessesEventLength: number;
};

const RefundModal = ({
  data,
  isButtonDisabled,
  totalProcessesEventLength,
}: RefundModalProps): JSX.Element => {
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const refundTableData = useSelector(refundTable.getData);
  const refundDetailFormIsConfirmed = useSelector(
    refundDetailForm.getIsConfirmed,
  );
  const refundDetailFormRefundReason = useSelector(
    refundDetailForm.getRefundReason,
  );
  const refundDetailFormOtherRefundReason = useSelector(
    refundDetailForm.getOtherRefundReason,
  );
  const userRefundIsPending = useSelector(userRefundPending.getIsPending);
  const transactionId = data?.transactionId;
  const merchantId = data?.merchantId;
  const refundReferenceId = transactionId + totalProcessesEventLength;

  const showModal = () => {
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    const description = `${refundDetailFormRefundReason} ${
      refundDetailFormOtherRefundReason
        ? `- ${refundDetailFormOtherRefundReason}`
        : ''
    }`;
    const requestBody = {
      transactionId,
      merchantId,
      refundReferenceId,
      description,
      refunds: refundTableData.filter((refund: EventType) => refund.amount > 0).map((refund: EventType) => {
        return {
          eventId: refund?.eventId,
          amount: refund?.amount,
        };
      }),
    };
    dispatch(Creators.userRefundRequest({ ...requestBody }));
    setModalOpen(false);
  };

  return (
    <>
      <Button
        disabled={isButtonDisabled || userRefundIsPending}
        type="primary"
        loading={userRefundIsPending}
        onClick={showModal}
      >
        {t('paymentTransactionPage:REFUND')}
      </Button>
      <Modal
        title={t('paymentTransactionPage:REFUND_TRANSACTION')}
        visible={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={userRefundIsPending}
        width="1000px"
        okText={t('paymentTransactionPage:REFUND')}
        destroyOnClose
        okButtonProps={{ disabled: !refundDetailFormIsConfirmed }}
      >
        <TransactionsTable events={data.events} currency={data.currency} />
        <RefundDetail currency={data.currency} />
      </Modal>
    </>
  );
};

export default RefundModal;
