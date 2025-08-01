import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import permKey from '@shared/shared/permKey.json';
import { exportCsvSelector, getOrderFilters } from '../../../../../redux/selectors';
import { Creators } from '../../../../../redux/actions';
import { usePermission } from '@shared/hooks';

export default function ExportCSVButton() {
  const exportCsvSelectorIsPending = useSelector(exportCsvSelector.getIsPending);
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const { Can } = usePermission();

  const dispatch = useDispatch();
  const filters = useSelector(getOrderFilters);
  const exportCsv = () => {
    // t used for excel columns translation
    const {
      orderIds, transactionIds, checkoutStartDate,
      checkoutEndDate, reconciliationCheckStartDate,
      reconciliationCheckEndDate, sourceOfStatements,
      domainTypes, externalPaymentTokens,
      isRefundable, refundStatus, orderStatus, basketIds,
    } = filters;
    const exportCsvPayload = {
      orderIds,
      transactionIds,
      checkoutStartDate,
      checkoutEndDate,
      reconciliationCheckEndDate,
      reconciliationCheckStartDate,
      sourceOfStatements,
      domainTypes,
      externalPaymentTokens,
      isRefundable,
      refundStatus,
      orderStatus,
      basketIds,
    };
    dispatch(Creators.exportCsvRequest({ ...exportCsvPayload, t }));
  };

  return (
    <Can permKey={permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_EXCEL_BUTTON}>
      <Button loading={exportCsvSelectorIsPending} disabled={exportCsvSelectorIsPending} onClick={() => exportCsv()} icon={<CloudDownloadOutlined />}>
        {t('global:EXPORT_CSV')}
      </Button>
    </Can>
  );
}
