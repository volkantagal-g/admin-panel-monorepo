import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import { Types } from './actions';
import { STATE_SKELETON, INITIAL_STATE, NON_TEMPLATE_FIELDS } from './initialState';

import { updateGeneralState } from '../utils';

const createClientListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createClientList: {
      ...INITIAL_STATE.createClientList,
      isPending: true,
    },
  };
};

const createClientListSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createClientList: {
      ...INITIAL_STATE.createClientList,
      isPending: false,
    },
  };
};

export const getFoodPromosBySearchCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...state.getFoodPromosBySearchCode,
      isPending: true,
    },
  };
};

export const getFoodPromosBySearchCodeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...INITIAL_STATE.getFoodPromosBySearchCode,
      data,
      isPending: false,
    },
  };
};

export const getFoodPromosBySearchCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...state.getFoodPromosBySearchCode,
      isPending: false,
      error,
    },
  };
};

export const resetFoodPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFoodPromosBySearchCode: INITIAL_STATE.getFoodPromosBySearchCode,
  };
};

export const getLocalsPromosBySearchCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLocalsPromosBySearchCode: {
      ...state.getLocalsPromosBySearchCode,
      isPending: true,
    },
  };
};

export const getLocalsPromosBySearchCodeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLocalsPromosBySearchCode: {
      ...INITIAL_STATE.getLocalsPromosBySearchCode,
      data,
      isPending: false,
    },
  };
};

export const getLocalsPromosBySearchCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLocalsPromosBySearchCode: {
      ...state.getLocalsPromosBySearchCode,
      isPending: false,
      error,
    },
  };
};

export const getMarketPromosBySearchCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketPromosBySearchCode: {
      ...state.getMarketPromosBySearchCode,
      isPending: true,
    },
  };
};

export const getMarketPromosBySearchCodeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketPromosBySearchCode: {
      ...INITIAL_STATE.getMarketPromosBySearchCode,
      data,
      isPending: false,
    },
  };
};

export const getMarketPromosBySearchCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketPromosBySearchCode: {
      ...state.getMarketPromosBySearchCode,
      isPending: false,
      error,
    },
  };
};

export const getFilteredGetirDriveVouchersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFilteredGetirDriveVouchers: {
      ...state.getFilteredGetirDriveVouchers,
      isPending: true,
    },
  };
};

export const getFilteredGetirDriveVouchersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getFilteredGetirDriveVouchers: {
      ...INITIAL_STATE.getFilteredGetirDriveVouchers,
      data,
      isPending: false,
    },
  };
};

export const getFilteredGetirDriveVouchersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getFilteredGetirDriveVouchers: {
      ...state.getFilteredGetirDriveVouchers,
      isPending: false,
      error,
    },
  };
};

export const getFilteredBrandsRequest = state => {
  return {
    ...state,
    getFilteredBrands: {
      ...state.getFilteredBrands,
      isPending: true,
    },
  };
};

export const getFilteredBrandsSuccess = (state, { data }) => {
  return {
    ...state,
    getFilteredBrands: {
      ...INITIAL_STATE.getFilteredBrands,
      data,
      isPending: false,
    },
  };
};

export const getFilteredBrandsFailure = (state, { error }) => {
  return {
    ...state,
    getFilteredBrands: {
      ...state.getFilteredBrands,
      isPending: false,
      error,
    },
  };
};

export const resetFilteredBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFilteredBrands: INITIAL_STATE.getFilteredBrands,
  };
};

export const resetFilteredGetirDriveVouchersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFilteredGetirDriveVouchers: INITIAL_STATE.getFilteredGetirDriveVouchers,
  };
};

export const resetLocalsPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLocalsPromosBySearchCode: INITIAL_STATE.getLocalsPromosBySearchCode,
  };
};

export const resetMarketPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketPromosBySearchCode: INITIAL_STATE.getMarketPromosBySearchCode,
  };
};

export const getCuisinesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getCuisines: {
      ...INITIAL_STATE.getCuisines,
      isPending: true,
    },
  };
};

