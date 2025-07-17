import { isNumber as _isNumber, isNaN as _isNaN } from 'lodash';
import { Typography, Spin } from 'antd';

import {
  percentFormatWithTwoDecimal,
  percentFormatWithOneDecimal,
  percentFormatWithoutDecimal,
  numberFormatWithoutDecimal,
  currencyFormat,
} from '@shared/utils/localization';
import { TABLE_TYPES } from './constants';

const { Text } = Typography;

const currencyFormatterWithoutDecimal = currencyFormat({ maxDecimal: 0 });

export const getTableColumns = ({
  t,
  tableType,
  classes,
  nonFilteredSaleStats,
  hasPermissionToViewFinancial,
  isProductSaleStatsPending,
  isAvailabilityPending,
  isInstantAvailabilityPending,
  pagination,
}) => {
  return [
    {
      title: <b>#</b>,
      dataIndex: 'id',
      key: 'id',
      width: 40,
      align: 'right',
      render: (id, record, index) => {
        return (index + ((pagination.currentPage - 1) * pagination.rowsPerPage)) + 1;
      },
    },
    {
      title: <b>{t(`global:${tableType}`)}</b>,
      dataIndex: 'name',
      key: 'name',
      width: 350,
      sorter: { compare: (a, b) => a.name?.localeCompare(b.name) },
    },
    ...(tableType === TABLE_TYPES.PRODUCT ? [
      {
        title: <b>{t('global:SEGMENTS')}</b>,
        dataIndex: 'segments',
        key: 'segments',
        width: 150,
        sorter: { compare: (a, b) => a?.segments?.localeCompare(b?.segments) },
        render: (segments = '') => segments,
      },
      {
        title: isInstantAvailabilityPending ? <Spin size="small" spinning /> : <b>{t('commercialMonitoringPage:INSTANT_AVAILABILITY_SHORT')}</b>,
        dataIndex: 'instantAvailability',
        width: 120,
        sorter: { compare: (a, b) => (a.instantAvailability?.availability ?? 0) - (b.instantAvailability?.availability ?? 0) },
        render: instantAvailability => {
          if (!_isNumber(instantAvailability?.availableSlots)) {
            return '-';
          }
          return (
            <Text>
              {numberFormatWithoutDecimal.format(instantAvailability.availableSlots)} / {numberFormatWithoutDecimal.format(instantAvailability.totalSlots)}
              &nbsp;<b>{percentFormatWithTwoDecimal.format((instantAvailability.availability || 0))}</b>
            </Text>
          );
        },
      },
    ] : []),
    {
      title: isAvailabilityPending ? <Spin size="small" spinning /> : <b>{t('commercialMonitoringPage:AVAILABILITY_SHORT')}</b>,
      dataIndex: 'availability',
      width: 100,
      sorter: { compare: (a, b) => (a.availability || 0) - (b.availability || 0) },
      render: availability => {
        if (_isNaN(availability) || !_isNumber(availability) || availability === 0) {
          return '-';
        }
        return percentFormatWithoutDecimal.format(availability);
      },
    },
    ...(hasPermissionToViewFinancial ? [
      {
        title: isProductSaleStatsPending ? <Spin size="small" spinning /> : <b>{t('global:TOTAL')}</b>,
        dataIndex: 'count',
        width: 100,
        defaultSortOrder: 'descend',
        sorter: { compare: (a, b) => (a.count ?? 0) - (b.count ?? 0) },
        render: count => {
          if (!_isNumber(count)) {
            return '-';
          }
          return numberFormatWithoutDecimal.format(count);
        },
      },
      {
        title: isProductSaleStatsPending ? <Spin size="small" spinning /> : <b>{t('global:CHARGED_AMOUNT')}</b>,
        dataIndex: 'chargedAmount',
        width: 120,
        sorter: { compare: (a, b) => (a.chargedAmount ?? 0) - (b.chargedAmount ?? 0) },
        render: chargedAmount => {
          if (!_isNumber(chargedAmount)) {
            return '-';
          }
          return (
            <Text>
              {currencyFormatterWithoutDecimal.format(chargedAmount)}
              {
                !_isNaN(chargedAmount / nonFilteredSaleStats.chargedAmount) && (
                  <span className={classes.percentText}>
                    &nbsp;&nbsp;{percentFormatWithOneDecimal.format(chargedAmount / nonFilteredSaleStats.chargedAmount)}
                  </span>
                )
              }
            </Text>
          );
        },
      },
      {
        title: isProductSaleStatsPending ? <Spin size="small" spinning /> : <b>{t('global:REVENUE')}</b>,
        dataIndex: 'netRevenue',
        width: 120,
        sorter: { compare: (a, b) => (a.netRevenue ?? 0) - (b.netRevenue ?? 0) },
        render: netRevenue => {
          if (!_isNumber(netRevenue)) {
            return '-';
          }
          return (
            <Text>
              {currencyFormatterWithoutDecimal.format(netRevenue)}
              {
                !_isNaN(netRevenue / nonFilteredSaleStats.netRevenue) && (
                  <span className={classes.percentText}>
                    &nbsp;&nbsp;{percentFormatWithOneDecimal.format(netRevenue / nonFilteredSaleStats.netRevenue)}
                  </span>
                )
              }
            </Text>
          );
        },
      },
      {
        title: isProductSaleStatsPending ? <Spin size="small" spinning /> : <b>{t('global:BASKET_AMOUNT')}</b>,
        dataIndex: 'basketAmount',
        width: 120,
        sorter: { compare: (a, b) => (a.basketAmount ?? 0) - (b.basketAmount ?? 0) },
        render: basketAmount => {
          if (!_isNumber(basketAmount)) {
            return '-';
          }
          return (
            <Text>
              {currencyFormatterWithoutDecimal.format(basketAmount)}
              {
                !_isNaN(basketAmount / nonFilteredSaleStats.basketAmount) && (
                  <span className={classes.percentText}>
                    &nbsp;&nbsp;{percentFormatWithOneDecimal.format(basketAmount / nonFilteredSaleStats.basketAmount)}
                  </span>
                )
              }
            </Text>
          );
        },
      },
    ] : []),
  ];
};
