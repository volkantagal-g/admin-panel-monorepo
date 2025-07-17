import {
  orderBy as _orderBy,
  cloneDeep as _cloneDeep,
  isEmpty as _isEmpty,
} from 'lodash';

import { WAREHOUSE_FREE_STATUS, WAREHOUSE_BUSY_STATUS, SORT_OPTIONS } from '@shared/shared/constants';
import { createMap, getRegexForCaseSensitiveLetters } from '@shared/utils/common';
import { VEHICLE_TYPE_ORDERS } from '@app/pages/GetirMarket/LiveMap/components/CourierStatsPanel/constants';

const dataSkeleton = {
  planned: 0,
  total: 0,
  free: 0,
  onDuty: 0,
  returning: 0,
  busy: 0,
  utilization: 0,
  utilized: 0,
  utilizableTotal: 0,
  name: '-',
};

const isValidRow = row => Object.keys(row).some(data => (
  data !== 'key' && data !== 'name' && data !== 'sortOrder' && row[data] > 0
));

const getWarehouseMap = warehouses => {
  const warehouseMap = new Map();
  warehouses.forEach(warehouse => warehouseMap.set(warehouse._id, warehouse));

  return warehouseMap;
};

const filterWarehousesByWarehouseSearch = ({ warehouseData, warehouseMap, warehouseSearch, selectedDomainType }) => {
  const foundWarehouse = warehouseMap.get(warehouseData.warehouseId);
  let resultBoolean = false;
  if (foundWarehouse) {
    if (selectedDomainType) {
      resultBoolean = foundWarehouse.domainTypes.includes(selectedDomainType);
      // if domain type failed, early return, no need to check warehouse name search
      if (!resultBoolean) return resultBoolean;
    }

    if (warehouseSearch) {
      const warehouseSearchRegex = getRegexForCaseSensitiveLetters(warehouseSearch);
      resultBoolean = foundWarehouse.name.match(warehouseSearchRegex);
    }
  }

  return resultBoolean;
};

const getVehicleTypeData = ({ rawData, warehouseMap, hasChildren, warehouseSearch, selectedDomainType }) => {
  const filteredData = {};

  const { total, vehicleType: vehicleTypeRawData } = rawData;

  const returnArr = [];
  const totalRow = _cloneDeep(dataSkeleton);

  totalRow.name = 'TOTAL';
  totalRow.key = 'TOTAL';

  if (warehouseSearch || selectedDomainType) {
    Object.keys(vehicleTypeRawData).forEach(vehicleType => {
      filteredData[vehicleType] = {
        total: vehicleTypeRawData[vehicleType].total,
        warehouses: vehicleTypeRawData[vehicleType].warehouses.filter(warehouse => (
          filterWarehousesByWarehouseSearch({
            warehouseData: warehouse,
            warehouseMap,
            warehouseSearch,
            selectedDomainType,
          })
        )),
      };
    });
  }

  const mappingData = !_isEmpty(filteredData) ? filteredData : vehicleTypeRawData;

  if (!_isEmpty(mappingData)) {
    Object.keys(mappingData).forEach(type => {
      const vehicleTypeData = _cloneDeep(dataSkeleton);
      vehicleTypeData.sortOrder = VEHICLE_TYPE_ORDERS[type] ?? type;

      if (hasChildren) vehicleTypeData.warehousesList = [];

      vehicleTypeData.name = Number(type);
      vehicleTypeData.key = Number(type);

      mappingData[type].warehouses.forEach(warehouse => {
        vehicleTypeData.planned += warehouse?.planned || 0;
        vehicleTypeData.total += warehouse?.total || 0;
        vehicleTypeData.free += warehouse?.free || 0;
        vehicleTypeData.onDuty += warehouse?.onDuty || 0;
        vehicleTypeData.returning += warehouse?.returning || 0;
        vehicleTypeData.busy += warehouse?.busy || 0;
        vehicleTypeData.utilized += warehouse?.utilized || 0;
        vehicleTypeData.utilizableTotal += warehouse?.utilizableTotal || 0;

        if (hasChildren) {
          const foundWarehouse = warehouseMap.get(warehouse.warehouseId);

          if (foundWarehouse) {
            const warehouseItem = {
              ...warehouse,
              name: foundWarehouse.name,
              key: foundWarehouse._id,
            };

            vehicleTypeData.warehousesList.push(warehouseItem);
          }
        }
      });

      vehicleTypeData.utilization = (vehicleTypeData.utilized / vehicleTypeData.utilizableTotal) * 100 || 0;

      totalRow.planned += vehicleTypeData?.planned || 0;
      totalRow.total += vehicleTypeData?.total || 0;
      totalRow.free += vehicleTypeData?.free || 0;
      totalRow.onDuty += vehicleTypeData?.onDuty || 0;
      totalRow.returning += vehicleTypeData?.returning || 0;
      totalRow.busy += vehicleTypeData?.busy || 0;
      totalRow.utilized += vehicleTypeData?.utilized ?? 0;
      totalRow.utilizableTotal += vehicleTypeData?.utilizableTotal ?? 0;

      // don't show a row which has all 0s in the values
      if (isValidRow(vehicleTypeData)) {
        returnArr.push(vehicleTypeData);
      }
    });
  }

  totalRow.utilization = (totalRow.utilized / totalRow.utilizableTotal) * 100 || 0;

  if (hasChildren) {
    const totalWarehouseData =
      warehouseSearch || selectedDomainType
        ? total.warehouses.filter(warehouse => (
          filterWarehousesByWarehouseSearch({ warehouseData: warehouse, warehouseMap, warehouseSearch, selectedDomainType })
        ))
        : total.warehouses;

    totalRow.warehousesList = totalWarehouseData.map(warehouse => ({
      ...warehouse,
      name: warehouseMap.get(warehouse.warehouseId)?.name || '-',
      key: warehouse.warehouseId,
    }));
  }
  const orderedArr = _orderBy(returnArr, 'sortOrder');
  orderedArr.unshift(totalRow);

  return orderedArr.length ? orderedArr : [];
};

