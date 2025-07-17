import { getLimitAndOffset } from '@shared/utils/common';

export const getLocationWriteOffRequestParams = filters => {
  const params = {};
  const { warehouses, createdAt, approvedAt, locations, statuses, reasons, rowsPerPage, currentPage } = filters;
  if (locations?.length) {
    params.locations = locations;
  }

  if (warehouses?.length) {
    params.warehouses = warehouses;
  }

  if (statuses?.length) {
    params.statuses = statuses;
  }

  if (reasons?.length) {
    params.reasons = reasons;
  }

  if (approvedAt) {
    params.approvedAt = approvedAt;
  }

  if (createdAt) {
    params.createdAt = createdAt;
  }
  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;
  return params;
};
