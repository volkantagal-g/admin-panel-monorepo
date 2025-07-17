import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';

import TransactionModal from '../TransactionModal';

const PaymentTransactionModal = () => {
  const { t } = useTranslation('foodRestaurantExternalTransaction');

  const getConfirmationModalContent = ({
    restaurantCount,
    currency,
    amount,
  }) => t('BULK_TRANSACTION.PAYMENT.CONFIRMATION_MODAL.CONTENT', {
    restaurantCount,
    currency,
    amount,
  });

  return (
    <TransactionModal
      title={t('BULK_TRANSACTION.PAYMENT.TITLE')}
      warningMessage={t('BULK_TRANSACTION.WARNING_MESSAGES.PAYMENT')}
      confirmationModalTitle={t('BULK_TRANSACTION.PAYMENT.CONFIRMATION_MODAL.TITLE')}
      getConfirmationModalContent={getConfirmationModalContent}
      manualType={MANUAL_TYPES.POSITIVE}
      buttonText={(
        <>
          <span>{t('BULK_TRANSACTION.BUTTON_LABELS.PAYMENT')}</span>
          <PlusOutlined />
        </>
      )}
    />
  );
};

export default PaymentTransactionModal;
