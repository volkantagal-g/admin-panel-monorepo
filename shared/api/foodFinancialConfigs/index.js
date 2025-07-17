import axios from '@shared/axios/common';

export const getFinancialConfigsVerticals = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/financial-configs/verticals',
  });
  return data;
};

export const getFinancialConfigsDomainsByVertical = async ({ vertical }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/financial-configs/vertical/domains',
    params: { vertical },
  });
  return data;
};

export const getFinancialConfigsDomain = async ({ vertical, domain }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/financial-configs/vertical/domain',
    params: { vertical, domain },
  });
  return data;
};

export const updateFinancialConfigValues = async data => {
  const response = await axios({
    method: 'POST',
    url: '/food/financial-configs/update-config',
    data,
  });
  return response.data;
};
