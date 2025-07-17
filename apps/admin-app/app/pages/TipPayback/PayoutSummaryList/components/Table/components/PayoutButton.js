import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { payoutPayoutSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

export default function PayoutButton({ id, filters, isActive }) {
  const { t } = useTranslation('payoutSummaryPage');
  const payoutPayoutSelectorPendingList = useSelector(payoutPayoutSelector.getPendingList);
  const dispatch = useDispatch();
  const isPending = payoutPayoutSelectorPendingList[id];

  const handlePayout = () => {
    dispatch(
      Creators.payoutRequest({ id, filters }),
    );
  };

  return (
    <Popconfirm
      disabled={isPending || !isActive}
      title={t('payoutSummaryPage:CONFIRM_MESSAGE')}
      onConfirm={handlePayout}
      okText={t('global:YES')}
      cancelText={t('global:NO')}
    >
      <Button loading={isPending} disabled={isPending || !isActive} type="default" size="small">
        {t('PAYOUT_BUTTON')}
      </Button>
    </Popconfirm>
  );
}
