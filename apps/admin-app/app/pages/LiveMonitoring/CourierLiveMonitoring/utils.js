import { isEmpty, keyBy } from 'lodash';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { downloadDataAsCSVV2 } from '@shared/utils/common';

export const TOTAL_COLUMN_NAME = 'TOTAL';

export const getCityName = (cities, cityId) => cities.find(city => city._id === cityId)?.name;

const getMappedWarehouses = warehouses => {
  const warehousesDomainTypesMap = {};
  (warehouses || []).forEach(warehouse => {
    warehousesDomainTypesMap[warehouse._id] = warehouse.domainTypes;
  });
  return warehousesDomainTypesMap;
};

const getCitiesTableData = (cities, courierStatusData, warehouseData) => {
  const citiesData = [];
  // selectedCityData is an object with cityId as key and courier data as value (total, vehicleType) by warehouse breakdown
  const { selectedCountryCitiesData: selectedCityData, selectedCountryTotalData: selectedCountry } = courierStatusData;

  const warehouseDomainTypes = getMappedWarehouses(warehouseData);
  (cities || []).forEach(city => {
    if (!selectedCityData?.[city._id]) return;
    const { busy, utilization, returning, planned, free, onOrder, total } = selectedCityData[city._id].cityTotal.total;
    const vehicleTypes = selectedCityData[city._id]?.byVehicleTypes;

    const domainTypesOfCity = [];
    // get warehouse ids from courier status data to get domain types from warehouse data
    const getWarehouseIdsFromCourierStatusData = (selectedCityData[city._id]?.cityTotal?.warehouses)?.map(data => data?.warehouseId);
    (getWarehouseIdsFromCourierStatusData || []).forEach(data => {
      domainTypesOfCity.push(...(warehouseDomainTypes[data] || []));
    });

    citiesData.push({
      key: city._id,
      firstColumn: {
        id: city._id,
        name: city.name[getLangKey()],
      },
      vehicleTypes,
      planned,
      realized: total,
      differenceBetweenRealizedAndPlanned: (total || 0) - (planned || 0),
      idle: free,
      onOrder,
      returning,
      busy,
      utilization,
      domainTypes: [...new Set(domainTypesOfCity)],
    });
  });

  if (citiesData.length) {
    const { busy, utilization, returning, planned, free, onOrder, total } = selectedCountry.total;

    const totalState = {
      key: 'Total',
      firstColumn: { name: TOTAL_COLUMN_NAME },
      planned,
      realized: total,
      differenceBetweenRealizedAndPlanned: (total || 0) - (planned || 0),
      idle: free,
      onOrder,
      returning,
      busy,
      utilization,
    };

    citiesData.unshift(totalState);
  }

  return citiesData;
};

const getWarehousesTableData = (warehouseData, courierStatusData) => {
  if (!courierStatusData) return [];
  const totalData = courierStatusData?.cityTotal.total;
  const warehousesData = courierStatusData?.cityTotal?.warehouses;

  if (!warehousesData) return [];

  const warehousesTableData = [
    {
      key: 'Total',
      firstColumn: { name: 'Total' },
      planned: 0,
      realized: 0,
      differenceBetweenRealizedAndPlanned: 0,
      idle: 0,
      onOrder: 0,
      returning: 0,
      busy: 0,
      utilization: 0,
      domainTypes: [],
      vehicleTypes: courierStatusData?.byVehicleTypes,
    },
  ];

  (warehousesData || []).forEach(warehouse => {
    const { busy, utilization, returning, planned, free, onOrder, total, warehouseId } = warehouse;
    // need to format vehicle types to match warehouse data
    // normally warehouse does not have vehicle types, courier has vehicle types
    const formattedVehicleTypes = {};
    Object.entries(courierStatusData?.byVehicleTypes || {})?.forEach(([key, value]) => {
      formattedVehicleTypes[key] = { total: value?.warehouses?.find(data => data?.warehouseId === warehouseId) || 0 };
    });
    warehousesTableData.push({
      key: warehouseId,
      firstColumn: {
        id: warehouseId,
        name: warehouseData.find(data => data.id === warehouseId)?.name || 'N/A',
      },
      planned,
      realized: total,
      differenceBetweenRealizedAndPlanned: (total || 0) - (planned || 0),
      idle: free,
      onOrder,
      returning,
      busy,
      utilization: utilization || 0,
      domainTypes: warehouseData.find(data => data.id === warehouseId)?.domainTypes || [],
      vehicleTypes: formattedVehicleTypes,
    });
  });

  const totalRow = warehousesTableData[0];
  totalRow.planned = totalData?.planned;
  totalRow.realized = totalData?.total;
  totalRow.differenceBetweenRealizedAndPlanned = (totalData?.total || 0) - (totalData?.planned || 0);
  totalRow.idle = totalData?.free;
  totalRow.onOrder = totalData?.onOrder;
  totalRow.returning = totalData?.returning;
  totalRow.busy = totalData?.busy;
  totalRow.utilization = totalData?.utilization || 0;

  return warehousesTableData;
};