export const getCuisinesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getCuisines: {
      ...INITIAL_STATE.getCuisines,
      data,
      isPending: false,
    },
  };
};

export const getCuisinesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getCuisines: {
      ...INITIAL_STATE.getCuisines,
      isPending: false,
      error,
    },
  };
};

export const getGwmpBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGwmpBrands: {
      ...INITIAL_STATE.getGwmpBrands,
      isPending: true,
    },
  };
};

export const getGwmpBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGwmpBrands: {
      ...INITIAL_STATE.getGwmpBrands,
      data,
      isPending: false,
    },
  };
};

export const getGwmpBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getGwmpBrands: {
      ...INITIAL_STATE.getGwmpBrands,
      isPending: false,
      error,
    },
  };
};

export const getGwmpVendorsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGwmpVendors: {
      ...INITIAL_STATE.getGwmpVendors,
      isPending: true,
    },
  };
};

export const getGwmpVendorsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGwmpVendors: {
      ...INITIAL_STATE.getGwmpVendors,
      data,
      isPending: false,
    },
  };
};

export const getGwmpVendorsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getGwmpVendors: {
      ...INITIAL_STATE.getGwmpVendors,
      isPending: false,
      error,
    },
  };
};

const initPage = (state = INITIAL_STATE) => {
  const copiedState = _.cloneDeep(state);
  const fieldKeys = Object.keys(copiedState);
  fieldKeys.forEach(fieldKey => {
    if (!NON_TEMPLATE_FIELDS.has(fieldKey)) {
      const subSectionKeys = Object.keys(copiedState[fieldKey]);
      subSectionKeys.forEach(key => {
        if (!copiedState[fieldKey][key]?.template) return;
        const template = copiedState[fieldKey][key].template();
        copiedState[fieldKey][key].params = [template];
        copiedState[fieldKey][key].isEnabled = false;
        copiedState[fieldKey][key].activeIndex = 0;
        copiedState[fieldKey][key].mergeType = 'and';
      });
    }
  });

  return copiedState;
};

const setEnabledType = (state = INITIAL_STATE, { activeKey, isEnabled }) => {
  const [domainType, key] = activeKey.split('.');
  const copiedState = _.cloneDeep(state);

  copiedState[domainType][key].isEnabled = isEnabled;
  return copiedState;
};

const setMergeType = (state = INITIAL_STATE, { activeKey, mergeType }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  copiedState[domainType][key].mergeType = mergeType;
  return copiedState;
};

const addNewParam = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  copiedState[domainType][key].params.push(copiedState[domainType][key].template());
  copiedState[domainType][key].activeIndex = copiedState[domainType][key].params.length - 1;
  return copiedState;
};

const removeParam = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  if (activeIndex === copiedState[domainType][key].params.length - 1) {
    copiedState[domainType][key].activeIndex = copiedState[domainType][key].params.length - 2;
    copiedState[domainType][key].params.splice(activeIndex, 1);
  }
  else {
    copiedState[domainType][key].params.splice(activeIndex, 1);
  }
  return copiedState;
};

const setActiveParamIndex = (state = INITIAL_STATE, { activeKey, activeIndex }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  copiedState[domainType][key].activeIndex = activeIndex;
  return copiedState;
};

const setGeoJson = (state = INITIAL_STATE, { activeKey, geoJson }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].geoJson = geoJson;
  return copiedState;
};

const setDateTime = (state = INITIAL_STATE, { activeKey, startDate, endDate }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  if (startDate) copiedState[domainType][key].params[activeIndex].startDate = startDate;
  if (endDate) copiedState[domainType][key].params[activeIndex].endDate = endDate;
  return copiedState;
};

