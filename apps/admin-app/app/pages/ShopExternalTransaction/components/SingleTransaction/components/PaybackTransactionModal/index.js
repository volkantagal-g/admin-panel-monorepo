import { useTranslation } from 'react-i18next';

import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';
import TransactionModal from '../TransactionModal';

const PaybackTransactionModal = ({ isModalVisible, closeModal }) => {
  const { t } = useTranslation('localsShopExternalTransaction');

  const getConfirmationModalContent = ({
    shopName,
    currency,
    amount,
    paymentDate,
  }) => t(paymentDate ? 'SINGLE_TRANSACTION.PAYBACK.CONFIRMATION_MODAL.CONTENT_WITH_PAYMENT_DATE' : 'SINGLE_TRANSACTION.PAYBACK.CONFIRMATION_MODAL.CONTENT', {
    shopName,
    currency,
    amount,
    ...(paymentDate && { paymentDate }),
  });

  return (
    <TransactionModal
      title={t('SINGLE_TRANSACTION.PAYBACK.TITLE')}
      confirmationModalTitle={t('SINGLE_TRANSACTION.PAYBACK.CONFIRMATION_MODAL.TITLE')}
      getConfirmationModalContent={getConfirmationModalContent}
      isModalVisible={isModalVisible}
      closeModal={closeModal}
      manualType={MANUAL_TYPES.NEGATIVE}
    />
  );
};

export default PaybackTransactionModal;
