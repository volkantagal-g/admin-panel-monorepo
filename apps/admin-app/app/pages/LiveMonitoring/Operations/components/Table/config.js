import { Link } from 'react-router-dom';
import { Typography, Tooltip } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

import { thousandSeparator } from '@shared/utils/common';
import { numberFormat } from '@shared/utils/localization';
import { TOTALS_ROW_ID } from '../../logicV3';
import { NOT_APPLICABLE_VALUE } from '../../constants';

const { Title, Text } = Typography;

const sortColumns = ({ a, b, key, sortDirection, sortIgnoreValue = NOT_APPLICABLE_VALUE }) => {
  // put NOT_APPLICABLE_VALUE values at the end of list, regardless of sort direction
  if (sortDirection === 'ascend') {
    if (a[key] === sortIgnoreValue) return 1;
    if (b[key] === sortIgnoreValue) return -1;
  }
  else if (sortDirection === 'descend') {
    if (a[key] === sortIgnoreValue) return -1;
    if (b[key] === sortIgnoreValue) return 1;
  }
  return (a[key] || 0) - (b[key] || 0);
};

export const generateTableColumns = ({
  classes,
  selectedCity,
  handleCityClick,
  isSlottedOrderCountColumnVisible,
}, t) => {
  const constantRules = [
    {
      title: () => <Title level={5}>{selectedCity ? t('global:WAREHOUSES') : t('global:CITIES')}</Title>,
      // CSV specific, do not render React components, only text, number etc.
      titleCSV: selectedCity ? t('global:WAREHOUSES') : t('global:CITIES'),
      className: selectedCity ? classes.thickBordersLeft : classes.cellPaddingReset,
      dataIndex: 'id',
      width: 140,
      fixed: 'left',
      render: (id, record) => {
        if (id === TOTALS_ROW_ID) return record.name;
        if (!selectedCity) {
          return (
            <button
              type="button"
              onClick={() => handleCityClick(id)}
              className={classes.citySelectButton}
            >
              {record.name}
              <DoubleRightOutlined className={classes.selectIcon} />
            </button>
          );
        }
        return <Link to={`/warehouse/detail/${id}`}>{record.name}</Link>;
      },
      // CSV specific, do not render React components, only text, number etc.
      renderCSV: (data, record) => data?.name || record?.name,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('operationsLiveMonitoringPage:ACTIVE_ORDERS_TOOLTIP')}>
          <Text strong>{t('global:ACTIVE_ORDERS')}</Text>
        </Tooltip>
      ),
      titleCSV: t('global:ACTIVE_ORDERS'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'activeOrders',
      width: 100,
      defaultSortOrder: 'descend',
      sorter: { compare: (a, b) => sortColumns({ a, b, key: 'activeOrders' }) },
      render: activeOrders => (activeOrders ? thousandSeparator(activeOrders) : 0),
    },
    ...(isSlottedOrderCountColumnVisible ? [{
      title: (
        <Tooltip placement="bottom" title={t('operationsLiveMonitoringPage:SLOTTED_ORDER_COUNT_SHORT_TOOLTIP')}>
          <Text strong>{t('operationsLiveMonitoringPage:SLOTTED_ORDER_COUNT_SHORT')}</Text>
        </Tooltip>
      ),
      titleCSV: t('operationsLiveMonitoringPage:SLOTTED_ORDER_COUNT_SHORT'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'slottedOrderCount',
      width: 100,
      sorter: { compare: (a, b) => sortColumns({ a, b, key: 'slottedOrderCount' }) },
      render: slottedOrderCount => (slottedOrderCount ? thousandSeparator(slottedOrderCount) : 0),
    }] : []),
    {
      title: (
        <Tooltip placement="bottom" title={t('operationsLiveMonitoringPage:RED_BASKET_TOOLTIP')}>
          <Text strong>{t('operationsLiveMonitoringPage:RED_BASKET')}</Text>
        </Tooltip>),
      titleCSV: t('operationsLiveMonitoringPage:RED_BASKET'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'redBasket',
      width: 100,
      sorter: { compare: (a, b) => sortColumns({ a, b, key: 'redBasket' }) },
      render: redBasket => (redBasket ? thousandSeparator(redBasket) : 0),
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('operationsLiveMonitoringPage:LATE_TOOLTIP')}>
          <Text strong>{t('operationsLiveMonitoringPage:LATE')}</Text>
        </Tooltip>),
      titleCSV: t('operationsLiveMonitoringPage:LATE'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'late',
      width: 100,
      sorter: { compare: (a, b) => sortColumns({ a, b, key: 'late' }) },
      render: late => (late ? thousandSeparator(late) : 0),
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={selectedCity ?
            t('operationsLiveMonitoringPage:COMPLIANCE_TOOLTIP_WAREHOUSE_BASED') : t('operationsLiveMonitoringPage:COMPLIANCE_TOOLTIP_CITY_BASED')}
        >
          <Text strong>{`${t('operationsLiveMonitoringPage:COMPLIANCE')} %`}
          </Text>
        </Tooltip>),
      titleCSV: t('operationsLiveMonitoringPage:COMPLIANCE'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'compliance',
      width: 100,
      sorter: { compare: (a, b, sortDirection) => sortColumns({ a, b, key: 'compliance', sortDirection }) },
      render: compliance => formatCompliance(compliance, t),
      renderCSV: compliance => formatCompliance(compliance, t, { isCSV: true }),
    },

    {
      title: (
        <Tooltip
          placement="bottom"
          title={
            selectedCity ? t('operationsLiveMonitoringPage:AGGRESSION_TOOLTIP_WAREHOUSE_BASED')
              : t('operationsLiveMonitoringPage:AGGRESSION_TOOLTIP_CITY_BASED')
          }
        >
          <Text strong>{t('operationsLiveMonitoringPage:AGGRESSION')}</Text>
        </Tooltip>),
      titleCSV: t('operationsLiveMonitoringPage:AGGRESSION'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'aggression',
      width: 100,
      sorter: {
        compare: (a, b, sortDirection) => {
          return sortColumns({ a, b, key: 'aggression', sortDirection });
        },
      },
      render: aggression => formatAggression(aggression, t),
      renderCSV: aggression => formatAggression(aggression, t, { isCSV: true }),
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('operationsLiveMonitoringPage:UTILIZATION_TOOLTIP')}>
          <Text strong>{`${t('global:UTILIZATION')} %`}</Text>
        </Tooltip>),
      titleCSV: t('global:UTILIZATION'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'utilization',
      width: 100,
      sorter: { compare: (a, b, sortDirection) => sortColumns({ a, b, sortDirection, key: 'utilization' }) },
      render: utilization => formatUtilization(utilization, t),
      renderCSV: utilization => formatUtilization(utilization, t, { isCSV: true }),
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('LOWER_ETA_TOOLTIP')}>
          <Text strong>{t('LOWER_ETA')}</Text>
        </Tooltip>),
      titleCSV: t('LOWER_ETA'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'lowerETAAvg',
      width: 100,
      sorter: { compare: (a, b, sortDirection) => sortColumns({ a, b, sortDirection, key: 'lowerETAAvg' }) },
      render: lowerETA => formatETA(lowerETA, t),
      renderCSV: lowerETA => formatETA(lowerETA, t, { isCSV: true }),
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('UPPER_ETA_TOOLTIP')}>
          <Text strong>{t('UPPER_ETA')}</Text>
        </Tooltip>),
      titleCSV: t('UPPER_ETA'),
      className: [classes.thickBordersLeft, classes.alignRight],
      dataIndex: 'upperETAAvg',
      width: 100,
      sorter: { compare: (a, b, sortDirection) => sortColumns({ a, b, sortDirection, key: 'upperETAAvg' }) },
      render: upperETA => formatETA(upperETA, t),
      renderCSV: upperETA => formatETA(upperETA, t, { isCSV: true }),
    },
  ];

  return constantRules;
};

