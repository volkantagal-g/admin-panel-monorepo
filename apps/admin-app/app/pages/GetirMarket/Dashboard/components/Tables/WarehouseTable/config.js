import { Tooltip, Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

const getPercentage = data => (data.missedOrderCount / (data.orderCount + data.missedOrderCount)) * 100;

export const getColumns = ({ t, classes, onExpandClick }) => {
  const template = [
    {
      title: (
        <Tooltip title={t('global:WAREHOUSE')}>
          <Text className={classes.textBold}>{t('global:WAREHOUSE')}</Text>
        </Tooltip>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 66,
      showSorterTooltip: false,
      sorter: (a, b) => {
        // children batch stats don't have name
        if (!a.children || !b.children) {
          return 0;
        }
        return a.name.localeCompare(b.name);
      },
      className: `${classes.smallerPadding} ${classes.clickable}`,
      onCell: ({ key }) => ({ onClick: () => onExpandClick(key) }),
      render: data => <span title={data}>{data}</span>,
    },
    {
      title: (
        <Tooltip title={t('CITY')}>
          <Text className={classes.textBold}>{t('CITY_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'city',
      key: 'city',
      align: 'center',
      className: classes.smallerPadding,
      width: 26,
      showSorterTooltip: false,
      sorter: (a, b) => {
        // children batch stats don't have city name
        if (!a.children || !b.children) {
          return 0;
        }
        return a?.city?.localeCompare(b?.city);
      },
      render: (data, record) => {
        // expanded rows have batch stats value
        if (typeof record.batchStatIndex === 'number') {
          if (record.batchStatIndex === 0) {
            return (
              <Tooltip title={t('getirMarketDashboardPage:NON_BATCHED')}>
                <Text>{t('getirMarketDashboardPage:NON_BATCHED_SHORT')}</Text>
              </Tooltip>
            );
          }
          return record.batchStatIndex;
        }

        return (
          <Tooltip title={data}>
            {data?.substring(0, 3)?.toUpperCase() || ''}
          </Tooltip>
        );
      },
    },
    {
      title: (
        <Tooltip title={t('ORDER')}>
          <Text className={classes.textBold}>{t('ORDER_SHORT_FOR_TABLE')}</Text>
        </Tooltip>
      ),
      dataIndex: 'orderCount',
      key: 'orderCount',
      align: 'right',
      className: classes.smallerPadding,
      width: 56,
      showSorterTooltip: false,
      sorter: (a, b) => a.orderCount - b.orderCount,
      render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
    },
    {
      title: (
        <Tooltip title={t('MISSED_ORDER')}>
          <Text className={classes.textBold}>{t('MISSED_ORDER_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'missedOrderCount',
      key: 'missedOrderCount',
      align: 'right',
      className: classes.smallerPadding,
      width: 42,
      showSorterTooltip: false,
      sorter: (a, b) => a.missedOrderCount - b.missedOrderCount,
      render: (data, record) => {
        // expanded rows have no missed order values
        if (!record.children) {
          return '-';
        }
        return numberFormat({ maxDecimal: 0 }).format(data || 0);
      },
    },
    {
      title: (
        <Tooltip title={t('MISSED_RATIO')}>
          <Text className={classes.textBold}>{t('MISSED_ORDER_SHORT')}%</Text>
        </Tooltip>
      ),
      key: 'missedOrderRatio',
      align: 'right',
      className: classes.smallerPadding,
      width: 32,
      showSorterTooltip: false,
      sorter: (a, b) => getPercentage(a) - getPercentage(b),
      render: (data, record) => {
        // expanded rows have no missed order values
        if (!record.children) {
          return '-';
        }
        return numberFormat({ maxDecimal: 0 }).format(getPercentage(data) || 0);
      },
    },
    {
      title: (
        <Tooltip title={t('REACH_TOOLTIP_WH')}>
          <Text className={classes.textBold}>{t('REACH_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'reachDurationAvg',
      key: 'reachDurationAvg',
      align: 'right',
      className: classes.smallerPadding,
      width: 30,
      showSorterTooltip: false,
      sorter: (a, b) => a.reachDurationAvg - b.reachDurationAvg,
      render: data => numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(data || 0),
    },
    {
      title: (
        <Tooltip title={t('REACH_WITHOUT_QUEUE')}>
          <Text className={classes.textBold}>{t('REACH_WITHOUT_QUEUE_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'reachDurationWithoutQueueAvg',
      key: 'reachDurationWithoutQueueAvg',
      align: 'right',
      width: 32,
      className: classes.smallerPadding,
      showSorterTooltip: false,
      sorter: (a, b) => (a.reachDurationWithoutQueueAvg || 0) - (b.reachDurationWithoutQueueAvg || 0),
      render: data => numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(data || 0),
    },
    {
      title: (
        <Tooltip title={t('QUEUE')}>
          <Text className={classes.textBold}>{t('QUEUE_SHORT')}%</Text>
        </Tooltip>
      ),
      dataIndex: 'queuedOrderPct',
      key: 'queuedOrderPct',
      align: 'right',
      className: classes.smallerPadding,
      width: 24,
      showSorterTooltip: false,
      sorter: (a, b) => a.queuedOrderPct - b.queuedOrderPct,
      render: (data, record) => {
        // expanded rows have no queue values
        if (!record.children) {
          return '-';
        }
        return numberFormat({ maxDecimal: 0 }).format(data || 0);
      },
    },
    {
      title: (
        <Tooltip title={t('THROUGHPUT')}>
          <Text className={classes.textBold}>{t('THROUGHPUT_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'throughput',
      key: 'throughput',
      align: 'right',
      className: classes.smallerPadding,
      width: 28,
      showSorterTooltip: false,
      sorter: (a, b) => a.throughput - b.throughput,
      render: (data, record) => {
        // expanded rows have no throughput values
        if (!record.children) {
          return '-';
        }
        return numberFormat({ minDecimal: 2, maxDecimal: 2 }).format(data || 0);
      },
    },
    {
      title: (
        <Tooltip title={t('UTILIZATION')}>
          <Text className={classes.textBold}>{t('UTILIZATION_SHORT')}%</Text>
        </Tooltip>
      ),
      dataIndex: 'utilization',
      key: 'utilization',
      align: 'right',
      className: classes.smallerPadding,
      width: 24,
      showSorterTooltip: false,
      sorter: (a, b) => a.utilization - b.utilization,
      render: (data, record) => {
        // expanded rows have no util values
        if (!record.children) {
          return '-';
        }
        return numberFormat({ maxDecimal: 0 }).format(data || 0);
      },
    },
  ];

  return template;
};

export const getSummaryItems = ({ data }) => {
  if (!data) return [];
  const { orderCount, missedOrderCount, reachDurationAvg, reachDurationWithoutQueueAvg, queuedOrderPct, throughput, utilization } = data;

  return [
    // name and order columns are empty in the footer
    { value: null, key: 1 },
    { value: null, key: 2 },
    { value: numberFormat({ maxDecimal: 1 }).format(orderCount || 0), key: 3 },
    { value: numberFormat({ maxDecimal: 1 }).format(missedOrderCount || 0), key: 4 },
    { value: numberFormat({ maxDecimal: 0 }).format((missedOrderCount / ((missedOrderCount + orderCount))) * 100 || 0), key: 5 },
    { value: numberFormat({ maxDecimal: 1 }).format(reachDurationAvg || 0), key: 6 },
    { value: numberFormat({ maxDecimal: 1 }).format(reachDurationWithoutQueueAvg || 0), key: 7 },
    { value: numberFormat({ maxDecimal: 0 }).format(queuedOrderPct || 0), key: 8 },
    { value: numberFormat({ maxDecimal: 2 }).format(throughput || 0), key: 9 },
    { value: numberFormat({ maxDecimal: 0 }).format(utilization || 0), key: 10 },
  ];
};
