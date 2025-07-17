import { getLimitAndOffset } from '@shared/utils/common';

export const getWarehouseSegmentsRequestParams = filters => {
  const params = {};
  const {
    name,
    dateRange,
    segmentTypes,
    isDefault,
    currentPage,
    rowsPerPage,
  } = filters;

  if (name) {
    params.name = name;
  }

  if (segmentTypes?.length) {
    params.segmentTypes = segmentTypes;
  }

  if (dateRange) {
    const [startDate, endDate] = dateRange;
    params.startDate = startDate?.startOf("day");
    params.endDate = endDate?.endOf("day");
  }

  params.isDefault = isDefault;
  
  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;

  return params;
};