const formatWarehouseStatuses = ({
  data,
  courierPlanViolations = [],
  noBreadStockWarehouses,
  noRamadanPitaStockWarehouses,
  warehouseMap,
  selectedDomainType,
}) => {
  const warehousesByStatus = {
    busy: [],
    free: 0,
    below: [],
    noBreadStock: [],
    noRamadanPita: [],
  };
  const courierPlanViolationsMap = createMap(courierPlanViolations, { field: 'warehouseId' });

  if (data) {
    data.forEach(warehouse => {
      const foundWarehouse = warehouseMap.get(warehouse.warehouseId);
      if (!foundWarehouse) return;

      if (selectedDomainType && !foundWarehouse.domainTypes.includes(selectedDomainType)) {
        return;
      }

      if (foundWarehouse) {
        switch (foundWarehouse.status) {
          case WAREHOUSE_FREE_STATUS:
            warehousesByStatus.free += 1;
            break;
          case WAREHOUSE_BUSY_STATUS:
            warehousesByStatus.busy.push(foundWarehouse.name);
            break;
          default:
            break;
        }

        if (courierPlanViolationsMap[warehouse.warehouseId]) {
          warehousesByStatus.below.push({
            key: warehouse.warehouseId,
            name: foundWarehouse.name,
            planned: courierPlanViolationsMap[warehouse.warehouseId].planned,
            total: courierPlanViolationsMap[warehouse.warehouseId].total,
          });
        }
      }
    });
  }

  noBreadStockWarehouses?.warehouses?.forEach(warehouse => {
    const warehouseObj = warehouseMap.get(warehouse);
    if (selectedDomainType && warehouseObj?.domainTypes?.includes(selectedDomainType)) {
      warehousesByStatus.noBreadStock.push({ name: warehouseObj?.name });
    }
  });
  noRamadanPitaStockWarehouses?.warehouses?.forEach(warehouse => {
    const warehouseObj = warehouseMap.get(warehouse);
    if (selectedDomainType && warehouseObj?.domainTypes?.includes(selectedDomainType)) {
      warehousesByStatus.noRamadanPita.push({ name: warehouseObj?.name });
    }
  });

  return warehousesByStatus;
};

