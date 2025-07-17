import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { cancelPayoutSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

export default function CancelButton({ id, filters, isActive }) {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const cancelPayoutSelectorPendingList = useSelector(cancelPayoutSelector.getPendingList);

  const dispatch = useDispatch();

  const isPending = cancelPayoutSelectorPendingList[id];
  const handleCancel = () => {
    dispatch(
      Creators.cancelPayoutRequest({ id, filters }),
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
        {t('global:CANCEL')}
      </Button>
    </Popconfirm>

  );
}
