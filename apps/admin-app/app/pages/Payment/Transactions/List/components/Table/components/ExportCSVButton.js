import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ExportCSVButton() {
  const { t } = useTranslation(['paymentTransactionPage', 'global']);

  return (
    <Button disabled={false} icon={<CloudDownloadOutlined />}>
      {t('global:EXPORT_CSV')}
    </Button>
  );
}
