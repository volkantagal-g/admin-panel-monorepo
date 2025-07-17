import { t } from '@shared/i18n';

export const tableColumns = [
  {
    title: t('artisanOrderPage:ACTION.REFUND_BY'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name;
    },
  },
  {
    title: t('artisanOrderPage:ACTION.REFUND_DATE'),
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: date => {
      return date;
    },
  },
];
