import { t } from '@shared/i18n';

export const tableColumns = [
  {
    title: t('artisanOrderPage:MODAL.CANCEL_LOCALS_ORDER.PRODUCT'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name;
    },
  },
  {
    title: t('artisanOrderPage:MODAL.CANCEL_LOCALS_ORDER.COUNT'),
    dataIndex: 'count',
    key: 'count',
    width: 100,
    render: count => {
      return count;
    },
  },
  {
    title: t('artisanOrderPage:ACTION.REFUND_PRICE'),
    dataIndex: 'refundAmount',
    key: 'refundAmount',
    width: 100,
    render: refundAmount => {
      return refundAmount;
    },
  },
];
