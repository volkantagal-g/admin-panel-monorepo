import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

import { exportExcel } from '../../redux/selectors';

const ExportExcelButton = ({ onExportExcel }) => {
  const { t } = useTranslation('global');
  const isPending = useSelector(exportExcel.getIsPending);

  return (
    <Button
      disabled={isPending} 
      onClick={onExportExcel} 
      type="primary" 
      icon={<CloudDownloadOutlined />}
    >
      {t('global:EXPORT_EXCEL')}
    </Button>
  );
};

export default ExportExcelButton;
