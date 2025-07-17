import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { triggerReportPayoutSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

export default function ReportButton({ id, filters, isActive }) {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const triggerReportSelectorPendingList = useSelector(triggerReportPayoutSelector.getPendingList);

  const dispatch = useDispatch();

  const isPending = triggerReportSelectorPendingList[id];
  const handleCancel = () => {
    dispatch(
      Creators.triggerReportRequest({ id, filters }),
    );
  };
  return (
    <Popconfirm
      disabled={isPending || !isActive}
      title={t('payoutSummaryPage:CONFIRM_MESSAGE')}
      onConfirm={handleCancel}
      okText={t('global:YES')}
      cancelText={t('global:NO')}
    >
      <Button loading={isPending} disabled={isPending || !isActive} type="default" size="small">
        {t('payoutSummaryPage:SEND_REPORT')}
      </Button>
    </Popconfirm>

  );
}
