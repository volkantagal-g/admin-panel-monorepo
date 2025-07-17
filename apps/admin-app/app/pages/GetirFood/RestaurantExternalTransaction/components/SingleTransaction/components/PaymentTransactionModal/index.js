import { useTranslation } from 'react-i18next';

import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';
import TransactionModal from '../TransactionModal';

const PaymentTransactionModal = ({ isModalVisible, closeModal }) => {
  const { t } = useTranslation('foodRestaurantExternalTransaction');

  const getConfirmationModalContent = ({
    restaurantName,
    currency,
    amount,
    paymentDate,
  }) => t(paymentDate ? 'SINGLE_TRANSACTION.PAYMENT.CONFIRMATION_MODAL.CONTENT_WITH_PAYMENT_DATE'
    : 'SINGLE_TRANSACTION.PAYMENT.CONFIRMATION_MODAL.CONTENT', {
    restaurantName,
    currency,
    amount,
    ...(paymentDate && { paymentDate }),
  });

  return (
    <TransactionModal
      title={t('SINGLE_TRANSACTION.PAYMENT.TITLE')}
      confirmationModalTitle={t('SINGLE_TRANSACTION.PAYMENT.CONFIRMATION_MODAL.TITLE')}
      getConfirmationModalContent={getConfirmationModalContent}
      isModalVisible={isModalVisible}
      closeModal={closeModal}
      manualType={MANUAL_TYPES.POSITIVE}
    />
  );
};

export default PaymentTransactionModal;
