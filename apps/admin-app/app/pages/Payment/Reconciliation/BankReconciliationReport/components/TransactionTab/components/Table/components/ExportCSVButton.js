import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import permKey from '@shared/shared/permKey.json';
import { driveExportCsvSelector, getTransactionFilters } from '../../../../../redux/selectors';
import { Creators } from '../../../../../redux/actions';
import { usePermission } from '@shared/hooks';

export default function ExportCSVButton() {
  const driveExportCsvSelectorIsPending = useSelector(driveExportCsvSelector.getIsPending);
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const { Can } = usePermission();
  const dispatch = useDispatch();
  const filters = useSelector(getTransactionFilters);

  const exportCsv = () => {
    // t used for excel columns translation
    const { page, pageSize, ...restFilter } = filters;
    dispatch(Creators.driveExportCsvRequest({ ...restFilter, t }));
  };

  return (
    <Can permKey={permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_DRIVE_EXPORT_EXCEL_BUTTON}>
      <Button loading={driveExportCsvSelectorIsPending} disabled={driveExportCsvSelectorIsPending} onClick={() => exportCsv()} icon={<CloudDownloadOutlined />}>
        {t('global:EXPORT_CSV')}
      </Button>
    </Can>
  );
}
