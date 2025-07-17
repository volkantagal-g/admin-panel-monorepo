import { isEmpty } from 'lodash';

import { getLimitAndOffset } from '@shared/utils/common';

function vehicleListRequestParams({ plate, dincerId, palletCapacity, volumeCapacity, activeness, vehicleType, vehicleClass, rowsPerPage, currentPage }) {
  const params = {};

  if (!isEmpty(plate)) {
    params.plate = plate;
  }

  if (!isEmpty(dincerId)) {
    params.dincerId = dincerId;
  }

  if (palletCapacity > 0) {
    params.palletCapacity = palletCapacity;
  }

  if (volumeCapacity > 0) {
    params.volumeCapacity = volumeCapacity;
  }

  if (activeness !== null) {
    params.activeness = activeness;
  }

  if (!isEmpty(vehicleType)) {
    params.vehicleType = vehicleType;
  }

  if (!isEmpty(vehicleClass)) {
    params.vehicleClass = vehicleClass;
  }

  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });
  params.limit = limit;
  params.offset = offset;

  return params;
}

export default vehicleListRequestParams;
