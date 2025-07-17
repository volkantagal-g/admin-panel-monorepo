import { isNumber } from 'lodash';
import { Typography, Tooltip } from 'antd';

import { percentFormatWithOneDecimal } from '@shared/utils/localization';
import { formatDateRange, numberFormatter, calculatePercentDiff, getDiffClassName } from '../../../utils';

const { Title } = Typography;

export const getTableColumns = (t, startDateRange, endDateRange) => {
  const formattedStartDateRange = formatDateRange(startDateRange);
  const formattedEndRange = formatDateRange(endDateRange);

  return [
    {
      title: <Title level={5}># {t('global:ORDER')}</Title>,
      dataIndex: 'orderRank',
      width: 220,
      render: value => ((value === 'TOTAL') ? <span>{t('global:TOTAL')}</span> : value),
    },
    {
      title: <Title level={5}>{startDateRange ? formattedStartDateRange : '-'}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          dataIndex: `${formattedStartDateRange}_orderCount`,
          align: 'right',
          width: 60,
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => (a?.[`${formattedStartDateRange}_orderCount`] || 0) - (b?.[`${formattedStartDateRange}_orderCount`] || 0),
          showSorterTooltip: false,
        },
        {
          title: <Tooltip title={t('global:RATIO_TO_TOTAL')}>%</Tooltip>,
          dataIndex: `${formattedStartDateRange}_ratio`,
          align: 'right',
          width: 60,
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedStartDateRange}_ratio`] || 0) - (b?.[`${formattedStartDateRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: <Title level={5}>{endDateRange ? formattedEndRange : '-'}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          dataIndex: `${formattedEndRange}_orderCount`,
          align: 'right',
          width: 60,
          render: count => <span>{numberFormatter(count)}</span>,
          sorter: (a, b) => (a?.[`${formattedEndRange}_orderCount`] || 0) - (b?.[`${formattedEndRange}_orderCount`] || 0),
          showSorterTooltip: false,
        },
        {
          title: <Tooltip title={t('global:RATIO_TO_TOTAL')}>%</Tooltip>,
          dataIndex: `${formattedEndRange}_ratio`,
          align: 'right',
          width: 60,
          render: ratio => <span>{ratio ? percentFormatWithOneDecimal.format(ratio || 0) : '- %'}</span>,
          sorter: (a, b) => (a?.[`${formattedEndRange}_ratio`] || 0) - (b?.[`${formattedEndRange}_ratio`] || 0),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: <Title level={5}>{t('global:DIFFERENCE')}</Title>,
      children: [
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:ORDER_COUNT')}>#</Tooltip>,
          align: 'right',
          width: 60,
          render: row => {
            const minuend = row[`${formattedEndRange}_orderCount`] || 0;
            const subtrahend = row[`${formattedStartDateRange}_orderCount`] || 0;

            const diff = minuend - subtrahend;

            return <span className={getDiffClassName(diff)}>{numberFormatter(diff)}</span>;
          },
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:GROWTH_RATE')}>%</Tooltip>,
          align: 'right',
          width: 60,
          render: row => {
            const diff = calculatePercentDiff(row[`${formattedStartDateRange}_ratio`], row[`${formattedEndRange}_ratio`]);

            return <span className={getDiffClassName(diff)}>{isNumber(diff) ? percentFormatWithOneDecimal.format(diff) : '- %'}</span>;
          },
        },
      ],
    },
  ];
};
