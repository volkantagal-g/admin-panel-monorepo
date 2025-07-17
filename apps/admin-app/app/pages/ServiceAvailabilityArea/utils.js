import { get, isEmpty } from 'lodash';
import { centroid } from '@turf/turf';

import { DEFAULT_PAGE_SIZE, CENTER_OF_TURKEY } from './constants';

export const getCountryCode = (country, countries) => {
  let tempCountryObj;
  if (countries?.length) {
    tempCountryObj = countries.find(c => c._id === country);
  }
  else {
    tempCountryObj = country;
  }
  return get(tempCountryObj, ['code', 'alpha2']);
};

export const getCenterOfPolygon = polygon => {
  if (isEmpty(polygon)) return CENTER_OF_TURKEY;

  const center = centroid(polygon);

  return center.geometry.coordinates.reverse();
};

export const getFormattedSaa = (saa, countries) => {
  if (isEmpty(saa)) return {};
  const { _id: id, name, countryCode, activeServices, polygon, isAutomated } = saa;

  // pretty print
  const geoJSON = JSON.stringify(polygon, null, 2);
  const activeDomains = (activeServices || []).map(s => parseInt(s, 10));
  const country = countries.find(selectedCountry => get(selectedCountry, ['code', 'alpha2']) === countryCode)._id;
  return {
    id,
    name,
    activeDomains,
    country,
    geoJSON,
    isAutomated,
  };
};

export const getFormattedRequestBody = (saa, countries) => {
  const { id, name, country, activeDomains, geoJSON } = saa;
  const requestBody = { name, isAutomated: false };

  if (id) {
    requestBody.serviceAvailabilityAreaId = id;
  }

  if (geoJSON) {
    requestBody.polygon = JSON.parse(geoJSON);
  }
  if (activeDomains?.length) {
    // expects array of string
    requestBody.activeServices = activeDomains.map(ad => `${ad}`);
  }
  if (country && countries?.length) {
    requestBody.countryCode = getCountryCode(country, countries);
  }

  return requestBody;
};

export const getFormattedFilterRequestBody = filters => {
  const { domainType, country } = filters;
  const requestBody = { pageSize: DEFAULT_PAGE_SIZE };

  if (country) {
    requestBody.countryCodes = [getCountryCode(country)];
  }

  if (domainType) {
    // expects string
    requestBody.activeService = `${domainType}`;
  }

  return requestBody;
};