function formatAggression(aggression, t, { isCSV } = {}) {
  if (typeof aggression !== 'number') return !isCSV ? <Tooltip title={t('AGGRESSION_NA')}>{NOT_APPLICABLE_VALUE}</Tooltip> : NOT_APPLICABLE_VALUE;
  return numberFormat({ maxDecimal: 2 }).format(aggression);
}

function formatUtilization(utilization, t, { isCSV } = {}) {
  if (typeof utilization !== 'number') return !isCSV ? <Tooltip title={t('UTIL_NA')}>{NOT_APPLICABLE_VALUE}</Tooltip> : NOT_APPLICABLE_VALUE;
  return numberFormat({ maxDecimal: 1, minDecimal: 1 }).format(utilization);
}

function formatETA(eta, t, { isCSV } = {}) {
  if (typeof eta !== 'number') return !isCSV ? <Tooltip title={t('ETA_NA')}>{NOT_APPLICABLE_VALUE}</Tooltip> : NOT_APPLICABLE_VALUE;
  return numberFormat({ maxDecimal: 1, minDecimal: 1 }).format(eta);
}

function formatCompliance(compliance, t, { isCSV } = {}) {
  if (typeof compliance !== 'number') return !isCSV ? <Tooltip title={t('COMPLIANCE_NA')}>{NOT_APPLICABLE_VALUE}</Tooltip> : NOT_APPLICABLE_VALUE;
  return numberFormat({ maxDecimal: 1, minDecimal: 1 }).format(compliance);
}
