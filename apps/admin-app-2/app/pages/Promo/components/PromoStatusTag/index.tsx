import { Tag, TagProps } from 'antd';

import React from 'react';

import { PromoStatus } from '@app/pages/Promo/types';
import { promoStatuses } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';

type PropTypes = {
  status: PromoStatus
}

const colorMap: Record<PromoStatus, TagProps['color']> = {
  [PromoStatus.Active]: 'success',
  [PromoStatus.Inactive]: 'error',
  [PromoStatus.Expired]: 'default',
  [PromoStatus.OrderLimitReached]: 'warning',
  [PromoStatus.ClientLimitReached]: 'warning',
  [PromoStatus.Used]: 'warning',
  [PromoStatus.Preparing]: 'warning',

};

export function PromoStatusTag({ status }: PropTypes) {
  return (
    <Tag color={colorMap[status]}>
      {promoStatuses[status]?.[getLangKey()]}
    </Tag>
  );
}
