import axios from '@shared/axios/common';

export const getElasticityData = async () => {
  const response = await axios({
    method: 'GET',
    url: '/pricingTool/getElasticityData',
    json: true,
  });
  return response.data;
};

export const getSimulateIndex = async ({ productList }) => {
  const response = await axios({
    method: 'POST',
    url: '/pricingTool/getSimulateIndex',
    data: { productList },
    json: true,
  });
  return response.data;
};
