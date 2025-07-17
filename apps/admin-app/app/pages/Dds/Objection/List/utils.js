import moment from 'moment';

import { getLimitAndOffset } from '@shared/utils/common';

export const getDdsObjectionListRequestParams = filters => {
  const params = {};
  const {
    selectedFranchiseId,
    selectedWarehouseIds,
    selectedRequestTimeRange,
    selectedStatuses,
    selectedCriterionNames,
    currentPage,
    rowsPerPage,
  } = filters;

  if (selectedFranchiseId) {
    params.franchiseId = selectedFranchiseId;
  }

  if (selectedWarehouseIds?.length) {
    params.warehouseIds = selectedWarehouseIds;
  }

  if (selectedRequestTimeRange) {
    const [startDate, endDate] = selectedRequestTimeRange;
    params.startDate = moment(startDate).startOf('day');
    params.endDate = moment(endDate).endOf('day');
  }

  if (selectedStatuses?.length) {
    params.statuses = selectedStatuses;
  }

  if (selectedCriterionNames?.length) {
    params.criterionNames = selectedCriterionNames;
  }

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;

  return params;
};
