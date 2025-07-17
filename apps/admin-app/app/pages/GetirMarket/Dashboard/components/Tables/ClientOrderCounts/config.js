import Text from 'antd/lib/typography/Text';

export const getColumns = (classes, t) => [
  {
    title: t('getirMarketDashboardPage:ORDER'),
    dataIndex: 'rank',
    key: 'rank',
    width: 43,
    align: 'right',
    className: classes.smallerPadding,
  },
  {
    title: t('getirMarketDashboardPage:CLIENT_SHORT'),
    dataIndex: 'count',
    key: 'count',
    className: classes.smallerPadding,
    align: 'right',
  },
  {
    title: '%',
    dataIndex: 'ratio',
    key: 'ratio',
    width: 25,
    className: classes.smallerPadding,
    align: 'right',
    render: data => <Text strong>{data}</Text>,
  },
];
