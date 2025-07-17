import { useSelector } from 'react-redux';

import { Alert } from 'antd';

import { useTranslation } from 'react-i18next';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

export function InactiveParentAlert() {
  const { t } = useTranslation('promoPage');
  const activePromoCount = useSelector(PromoDetailSlice.selectors.activePromoCount);

  if (activePromoCount === 0) {
    return <Alert message={t('PARENT_PROMO_DETAILS.NO_ACTIVE_PROMO_WARNING')} type="error" showIcon />;
  }

  return null;
}
