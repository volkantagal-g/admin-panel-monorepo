import { Typography, Tooltip } from 'antd';

import { isMobile } from '@shared/utils/common';

const { Text } = Typography;

export const getColumns = ({
  classes,
  showSorters,
  t,
}) => {
  return [
    {
      title: '#',
      dataIndex: 'rowName',
      key: 'rowName',
      width: isMobile() ? 150 : 105,
      align: 'left',
      className: classes.textBold,
      render: rowName => {
        if (!isMobile()) {
          return (
            <Tooltip title={rowName}>
              <Text ellipsis>
                {rowName}
              </Text>
            </Tooltip>
          );
        }
        return rowName;
      },
    },
    {
      title: <Text strong title={t('global:ORDER')}>{t('growthDashboard:ORDER_SHORT')}</Text>,
      dataIndex: 'order',
      key: 'order',
      align: 'right',
      width: 60,
      className: classes.textBold,
      ...(showSorters && {
        sorter: (a, b) => (a?.orderCount || 0) - (b?.orderCount || 0),
        showSorterTooltip: false,
      }),
    },
    {
      title: <Text strong title={t('global:ORDER_RATIO')}>{t('growthDashboard:ORDER_SHORT')} (%)</Text>,
      dataIndex: 'orderRatio',
      key: 'orderRatio',
      align: 'right',
      width: 55,
      className: classes.textBold,
      ...(showSorters && {
        sorter: (a, b) => (a?.orderCount || 0) - (b?.orderCount || 0),
        showSorterTooltip: false,
      }),
    },
    {
      title: <Text strong title={t('global:MISSED_ORDER')}>{t('growthDashboard:MISSED_ORDER_SHORT')}</Text>,
      dataIndex: 'missedOrder',
      key: 'missedOrder',
      align: 'right',
      width: 45,
      className: classes.textBold,
      ...(showSorters && {
        sorter: (a, b) => (a?.missedOrderCount || 0) - (b?.missedOrderCount || 0),
        showSorterTooltip: false,
      }),
    },
    {
      title: <Text strong title={t('global:MISSED_ORDER_RATIO')}>{t('growthDashboard:MISSED_ORDER_SHORT')} (%)</Text>,
      dataIndex: 'missedOrderRatio',
      key: 'missedOrderRatio',
      align: 'right',
      width: 60,
      className: classes.textBold,
      render: (missedOrderRatio, { missedOrderRatioTooltip }) => {
        if (missedOrderRatioTooltip) {
          return (
            <Tooltip title={missedOrderRatioTooltip}>
              <Text strong>{missedOrderRatio}</Text>
            </Tooltip>
          );
        }
        return missedOrderRatio;
      },
      ...(showSorters && {
        sorter: (a, b) => (a?.missedOrderRatioNumber || 0) - (b?.missedOrderRatioNumber || 0),
        showSorterTooltip: false,
      }),
    },
    {
      title: <Text strong title={t('global:NET_REVENUE_TAX_EXCLUDED')}>{t('global:NET_REVENUE_TAX_EXCLUDED_SHORT')}</Text>,
      dataIndex: 'vatIncludedRevenue',
      key: 'vatIncludedRevenue',
      align: 'right',
      width: 65,
      className: classes.textBold,
      ...(showSorters && {
        sorter: (a, b) => (a?.netRevenue || 0) - (b?.netRevenue || 0),
        defaultSortOrder: 'descend',
        showSorterTooltip: false,
      }),
    },
    {
      title: <Text strong title={t('global:NET_REVENUE_TAX_EXCLUDED_RATIO')}>{t('global:NET_REVENUE_TAX_EXCLUDED_SHORT')} (%)</Text>,
      dataIndex: 'vatIncludedRevenueRatio',
      key: 'vatIncludedRevenueRatio',
      align: 'right',
      width: 70,
      className: classes.textBold,
      render: (vatIncludedRevenueRatio, { vatExcludedRevenueRatioTooltip }) => {
        if (vatExcludedRevenueRatioTooltip) {
          return (
            <Tooltip title={vatExcludedRevenueRatioTooltip}>
              <Text>{vatIncludedRevenueRatio}</Text>
            </Tooltip>
          );
        }
        return vatIncludedRevenueRatio;
      },
      ...(showSorters && {
        sorter: (a, b) => (a?.netRevenue || 0) - (b?.netRevenue || 0),
        showSorterTooltip: false,
      }),
    },
    {
      title: (
        <Text strong title={`${t('global:NET_REVENUE_TAX_EXCLUDED')} / ${t('global:ORDER')}`}>
          {t('global:NET_REVENUE_TAX_EXCLUDED_SHORT')} / {t('global:ORDER_SHORT')}
        </Text>
      ),
      dataIndex: 'netRevenuePerOrder',
      key: 'netRevenuePerOrder',
      align: 'right',
      width: 70,
      className: classes.textBold,
      ...(showSorters && {
        sorter: (a, b) => (a?.netRevenuePerOrder || 0) - (b?.netRevenuePerOrder || 0),
        showSorterTooltip: false,
      }),
    },
  ];
};
