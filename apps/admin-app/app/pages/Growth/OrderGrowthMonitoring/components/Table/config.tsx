/* eslint-disable no-unsafe-optional-chaining */
import { Tooltip, Typography } from 'antd';
import { CloudDownloadOutlined, DoubleRightOutlined } from '@ant-design/icons';

import { isNil, isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { FormattedCityType } from '../../orderGrowthMonitoring';
import { numberFormatterWithSuffix } from '@shared/utils/localization';

import {
  GETIR_VOYAGER_DOMAIN_TYPE,
  WAREHOUSE_BUSY_STATUS,
} from '@shared/shared/constants';

import {
  numberFormatWithZeroDecimal,
  numberFormatWithMinTwoDecimal,
  thousandSeparator,
  isDomainTypeLocalsOrFood,
} from '@app/pages/Growth/OrderGrowthMonitoring/commonUtils';

import { DURATIONS, GETIR_WATER_AVERAGE_TP } from '../../constants';

const { Title, Text } = Typography;
export const tableColumns = (
  { selectedCity, hasAccessToViewFinancial, classes, filteredDomainTypes, handleCityClick, handleCSVExport }:
    {
      selectedCity: string | null,
      hasAccessToViewFinancial: boolean,
      classes: any,
      filteredDomainTypes: number[],
      handleCityClick: (cityId: string) => void,
      handleCSVExport: ({ domainType }: { domainType: number }) => void,
    },
) => {
  const courierStatsTooltipPrefix = selectedCity ? 'orderGrowthMonitoring:WAREHOUSE_COURIER_STATS_TOOLTIP' : 'orderGrowthMonitoring:CITY_COURIER_STATS_TOOLTIP';
  const tableSkeletonsByDomainTypes: any = {};

  filteredDomainTypes.forEach((domainType: number) => {
    tableSkeletonsByDomainTypes[domainType] = {
      title: (
        <>
          <Title level={5}>{t(`global:GETIR_MARKET_DOMAIN_TYPES:${domainType}`)}</Title>
          {selectedCity && (
          <CloudDownloadOutlined
            className={classes.exportBtn}
            onClick={() => handleCSVExport({ domainType })}
          />

          )}
        </>
      ),
      className: classes.thickBordersLeft,
      children: [
        ...(!(selectedCity && isDomainTypeLocalsOrFood(domainType)) ? [getSubColumnsForDomain({
          tooltip: (!selectedCity
            ? `orderGrowthMonitoring:ACTIVE_ORDERS_TOOLTIP.${domainType}`
            : `orderGrowthMonitoring:WAREHOUSE_ACTIVE_ORDERS_TOOLTIP.${domainType}`),
          text: 'orderGrowthMonitoring:ACTIVE_ORDERS',
          className: [classes.thickBordersLeft, classes.alignRight],
          dataIndex: [domainType, 'activeOrders'],
          key: `${domainType}ActiveOrders`,
          width: 100,
          showSorter: true,
          sorterKeys: [domainType, 'activeOrders'],
          render: activeOrders => renderDataOrEmptyString({ data: activeOrders }),
        })] : []),
        getSubColumnsForDomain({
          tooltip: (selectedCity
            ? `orderGrowthMonitoring:WAREHOUSE_TOTAL_ORDERS_TOOLTIP.${domainType}`
            : `orderGrowthMonitoring:TOTAL_ORDERS_TOOLTIP.${domainType}`),
          text: 'orderGrowthMonitoring:TOTAL_ORDERS',
          className: classes.alignRight,
          dataIndex: [domainType, 'totalOrders'],
          key: `${domainType}TotalOrders`,
          width: 150,
          showSorter: true,
          sorterKeys: [domainType, 'totalOrders', 'todayValue'],
          render: totalOrders => {
            return (totalOrders?.todayValue >= 0) ? (
              <>
                <Text>{thousandSeparator(totalOrders.todayValue)}&nbsp;</Text>
                { !totalOrders.changeRateToday ? null :
                  (
                    <>
                      (
                      <Tooltip title={`${t('orderGrowthMonitoring:GROWTH_RATE')} (${t('orderGrowthMonitoring:TODAY_VS_YESTERDAY')})`}>
                        <Text type={totalOrders.changeRateToday < 0 ? 'danger' : 'success'}>
                          {numberFormatWithZeroDecimal.format(totalOrders.changeRateToday)}
                        </Text>,
                      </Tooltip>
                      <Tooltip title={`${t('orderGrowthMonitoring:GROWTH_RATE')} (${t('orderGrowthMonitoring:TODAY_VS_LAST_WEEK')})`}>
                        <Text type={totalOrders.changeRateLastWeek < 0 ? 'danger' : 'success'}>
                          {numberFormatWithZeroDecimal.format(totalOrders.changeRateLastWeek)}
                        </Text>
                      </Tooltip>
                      )
                    </>
                  )}
              </>
            ) : '';
          },
        }),
        ...(!selectedCity ? [getSubColumnsForDomain({
          tooltip: 'orderGrowthMonitoring:ORDER_DISTRIBUTION_TOOLTIP',
          text: 'orderGrowthMonitoring:ORDER_DISTRIBUTION',
          className: classes.alignRight,
          dataIndex: [domainType, 'orderDistribution'],
          key: `${domainType}OrderDistribution`,
          width: 120,
          showSorter: false,
          render: orderDistribution => (
            (!isEmpty(orderDistribution) && Object.values(orderDistribution).some(value => value > 0)) ?
              `%${numberFormatWithZeroDecimal.format(orderDistribution?.batched)}, ${orderDistribution?.queued}, ${orderDistribution?.failed}` :
              '-'
          ),
        })] : []),
        ...(!(selectedCity && isDomainTypeLocalsOrFood(domainType)) ? [getSubColumnsForDomain({
          text: 'global:RED_BASKET',
          className: classes.alignRight,
          dataIndex: [domainType, 'redBasket'],
          key: `${domainType}RedBasket`,
          width: 60,
          showSorter: true,
          sorterKeys: [domainType, 'redBasket'],
          render: redBasket => renderDataOrEmptyString({ data: redBasket }),
        })] : []),
      ],
    };
  });

  // table skeleton
  // city/warehouse & total columns
  const tableSkeleton = [
    {
      title: () => <Title level={5}>{selectedCity ? t('global:WAREHOUSES') : t('global:CITIES')}</Title>,
      dataIndex: 'rowFirst',
      key: 'rowFirst',
      width: 140,
      fixed: 'left',
      render: (data: FormattedCityType) => {
        if (!selectedCity && data.id) {
          return (
            <button
              type="button"
              onClick={() => handleCityClick(data.id)}
              className={classes.citySelectButton}
            >
              {data.name}
              <DoubleRightOutlined className={classes.selectIcon} />
            </button>
          );
        }
        return (
          <Tooltip
            title={data.status === WAREHOUSE_BUSY_STATUS && t('orderGrowthMonitoring:BUSY_WAREHOUSE_TOOLTIP')}
          >
            <Text
              className={data.status === WAREHOUSE_BUSY_STATUS && classes.busyWarehouse}
            >
              {data.name}
            </Text>
          </Tooltip>
        );
      },
    },

    ...(hasAccessToViewFinancial ? [{
      title: <Title level={5}>{t('orderGrowthMonitoring:TOTAL')}</Title>,
      className: classes.thickBordersLeft,
      children: [
        {
          title: (
            <Tooltip title={
              selectedCity
                ? t('orderGrowthMonitoring:WAREHOUSE_TOTAL_REVENUE_TOOLTIP')
                : t('orderGrowthMonitoring:TOTAL_REVENUE_TOOLTIP')
            }
            >
              <Text strong>{t('orderGrowthMonitoring:NET_REVENUE_TAX_EXC')}</Text>
            </Tooltip>
          ),
          className: [classes.thickBordersLeft, classes.alignRight],
          dataIndex: ['total', 'netRevenue'],
          key: 'totalNetRevenue',
          width: 150,
          defaultSortOrder: 'descend',
          sorter: {
            compare: (a, b) => {
              return (a.total.netRevenue?.todayValue || 0) - (b.total.netRevenue?.todayValue || 0);
            },
          },
          render: (netRevenue: any) => {
            const getType = (data: number) => {
              return data < 0 ? 'danger' : 'success';
            };
            return (
              (selectedCity) ? (
                // for warehouse data, there is only today value not change rates
                // because this is not live data
                <Tooltip title={netRevenue?.todayValue?.toFixed(0)}>
                  <Text>{numberFormatterWithSuffix(netRevenue?.todayValue, 2)}&nbsp;</Text>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title={netRevenue?.todayValue?.toFixed(0)}>
                    <Text>{numberFormatterWithSuffix(netRevenue?.todayValue, 2)}&nbsp;</Text>
                  </Tooltip>
                  (
                  <Tooltip title={`${t('orderGrowthMonitoring:GROWTH_RATE')} (${t('orderGrowthMonitoring:TODAY_VS_YESTERDAY')})`}>
                    <Text type={getType(netRevenue?.changeRateToday)}>{numberFormatWithZeroDecimal.format(netRevenue?.changeRateToday)}</Text>,
                  </Tooltip>
                  <Tooltip title={`${t('orderGrowthMonitoring:GROWTH_RATE')} (${t('orderGrowthMonitoring:TODAY_VS_LAST_WEEK')})`}>
                    <Text type={getType(netRevenue?.changeRateLastWeek)}> {numberFormatWithZeroDecimal.format(netRevenue?.changeRateLastWeek)}</Text>
                  </Tooltip>
                  )
                </>
              )
            );
          },
        },
        {
          title: (
            <Tooltip title={t('orderGrowthMonitoring:TOTAL_UTILIZATION_TOOLTIP')}>
              <Text strong>{t('orderGrowthMonitoring:UTILIZATION')}</Text>
            </Tooltip>
          ),
          dataIndex: ['total', 'utilization'],
          key: 'totalUtilization',
          className: classes.alignRight,
          width: 90,
          sorter: {
            compare: (a, b, direction) => sortColumns({
              a,
              b,
              keys: ['total', 'utilization'],
              sortDirection: direction,
            }),
          },
          render: (utilization: number) => {
            if (!utilization && utilization !== 0) return '';
            return Math.floor(utilization) || 0;
          },
        },
      ],
    }] : []),
  ];

  // courier related columns like planned, realized, courier diff, free, busy, on order, returning
  const getCourierRelatedColumns = (domainType: number) => {
    if (isDomainTypeLocalsOrFood(domainType) && selectedCity) return [];
    const courierRelatedColumns = [
      getSubColumnsForDomain({
        tooltip: 'orderGrowthMonitoring:ORDER_PER_COURIER_TOOLTIP',
        text: 'orderGrowthMonitoring:ORDER_PER_COURIER',
        width: 100,
        className: classes.alignRight,
        dataIndex: [domainType],
        key: `${domainType}OrderPerCourier`,
        showSorter: true,
        sorter: (a, b) => {
          return ((((a[domainType]?.activeOrders / a[domainType]?.courierStats?.total) || 0))
            - (((b[domainType]?.activeOrders / b[domainType]?.courierStats?.total) || 0)));
        },
        render: data => {
          return numberFormatWithMinTwoDecimal.format((data?.activeOrders / data?.courierStats?.total) || 0);
        },
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.PLANNED`,
        text: 'orderGrowthMonitoring:PLANNED',
        width: 80,
        className: classes.alignRight,
        dataIndex: [domainType, 'courierStats'],
        key: `${domainType}CourierPlanned`,
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'planned'],
        render: data => renderDataOrEmptyString({ data: data?.planned }),
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.REALIZED`,
        text: 'orderGrowthMonitoring:REALIZED',
        width: 90,
        className: classes.alignRight,
        key: `${domainType}CourierRealized`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'total'],
        render: data => renderDataOrEmptyString({ data: data?.total }),
      }),
      getSubColumnsForDomain({
        tooltip: 'orderGrowthMonitoring:COURIER_DIFF_TOOLTIP',
        text: 'orderGrowthMonitoring:COURIER_DIFF',
        width: 70,
        className: classes.alignRight,
        key: `${domainType}CourierDiff`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorter: ((a, b) => {
          return ((a[domainType]?.courierStats?.total) - (a[domainType]?.courierStats?.planned))
                  - ((b[domainType]?.courierStats?.total) - (b[domainType]?.courierStats?.planned));
        }),
        render: data => renderDataOrEmptyString({ data: numberFormatWithZeroDecimal.format(((data?.total) - (data?.planned))) }),
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.FREE`,
        text: 'orderGrowthMonitoring:FREE',
        width: 75,
        className: classes.alignRight,
        key: `${domainType}CourierFree`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'free'],
        render: data => renderDataOrEmptyString({ data: data?.free }),
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.BUSY`,
        text: 'orderGrowthMonitoring:BUSY',
        width: 75,
        className: classes.alignRight,
        key: `${domainType}CourierBusy`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'busy'],
        render: data => renderDataOrEmptyString({ data: data?.busy }),
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.ON_ORDER`,
        text: 'orderGrowthMonitoring:ON_ORDER',
        width: 85,
        className: classes.alignRight,
        key: `${domainType}CourierOnOrder`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'onOrder'],
        render: data => renderDataOrEmptyString({ data: data?.onOrder }),
      }),
      getSubColumnsForDomain({
        tooltip: `${courierStatsTooltipPrefix}.RETURNING`,
        text: 'orderGrowthMonitoring:RETURNING',
        width: 85,
        className: classes.alignRight,
        key: `${domainType}CourierReturning`,
        dataIndex: [domainType, 'courierStats'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'returning'],
        render: data => renderDataOrEmptyString({ data: data?.returning }),
      }),
      getSubColumnsForDomain({
        tooltip: `orderGrowthMonitoring:UTILIZATION_TOOLTIP.${domainType}`,
        text: 'orderGrowthMonitoring:UTILIZATION',
        width: 85,
        className: classes.alignRight,
        key: `${domainType}Utilization`,
        dataIndex: [domainType, 'courierStats', 'calculatedUtilizationRate'],
        showSorter: true,
        sorterKeys: [domainType, 'courierStats', 'calculatedUtilizationRate'],
        render: data => renderDataOrEmptyString({ data: numberFormatWithZeroDecimal.format(data * 100) }),
      }),
    ];

    if (selectedCity && domainType === GETIR_VOYAGER_DOMAIN_TYPE) {
      courierRelatedColumns.push(
        getSubColumnsForDomain({
          tooltip: 'orderGrowthMonitoring:GETIR_WATER_TP_TOOLTIP',
          text: 'orderGrowthMonitoring:GETIR_WATER_TP',
          width: 75,
          className: classes.alignRight,
          key: `${domainType}CourierBusy`,
          dataIndex: [domainType],
          showSorter: true,
          sorter: (a, b) => {
            return ((((a[domainType]?.activeOrders / a[domainType]?.courierStats?.total / GETIR_WATER_AVERAGE_TP) || 0))
              - (((b[domainType]?.activeOrders / b[domainType]?.courierStats?.total / GETIR_WATER_AVERAGE_TP) || 0)));
          },
          render: data => numberFormatWithMinTwoDecimal.format((data?.activeOrders / data?.courierStats?.total / GETIR_WATER_AVERAGE_TP) || 0),
        }),
      );
    }

    return courierRelatedColumns;
  };

  // durations columns like 0-15, 15-30, 30-45, 45-60, 60-90, +90, -90
  const getDurationColumns = (domainType: number) => {
    if (isDomainTypeLocalsOrFood(domainType) && selectedCity) return [];
    const durationColumns: any[] = [];
    DURATIONS.forEach(duration => {
      durationColumns.push(
        getSubColumnsForDomain({
          tooltip: t('orderGrowthMonitoring:DURATION_TOOLTIP', { duration }),
          text: duration === '+90' || duration === '-90' ? `${duration} share` : duration,
          className: classes.alignRight,
          dataIndex: [domainType],
          key: `${domainType}_${duration}`,
          width: 95,
          showSorter: true,
          sorterKeys: [domainType, 'orderDurations', duration],
          render: val => {
            const durationValue = val?.orderDurations?.[duration] ? val?.orderDurations?.[duration] : 0;
            // if active order is undefined, set it to 1 to avoid division by zero
            const activeOrderValue = val?.activeOrders ? val?.activeOrders : 1;
            if (duration === '+90' || duration === '-90') {
              return numberFormatWithMinTwoDecimal.format((durationValue / activeOrderValue || 0));
            }
            const percentageOfActiveOrders = (durationValue / activeOrderValue) || 0;
            return `${durationValue}, (${numberFormatWithZeroDecimal.format(percentageOfActiveOrders * 100)}%)`;
          },
        }),
      );
    });
    return durationColumns;
  };

  filteredDomainTypes.forEach((domainType: number) => {
    tableSkeletonsByDomainTypes[domainType].children.push(...getDurationColumns(domainType));
    tableSkeletonsByDomainTypes[domainType].children.push(...getCourierRelatedColumns(domainType));
    tableSkeleton.push(tableSkeletonsByDomainTypes[domainType]);
  });

  return tableSkeleton;
};

function getSubColumnsForDomain(
  {
    tooltip,
    text,
    className,
    dataIndex,
    key,
    width,
    showSorter,
    sorterKeys,
    render,
    sorter,
    showSorterTooltip = false,
  }:
    {
      tooltip?: string | null,
      text: string,
      className: string | string[],
      dataIndex: any,
      key: string,
      width: number,
      showSorter: boolean,
      sorterKeys?: (string | number)[],
      sorter?: (a: any, b: any) => number,
      render?: (text: any) => JSX.Element | string,
      showSorterTooltip?: boolean,
    },
) {
  return {
    title: tooltip ? (
      <Tooltip title={t(tooltip)}>
        <Text strong>{t(text)}</Text>
      </Tooltip>
    ) : (
      <Text strong>{t(text)}</Text>
    ),
    showSorterTooltip,
    className,
    dataIndex,
    key,
    width,
    sorter: showSorter ? ({
      compare: (a, b, sortDirection) => {
        if (sorterKeys) {
          return sortColumns({
            a,
            b,
            keys: sorterKeys,
            sortDirection,
          });
        }
        return sorter ? sorter(a, b) : 0;
      },
    }) : undefined,
    render,
  };
}

function renderDataOrEmptyString({ data }: { data: number | string | null | undefined }) {
  // convert data to float to check if it is a number or not
  const convertedData = typeof data === 'string' ? parseFloat(data) : data;
  return (isNil(convertedData) || Number.isNaN(convertedData)) ? '' : convertedData;
}

function sortColumns({
  a,
  b,
  keys,
  sortDirection,
  sortIgnoreValue = '',
}: {
  a: any,
  b: any,
  keys: (string | number)[],
  sortDirection: 'ascend' | 'descend' | null,
  sortIgnoreValue?: string,
}) {
  const compareValues = (firstVal: any, secondVal: any) => {
    const isFirstIgnored = firstVal === sortIgnoreValue || firstVal === undefined || Number.isNaN(firstVal);
    const isSecondIgnored = secondVal === sortIgnoreValue || secondVal === undefined || Number.isNaN(secondVal);

    // if the value is ignored, it should be at the end of the list
    if (isFirstIgnored && !isSecondIgnored) return sortDirection === 'ascend' ? 1 : -1;
    if (!isFirstIgnored && isSecondIgnored) return sortDirection === 'ascend' ? -1 : 1;
    if (isFirstIgnored && isSecondIgnored) return 0;

    if (sortDirection === 'ascend') {
      return firstVal > secondVal ? 1 : -1;
    } if (sortDirection === 'descend') {
      return firstVal < secondVal ? -1 : 1;
    }

    return 0;
  };

  const aVal = getNestedValue(a, keys);
  const bVal = getNestedValue(b, keys);

  return compareValues(aVal, bVal);
}

function getNestedValue(obj: any, keys: (string | number)[]) {
  return keys.reduce((acc, key) => acc?.[key], obj);
}
