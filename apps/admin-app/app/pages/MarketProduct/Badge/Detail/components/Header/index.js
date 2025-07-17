import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('marketProductBadgePage');

  return (
    <>
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.MARKET_PRODUCT_BADGE.DETAIL')}
      />
    </>
  );
};

export default Header;
