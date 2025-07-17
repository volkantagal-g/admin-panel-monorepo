import { isEmpty } from 'lodash';

import { GETIR_LOCALS_DOMAIN_TYPE, GETIR_FOOD_DOMAIN_TYPE } from '@shared/shared/constants';

import { SELECTABLE_VEHICLE_TYPES } from '../constants';

export const isDedicatedLocalsWarehouse = warehouse => {
  return (
    (warehouse?.domainTypes?.length === 1 && warehouse?.domainTypes[0] === GETIR_LOCALS_DOMAIN_TYPE) ||
    (warehouse?.domainTypes?.length === 2 && warehouse?.domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) &&
    warehouse?.domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE))
  );
};

const formatData = ({ data, warehouses, commonWarehouses }) => {
  if (isEmpty(data) || isEmpty(warehouses)) return null;
  const byCities = {};

  Object.keys(data).forEach(warehouseId => {
    const foundWarehouse = warehouses.find(warehouse => warehouse._id === warehouseId);
    if (!foundWarehouse) return null;

    const warehouseData = data[warehouseId];

    if (!byCities[foundWarehouse.city._id]) {
      byCities[foundWarehouse.city._id] = {};
      byCities[foundWarehouse.city._id].warehouses = {};
    }

    if (!byCities[foundWarehouse.city._id].warehouses[warehouseId]) {
      byCities[foundWarehouse.city._id].warehouses[warehouseId] = {};
    }

    Object.keys(warehouseData.byVehicleType).forEach(vehicleType => {
      const stats = warehouseData.byVehicleType[vehicleType];

      if (!byCities[foundWarehouse.city._id][vehicleType]) {
        byCities[foundWarehouse.city._id][vehicleType] = {};
      }

      if (!byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType]) {
        byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType] = {};
      }

      stats.isGFLOrder = !!commonWarehouses.includes(warehouseId);
      stats.onGFLOrder = 0;
      stats.onGLOrder = 0;

      Object.keys(stats).forEach(statKey => {
        if (statKey === 'onOrder' && stats.isGFLOrder) {
          const newCityValue = (byCities[foundWarehouse.city._id][vehicleType].onGFLOrder || 0) + stats[statKey];

          const newWarehouseValue =
          (byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType]?.onGFLOrder || 0) +
          stats[statKey];

          byCities[foundWarehouse.city._id][vehicleType].onGFLOrder = newCityValue;
          byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType].onGFLOrder = newWarehouseValue;
        }
        else if (statKey === 'onOrder') {
          const newCityValue = (byCities[foundWarehouse.city._id][vehicleType].onGLOrder || 0) + stats[statKey];

          const newWarehouseValue =
          (byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType]?.onGLOrder || 0) +
          stats[statKey];

          byCities[foundWarehouse.city._id][vehicleType].onGLOrder = newCityValue;
          byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType].onGLOrder = newWarehouseValue;
        }
        else {
          const newCityValue = (byCities[foundWarehouse.city._id][vehicleType][statKey] || 0) + stats[statKey];

          const newWarehouseValue =
          (byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType]?.[statKey] || 0) +
          stats[statKey];

          byCities[foundWarehouse.city._id][vehicleType][statKey] = newCityValue;
          byCities[foundWarehouse.city._id].warehouses[warehouseId][vehicleType][statKey] = newWarehouseValue;
        }
      });
    });
    return null;
  });

  return byCities;
};

export const formatCourierPlanAndCountsData = ({ data, warehouses }) => {
  if (isEmpty(data)) return null;
  const formattedData = formatData({
    data: {
      ...data.total.domainType[GETIR_LOCALS_DOMAIN_TYPE].warehousesMap,
      ...data.total.domainType[GETIR_FOOD_DOMAIN_TYPE].warehousesMap,
    },
    warehouses,
    commonWarehouses: Object.keys(data.total.domainType[GETIR_FOOD_DOMAIN_TYPE].warehousesMap),
  });
  return formattedData;
};

export const formatCourierPlanAndCountsTableData = ({
  data,
  cities,
  selectedVehicleTypes = SELECTABLE_VEHICLE_TYPES,
}) => {
  if (isEmpty(data) || isEmpty(cities) || isEmpty(selectedVehicleTypes)) return null;
  const formattedData = [];
  const selectedVehicleTypesToMap = selectedVehicleTypes.length
    ? selectedVehicleTypes
    : SELECTABLE_VEHICLE_TYPES;

  Object.keys(data).forEach(city => {
    const cityData = data[city];
    const foundCity = cities[city];
    if (!cityData || !foundCity) return null;

    const formattedCityData = {};

    selectedVehicleTypesToMap.forEach(vehicleType => {
      const cityVehicleTypeData = cityData[vehicleType];
      if (cityVehicleTypeData) {
        Object.keys(cityVehicleTypeData).forEach(statKey => {
          const newValue = (formattedCityData[statKey] || 0) + cityVehicleTypeData[statKey];
          formattedCityData[statKey] = newValue;
        });
      }
    });

    formattedData.push({
      ...formattedCityData,
      name: foundCity.name,
      key: foundCity._id,
    });

    return null;
  });

  return formattedData;
};

export const formatCourierPlanAndCountsTableDataByCities = ({
  data: cityData,
  warehouses,
  selectedVehicleTypes = SELECTABLE_VEHICLE_TYPES,
}) => {
  if (isEmpty(cityData) || isEmpty(warehouses) || isEmpty(selectedVehicleTypes)) return null;
  const formattedData = [];
  const selectedVehicleTypesToMap = selectedVehicleTypes.length
    ? selectedVehicleTypes
    : SELECTABLE_VEHICLE_TYPES;

  Object.keys(cityData).forEach(warehouseId => {
    const warehouseData = cityData[warehouseId];
    const foundWarehouse = warehouses[warehouseId];

    const formattedWarehouseData = {};

    selectedVehicleTypesToMap.forEach(vehicleType => {
      const cityVehicleTypeData = warehouseData[vehicleType];
      if (cityVehicleTypeData) {
        Object.keys(cityVehicleTypeData).forEach(statKey => {
          const newValue = (formattedWarehouseData[statKey] || 0) + cityVehicleTypeData[statKey];
          formattedWarehouseData[statKey] = newValue;
        });
      }
    });

    formattedData.push({
      ...formattedWarehouseData,
      name: foundWarehouse.name,
      key: foundWarehouse._id,
    });
  });

  return formattedData;
};
