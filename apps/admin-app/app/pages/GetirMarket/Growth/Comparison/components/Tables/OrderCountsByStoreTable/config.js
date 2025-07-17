import { isNumber } from 'lodash';
import { Typography, Tooltip } from 'antd';

import { percentFormatWithOneDecimal } from '@shared/utils/localization';
import { formatDateRange, numberFormatter, calculatePercentDiff, getDiffClassName } from '../../../utils';
import RedirectText from '@shared/components/UI/RedirectText';
import { ROUTE } from '@app/routes';
import permKeys from '@shared/shared/permKey.json';
import { calculateOrderCountDiff } from './utils';

const { Title } = Typography;

export const getTableColumns = (t, startDateRange, endDateRange, warehousesMap) => {
  const formattedStartDateRange = formatDateRange(startDateRange);
  const formattedEndRange = formatDateRange(endDateRange);

  return [
    {
      dataIndex: 'id',
      width: 220,
      render: id => {
        const warehouseDetailPath = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', id);
        return (
          <RedirectText
            to={warehouseDetailPath}
            permKey={permKeys.PAGE_WAREHOUSE_DETAIL}
            text={warehousesMap[id] || id}
          />
        );
      },
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
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:TOTAL_ORDER_RATE')}>%</Tooltip>,
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
          defaultSortOrder: 'ascend',
          showSorterTooltip: false,
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:TOTAL_ORDER_RATE')}>%</Tooltip>,
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
          sorter: (a, b) => {
            const diffA = calculateOrderCountDiff({ row: a, formattedStartDateRange, formattedEndRange });
            const diffB = calculateOrderCountDiff({ row: b, formattedStartDateRange, formattedEndRange });

            return diffA - diffB;
          },
          showSorterTooltip: false,
          render: row => {
            const diff = calculateOrderCountDiff({ row, formattedStartDateRange, formattedEndRange });

            return <span className={getDiffClassName(diff)}>{numberFormatter(diff)}</span>;
          },
        },
        {
          title: <Tooltip title={t('getirMarketGrowthComparisonPage:GROWTH_RATE')}>%</Tooltip>,
          align: 'right',
          width: 60,
          sorter: (a, b) => {
            const diffA = calculatePercentDiff(a[`${formattedStartDateRange}_ratio`], a[`${formattedEndRange}_ratio`]);
            const diffB = calculatePercentDiff(b[`${formattedStartDateRange}_ratio`], b[`${formattedEndRange}_ratio`]);

            return diffA - diffB;
          },
          showSorterTooltip: false,
          render: row => {
            const diff = calculatePercentDiff(row[`${formattedStartDateRange}_ratio`], row[`${formattedEndRange}_ratio`]);

            return <span className={getDiffClassName(diff)}>{isNumber(diff) ? percentFormatWithOneDecimal.format(diff) : '- %'}</span>;
          },
        },
      ],
    },
  ];
};
