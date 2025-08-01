import { getLangKey } from '@shared/i18n';

export const getTableColumns = ({ t, currencyFormatter }) => [
  {
    title: t('global:PRODUCT'),
    key: 'name',
    dataIndex: 'name',
    render: name => name?.[getLangKey()],
  },
  {
    title: t('global:COUNT'),
    key: 'count',
    dataIndex: 'count',
    render: (count, { weightInfo, orderCount }) => (weightInfo ? `${orderCount ? orderCount / 1000 : count}kg` : count),
  },
  {
    title: t('global:AMOUNT'),
    render: ({
      totalAmount,
      price,
      basketTotalAmount,
      orderCount,
      weightInfo,
    }) => currencyFormatter(
      weightInfo ? basketTotalAmount : totalAmount ?? price * orderCount,
    ),
  },
];