const setDateType = (state = INITIAL_STATE, { activeKey, startDateType, endDateType }) => {
  const [domainType, key] = activeKey.split('.');

  const initialValues = INITIAL_STATE[domainType][key]?.template() || {};
  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];

  if (startDateType) {
    copiedState[domainType][key].params[activeIndex].startDateType = startDateType;
    copiedState[domainType][key].params[activeIndex].startDayBeforeToday = initialValues.startDayBeforeToday;
    copiedState[domainType][key].params[activeIndex].startDate = initialValues.startDate;
  }
  if (endDateType) {
    copiedState[domainType][key].params[activeIndex].endDateType = endDateType;
    copiedState[domainType][key].params[activeIndex].endDayBeforeToday = initialValues.endDayBeforeToday;
    copiedState[domainType][key].params[activeIndex].endDate = initialValues.endDate;
  }
  return copiedState;
};

const setInput = (state = INITIAL_STATE, { activeKey, clientListKey, value, filterableData }) => {
  const [domainType, key] = activeKey.split('.');

  let copiedState = _.cloneDeep(state);

  copiedState = updateGeneralState({ state: copiedState, domainType, key, activeKey, clientListKey, value, filterableData });

  return copiedState;
};

export const getRestaurantsByNameRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantsByName.isPending = true;
  return copiedState;
};

export const getRestaurantsByNameSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantsByName.isPending = false;
  copiedState[domainType][key].params[activeIndex].getRestaurantsByName.data = data;
  return copiedState;
};

export const getRestaurantsByNameFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantsByName.isPending = false;
  copiedState[domainType][key].params[activeIndex].getRestaurantsByName.error = error;
  return copiedState;
};

export const getGetirJobsJobTitlesByFiltersRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getJobTitlesByFilters.isPending = true;
  return copiedState;
};

export const getGetirJobsJobTitlesByFiltersSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getJobTitlesByFilters.data = data;
  copiedState[domainType][key].params[activeIndex].getJobTitlesByFilters.isPending = false;
  return copiedState;
};

export const getGetirJobsJobTitlesByFiltersFailure = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getJobTitlesByFilters.isPending = false;
  return copiedState;
};

export const getGetirJobsPostTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsPostTypes: {
      ...INITIAL_STATE.getGetirJobsPostTypes,
      isPending: true,
    },
  };
};

export const getGetirJobsPostTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGetirJobsPostTypes: {
      ...INITIAL_STATE.getGetirJobsPostTypes,
      data,
      isPending: false,
    },
  };
};

export const getGetirJobsPostTypesFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsPostTypes: {
      ...INITIAL_STATE.getGetirJobsPostTypes,
      isPending: false,
    },
  };
};

export const getGetirJobsCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsCategories: {
      ...INITIAL_STATE.getGetirJobsCategories,
      isPending: true,
    },
  };
};

export const getGetirJobsCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGetirJobsCategories: {
      ...INITIAL_STATE.getGetirJobsCategories,
      data,
      isPending: false,
    },
  };
};

export const getGetirJobsCategoryFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsCategories: {
      ...INITIAL_STATE.getGetirJobsCategories,
      isPending: false,
    },
  };
};

export const getGetirJobsDrivingLicensesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsDrivingLicenses: {
      ...INITIAL_STATE.getGetirJobsDrivingLicenses,
      isPending: true,
    },
  };
};

export const getGetirJobsDrivingLicensesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getGetirJobsDrivingLicenses: {
      ...INITIAL_STATE.getGetirJobsDrivingLicenses,
      data,
      isPending: false,
    },
  };
};

export const getGetirJobsDrivingLicensesFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    getGetirJobsDrivingLicenses: {
      ...INITIAL_STATE.getGetirJobsDrivingLicenses,
      isPending: false,
    },
  };
};

export const searchChainRestaurantsRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurants.isPending = true;
  return copiedState;
};

export const searchChainRestaurantsSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurants.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurants.data = data;
  return copiedState;
};

export const searchChainRestaurantsFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurants.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurants.error = error;
  return copiedState;
};

export const searchABTestCodeRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getABTestCodes.isPending = true;
  return copiedState;
};

export const searchABTestCodeSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getABTestCodes.isPending = false;
  copiedState[domainType][key].params[activeIndex].getABTestCodes.data = data;
  return copiedState;
};

