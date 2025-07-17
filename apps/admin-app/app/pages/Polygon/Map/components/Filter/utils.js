import { WAREHOUSE_REQUIRED_POLYGON_TYPES } from '@shared/shared/constants';
import { t } from '@shared/i18n';

export const isValidWarehouse = (polygonType, warehouse, warehouseMap) => {
  let isValid = true;
  if (WAREHOUSE_REQUIRED_POLYGON_TYPES.includes(polygonType)) {
    isValid = !!warehouseMap[warehouse];
  }
  if (polygonType === 13) {
    const { value } = warehouseMap;
    if (!value.includes(warehouse)) {
      isValid = !!warehouseMap[warehouse];
    }
  }

  return isValid;
};

export const validateWarehouse = (polygonType, warehouse, warehouseMap, index) => {
  if (!isValidWarehouse(polygonType, warehouse, warehouseMap)) {
    if (warehouse) {
      throw t('polygonPage:INVALID_WAREHOUSE', { index: index + 1, id: warehouse });
    }
    else {
      throw t('polygonPage:NO_WAREHOUSE', { index: index + 1 });
    }
  }
};

export const checkWarehouseUniqueness = (prevWarehouseMap, currWarehouse, index) => {
  if (prevWarehouseMap[currWarehouse]) {
    throw t('polygonPage:DUPLICATE_WAREHOUSE', {
      firstIndex: prevWarehouseMap[currWarehouse].index + 1,
      secondIndex: index + 1,
      id: currWarehouse,
    });
  }
};
