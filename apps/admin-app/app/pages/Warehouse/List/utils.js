import _ from 'lodash';

import { getLimitAndOffset } from '@shared/utils/common';

export const getWarehousesRequestBody = ({
  domainTypes,
  cities,
  statuses,
  states,
  warehouseTypes,
  name,
  SAPReferenceCodes,
  currentPage,
  rowsPerPage,
}) => {
  const requestBody = {};

  if (domainTypes && !_.isEmpty(domainTypes)) {
    const domainTypeValues = domainTypes.map(domainType => +domainType);
    requestBody.domainTypes = domainTypeValues;
  }

  if (cities && !_.isEmpty(cities)) {
    requestBody.cities = cities;
  }

  if (statuses && !_.isEmpty(statuses)) {
    requestBody.statuses = statuses;
  }

  if (states && !_.isEmpty(states)) {
    requestBody.states = states;
  }

  if (warehouseTypes && !_.isEmpty(warehouseTypes)) {
    requestBody.warehouseTypes = warehouseTypes;
  }

  if (name && !_.isEmpty(name)) {
    requestBody.name = name;
  }

  if (SAPReferenceCodes && !_.isEmpty(SAPReferenceCodes)) {
    requestBody.SAPReferenceCodes = SAPReferenceCodes;
  }

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  requestBody.limit = limit;
  requestBody.offset = offset;
  return requestBody;
};
