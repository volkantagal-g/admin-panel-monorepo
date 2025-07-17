import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('marketProductMasterCategoryPage');

  return (
    <>
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.MARKET_PRODUCT_MASTER_CATEGORY.NEW')}
      />
    </>
  );
};

export default Header;
