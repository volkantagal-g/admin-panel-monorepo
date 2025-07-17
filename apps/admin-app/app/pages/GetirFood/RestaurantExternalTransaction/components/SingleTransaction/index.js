import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { createRestaurantExternalTransaction } from '@app/pages/GetirFood/RestaurantExternalTransaction/redux/selectors';

import PaybackTransactionModal from './components/PaybackTransactionModal';
import PaymentTransactionModal from './components/PaymentTransactionModal';
import TransactionButtons from './components/TransactionButtons';

const SingleTransaction = () => {
  const { t } = useTranslation('foodRestaurantExternalTransaction');

  const isPending = useSelector(createRestaurantExternalTransaction.getIsPending);

  const [isPaybackModalVisible, setIsPaybackModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const closePaybackModal = () => {
    setIsPaybackModalVisible(false);
  };

  const openPaybackModal = () => {
    setIsPaybackModalVisible(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalVisible(false);
  };

  const openPaymentModal = () => {
    setIsPaymentModalVisible(true);
  };

  return (
    <AntCard title={t('SINGLE_TRANSACTION.TITLE')}>
      <TransactionButtons
        openPaybackModal={openPaybackModal}
        openPaymentModal={openPaymentModal}
        paybackButtonLabel={t('SINGLE_TRANSACTION.BUTTON_LABELS.PAYBACK')}
        paymentButtonLabel={t('SINGLE_TRANSACTION.BUTTON_LABELS.PAYMENT')}
        paybackWarningMessage={t('SINGLE_TRANSACTION.WARNING_MESSAGES.PAYBACK')}
        paymentWarningMessage={t('SINGLE_TRANSACTION.WARNING_MESSAGES.PAYMENT')}
        isPending={isPending}
      />
      <PaybackTransactionModal
        isModalVisible={isPaybackModalVisible}
        closeModal={closePaybackModal}
      />
      <PaymentTransactionModal
        isModalVisible={isPaymentModalVisible}
        closeModal={closePaymentModal}
      />
    </AntCard>
  );
};

export default SingleTransaction;
