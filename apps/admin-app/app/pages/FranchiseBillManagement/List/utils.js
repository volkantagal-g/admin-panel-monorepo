import moment from 'moment';

import { getLimitAndOffset } from '@shared/utils/common';

export const getFranchiseBillManagementListRequestParams = filters => {
  const params = { lastReadDateRange: {} };
  const {
    selectedFranchiseId,
    selectedWarehouseIds,
    selectedDomainTypes,
    selectedRequestTimeRange,
    currentPage,
    rowsPerPage,
  } = filters;

  if (selectedFranchiseId) {
    params.franchiseId = [selectedFranchiseId];
  }

  if (selectedWarehouseIds?.length) {
    params.warehouseIds = selectedWarehouseIds;
  }

  params.domainTypes = selectedDomainTypes;

  if (selectedRequestTimeRange) {
    const [startDate, endDate] = selectedRequestTimeRange;
    params.lastReadDateRange.startDate = moment(startDate).startOf('day');
    params.lastReadDateRange.endDate = moment(endDate).endOf('day');
  }

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;

  return params;
};
