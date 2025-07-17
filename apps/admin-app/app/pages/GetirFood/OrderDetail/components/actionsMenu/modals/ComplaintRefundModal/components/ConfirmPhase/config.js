import { currency } from '@shared/utils/common';

export const tableColumns = t => [
  {
    title: <b>{t('COMPLAINT_REFUND_MODAL.REFUNDED_PRODUCT')}</b>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <b>{t('COMPLAINT_REFUND_MODAL.REFUND_TYPE')}</b>,
    dataIndex: 'refundType',
    key: 'refundType',
    render: refundType => t(`COMPLAINT_REFUND_MODAL.${refundType}`),
  },
  {
    title: <b>{t('COMPLAINT_REFUND_MODAL.REFUND_AMOUNT')}</b>,
    dataIndex: 'amount',
    key: 'amount',
    render: amount => `${currency()}${amount}`,
  },
];
