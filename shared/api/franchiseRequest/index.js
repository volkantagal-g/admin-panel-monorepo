import axios from '@shared/axios/common';

export const getFranchiseRequestList = async ({ startDate, endDate, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseRequest/filter`,
    data: { limit, offset, startDate, endDate },
  });
  return data;
};

export const getFranchiseRequestEnums = async ({ countryCode }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRequest/getEnums',
    data: { countryCode },
  });
  return data;
};

export const getFranchiseRequestListReport = async ({ startDate, endDate, utcOffset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRequest/report',
    data: { startDate, endDate, utcOffset },
  });
  return data;
};
