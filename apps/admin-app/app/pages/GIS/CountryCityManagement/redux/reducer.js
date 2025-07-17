import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  countryId: { id: null },

  // Country
  countriesWPageSize: {
    data: [],
    isPending: false,
    error: null,
  },
  createdCountry: {
    data: [],
    isPending: false,
    error: null,
  },
  updatedCountry: {
    data: [],
    isPending: false,
    error: null,
  },
  countryBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
  cratedCountryBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
  updatedCountryBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
  // City
  createdCity: {
    data: [],
    isPending: false,
    error: null,
  },
  updatedCity: {
    data: [],
    isPending: false,
    error: null,
  },
  cityBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
  cratedCityBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
  updatedCityBoundary: {
    data: [],
    isPending: false,
    error: null,
  },
};
export const setCountryId = (state, { id }) => {
  return {
    ...state,
    countryId: { id },
  };
};

// Country
export const getCountriesWPageSizeRequest = state => {
  return {
    ...state,
    countriesWPageSize: {
      ...INITIAL_STATE.countriesWPageSize,
      isPending: true,
    },
  };
};

export const getCountriesWPageSizeSuccess = (state, { data }) => {
  return {
    ...state,
    countriesWPageSize: {
      ...INITIAL_STATE.countriesWPageSize,
      data,
      isPending: false,
    },
  };
};

export const getCountriesWPageSizeFailure = (state, { error }) => {
  return {
    ...state,
    countriesWPageSize: {
      ...INITIAL_STATE.countriesWPageSize,
      isPending: false,
      error,
    },
  };
};

export const createCountryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdCountry: {
      ...state.createdCountry,
      isPending: true,
    },
  };
};

export const createCountrySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createdCountry: {
      ...state.createdCountry,
      data,
      isPending: false,
    },
  };
};

export const createCountryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createdCountry: {
      ...state.createdCountry,
      isPending: false,
      error,
    },
  };
};

export const updateCountryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatedCountry: {
      ...state.updatedCountry,
      isPending: true,
    },
  };
};

export const updateCountrySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatedCountry: {
      ...state.updatedCountry,
      data,
      isPending: false,
    },
  };
};

export const updateCountryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatedCountry: {
      ...state.updatedCountry,
      isPending: false,
      error,
    },
  };
};

export const ceateCountryBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cratedCountryBoundary: {
      ...state.cratedCountryBoundary,
      isPending: true,
    },
  };
};

export const createCountryBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cratedCountryBoundary: {
      ...state.cratedCountryBoundary,
      data,
      isPending: false,
    },
  };
};

export const createCountryBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    cratedCountryBoundary: {
      ...state.cratedCountryBoundary,
      isPending: false,
      error,
    },
  };
};

export const updateCountryBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatedCountryBoundary: {
      ...state.updatedCountryBoundary,
      isPending: true,
    },
  };
};

export const updateCountryBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatedCountryBoundary: {
      ...state.updatedCountryBoundary,
      data,
      isPending: false,
    },
  };
};

export const updateCountryBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatedCountryBoundary: {
      ...state.updatedCountryBoundary,
      isPending: false,
      error,
    },
  };
};

export const getCountryBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    countryBoundary: {
      ...state.countryBoundary,
      isPending: true,
    },
  };
};

export const getCountryBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    countryBoundary: {
      ...state.countryBoundary,
      data,
      isPending: false,
    },
  };
};

export const getCountryBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    countryBoundary: {
      ...state.countryBoundary,
      isPending: false,
      error,
    },
  };
};

// City
export const createCityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdCity: {
      ...state.createdCity,
      isPending: true,
    },
  };
};

export const createCitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createdCity: {
      ...state.createdCity,
      data,
      isPending: false,
    },
  };
};

export const createCityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createdCity: {
      ...state.createdCity,
      isPending: false,
      error,
    },
  };
};

export const updateCityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatedCity: {
      ...state.updatedCity,
      isPending: true,
    },
  };
};

export const updateCitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatedCity: {
      ...state.updatedCity,
      data,
      isPending: false,
    },
  };
};

export const updateCityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatedCity: {
      ...state.updatedCity,
      isPending: false,
      error,
    },
  };
};

export const createCityBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cratedCityBoundary: {
      ...state.cratedCityBoundary,
      isPending: true,
    },
  };
};

export const createCityBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cratedCityBoundary: {
      ...state.cratedCityBoundary,
      data,
      isPending: false,
    },
  };
};

