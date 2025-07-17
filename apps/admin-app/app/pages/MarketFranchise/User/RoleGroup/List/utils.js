import { isEmpty, isNil } from 'lodash';

export const getMarketFranchiseUserRoleGroupRequestBody = (limit, offset, filters) => {
  const requestBody = {};
  if (!isEmpty(filters?.name)) {
    requestBody.name = filters.name;
  }
  if (!isNil(filters.isActive)) {
    requestBody.isActive = filters.isActive;
  }
  return { ...requestBody, limit, offset };
};
