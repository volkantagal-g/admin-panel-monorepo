import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';

import PaybackTransactionModal from './components/PaybackTransactionModal';
import PaymentTransactionModal from './components/PaymentTransactionModal';

const SingleTransaction = () => {
  const { t } = useTranslation('localsShopExternalTransaction');

  return (
    <AntCard title={t('BULK_TRANSACTION.TITLE')}>
      <PaybackTransactionModal />
      <PaymentTransactionModal />
    </AntCard>
  );
};

export default SingleTransaction;
