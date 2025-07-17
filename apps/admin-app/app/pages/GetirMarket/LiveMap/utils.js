import moment from 'moment';
import _, { get, isEmpty as _isEmpty, cloneDeep as _cloneDeep } from 'lodash';

import {
  COURIER_TYPE,
  EXTENDED_GETIR_MARKET_POLYGON_TYPE,
  GETIR_MARKET_DOMAIN_TYPES,
  SUB_REGION_GETIR_MARKET_POLYGON_TYPE,
  COURIER_STATUS_BUSY,
} from '@shared/shared/constants';
import { warehouseStatuses, domainTypes, courierStatuses, marketOrderCheckoutErrorCodes } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';

export const getFormattedData = data => data;

const formattedKuzeydenOrderCountsMUTABLE = ({ data, dataPath, finalDataSavePath }) => {
  if (!_isEmpty(data?.kuzeydenOrderCounts)) {
    const totalData = {
      todayCarboy: 0,
      yesterdayCarboy: 0,
      lastWeekCarboy: 0,
    };
    Object.values(get(data.kuzeydenOrderCounts, dataPath, {})).forEach(value => {
      const flattenValue = Array.isArray(value) ? value[0] : value;
      totalData.todayCarboy += flattenValue?.todayCarboy || 0;
      totalData.yesterdayCarboy += flattenValue?.yesterdayCarboy || 0;
      totalData.lastWeekCarboy += flattenValue?.lastWeekCarboy || 0;
    });
    totalData.yesterdayTotalGrowthComparedToToday = (
      (((totalData.todayCarboy - totalData.yesterdayCarboy) / totalData.yesterdayCarboy) * 100) || 0
    );
    totalData.lastWeekTotalGrowthComparedToToday = (
      (((totalData.todayCarboy - totalData.lastWeekCarboy) / totalData.lastWeekCarboy) * 100) || 0
    );
    Object.assign(data.kuzeydenOrderCounts, { [finalDataSavePath]: totalData });
  }
};

export const getFormattedCitiesMonitoringData = data => {
  const copiedData = _cloneDeep(data); // to restrict state mutation
  formattedKuzeydenOrderCountsMUTABLE({
    data: copiedData,
    dataPath: 'selectedCountry.total',
    finalDataSavePath: 'selectedCountry',
  });
  formattedKuzeydenOrderCountsMUTABLE({
    data: copiedData,
    dataPath: 'selectedCity',
    finalDataSavePath: 'selectedCity',
  });
  return copiedData;
};

export const POLYGON_TYPES_FOR_LIVEMAP = [SUB_REGION_GETIR_MARKET_POLYGON_TYPE, EXTENDED_GETIR_MARKET_POLYGON_TYPE];

export const getFormattedWarehouseData = warehouse => {
  if (!warehouse) return null;
  const { name, status } = warehouse;
  return [
    {
      key: '1',
      name: t('global:NAME_1'),
      detail: name,
    },
    {
      key: '2',
      name: t('global:STATUS'),
      detail: warehouseStatuses[status][getLangKey()],
    },
    {
      key: '3',
      name: t('global:SERVICE'),
      detail: warehouse.domainTypes.map(domainType => domainTypes[domainType][getLangKey()]),
    },
  ];
};

export const getFormattedFailedOrderData = order => {
  if (!order) return null;
  const { returnCode } = order;
  return [
    {
      key: '1',
      name: t('global:ERROR'),
      detail: `${marketOrderCheckoutErrorCodes?.[returnCode]?.[getLangKey()]} - (${returnCode})`,
    },
  ];
};

export const getFormattedCourierData = (courier, mappedWarehouses) => {
  if (!courier) return null;
  const {
    name,
    gsm,
    status,
    lastBusyOption,
    statusLastChangedAt,
    location,
    warehouse,
  } = courier;
  let busyReasonText = null;
  if (status === COURIER_STATUS_BUSY) {
    busyReasonText = get(lastBusyOption, getLangKey(), '-');
    if (get(lastBusyOption, 'comment')) {
      busyReasonText = `${busyReasonText} - ${get(lastBusyOption, 'comment')}`;
    }
  }
  return [
    {
      key: '10',
      name: t('global:NAME_1'),
      detail: name,
    },
    {
      key: '20',
      name: t('global:GSM'),
      detail: gsm,
    },
    {
      key: '30',
      name: t('global:STATUS'),
      detail: courierStatuses[status] && courierStatuses[status][getLangKey()],
    },
    ...(busyReasonText ?
      [
        {
          key: '40',
          name: t('global:REASON'),
          detail: busyReasonText,
        },
      ] :
      []),
    {
      key: '50',
      name: t('global:LAST_STATUS'),
      detail: `${moment(statusLastChangedAt).locale(getLangKey()).fromNow()} (${moment(statusLastChangedAt).format('HH:mm')})`,
    },
    {
      key: '60',
      name: t('global:LAST_COORD_TIME'),
      detail: `${moment(location.time).locale(getLangKey()).fromNow()} (${moment(location.time).format('HH:mm')})`,
    },
    {
      key: '70',
      name: t('global:WAREHOUSE'),
      detail: mappedWarehouses[warehouse],
    },
    {
      key: '7',
      name: t('global:SERVICE'),
      detail: courier.domainTypes && courier.domainTypes.map(domainType => domainTypes[domainType][getLangKey()]),
    },
    {
      key: '90',
      name: t('global:PLATE'),
      detail: courier.fleetVehiclePlate || '-',
    },
  ];
};

export const checkTotalValuesByCourierType = (vehicleType, filterType, courierStatusCountsWithCourierPlan) => {
  const getter = path => get(courierStatusCountsWithCourierPlan, `${filterType}.vehicleType.${vehicleType}.total.${path}`, 0);

  const totalValues =
    getter('planned') + getter('total') + getter('free') + getter('onDuty') + getter('returning') + getter('budy') + getter('utilization');

  return totalValues > 0;
};

const getirMarketDomainTypeSet = new Set(GETIR_MARKET_DOMAIN_TYPES);

export const isGetirMarketRelatedWarehouse = warehouse => {
  const warehouseDomainTypes = _.get(warehouse, 'domainTypes', []);
  return warehouseDomainTypes.some(domainType => getirMarketDomainTypeSet.has(domainType));
};

export const isGetirMarketRelatedCourier = courier => {
  if (_.get(courier, 'courierType', '') !== COURIER_TYPE.GM) {
    return false;
  }
  const courierDomainTypes = _.get(courier, 'domainTypes', []);
  return courierDomainTypes.some(domainType => getirMarketDomainTypeSet.has(domainType));
};
