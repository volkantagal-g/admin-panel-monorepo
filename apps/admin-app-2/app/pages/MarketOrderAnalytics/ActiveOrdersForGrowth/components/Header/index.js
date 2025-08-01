import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = () => {
  const { t } = useTranslation('global');

  return (
    <PageTitleHeader title={t('PAGE_TITLE.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_GROWTH')} />
  );
};

export default Header;
