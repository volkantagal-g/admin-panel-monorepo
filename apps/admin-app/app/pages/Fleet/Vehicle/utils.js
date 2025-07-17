import { isEmpty, isUndefined } from 'lodash';

import { getLimitAndOffset } from '@shared/utils/common';

const vehicleListRequestParams = ({
  warehouseIds, franchiseIds, cities,
  tag, statuses, plate, vehicleConstraintId, currentPage, rowsPerPage, excel, withTotalCount,
}) => {
  const params = {};
  if (!isEmpty(warehouseIds)) {
    params.warehouseIds = warehouseIds;
  }

  if (!isEmpty(franchiseIds)) {
    params.franchiseIds = franchiseIds;
  }
  if (statuses !== null && statuses) {
    params.statuses = [statuses];
  }

  if (!isEmpty(plate)) {
    params.plate = plate;
  }

  if (!isEmpty(cities)) {
    params.cities = cities;
  }

  if (tag?.length) {
    params.tags = [tag];
  }

  if (!isEmpty(vehicleConstraintId)) {
    params.vehicleConstraintIds = [vehicleConstraintId];
  }
  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });
  params.limit = limit;
  params.offset = offset;

  if (!excel) {
    params.populate = ['warehouse', 'franchise'];
  }

  if (!isUndefined(withTotalCount)) {
    params.withTotalCount = withTotalCount;
  }

  return params;
};

const convertTagsToArray = obj => {
  return {
    ...obj,
    tags: obj.tags.split(','),
  };
};

export { vehicleListRequestParams, convertTagsToArray };
