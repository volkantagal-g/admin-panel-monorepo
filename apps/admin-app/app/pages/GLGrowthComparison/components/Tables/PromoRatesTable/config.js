import { Typography } from 'antd';

import { formatDateRange, getFormattedPercentage, getTextTypeForNumbers } from '../utils';

const { Title, Text } = Typography;

export const constantRules = (selectedDate1, selectedDate2, t) => [
  {
    title: () => <Title level={5}>{t('glGrowthComparisonPage:PROMO')}</Title>,
    dataIndex: 'promoCode',
    key: 'promoCode',
    width: '200px',
  },
  {
    title: () => <Title level={5}>{formatDateRange(selectedDate1)}</Title>,
    children: [
      {
        title: <b>#</b>,
        dataIndex: 'firstCount',
        key: 'firstCount',
        align: 'right',
        sorter: {
          compare: (a, b) => {
            return a.firstCount - b.firstCount;
          },
        },
        width: '60px',
      },
      {
        title: <b>%</b>,
        dataIndex: 'firstPercentage',
        key: 'firstPercentage',
        align: 'right',
        sorter: {
          compare: (a, b) => {
            return a.firstPercentage - b.firstPercentage;
          },
        },
        width: '60px',
        render: value => getFormattedPercentage(value),
      },
    ],
  },
  {
    title: () => <Title level={5}>{formatDateRange(selectedDate2)}</Title>,
    children: [
      {
        title: <b>#</b>,
        dataIndex: 'secondCount',
        key: 'secondCount',
        align: 'right',
        defaultSortOrder: 'descend',
        sorter: {
          compare: (a, b) => {
            return a.secondCount - b.secondCount;
          },
        },
        width: '60px',
      },
      {
        title: <b>%</b>,
        dataIndex: 'secondPercentage',
        key: 'secondPercentage',
        align: 'right',
        sorter: {
          compare: (a, b) => {
            return a.secondPercentage - b.secondPercentage;
          },
        },
        width: '60px',
        render: value => getFormattedPercentage(value),
      },
    ],
  },
  {
    title: () => <Title level={5}>{t('glGrowthComparisonPage:DIFFERENCE')}</Title>,
    children: [
      {
        title: <b>#</b>,
        dataIndex: 'diff',
        align: 'right',
        key: 'diff',
        render: value => <Text type={getTextTypeForNumbers(value)}>{value}</Text>,
        width: '60px',
        sorter: {
          compare: (a, b) => {
            return a.diff - b.diff;
          },
        },
      },
      {
        title: <b>%</b>,
        dataIndex: 'diffPercentage',
        align: 'right',
        key: 'diffPercentage',
        render: value => <Text type={getTextTypeForNumbers(value)}>{getFormattedPercentage(value)}</Text>,
        width: '60px',
        sorter: {
          compare: (a, b) => {
            return a.diffPercentage - b.diffPercentage;
          },
        },
      },
    ],
  },
];
