import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const SupplierGroupNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.SUPPLIER.NEW')}
    />
  );
};

export default SupplierGroupNewHeader;
