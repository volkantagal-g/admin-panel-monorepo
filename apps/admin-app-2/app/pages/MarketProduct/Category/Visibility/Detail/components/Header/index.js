import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.MARKET_PRODUCT_CATEGORY.VISIBILITY.DETAIL')}
    />
  );
};

export default Header;
