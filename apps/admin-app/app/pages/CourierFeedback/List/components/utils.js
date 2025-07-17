import { formatDateRangeValues } from './Filter/utils';

export const formatFilterValues = filters => {
  return {
    ...(filters.warehouse ? { warehouse: filters.warehouse } : undefined),
    ...(filters.courierName ? { courierName: filters.courierName } : undefined),
    ...(filters.dateRange ? { dateRange: formatDateRangeValues(filters.dateRange) } : undefined),
    ...(filters.feedbackOption ? { feedbackOption: filters.feedbackOption } : undefined),
    ...(filters.domainType && filters.domainType.length > 0 ? { domainType: filters.domainType } : undefined),
  };
};
