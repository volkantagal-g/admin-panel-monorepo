import { isEmpty } from 'lodash';

export const getMarketFranchiseUserRolesRequestBody = (limit, offset, filters) => {
  const requestBody = {};

  if (!isEmpty(filters?.roleName)) {
    requestBody.key = filters.roleName;
  }
  return { ...requestBody, limit, offset };
};