export const searchABTestCodeFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getABTestCodes.isPending = false;
  copiedState[domainType][key].params[activeIndex].getABTestCodes.error = error;
  return copiedState;
};

export const getABTestCodesFromDataRequest = (state, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].dataABTestCodes.isPending = true;
  return copiedState;
};

export const getABTestCodesFromDataSuccess = (state, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].dataABTestCodes.isPending = false;
  copiedState[domainType][key].params[activeIndex].dataABTestCodes.data = data;
  return copiedState;
};

export const getABTestCodesFromDataFailure = (state, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].dataABTestCodes.isPending = false;
  copiedState[domainType][key].params[activeIndex].dataABTestCodes.error = error;
  return copiedState;
};

export const getChainRestaurantBranchesRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantBranches.isPending = true;
  return copiedState;
};

export const getChainRestaurantBranchesSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantBranches.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurantBranches.data = data;
  return copiedState;
};

export const getChainRestaurantBranchesFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantBranches.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurantBranches.error = error;
  return copiedState;
};

export const getChainRestaurantProductsRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantProducts = {
    data: [],
    isPending: true,
    error: null,
  };
  return copiedState;
};

export const getChainRestaurantProductsSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantProducts.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurantProducts.data = data;
  return copiedState;
};

export const getChainRestaurantProductsFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getChainRestaurantProducts.isPending = false;
  copiedState[domainType][key].params[activeIndex].getChainRestaurantProducts.error = error;
  return copiedState;
};

export const getRestaurantProductsRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantProducts.isPending = true;
  return copiedState;
};

export const getRestaurantProductsSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantProducts.isPending = false;
  copiedState[domainType][key].params[activeIndex].getRestaurantProducts.data = data;
  return copiedState;
};

export const getRestaurantProductsFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getRestaurantProducts.isPending = false;
  copiedState[domainType][key].params[activeIndex].getRestaurantProducts.error = error;
  return copiedState;
};

export const searchArtisanShopsRequest = (state = INITIAL_STATE, { activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getShops.isPending = true;
  return copiedState;
};

export const searchArtisanShopsSuccess = (state = INITIAL_STATE, { data, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getShops.isPending = false;
  copiedState[domainType][key].params[activeIndex].getShops.data = data;
  return copiedState;
};

export const searchArtisanShopsFailure = (state = INITIAL_STATE, { error, activeKey }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].getShops.isPending = false;
  copiedState[domainType][key].params[activeIndex].getShops.error = error;
  return copiedState;
};

export const getPersonaClientFlagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPersonaClientFlags: {
      ...INITIAL_STATE.getPersonaClientFlags,
      isPending: true,
    },
  };
};

export const getRFMSegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRFMSegments: {
      ...INITIAL_STATE.getRFMSegments,
      isPending: true,
    },
  };
};

export const getDataScienceModelsRequest = (state = INITIAL_STATE, { section }) => ({
  ...state,
  dataScienceModels: {
    ...state.dataScienceModels,
    [section]: {
      ...state.dataScienceModels[section],
      isPending: true,
    },
  },
});

export const getPersonaDomainTypesRequest = (state = INITIAL_STATE, { section }) => ({
  ...state,
  personaDomainTypes: {
    ...state.personaDomainTypes,
    [section]: {
      ...STATE_SKELETON,
      ...state.personaDomainTypes[section],
      isPending: true,
    },
  },
});

export const getPersonaClientFlagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getPersonaClientFlags: {
      ...INITIAL_STATE.getPersonaClientFlags,
      data,
      isPending: false,
    },
  };
};

export const getRFMSegmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRFMSegments: {
      ...INITIAL_STATE.getRFMSegments,
      data,
      isPending: false,
    },
  };
};

export const getDataScienceModelsSuccess = (state = INITIAL_STATE, { data, section }) => ({
  ...state,
  dataScienceModels: {
    ...state.dataScienceModels,
    [section]: {
      ...state.dataScienceModels[section],
      isPending: false,
      data,
    },
  },
});

