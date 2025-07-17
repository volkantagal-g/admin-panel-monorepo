import { currency } from '@shared/utils/common';

export const generateColumns = ({ t }) => [
  {
    title: t('MODAL.CANCEL_FOOD_ORDER.PRODUCT'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name;
    },
  },
  {
    title: t('MODAL.CANCEL_FOOD_ORDER.COUNT'),
    dataIndex: 'count',
    key: 'count',
    width: 100,
    render: count => {
      return count || 1;
    },
  },
  {
    title: t('ACTION.REFUND_PRICE'),
    dataIndex: 'refundAmount',
    key: 'refundAmount',
    width: 100,
    render: refundAmount => {
      return `${refundAmount.toFixed(2)} ${currency()}`;
    },
  },
];
