import { get } from 'lodash';

import { t, getLangKey } from '@shared/i18n';

export const tableColumns = [
  {
    title: t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.PRODUCT_TO_BE_REFUNDED'),
    key: 'name',
    width: 100,
    render: data => `${get(data, ['name', getLangKey()])} - ₺${get(data, 'price')}`,
  },
  {
    title: t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.REFUND_TYPE'),
    key: 'status',
    width: 100,
    render: data => (get(data, 'isFullRefund') ? t('foodOrderPage:FULL_RETURN') : t('foodOrderPage:IN_PRODUCT_REFUND')),
  },
  {
    title: t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.REFUND_AMOUNT'),
    key: 'amount',
    width: 100,
    render: data => {
      const amountString = get(data, 'amount') || get(data, 'discountedPrice');
      return `₺${amountString}`;
    },
  },
];
