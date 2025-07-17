import { Typography } from 'antd';

import { formatDateRange, numberFormatter, getDiffClassName } from '../../../utils';

const { Title } = Typography;

export const getTableColumns = (t, startDateRange, endDateRange) => ([
  {
    dataIndex: 'title',
    width: 220,
    render: title => <span>{t(`${title}`)}</span>,
  },
  {
    title: <Title level={5}>{startDateRange ? formatDateRange(startDateRange) : '-'}</Title>,
    children: [
      {
        title: '#',
        dataIndex: `${formatDateRange(startDateRange)}_count`,
        align: 'right',
        width: 60,
        render: count => <span>{numberFormatter(count)}</span>,
      },
      {
        title: '%',
        dataIndex: `${formatDateRange(startDateRange)}_ratio`,
        align: 'right',
        width: 60,
        render: () => <span>-</span>,
      },
    ],
  },
  {
    title: <Title level={5}>{endDateRange ? formatDateRange(endDateRange) : '-'}</Title>,
    children: [
      {
        title: '#',
        dataIndex: `${formatDateRange(endDateRange)}_count`,
        align: 'right',
        width: 60,
        render: count => <span>{numberFormatter(count)}</span>,
      },
      {
        title: '%',
        dataIndex: `${formatDateRange(endDateRange)}_ratio`,
        align: 'right',
        width: 60,
        render: () => <span>-</span>,
      },
    ],
  },
  {
    title: <Title level={5}>{t('global:DIFFERENCE')}</Title>,
    children: [
      {
        title: '#',
        align: 'right',
        width: 60,
        render: row => {
          const minuend = row[`${formatDateRange(endDateRange)}_count`] || 0;
          const subtrahend = row[`${formatDateRange(startDateRange)}_count`] || 0;

          const diff = minuend - subtrahend;

          return <span className={getDiffClassName(diff)}>{numberFormatter(diff)}</span>;
        },
      },
      {
        title: '%',
        align: 'right',
        width: 60,
        render: () => <span>-</span>,
      },
    ],
  },
]);
