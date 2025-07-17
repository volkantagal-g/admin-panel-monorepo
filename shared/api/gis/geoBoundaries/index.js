import axios from '@shared/axios/common';

const GEO_BOUNDARIES_URL = '/gis/geoBoundaries';

export const getCountryBoundary = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/getCountryBoundary`,
    data: { id },
  });
  const { countryBoundaries } = data;
  const [boundary] = countryBoundaries;
  return boundary;
};

export const updateCountryBoundaryById = async ({ id, updatedData }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/updateCountryBoundaryById`,
    data: { id, updatedData },
  });
  return data;
};

export const createCountryBoundary = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/createCountryBoundary`,
    data: body,
  });
  return data;
};

export const getCityBoundary = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/getCityBoundary`,
    data: { id },
  });
  const { cityBoundaries } = data;
  const [boundary] = cityBoundaries;
  return boundary;
};

export const updateCityBoundaryById = async ({ id, updatedData }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/updateCityBoundaryById`,
    data: { id, updatedData },
  });
  return data;
};

export const createCityBoundary = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${GEO_BOUNDARIES_URL}/createCityBoundary`,
    data: body,
  });
  return data;
};
