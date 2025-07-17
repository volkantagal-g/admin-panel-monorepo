import moment from 'moment';

import { getLimitAndOffset } from '@shared/utils/common';

export const getInformationEditRequestListRequestParams = filters => {
  const params = {};
  const {
    selectedPerson,
    selectedFranchise,
    selectedRequestTimeRange,
    selectedRequestStatus,
    pagination,
  } = filters;
  
  if (selectedPerson) {
    params.person = selectedPerson;
  }

  if (selectedFranchise) {
    params.franchise = selectedFranchise;
  }

  if (selectedRequestStatus) {
    params.status = selectedRequestStatus;
  }

  if (selectedRequestTimeRange) {
    const [startDate, endDate] = selectedRequestTimeRange;
    params.startDate = moment(startDate).toISOString();
    params.endDate = moment(endDate).toISOString();
  }

  const { limit, offset } = getLimitAndOffset(pagination);
  params.limit = limit;
  params.offset = offset;

  return params;
};