export const getPersonaDomainTypesSuccess = (state = INITIAL_STATE, { data, section }) => ({
  ...state,
  personaDomainTypes: {
    ...state.personaDomainTypes,
    [section]: {
      ...state.personaDomainTypes[section],
      isPending: false,
      data,
    },
  },
});

export const getPersonaClientFlagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPersonaClientFlags: {
      ...INITIAL_STATE.getPersonaClientFlags,
      isPending: false,
      error,
    },
  };
};

export const getRFMSegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRFMSegments: {
      ...INITIAL_STATE.getRFMSegments,
      isPending: false,
      error,
    },
  };
};

export const getDataScienceModelsFailure = (state = INITIAL_STATE, { error, section }) => ({
  ...state,
  dataScienceModels: {
    ...state.dataScienceModels,
    [section]: {
      ...state.dataScienceModels[section],
      isPending: false,
      error,
    },
  },
});

export const getPersonaDomainTypesFailure = (state = INITIAL_STATE, { error, section }) => ({
  ...state,
  personaDomainTypes: {
    ...state.personaDomainTypes,
    [section]: {
      ...state.personaDomainTypes[section],
      isPending: false,
      error,
    },
  },
});

export const getArtisanTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getArtisanTypes: {
      ...INITIAL_STATE.getArtisanTypes,
      isPending: true,
    },
  };
};

export const getArtisanTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getArtisanTypes: {
      ...INITIAL_STATE.getArtisanTypes,
      data,
      isPending: false,
    },
  };
};

export const getArtisanTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getArtisanTypes: {
      ...INITIAL_STATE.getArtisanTypes,
      isPending: false,
      error,
    },
  };
};

export const getArtisanChainShopsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getArtisanChainShops: {
      ...INITIAL_STATE.getArtisanChainShops,
      isPending: true,
    },
  };
};

export const getArtisanChainShopsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getArtisanChainShops: {
      ...INITIAL_STATE.getArtisanChainShops,
      data,
      isPending: false,
    },
  };
};

export const getArtisanChainShopsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getArtisanChainShops: {
      ...INITIAL_STATE.getArtisanChainShops,
      isPending: false,
      error,
    },
  };
};

export const getGetirMarketOrderCancelReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getirMarketOrderCancelReasons: {
      ...INITIAL_STATE.getirMarketOrderCancelReasons,
      data: [],
      isPending: true,
    },
  };
};

export const getGetirMarketOrderCancelReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getirMarketOrderCancelReasons: {
      ...INITIAL_STATE.getirMarketOrderCancelReasons,
      data,
      isPending: false,
    },
  };
};

export const getGetirMarketOrderCancelReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getirMarketOrderCancelReasons: {
      ...INITIAL_STATE.getirMarketOrderCancelReasons,
      isPending: false,
      error,
    },
  };
};

const setSelectedCountType = (state = INITIAL_STATE, { activeKey, selectedCountType }) => {
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex].selectedCountType = selectedCountType;
  return copiedState;
};

const setCollapseTriggeredKey = (state = INITIAL_STATE, { activeKey }) => {
  return {
    ...state,
    lastCollapseTriggeredKey: activeKey,
  };
};

const setDataScienceFields = (state = INITIAL_STATE, { data, section, activeKey, validationSchema }) => {
  if (!state[section]) throw new Error('Invalid section key');
  const [domainType, key] = activeKey.split('.');

  const copiedState = _.cloneDeep(state);
  const { activeIndex } = copiedState[domainType][key];
  copiedState[domainType][key].params[activeIndex] = { ...data, validationSchema };

  return copiedState;
};

const initDataScienceField = (state = INITIAL_STATE, { section }) => ({
  ...state,
  dataScienceModels: {
    ...state.dataScienceModels,
    [section]: STATE_SKELETON,
  },
});

export const getOrderFeedbackReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderFeedbackReasons: {
      ...state.orderFeedbackReasons,
      isPending: true,
    },
  };
};

