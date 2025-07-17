import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const MarketProductCategoryNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.MARKET_PRODUCT_CATEGORY.NEW')}
    />
  );
};

export default MarketProductCategoryNewHeader;
