import { getLimitAndOffset } from '@shared/utils/common';

export const getMarketFranchisesRequestParams = filters => {
  const params = {};
  const {
    isActivated,
    name,
    cities,
    domainTypes,
    franchiseTypes,
    currentPage,
    rowsPerPage,
  } = filters;

  if (isActivated) {
    params.isActivated = isActivated;
  }

  if (name) {
    params.name = name;
  }

  if (cities?.length) {
    params.cities = cities;
  }

  if (domainTypes?.length) {
    const domainTypesValues = domainTypes.map(domainType => +domainType);
    params.domainTypes = domainTypesValues;
  }

  if (franchiseTypes?.length) {
    params.franchiseTypes = franchiseTypes;
  }

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;

  return params;
};
