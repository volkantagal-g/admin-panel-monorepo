import { get } from 'lodash';

export const getWarehouseOptions = (warehouses = []) => {
  return warehouses?.map(warehouse => {
    return {
      value: get(warehouse, '_id', ''),
      label: get(warehouse, ['name'], ''),
    };
  });
};
