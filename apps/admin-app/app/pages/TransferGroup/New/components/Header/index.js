import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const TransferGroupNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.TRANSFER_GROUP.NEW')}
    />
  );
};

export default TransferGroupNewHeader;