export const getOrderFeedbackReasonsSuccess = (
  state = INITIAL_STATE,
  { data = [] },
) => {
  return {
    ...state,
    orderFeedbackReasons: {
      ...state.orderFeedbackReasons,
      data,
      isPending: false,
    },
  };
};

export const getOrderFeedbackReasonsFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    orderFeedbackReasons: {
      ...state.orderFeedbackReasons,
      error,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_CLIENT_LIST_REQUEST]: createClientListRequest,
  [Types.CREATE_CLIENT_LIST_SUCCESS]: createClientListSuccess,

  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_REQUEST]: getFoodPromosBySearchCodeRequest,
  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_SUCCESS]: getFoodPromosBySearchCodeSuccess,
  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_FAILURE]: getFoodPromosBySearchCodeFailure,
  [Types.RESET_FOOD_PROMOS_REQUEST]: resetFoodPromosRequest,

  [Types.GET_LOCALS_PROMOS_BY_SEARCH_CODE_REQUEST]: getLocalsPromosBySearchCodeRequest,
  [Types.GET_LOCALS_PROMOS_BY_SEARCH_CODE_SUCCESS]: getLocalsPromosBySearchCodeSuccess,
  [Types.GET_LOCALS_PROMOS_BY_SEARCH_CODE_FAILURE]: getLocalsPromosBySearchCodeFailure,
  [Types.RESET_LOCALS_PROMOS_REQUEST]: resetLocalsPromosRequest,

  [Types.GET_MARKET_PROMOS_BY_SEARCH_CODE_REQUEST]: getMarketPromosBySearchCodeRequest,
  [Types.GET_MARKET_PROMOS_BY_SEARCH_CODE_SUCCESS]: getMarketPromosBySearchCodeSuccess,
  [Types.GET_MARKET_PROMOS_BY_SEARCH_CODE_FAILURE]: getMarketPromosBySearchCodeFailure,
  [Types.RESET_MARKET_PROMOS_REQUEST]: resetMarketPromosRequest,

  [Types.GET_FILTERED_GETIR_DRIVE_VOUCHERS_REQUEST]: getFilteredGetirDriveVouchersRequest,
  [Types.GET_FILTERED_GETIR_DRIVE_VOUCHERS_SUCCESS]: getFilteredGetirDriveVouchersSuccess,
  [Types.GET_FILTERED_GETIR_DRIVE_VOUCHERS_FAILURE]: getFilteredGetirDriveVouchersFailure,
  [Types.RESET_FILTERED_GETIR_DRIVE_VOUCHERS_REQUEST]: resetFilteredGetirDriveVouchersRequest,

  [Types.GET_FILTERED_BRANDS_REQUEST]: getFilteredBrandsRequest,
  [Types.GET_FILTERED_BRANDS_SUCCESS]: getFilteredBrandsSuccess,
  [Types.GET_FILTERED_BRANDS_FAILURE]: getFilteredBrandsFailure,
  [Types.RESET_FILTERED_BRANDS_REQUEST]: resetFilteredBrandsRequest,

  [Types.GET_CUISINES_REQUEST]: getCuisinesRequest,
  [Types.GET_CUISINES_SUCCESS]: getCuisinesSuccess,
  [Types.GET_CUISINES_FAILURE]: getCuisinesFailure,

  [Types.GET_ALL_GWMP_BRANDS_REQUEST]: getGwmpBrandsRequest,
  [Types.GET_ALL_GWMP_BRANDS_SUCCESS]: getGwmpBrandsSuccess,
  [Types.GET_ALL_GWMP_BRANDS_FAILURE]: getGwmpBrandsFailure,

  [Types.GET_ALL_GWMP_VENDORS_REQUEST]: getGwmpVendorsRequest,
  [Types.GET_ALL_GWMP_VENDORS_SUCCESS]: getGwmpVendorsSuccess,
  [Types.GET_ALL_GWMP_VENDORS_FAILURE]: getGwmpVendorsFailure,

  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,

  [Types.SEARCH_CHAIN_RESTAURANTS_REQUEST]: searchChainRestaurantsRequest,
  [Types.SEARCH_CHAIN_RESTAURANTS_SUCCESS]: searchChainRestaurantsSuccess,
  [Types.SEARCH_CHAIN_RESTAURANTS_FAILURE]: searchChainRestaurantsFailure,

  [Types.SEARCH_AB_TEST_CODE_REQUEST]: searchABTestCodeRequest,
  [Types.SEARCH_AB_TEST_CODE_SUCCESS]: searchABTestCodeSuccess,
  [Types.SEARCH_AB_TEST_CODE_FAILURE]: searchABTestCodeFailure,

  [Types.GET_AB_TEST_CODES_FROM_DATA_REQUEST]: getABTestCodesFromDataRequest,
  [Types.GET_AB_TEST_CODES_FROM_DATA_SUCCESS]: getABTestCodesFromDataSuccess,
  [Types.GET_AB_TEST_CODES_FROM_DATA_FAILURE]: getABTestCodesFromDataFailure,

  [Types.GET_CHAIN_RESTAURANT_BRANCHES_REQUEST]: getChainRestaurantBranchesRequest,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_SUCCESS]: getChainRestaurantBranchesSuccess,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_FAILURE]: getChainRestaurantBranchesFailure,

  [Types.GET_CHAIN_RESTAURANT_PRODUCTS_REQUEST]: getChainRestaurantProductsRequest,
  [Types.GET_CHAIN_RESTAURANT_PRODUCTS_SUCCESS]: getChainRestaurantProductsSuccess,
  [Types.GET_CHAIN_RESTAURANT_PRODUCTS_FAILURE]: getChainRestaurantProductsFailure,

  [Types.GET_RESTAURANT_PRODUCTS_REQUEST]: getRestaurantProductsRequest,
  [Types.GET_RESTAURANT_PRODUCTS_SUCCESS]: getRestaurantProductsSuccess,
  [Types.GET_RESTAURANT_PRODUCTS_FAILURE]: getRestaurantProductsFailure,

  [Types.SEARCH_ARTISAN_SHOPS_REQUEST]: searchArtisanShopsRequest,
  [Types.SEARCH_ARTISAN_SHOPS_SUCCESS]: searchArtisanShopsSuccess,
  [Types.SEARCH_ARTISAN_SHOPS_FAILURE]: searchArtisanShopsFailure,

  [Types.GET_RFM_SEGMENTS_REQUEST]: getRFMSegmentsRequest,
  [Types.GET_RFM_SEGMENTS_SUCCESS]: getRFMSegmentsSuccess,
  [Types.GET_RFM_SEGMENTS_FAILURE]: getRFMSegmentsFailure,

  [Types.GET_PERSONA_CLIENT_FLAGS_REQUEST]: getPersonaClientFlagsRequest,
  [Types.GET_PERSONA_CLIENT_FLAGS_SUCCESS]: getPersonaClientFlagsSuccess,
  [Types.GET_PERSONA_CLIENT_FLAGS_FAILURE]: getPersonaClientFlagsFailure,

  [Types.GET_ARTISAN_TYPES_REQUEST]: getArtisanTypesRequest,
  [Types.GET_ARTISAN_TYPES_SUCCESS]: getArtisanTypesSuccess,
  [Types.GET_ARTISAN_TYPES_FAILURE]: getArtisanTypesFailure,

  [Types.GET_ARTISAN_CHAIN_SHOPS_REQUEST]: getArtisanChainShopsRequest,
  [Types.GET_ARTISAN_CHAIN_SHOPS_SUCCESS]: getArtisanChainShopsSuccess,
  [Types.GET_ARTISAN_CHAIN_SHOPS_FAILURE]: getArtisanChainShopsFailure,

  [Types.GET_DATA_SCIENCE_MODELS_REQUEST]: getDataScienceModelsRequest,
  [Types.GET_DATA_SCIENCE_MODELS_SUCCESS]: getDataScienceModelsSuccess,
  [Types.GET_DATA_SCIENCE_MODELS_FAILURE]: getDataScienceModelsFailure,

  [Types.GET_PERSONA_DOMAIN_TYPES_REQUEST]: getPersonaDomainTypesRequest,
  [Types.GET_PERSONA_DOMAIN_TYPES_SUCCESS]: getPersonaDomainTypesSuccess,
  [Types.GET_PERSONA_DOMAIN_TYPES_FAILURE]: getPersonaDomainTypesFailure,

  [Types.GET_GETIR_JOBS_JOB_TITLES_BY_FILTERS_REQUEST]: getGetirJobsJobTitlesByFiltersRequest,
  [Types.GET_GETIR_JOBS_JOB_TITLES_BY_FILTERS_SUCCESS]: getGetirJobsJobTitlesByFiltersSuccess,
  [Types.GET_GETIR_JOBS_JOB_TITLES_BY_FILTERS_FAILURE]: getGetirJobsJobTitlesByFiltersFailure,

  [Types.GET_GETIR_JOBS_POST_TYPES_REQUEST]: getGetirJobsPostTypesRequest,
  [Types.GET_GETIR_JOBS_POST_TYPES_SUCCESS]: getGetirJobsPostTypesSuccess,
  [Types.GET_GETIR_JOBS_POST_TYPES_FAILURE]: getGetirJobsPostTypesFailure,

  [Types.GET_GETIR_JOBS_CATEGORY_REQUEST]: getGetirJobsCategoryRequest,
  [Types.GET_GETIR_JOBS_CATEGORY_SUCCESS]: getGetirJobsCategorySuccess,
  [Types.GET_GETIR_JOBS_CATEGORY_FAILURE]: getGetirJobsCategoryFailure,

  [Types.GET_GETIR_JOBS_DRIVING_LICENSES_REQUEST]: getGetirJobsDrivingLicensesRequest,
  [Types.GET_GETIR_JOBS_DRIVING_LICENSES_SUCCESS]: getGetirJobsDrivingLicensesSuccess,
  [Types.GET_GETIR_JOBS_DRIVING_LICENSES_FAILURE]: getGetirJobsDrivingLicensesFailure,

  [Types.GET_GETIR_MARKET_ORDER_CANCEL_REASONS_REQUEST]: getGetirMarketOrderCancelReasonsRequest,
  [Types.GET_GETIR_MARKET_ORDER_CANCEL_REASONS_SUCCESS]: getGetirMarketOrderCancelReasonsSuccess,
  [Types.GET_GETIR_MARKET_ORDER_CANCEL_REASONS_FAILURE]: getGetirMarketOrderCancelReasonsFailure,

  [Types.GET_ORDER_FEEDBACK_REASONS_REQUEST]: getOrderFeedbackReasonsRequest,
  [Types.GET_ORDER_FEEDBACK_REASONS_SUCCESS]: getOrderFeedbackReasonsSuccess,
  [Types.GET_ORDER_FEEDBACK_REASONS_FAILURE]: getOrderFeedbackReasonsFailure,

  [Types.SET_ENABLED_TYPE]: setEnabledType,
  [Types.SET_MERGE_TYPE]: setMergeType,
  [Types.ADD_NEW_PARAM]: addNewParam,
  [Types.REMOVE_PARAM]: removeParam,
  [Types.SET_ACTIVE_PARAM_INDEX]: setActiveParamIndex,
  [Types.SET_GEO_JSON]: setGeoJson,
  [Types.SET_DATE_TIME]: setDateTime,
  [Types.SET_DATE_TYPE]: setDateType,
  [Types.SET_INPUT]: setInput,
  [Types.SET_SELECTED_COUNT_TYPE]: setSelectedCountType,
  [Types.SET_COLLAPSE_TRIGGERED_KEY]: setCollapseTriggeredKey,
  [Types.SET_DATA_SCIENCE_FIELDS]: setDataScienceFields,
  [Types.INIT_DATA_SCIENCE_FIELD]: initDataScienceField,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
