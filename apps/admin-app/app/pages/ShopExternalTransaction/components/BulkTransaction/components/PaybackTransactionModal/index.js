import { useTranslation } from 'react-i18next';
import { MinusOutlined } from '@ant-design/icons';

import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';

import TransactionModal from '../TransactionModal';

const PaybackTransactionModal = () => {
  const { t } = useTranslation('localsShopExternalTransaction');

  const getConfirmationModalContent = ({
    shopCount,
    currency,
    amount,
  }) => t('BULK_TRANSACTION.PAYBACK.CONFIRMATION_MODAL.CONTENT', {
    shopCount,
    currency,
    amount,
  });

  return (
    <TransactionModal
      title={t('BULK_TRANSACTION.PAYBACK.TITLE')}
      warningMessage={t('BULK_TRANSACTION.WARNING_MESSAGES.PAYBACK')}
      confirmationModalTitle={t('BULK_TRANSACTION.PAYBACK.CONFIRMATION_MODAL.TITLE')}
      getConfirmationModalContent={getConfirmationModalContent}
      manualType={MANUAL_TYPES.NEGATIVE}
      buttonText={(
        <>
          <span>{t('BULK_TRANSACTION.BUTTON_LABELS.PAYBACK')}</span>
          <MinusOutlined />
        </>
      )}
    />
  );
};

export default PaybackTransactionModal;
