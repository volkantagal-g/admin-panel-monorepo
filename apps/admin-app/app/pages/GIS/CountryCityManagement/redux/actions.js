// action.js
import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    setCountryId: { id: null },
    // Country
    getCountriesWPageSizeRequest: {},
    getCountriesWPageSizeSuccess: { data: [] },
    getCountriesWPageSizeFailure: { error: null },

    createCountryRequest: { body: {} },
    createCountrySuccess: { data: [] },
    createCountryFailure: { error: null },

    updateCountryRequest: { id: null, updatedData: {} },
    updateCountrySuccess: { data: [] },
    updateCountryFailure: { error: null },

    getCountryBoundaryRequest: { id: null },
    getCountryBoundarySuccess: { data: [] },
    getCountryBoundaryFailure: { error: null },

    updateCountryBoundaryRequest: { id: null, updatedData: {} },
    updateCountryBoundarySuccess: { data: [] },
    updateCountryBoundaryFailure: { error: null },

    createCountryBoundaryRequest: { body: {} },
    createCountryBoundarySuccess: { data: [] },
    createCountryBoundaryFailure: { error: null },
    // City
    createCityRequest: { body: {} },
    createCitySuccess: { data: [] },
    createCityFailure: { error: null },

    updateCityRequest: { id: null, updatedData: {} },
    updateCitySuccess: { data: [] },
    updateCityFailure: { error: null },

    getCityBoundaryRequest: { id: null },
    getCityBoundarySuccess: { data: [] },
    getCityBoundaryFailure: { error: null },

    updateCityBoundaryRequest: { id: null, updatedData: {} },
    updateCityBoundarySuccess: { data: [] },
    updateCityBoundaryFailure: { error: null },

    createCityBoundaryRequest: { body: {} },
    createCityBoundarySuccess: { data: [] },
    createCityBoundaryFailure: { error: null },
  },
  { prefix: `${REDUX_KEY.GIS.COUNTRY_CITY_MANAGEMENT}_` },
);
