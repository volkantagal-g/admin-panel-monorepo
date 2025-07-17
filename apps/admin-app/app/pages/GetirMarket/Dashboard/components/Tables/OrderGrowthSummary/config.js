import { Typography, Tooltip } from 'antd';

const { Text } = Typography;

export const getColumns = (classes, t) => {
  return [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      className: classes.textBold,
      width: 66,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:ORDER')}>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:ORDER_SHORT_FOR_TABLE')}</Text>
        </Tooltip>
      ),
      dataIndex: 'order',
      key: 'order',
      align: 'right',
      width: 55,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:GROWTH')}>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:ORDER_RATIO_SHORT')}(%)</Text>
        </Tooltip>
      ),
      dataIndex: 'orderRatio',
      key: 'orderRatio',
      align: 'right',
      width: 48,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:MISSED')}>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:MISSED_ORDER_SHORT')}</Text>
        </Tooltip>
      ),
      dataIndex: 'missedOrder',
      key: 'missedOrder',
      align: 'right',
      width: 42,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:MISSED_RATIO')}>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:MISSED_ORDER_SHORT')}(%)</Text>
        </Tooltip>
      ),
      dataIndex: 'missedOrderRatio',
      key: 'missedOrderRatio',
      align: 'right',
      width: 48,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:NET_REVENUE_TOOLTIP')}>
          <Text className={classes.textBold}>
            {t('getirMarketDashboardPage:NET_REVENUE_SHORT')}
          </Text>
        </Tooltip>
      ),
      dataIndex: 'netRevenue',
      key: 'netRevenue',
      align: 'right',
      width: 74,
    },
    {
      title: (
        <Tooltip title={t('getirMarketDashboardPage:GROWTH')}>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:NET_REVENUE_RATIO_SHORT')}(%)</Text>
        </Tooltip>
      ),
      dataIndex: 'netRevenueRatio',
      key: 'netRevenueRatio',
      align: 'right',
      width: 48,
    },
  ];
};
