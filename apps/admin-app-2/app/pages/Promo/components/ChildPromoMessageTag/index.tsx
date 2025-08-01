import { useTranslation } from 'react-i18next';
import { Tag } from 'antd';
import React from 'react';

import { BulkOpMessage } from '@app/pages/Promo/types';

export function ChildPromoMessageTag({ value }: { value: BulkOpMessage }) {
  const { t } = useTranslation('promoPage');
  return (
    <Tag color={value === BulkOpMessage.Success ? 'success' : 'error'} className="mr-0">
      {t(`MESSAGE.${value}`)}
    </Tag>
  );
}
