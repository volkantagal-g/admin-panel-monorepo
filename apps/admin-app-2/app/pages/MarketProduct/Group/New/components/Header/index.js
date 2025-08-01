import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const MarketProductGroupNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.MARKET_PRODUCT_GROUP.NEW')}
    />
  );
};

export default MarketProductGroupNewHeader;
