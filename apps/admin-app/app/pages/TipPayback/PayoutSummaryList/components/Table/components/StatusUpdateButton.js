import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { statusUpdatePayoutSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

export default function StatusUpdateButton({ id, filters, isActive }) {
  const { t } = useTranslation('payoutSummaryPage');
  const dispatch = useDispatch();

  const statusUpdatePayoutSelectorPendingList = useSelector(statusUpdatePayoutSelector.getPendingList);
  const isPending = statusUpdatePayoutSelectorPendingList[id];
  const handleStatusUpdate = () => {
    dispatch(
      Creators.statusUpdateRequest({ id, filters }),
    );
  };
  return (
    <Popconfirm
      disabled={isPending || !isActive}
      title={t('payoutSummaryPage:CONFIRM_MESSAGE')}
      onConfirm={handleStatusUpdate}
      okText={t('global:YES')}
      cancelText={t('global:NO')}
    >
      <Button loading={isPending} disabled={isPending || !isActive} type="default" size="small">
        {t('STATUS_UPDATE')}
      </Button>
    </Popconfirm>
  );
}
