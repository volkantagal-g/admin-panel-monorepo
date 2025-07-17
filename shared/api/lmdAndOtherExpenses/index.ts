import axios from '@shared/axios/common';

const BASE_URL = '/lmdAndOtherExpenses';

export const uploadLastMileDeliveryCost = async ({ data }) => {
  const { data: axiosReturnedData } = await axios
    .post(`${BASE_URL}/uploadLastMileDeliveryCost`, { data });

  return axiosReturnedData;
};

export const uploadLogisticCost = async ({ data }) => {
  const { data: axiosReturnedData } = await axios
    .post(`${BASE_URL}/uploadLogisticCost`, { data });

  return axiosReturnedData;
};

export const uploadOtherCost = async ({ data }) => {
  const { data: axiosReturnedData } = await axios
    .post(`${BASE_URL}/uploadOtherCost`, { data });

  return axiosReturnedData;
};
