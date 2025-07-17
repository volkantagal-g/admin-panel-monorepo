import { t } from '@shared/i18n.ts';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';
import {
  CsvExportDataType,
  FormattedOrderGrowthMonitoringDataType,
} from './orderGrowthMonitoring';
import { DURATIONS, GETIR_WATER_AVERAGE_TP } from './constants';

export const numberFormatWithZeroDecimal = numberFormat({ maxDecimal: 0 });
export const numberFormatWithMinTwoDecimal = numberFormat({ minDecimal: 2 });
export const thousandSeparator = (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const isDomainTypeLocalsOrFood = (domainType: number) => domainType === GETIR_LOCALS_DOMAIN_TYPE || domainType === GETIR_FOOD_DOMAIN_TYPE;

const getDurationColumns = () => {
  return DURATIONS.map(duration => ({
    title: duration,
    key: duration,
    default: '-',
  }));
};

const getCSVColumns = ({ domainType }: {domainType: number}) => [
  {
    title: t('global:WAREHOUSES'),
    key: 'name',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:ACTIVE_ORDERS'),
    key: 'activeOrders',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:TOTAL_ORDERS'),
    key: 'totalOrders',
    default: '-',
  },
  {
    title: t('global:RED_BASKET'),
    key: 'redBasket',
    default: '-',
  },
  ...getDurationColumns(),
  {
    title: t('orderGrowthMonitoring:ORDER_PER_COURIER'),
    key: 'orderPerCourier',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:PLANNED'),
    key: 'planned',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:REALIZED'),
    key: 'total',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:COURIER_DIFF'),
    key: 'diff',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:FREE'),
    key: 'free',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:BUSY'),
    key: 'busy',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:ON_ORDER'),
    key: 'onOrder',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:RETURNING'),
    key: 'returning',
    default: '-',
  },
  {
    title: t('orderGrowthMonitoring:COURIER_UTILIZATION'),
    key: 'courierUtilization',
    default: '-',
  },
  (domainType === GETIR_VOYAGER_DOMAIN_TYPE && {
    title: t('orderGrowthMonitoring:GETIR_WATER_TP'),
    key: 'tp',
    default: '-',
  }),
];

export function formatDataToExport({ dataToExport, domainType }: {dataToExport: [], domainType: number}) {
  const data: CsvExportDataType[] = [];
  dataToExport.forEach((row: FormattedOrderGrowthMonitoringDataType) => {
    if (!row[domainType]) return;

    const orderDurationMap = {};
    DURATIONS.forEach(durationKey => {
      // @ts-ignore
      const durationValue = row?.[domainType]?.orderDurations?.[durationKey] ?? 0;
      if (durationKey === '+90' || durationKey === '-90') {
        // @ts-ignore
        orderDurationMap[durationKey] = numberFormatWithMinTwoDecimal.format(((durationValue / (row?.[domainType]?.activeOrders ?? 0)) || 0));
      }
      else {
        // @ts-ignore
        orderDurationMap[durationKey] = durationValue?.toString() || '0';
      }
    });

    if (domainType === GETIR_FOOD_DOMAIN_TYPE || domainType === GETIR_LOCALS_DOMAIN_TYPE) {
      data.push({
        name: row?.rowFirst.name,
        totalOrders: row?.[domainType]?.totalOrders?.todayValue,
      });
    }
    else {
      const orderPerCourier = (row?.[domainType]?.activeOrders && row?.[domainType]?.courierStats?.total)
        ? numberFormatWithMinTwoDecimal.format(row[domainType].activeOrders / row[domainType].courierStats.total)
        : '-';
      const courierUtilization = row?.[domainType]?.courierStats?.utilization
        ? numberFormatWithZeroDecimal.format(row?.[domainType]?.courierStats?.utilization)
        : '-';
      data.push({
        name: row?.rowFirst.name,
        activeOrders: row?.[domainType]?.activeOrders ?? '0',
        totalOrders: row?.[domainType]?.totalOrders?.todayValue ?? '0',
        redBasket: row?.[domainType]?.redBasket,
        planned: row?.[domainType]?.courierStats?.planned ?? '0',
        total: row?.[domainType]?.courierStats?.total ?? '0',
        diff: ((row?.[domainType]?.courierStats?.total ?? 0) - (row?.[domainType]?.courierStats?.planned ?? 0)) ?? '0',
        free: row?.[domainType]?.courierStats?.free ?? '0',
        busy: row?.[domainType]?.courierStats?.busy ?? '0',
        onOrder: row?.[domainType]?.courierStats?.onOrder ?? '0',
        returning: row?.[domainType]?.courierStats?.returning ?? '0',
        courierUtilization,
        orderPerCourier,
        ...orderDurationMap,
        ...(domainType === GETIR_VOYAGER_DOMAIN_TYPE && {
          tp: numberFormat({ minDecimal: 2 }).format(((
            (row?.[domainType]?.activeOrders ?? 0) /
            (row?.[domainType]?.courierStats?.total ?? 0) /
            GETIR_WATER_AVERAGE_TP
          ) || 0)),
        }),
      });
    }
  });
  const columns = getCSVColumns({ domainType });
  return {
    columns,
    data,
  };
}
