import { isNullOrUndefined } from '@shared/utils/common';

export const getFilteredAvailableTimesData = (data = [], filters = {}) => {
  return data
    .filter(item => isNullOrUndefined(filters.city) || item.city === filters.city)
    .filter(item => isNullOrUndefined(filters.warehouse) || item.warehouse === filters.warehouse)
    .filter(item => isNullOrUndefined(filters.domainType) || item.domainType === Number(filters.domainType));
};

export const initialFilters = { cities: undefined, warehouses: undefined, domainTypes: undefined };