export const createCityBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    cratedCityBoundary: {
      ...state.cratedCityBoundary,
      isPending: false,
      error,
    },
  };
};

export const updateCityBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatedCountryBoundary: {
      ...state.updatedCountryBoundary,
      isPending: true,
    },
  };
};

export const updateCityBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatedCityBoundary: {
      ...state.updatedCityBoundary,
      data,
      isPending: false,
    },
  };
};

export const updateCityBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatedCityBoundary: {
      ...state.updatedCityBoundary,
      isPending: false,
      error,
    },
  };
};

export const getCityBoundaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cityBoundary: {
      ...state.cityBoundary,
      isPending: true,
    },
  };
};

export const getCityBoundarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cityBoundary: {
      ...state.cityBoundary,
      data,
      isPending: false,
    },
  };
};

export const getCityBoundaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    cityBoundary: {
      ...state.cityBoundary,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_COUNTRY_ID]: setCountryId,
  [Types.GET_COUNTRIES_W_PAGE_SIZE_REQUEST]: getCountriesWPageSizeRequest,
  [Types.GET_COUNTRIES_W_PAGE_SIZE_SUCCESS]: getCountriesWPageSizeSuccess,
  [Types.GET_COUNTRIES_W_PAGE_SIZE_FAILURE]: getCountriesWPageSizeFailure,
  [Types.CREATE_COUNTRY_REQUEST]: createCountryRequest,
  [Types.CREATE_COUNTRY_SUCCESS]: createCountrySuccess,
  [Types.CREATE_COUNTRY_FAILURE]: createCountryFailure,
  [Types.UPDATE_COUNTRY_REQUEST]: updateCountryRequest,
  [Types.UPDATE_COUNTRY_SUCCESS]: updateCountrySuccess,
  [Types.UPDATE_COUNTRY_FAILURE]: updateCountryFailure,
  [Types.GET_COUNTRY_BOUNDARY_REQUEST]: getCountryBoundaryRequest,
  [Types.GET_COUNTRY_BOUNDARY_SUCCESS]: getCountryBoundarySuccess,
  [Types.GET_COUNTRY_BOUNDARY_FAILURE]: getCountryBoundaryFailure,
  [Types.UPDATE_COUNTRY_BOUNDARY_REQUEST]: updateCountryBoundaryRequest,
  [Types.UPDATE_COUNTRY_BOUNDARY_SUCCESS]: updateCountryBoundarySuccess,
  [Types.UPDATE_COUNTRY_BOUNDARY_FAILURE]: updateCountryBoundaryFailure,
  [Types.CREATE_COUNTRY_BOUNDARY_REQUEST]: ceateCountryBoundaryRequest,
  [Types.CREATE_COUNTRY_BOUNDARY_SUCCESS]: createCountryBoundarySuccess,
  [Types.CREATE_COUNTRY_BOUNDARY_FAILURE]: createCountryBoundaryFailure,
  [Types.CREATE_CITY_REQUEST]: createCityRequest,
  [Types.CREATE_CITY_SUCCESS]: createCitySuccess,
  [Types.CREATE_CITY_FAILURE]: createCityFailure,
  [Types.UPDATE_CITY_REQUEST]: updateCityRequest,
  [Types.UPDATE_CITY_SUCCESS]: updateCitySuccess,
  [Types.UPDATE_CITY_FAILURE]: updateCityFailure,
  [Types.GET_CITY_BOUNDARY_REQUEST]: getCityBoundaryRequest,
  [Types.GET_CITY_BOUNDARY_SUCCESS]: getCityBoundarySuccess,
  [Types.GET_CITY_BOUNDARY_FAILURE]: getCityBoundaryFailure,
  [Types.UPDATE_CITY_BOUNDARY_REQUEST]: updateCityBoundaryRequest,
  [Types.UPDATE_CITY_BOUNDARY_SUCCESS]: updateCityBoundarySuccess,
  [Types.UPDATE_CITY_BOUNDARY_FAILURE]: updateCityBoundaryFailure,
  [Types.CREATE_CITY_BOUNDARY_REQUEST]: createCityBoundaryRequest,
  [Types.CREATE_CITY_BOUNDARY_SUCCESS]: createCityBoundarySuccess,
  [Types.CREATE_CITY_BOUNDARY_FAILURE]: createCityBoundaryFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
