import { Typography } from 'antd';

import { formatDateRange, getFormattedPercentage, getTextTypeForNumbers } from '../utils';

const { Title, Text } = Typography;

export const constantRules = (startDate, endDate, t) => [
  {
    title: () => <Title level={5}># {t('glGrowthComparisonPage:ORDER')}</Title>,
    dataIndex: 'orderRank',
    key: 'orderRank',
  },
  {
    title: () => <Title level={5}>{formatDateRange(startDate)}</Title>,
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
        render: value => getFormattedPercentage(value),
      },
    ],
  },
  {
    title: () => <Title level={5}>{formatDateRange(endDate)}</Title>,
    children: [
      {
        title: <b>#</b>,
        dataIndex: 'secondCount',
        key: 'secondCount',
        align: 'right',
        sorter: {
          compare: (a, b) => {
            return a.secondCount - b.secondCount;
          },
        },
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
        key: 'diff',
        align: 'right',
        render: value => <Text type={getTextTypeForNumbers(value)}>{value}</Text>,
        sorter: {
          compare: (a, b) => {
            return a.diff - b.diff;
          },
        },
      },
      {
        title: <b>%</b>,
        dataIndex: 'diffPercentage',
        key: 'diffPercentage',
        align: 'right',
        render: value => <Text type={getTextTypeForNumbers(value)}>{getFormattedPercentage(value)}</Text>,
        sorter: {
          compare: (a, b) => {
            return a.diffPercentage - b.diffPercentage;
          },
        },
      },
    ],
  },
];
