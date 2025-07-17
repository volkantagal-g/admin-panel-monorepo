import axios from '@shared/axios/common';

export const getEarningsApi = ({ financialMonths, warehouses, franchises }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/financial/global',
    data: { financialMonths, warehouses, franchises },
  }).then(({ data }) => data);
};

export const getVoyagerEarningsApi = ({ financialMonths, franchises, warehouses }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/financial/water/global',
    data: { financialMonths, franchises, warehouses },
  }).then(({ data }) => data);
};

export const getFranchiseEarningsSignedUrl = async ({ contentType, fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseEarnings/franchise-earning/get-upload-signed-url',
    data: { contentType, fileName },
  });
  return data;
};

export const triggerFranchiseEarnigsExcelParse = async ({ fileName, earningType }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseEarningsLambda/franchise-earning/parse-excel',
    data: { fileName, earningType },
  });
  return data;
};