const getAllWarehousesDataFromCountrySelectedCourierStatusData = ({
  cityMap,
  warehouses,
  courierStatusData,
}) => {
  const selectedCountryCitiesData = courierStatusData?.selectedCountryCitiesData;
  const allWarehousesTableData = [];

  Object.keys(selectedCountryCitiesData).forEach(cityKey => {
    const selectedCityData = selectedCountryCitiesData[cityKey];
    const warehousesTableData = getWarehousesTableData(warehouses, selectedCityData);
    const cityNameMappedWarehousesData = warehousesTableData.map(w => ({
      ...w,
      cityName: cityMap[cityKey]?.name?.[getLangKey()],
    }));

    allWarehousesTableData.push(...cityNameMappedWarehousesData);
  });

  return allWarehousesTableData;
};

const getTotalRowForAllWarehousesData = (allWarehousesData, t) => {
  const totalRow = {
    city: t('global:TOTAL'),
    warehouse: '-',
    planned: 0,
    realized: 0,
    idle: 0,
    onOrder: 0,
    returning: 0,
    busy: 0,
    utilization: 0,
    differenceBetweenRealizedAndPlanned: 0,
  };

  allWarehousesData.forEach(warehouse => {
    totalRow.planned += warehouse.planned || 0;
    totalRow.realized += warehouse.realized || 0;
    totalRow.idle += warehouse.idle || 0;
    totalRow.onOrder += warehouse.onOrder || 0;
    totalRow.returning += warehouse.returning || 0;
    totalRow.busy += warehouse.busy || 0;
    totalRow.utilization += warehouse.utilization || 0;
    totalRow.differenceBetweenRealizedAndPlanned += warehouse.differenceBetweenRealizedAndPlanned || 0;
  });

  totalRow.utilization = Math.floor(totalRow.utilization / allWarehousesData.length);

  return totalRow;
};

const getSortedAndMappedAllWarehousesData = allWarehousesData => {
  const csvDataAsJSON = allWarehousesData.map(warehouse => ({
    city: warehouse.cityName,
    warehouse: warehouse.firstColumn?.name,
    planned: warehouse.planned,
    realized: warehouse.realized,
    idle: warehouse.idle,
    onOrder: warehouse.onOrder,
    returning: warehouse.returning,
    busy: warehouse.busy,
    utilization: warehouse.utilization,
    differenceBetweenRealizedAndPlanned: warehouse.differenceBetweenRealizedAndPlanned,
  }));

  return csvDataAsJSON.sort((a, b) => a.city.localeCompare(b.city));
};

const getCSVColumnMappedAllWarehouseData = (allWarehousesData, t) => {
  return allWarehousesData.map(warehouseData => ({
    [t('global:CITIES')]: warehouseData.city,
    [t('global:WAREHOUSES')]: warehouseData.warehouse,
    [t('courierLiveMonitoringPage:PLANNED')]: warehouseData.planned,
    [t('courierLiveMonitoringPage:REALIZED')]: warehouseData.realized,
    [t('courierLiveMonitoringPage:IDLE')]: warehouseData.idle,
    [t('courierLiveMonitoringPage:ON_ORDER')]: warehouseData.onOrder,
    [t('courierLiveMonitoringPage:RETURNING')]: warehouseData.returning,
    [t('courierLiveMonitoringPage:BUSY')]: warehouseData.busy,
    [t('courierLiveMonitoringPage:UTILIZATION')]: warehouseData.utilization,
    [t('courierLiveMonitoringPage:DIFFERENCE_BETWEEN_REALIZED_AND_PLANNED')]: warehouseData.differenceBetweenRealizedAndPlanned,
  }));
};

export const downloadAllWarehousesCourierStatusData = ({ cities, courierStatusData, filteredWarehouses, t }) => {
  const cityMap = keyBy(cities, 'id');
  const allWarehousesData = (
    getAllWarehousesDataFromCountrySelectedCourierStatusData({
      cityMap,
      warehouses: filteredWarehouses,
      courierStatusData,
    }).filter(wData => wData.key !== 'Total')
  );

  const sortedAndMappedAllWarehousesData = getSortedAndMappedAllWarehousesData(allWarehousesData);
  const allWarehousesDataTotalRow = getTotalRowForAllWarehousesData(sortedAndMappedAllWarehousesData, t);
  const allWarehouseDataWithTotalRow = [allWarehousesDataTotalRow, ...sortedAndMappedAllWarehousesData];
  const csvColumnMappedAllWarehouseData = getCSVColumnMappedAllWarehouseData(allWarehouseDataWithTotalRow, t);

  const now = moment().format('YYYY_MM_DD_HH_mm');
  downloadDataAsCSVV2(csvColumnMappedAllWarehouseData, `${t('courierLiveMonitoringPage:ALL_WAREHOUSES_BASED_CSV_EXPORT_PREFIX')}_${now}.csv`);
};

export const getTableData = (cities = [], warehouseData, courierStatusData, selectedCity) => {
  if (isEmpty(courierStatusData)) return [];
  const { selectedCityData } = courierStatusData;
  if (selectedCity) return getWarehousesTableData(warehouseData, selectedCityData);
  return getCitiesTableData(cities, courierStatusData, warehouseData);
};
