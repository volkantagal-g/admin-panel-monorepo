import { getLimitAndOffset } from '@shared/utils/common';

export const getRequestParams = filters => {
  const params = {};
  const { active, warehouses, rowsPerPage, currentPage } = filters;

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
  if (warehouses?.length) {
    params.warehouses = warehouses;
  }
  params.limit = limit;
  params.offset = offset;
  params.active = active;
  return params;
};
