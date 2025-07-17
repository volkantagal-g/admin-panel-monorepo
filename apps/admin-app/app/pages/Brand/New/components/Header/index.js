import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const BrandNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.BRAND.NEW')}
    />
  );
};

export default BrandNewHeader;
