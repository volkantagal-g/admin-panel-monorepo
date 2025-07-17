import { isEmpty } from 'lodash';

import { getLimitAndOffset } from '@shared/utils/common';

export const getWarehouseProposalsRequestBody = ({ filters }) => {
  const requestBody = {};

  if (filters.city) {
    requestBody.city = filters.city;
  }

  if (filters.district) {
    requestBody.district = filters.district;
  }

  if (filters.status) {
    requestBody.status = filters.status;
  }

  if (filters.minNetTotalSize) {
    requestBody.minNetTotalSize = filters.minNetTotalSize;
  }

  if (filters.maxNetTotalSize) {
    requestBody.maxNetTotalSize = filters.maxNetTotalSize;
  }

  if (filters.isCreatedByAdmin) {
    requestBody.isCreatedByAdmin = filters.isCreatedByAdmin;
  }

  if (filters.proposalName) {
    requestBody.proposalName = filters.proposalName;
  }

  if (filters.startDate && filters.endDate) {
    requestBody.startDate = filters.startDate.toISOString();
    requestBody.endDate = filters.endDate.toISOString();
  }

  if (!isEmpty(filters.sort)) {
    requestBody.sort = filters.sort;
  }

  const pagination = getLimitAndOffset(filters);

  return {
    ...requestBody,
    ...pagination,
  };
};
