import { useTranslation } from 'react-i18next';
import { Popconfirm, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { PromoStatus as PromoStatuses } from '@app/pages/Promo/types';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

export function PromoStatus() {
  const dispatch = useDispatch();
  const { t } = useTranslation('promoPage');

  const isPending = useSelector(PromoDetailSlice.selectors.isUpdateStatusPending);
  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);
  const status = useSelector(PromoDetailSlice.selectors.status);

  return (
    <Popconfirm
      title={status === PromoStatuses.Inactive ? t('MESSAGE.ACTIVATE_STATUS') : t('MESSAGE.INACTIVATE_STATUS')}
      onConfirm={() => dispatch(PromoDetailSlice.actions.toggleStatusRequest())}
      okText={t('global:OK')}
      cancelText={t('global:CANCEL')}
      disabled={isMaster}
    >
      <Switch
        loading={status === undefined || isPending}
        checked={status === PromoStatuses.Active}
        checkedChildren={t('global:ACTIVE')}
        unCheckedChildren={t('global:INACTIVE')}
        className={
          status === PromoStatuses.Active
            ? 'bg-success'
            : 'bg-danger'
        }
      />
    </Popconfirm>
  );
}