const getCourierCountsForSelectedCountry = ({
  data,
  courierPlanViolations,
  warehouseMap,
  selectedDomainType,
  noBreadStockWarehouses,
  noRamadanPitaStockWarehouses,
}) => {
  const countryData = data?.selectedCountry;

  if (_isEmpty(countryData)) return null;

  const formattedData = {
    table: [],
    headerData: {},
  };

  const formattedVehicleTypeData = getVehicleTypeData({ rawData: countryData, selectedDomainType, warehouseMap });

  formattedData.table = formattedVehicleTypeData;

  const headerData = formatWarehouseStatuses({
    data: countryData.total?.warehouses,
    courierPlanViolations: courierPlanViolations?.selectedCountry,
    noBreadStockWarehouses: noBreadStockWarehouses?.selectedCountry,
    noRamadanPitaStockWarehouses: noRamadanPitaStockWarehouses?.selectedCountry,
    warehouseMap,
    selectedDomainType,
  });
  formattedData.headerData = headerData;

  return formattedData;
};

const getCourierCountsForSelectedDivision = ({ data }) => {
  const divisionData = data?.selectedDivision;

  if (_isEmpty(divisionData)) return null;

  const formattedData = {
    table: [],
    // NO header warehouse data, because we don't fetch all the warehouses from a division
    headerData: {},
  };

  const formattedVehicleTypeData = getVehicleTypeData({ rawData: divisionData });

  formattedData.table = formattedVehicleTypeData;

  return formattedData;
};

const getCourierCountsForSelectedCity = ({
  data: rawData,
  courierPlanViolations,
  warehouseMap,
  warehouseSearch,
  selectedDomainType,
  noBreadStockWarehouses,
  noRamadanPitaStockWarehouses,
}) => {
  const cityData = rawData?.selectedCity;

  if (_isEmpty(cityData)) return null;

  const formattedData = {
    table: getVehicleTypeData({
      rawData: cityData,
      warehouseMap,
      hasChildren: true,
      warehouseSearch,
      selectedDomainType,
    }),
    headerData: {},
  };

  const { total } = cityData;

  const data = (
    warehouseSearch || selectedDomainType ?
      total?.warehouses.filter(warehouse => (
        filterWarehousesByWarehouseSearch({
          warehouseData: warehouse,
          warehouseMap,
          warehouseSearch,
          selectedDomainType,
        })
      )) :
      total?.warehouses
  );

  const headerData = formatWarehouseStatuses({
    data,
    warehouseMap,
    warehouseSearch,
    selectedDomainType,
    courierPlanViolations: courierPlanViolations?.selectedCity,
    noBreadStockWarehouses: noBreadStockWarehouses?.selectedCity,
    noRamadanPitaStockWarehouses: noRamadanPitaStockWarehouses?.selectedCity,
  });
  formattedData.headerData = headerData;

  return formattedData;
};

export const formatCourierCountsTableData = ({
  data,
  warehouses,
  courierPlanViolations,
  warehouseSearch,
  noBreadStockWarehouses,
  noRamadanPitaStockWarehouses,
  domainType: selectedDomainType,
}) => {
  const warehouseMap = getWarehouseMap(warehouses);
  const selectedCityData = getCourierCountsForSelectedCity({
    data,
    courierPlanViolations,
    warehouseMap,
    warehouseSearch,
    selectedDomainType,
    noBreadStockWarehouses,
    noRamadanPitaStockWarehouses,
  });
  const countryData = getCourierCountsForSelectedCountry({
    data,
    courierPlanViolations,
    warehouseMap,
    selectedDomainType,
    noBreadStockWarehouses,
    noRamadanPitaStockWarehouses,
  });
  const divisionData = getCourierCountsForSelectedDivision({ data });

  return {
    selectedCityData,
    countryData,
    divisionData,
  };
};

export const getSortOptions = ({ prevValue, field }) => {
  let tempSortKey = prevValue.sortKey;
  let tempSortDirection = prevValue.sortDirection;
  if (prevValue.sortKey === field) {
    if (tempSortDirection === SORT_OPTIONS.DIRECTIONS.TEXT.ASC) {
      tempSortKey = SORT_OPTIONS.KEYS.NAME;
      tempSortDirection = SORT_OPTIONS.DIRECTIONS.TEXT.ASC;
    }
    else {
      tempSortDirection = SORT_OPTIONS.DIRECTIONS.TEXT.ASC;
    }
  }
  else {
    tempSortKey = field;
    tempSortDirection = SORT_OPTIONS.DIRECTIONS.TEXT.DESC;
  }

  return { sortKey: tempSortKey, sortDirection: tempSortDirection };
};
