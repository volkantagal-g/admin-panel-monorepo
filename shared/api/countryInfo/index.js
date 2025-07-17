import axios from '@shared/axios/common';

const COUNTRY_INFO_URL = 'countryInfo';

export const getDivision = ({ countryIds, divisionId }) => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getDivision`,
    data: { countryIds, id: divisionId },
  }).then(response => {
    return response.data;
  });
};

export const getDivisions = ({ countryIds, divisionIds }) => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getDivisions`,
    data: { countryIds, ids: divisionIds },
  }).then(response => {
    return response.data;
  });
};

export const getCountries = requestBody => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getCountries`,
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getCountriesFromBE = requestBody => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getCountriesFromBE`,
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getCountry = requestBody => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getCountry`,
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getCities = requestBody => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getCities`,
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getRegions = requestBody => {
  return axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/getRegions`,
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createCountry = async ({ body: requestBody }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/createCountry`,
    data: requestBody,
  });
  return data;
};

export const updateCountryById = async ({ id, updatedData }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/updateCountryById`,
    data: { id, updatedData },
  });
  return data;
};

export const createCity = async ({ body: requestBody }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/createCity`,
    data: requestBody,
  });
  return data;
};

export const updateCityById = async ({ id, updatedData }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/${COUNTRY_INFO_URL}/updatecityById`,
    data: { id, updatedData },
  });
  return data;
};
