import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { exportCsvSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

export default function ExportCSVButton() {
  const exportCsvSelectorIsPending = useSelector(
    exportCsvSelector.getIsPending,
  );

  const { t } = useTranslation(['payoutTransactionsForDomains', 'global']);
  const dispatch = useDispatch();
  const exportCsv = () => {
    // t used for excel columns translation
    dispatch(Creators.exportCsvRequest({ t }));
  };

  return (
    <Button
      loading={exportCsvSelectorIsPending}
      disabled={exportCsvSelectorIsPending}
      onClick={() => exportCsv()}
      icon={<CloudDownloadOutlined />}
    >
      {t('global:EXPORT_CSV')}
    </Button>
  );
}
