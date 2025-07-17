import { createReducer } from 'reduxsauce';

import { Types } from '../actions/common';

export const INITIAL_STATE = {
  getCities: {
    data: [],
    isPending: false,
    error: null,
  },
  countries: {
    data: [],
    isPending: false,
    error: null,
  },
  operationalCountries: {
    data: [],
    isPending: false,
    error: null,
  },
  countryGroups: {
    data: [],
    isPending: false,
    error: null,
  },
  regions: {
    data: [],
    isPending: false,
    error: null,
  },
  mainStores: {
    data: [],
    isPending: false,
    error: null,
  },
  nonagreementWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
  getWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
  getActiveWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
  getFilteredWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
  getFilteredWarehousesForDivision: {
    data: [],
    isPending: false,
    error: null,
  },
  getBrands: {
    data: [],
    isPending: false,
    error: null,
  },
  getSuppliers: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductSubCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProducts: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductMasterCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketFranchises: {
    data: [],
    isPending: false,
    error: null,
  },
  getTransferGroups: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  getUserOwnedPages: {
    data: [],
    isPending: false,
    isRequested: false,
    error: null,
  },
  getAllPages: {
    isPending: false,
    error: null,
  },
  currentPagePermKey: null,
  getCurrentPageMap: {},
  getCurrentPageDocsMap: {},
  getMyPermissions: {
    data: [],
    isPending: false,
    error: null,
  },
  favoriteDocuments: {
    isPending: false,
    data: [],
  },
  addFavoriteDocument: {},
  removeFavoriteDocument: {},
  getRolePermissions: {
    data: [],
    isPending: false,
    error: null,
  },
  getRoles: {
    data: [],
    isPending: false,
    error: null,
  },
  getRoleUsers: {
    data: [],
    isPending: false,
    isRequested: false,
    error: null,
  },
  getUserOwnedRoles: {
    data: [],
    isPending: false,
    error: null,
  },
  getUserRoles: {
    data: [],
    isPending: false,
    isRequested: false,
    error: null,
  },
  getCompanies: {
    data: [],
    isPending: false,
    error: null,
  },
  division: {
    data: null,
    isPending: false,
    error: null,
  },
  divisions: {
    data: null,
    isPending: false,
    error: null,
  },
  allDivisions: {
    data: null,
    isPending: false,
    error: null,
  },
  getSelectedCountryTimezone: { data: '' },
  getSelectedCities: { data: [] },
  getSelectedDomainTypes: { data: [] },
  selectedDomainType: null,
  getDivisionsCities: {
    data: [],
    isPending: false,
    error: null,
  },
  getDivisionsCountries: {
    data: [],
    isPending: false,
    error: null,
  },
  configData: {
    isPending: false,
    data: {},
    error: null,
  },
  availableDomainTypesForCountry: {
    data: {},
    isPending: false,
    error: null,
  },
  availableIntegrationTypesForCountry: {
    data: {},
    isPending: false,
    error: null,
  },
  slottedOrderActiveDomainTypes: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getCitiesRequest = state => {
  return {
    ...state,
    getCities: {
      ...INITIAL_STATE.getCities,
      isPending: true,
    },
  };
};

export const getCitiesSuccess = (state, { data }) => {
  return {
    ...state,
    getCities: {
      ...INITIAL_STATE.getCities,
      data,
      isPending: false,
    },
  };
};

export const getCitiesFailure = (state, { error }) => {
  return {
    ...state,
    getCities: {
      ...INITIAL_STATE.getCities,
      isPending: false,
      error,
    },
  };
};

export const getCountriesRequest = state => {
  return {
    ...state,
    countries: {
      ...INITIAL_STATE.countries,
      isPending: true,
    },
  };
};

export const getCountriesSuccess = (state, { data }) => {
  return {
    ...state,
    countries: {
      ...INITIAL_STATE.countries,
      data,
      isPending: false,
    },
  };
};

export const getCountriesFailure = (state, { error }) => {
  return {
    ...state,
    countries: {
      ...INITIAL_STATE.countries,
      isPending: false,
      error,
    },
  };
};

export const getOperationalCountriesRequest = state => {
  return {
    ...state,
    operationalCountries: {
      ...INITIAL_STATE.operationalCountries,
      isPending: true,
    },
  };
};

export const getOperationalCountriesSuccess = (state, { data }) => {
  return {
    ...state,
    operationalCountries: {
      ...INITIAL_STATE.operationalCountries,
      data,
      isPending: false,
    },
  };
};

export const getOperationalCountriesFailure = (state, { error }) => {
  return {
    ...state,
    operationalCountries: {
      ...INITIAL_STATE.operationalCountries,
      isPending: false,
      error,
    },
  };
};

export const getCountryGroupsRequest = state => {
  return {
    ...state,
    countryGroups: {
      ...INITIAL_STATE.countryGroups,
      isPending: true,
    },
  };
};

export const getCountryGroupsSuccess = (state, { data }) => {
  return {
    ...state,
    countryGroups: {
      ...INITIAL_STATE.countryGroups,
      data,
      isPending: false,
    },
  };
};

export const getCountryGroupsFailure = (state, { error }) => {
  return {
    ...state,
    countryGroups: {
      ...INITIAL_STATE.countryGroups,
      isPending: false,
      error,
    },
  };
};

export const getRegionsRequest = state => {
  return {
    ...state,
    regions: {
      ...INITIAL_STATE.regions,
      isPending: true,
    },
  };
};

export const getRegionsSuccess = (state, { data }) => {
  return {
    ...state,
    regions: {
      ...INITIAL_STATE.regions,
      data,
      isPending: false,
    },
  };
};

export const getRegionsFailure = (state, { error }) => {
  return {
    ...state,
    regions: {
      ...INITIAL_STATE.regions,
      isPending: false,
      error,
    },
  };
};

export const getMainStoresRequest = state => {
  return {
    ...state,
    mainStores: {
      ...INITIAL_STATE.mainStores,
      isPending: true,
    },
  };
};

export const getMainStoresSuccess = (state, { data }) => {
  return {
    ...state,
    mainStores: {
      ...INITIAL_STATE.mainStores,
      data,
      isPending: false,
    },
  };
};

export const getMainStoresFailure = (state, { error }) => {
  return {
    ...state,
    mainStores: {
      ...INITIAL_STATE.mainStores,
      isPending: false,
      error,
    },
  };
};

export const getNonagreementWarehousesRequest = state => {
  return {
    ...state,
    nonagreementWarehouses: {
      ...INITIAL_STATE.nonagreementWarehouses,
      isPending: true,
    },
  };
};

export const getNonagreementWarehousesSuccess = (state, { data }) => {
  return {
    ...state,
    nonagreementWarehouses: {
      ...INITIAL_STATE.nonagreementWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getNonagreementWarehousesFailure = (state, { error }) => {
  return {
    ...state,
    nonagreementWarehouses: {
      ...INITIAL_STATE.nonagreementWarehouses,
      isPending: false,
      error,
    },
  };
};

export const getWarehousesRequest = state => {
  return {
    ...state,
    getWarehouses: {
      ...INITIAL_STATE.getWarehouses,
      isPending: true,
    },
  };
};

export const getWarehousesSuccess = (state, { data }) => {
  return {
    ...state,
    getWarehouses: {
      ...INITIAL_STATE.getWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getWarehousesFailure = (state, { error }) => {
  return {
    ...state,
    getWarehouses: {
      ...INITIAL_STATE.getWarehouses,
      isPending: false,
      error,
    },
  };
};

export const getActiveWarehousesRequest = state => {
  return {
    ...state,
    getActiveWarehouses: {
      ...INITIAL_STATE.getActiveWarehouses,
      isPending: true,
    },
  };
};

export const getActiveWarehousesSuccess = (state, { data }) => {
  return {
    ...state,
    getActiveWarehouses: {
      ...INITIAL_STATE.getActiveWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getActiveWarehousesFailure = (state, { error }) => {
  return {
    ...state,
    getActiveWarehouses: {
      ...INITIAL_STATE.getActiveWarehouses,
      isPending: false,
      error,
    },
  };
};

export const getFilteredWarehousesRequest = state => {
  return {
    ...state,
    getFilteredWarehouses: {
      ...INITIAL_STATE.getFilteredWarehouses,
      isPending: true,
    },
  };
};

export const getFilteredWarehousesSuccess = (state, { data }) => {
  return {
    ...state,
    getFilteredWarehouses: {
      ...INITIAL_STATE.getFilteredWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getFilteredWarehousesFailure = (state, { error }) => {
  return {
    ...state,
    getFilteredWarehouses: {
      ...INITIAL_STATE.getFilteredWarehouses,
      isPending: false,
      error,
    },
  };
};

export const getFilteredWarehousesForDivisionRequest = state => {
  return {
    ...state,
    getFilteredWarehousesForDivision: {
      ...INITIAL_STATE.getFilteredWarehousesForDivision,
      isPending: true,
    },
  };
};

export const getFilteredWarehousesForDivisionSuccess = (state, { data }) => {
  return {
    ...state,
    getFilteredWarehousesForDivision: {
      ...INITIAL_STATE.getFilteredWarehousesForDivision,
      data,
      isPending: false,
    },
  };
};

export const getFilteredWarehousesForDivisionFailure = (state, { error }) => {
  return {
    ...state,
    getFilteredWarehousesForDivision: {
      ...INITIAL_STATE.getFilteredWarehousesForDivision,
      isPending: false,
      error,
    },
  };
};

export const getBrandsRequest = state => {
  return {
    ...state,
    getBrands: {
      ...INITIAL_STATE.getBrands,
      isPending: true,
    },
  };
};

export const getBrandsSuccess = (state, { data }) => {
  return {
    ...state,
    getBrands: {
      ...INITIAL_STATE.getBrands,
      data,
      isPending: false,
    },
  };
};

export const getBrandsFailure = (state, { error }) => {
  return {
    ...state,
    getBrands: {
      ...INITIAL_STATE.getBrands,
      isPending: false,
      error,
    },
  };
};

export const getSuppliersRequest = state => {
  return {
    ...state,
    getSuppliers: {
      ...INITIAL_STATE.getSuppliers,
      isPending: true,
    },
  };
};

export const getSuppliersSuccess = (state, { data }) => {
  return {
    ...state,
    getSuppliers: {
      ...INITIAL_STATE.getSuppliers,
      data,
      isPending: false,
    },
  };
};

export const getSuppliersFailure = (state, { error }) => {
  return {
    ...state,
    getSuppliers: {
      ...INITIAL_STATE.getSuppliers,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductCategoriesRequest = state => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      isPending: true,
    },
  };
};

export const getMarketProductCategoriesSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoriesFailure = (state, { error }) => {
  return {
    ...state,
    getMarketProductCategories: {
      ...INITIAL_STATE.getMarketProductCategories,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductSubCategoriesRequest = state => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      isPending: true,
    },
  };
};

export const getMarketProductSubCategoriesSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductSubCategoriesFailure = (state, { error }) => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...INITIAL_STATE.getMarketProductSubCategories,
      isPending: false,
      error,
    },
  };
};

export const clearMarketProductSubCategories = state => {
  return {
    ...state,
    getMarketProductSubCategories: {
      ...state.getMarketProductSubCategories,
      isPending: false,
    },
  };
};

export const getMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProducts: {
      ...state.getMarketProducts,
      isPending: true,
    },
  };
};

export const getMarketProductsSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsFailure = (state, { error }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const clearMarketProducts = state => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: false,
    },
  };
};

export const getMarketProductMasterCategoriesRequest = state => {
  return {
    ...state,
    getMarketProductMasterCategories: {
      ...INITIAL_STATE.getMarketProductMasterCategories,
      isPending: true,
    },
  };
};

export const getMarketProductMasterCategoriesSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketProductMasterCategories: {
      ...INITIAL_STATE.getMarketProductMasterCategories,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductMasterCategoriesFailure = (state, { error }) => {
  return {
    ...state,
    getMarketProductMasterCategories: {
      ...INITIAL_STATE.getMarketProductMasterCategories,
      isPending: false,
      error,
    },
  };
};

export const getMarketFranchisesRequest = state => {
  return {
    ...state,
    getMarketFranchises: {
      ...INITIAL_STATE.getMarketFranchises,
      isPending: true,
    },
  };
};

export const getMarketFranchisesSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketFranchises: {
      ...INITIAL_STATE.getMarketFranchises,
      data,
      isPending: false,
    },
  };
};

export const getMarketFranchisesFailure = (state, { error }) => {
  return {
    ...state,
    getMarketFranchises: {
      ...INITIAL_STATE.getMarketFranchises,
      isPending: false,
      error,
    },
  };
};

export const getTransferGroupsRequest = state => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      isPending: true,
    },
  };
};

export const getTransferGroupsSuccess = (state, { data, total }) => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const getTransferGroupsFailure = (state, { error }) => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const getUserOwnedPagesRequest = state => {
  return {
    ...state,
    getUserOwnedPages: {
      ...INITIAL_STATE.getUserOwnedPages,
      isPending: true,
      isRequested: state.isRequested,
    },
  };
};

export const getUserOwnedPagesSuccess = (state, { data }) => {
  return {
    ...state,
    getUserOwnedPages: {
      ...INITIAL_STATE.getUserOwnedPages,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getUserOwnedPagesFailure = (state, { error }) => {
  return {
    ...state,
    getUserOwnedPages: {
      ...INITIAL_STATE.getUserOwnedPages,
      isPending: false,
      isRequested: false,
      error,
    },
  };
};

export const getUserOwnedPagesReset = state => ({
  ...state,
  getUserOwnedPages: { ...INITIAL_STATE.getUserOwnedPages },
});

export const getAllPagesRequest = state => {
  return {
    ...state,
    getAllPages: {
      ...INITIAL_STATE.getAllPages,
      isPending: true,
    },
  };
};

export const getAllPagesSuccess = state => {
  return {
    ...state,
    getAllPages: {
      ...INITIAL_STATE.getAllPages,
      isPending: false,
    },
  };
};

export const getAllPagesFailure = (state, { error }) => {
  return {
    ...state,
    getAllPages: {
      ...INITIAL_STATE.getAllPages,
      isPending: false,
      error,
    },
  };
};

export const setCurrentPagePermKey = (state, { permKey }) => {
  return {
    ...state,
    currentPagePermKey: permKey,
  };
};

export const getCurrentPageRequest = (state, { permKey }) => {
  return {
    ...state,
    getCurrentPageMap: {
      ...state.getCurrentPageMap,
      [permKey]: {
        ...state.getCurrentPageMap?.[permKey],
        isPending: true,
        error: null,
      },
    },
  };
};

export const getCurrentPageSuccess = (state, { data, permKey }) => {
  return {
    ...state,
    getCurrentPageMap: {
      ...state.getCurrentPageMap,
      // Cache the current page in a map so we don't fetch everytime we navigate
      [permKey]: {
        ...state.getCurrentPageMap?.[permKey],
        data,
        isPending: false,
        error: null,
      },
    },
  };
};

export const getCurrentPageFailure = (state, { error, permKey }) => {
  return {
    ...state,
    getCurrentPageMap: {
      ...state.getCurrentPageMap,
      [permKey]: {
        data: null,
        isPending: false,
        error,
      },
    },
  };
};

export const getCurrentPageDocsRequest = (state, { permKey }) => {
  return {
    ...state,
    getCurrentPageDocsMap: {
      ...state.getCurrentPageDocsMap,
      [permKey]: {
        ...state.getCurrentPageDocsMap?.[permKey],
        isPending: true,
        error: null,
      },
    },
  };
};

export const getCurrentPageDocsSuccess = (state, { data, permKey }) => {
  return {
    ...state,
    getCurrentPageDocsMap: {
      ...state.getCurrentPageDocsMap,
      [permKey]: {
        ...state.getCurrentPageDocsMap?.[permKey],
        data,
        isPending: false,
        error: null,
      },
    },
  };
};

export const getCurrentPageDocsFailure = (state, { error, permKey }) => {
  return {
    ...state,
    getCurrentPageDocsMap: {
      ...state.getCurrentPageDocsMap,
      [permKey]: {
        data: null,
        isPending: false,
        error,
      },
    },
  };
};

export const getMyPermissionsRequest = state => {
  return {
    ...state,
    getMyPermissions: {
      ...INITIAL_STATE.getMyPermissions,
      isPending: true,
    },
  };
};

export const getMyPermissionsSuccess = (state, { data }) => {
  return {
    ...state,
    getMyPermissions: {
      ...INITIAL_STATE.getMyPermissions,
      data,
      isPending: false,
    },
  };
};

export const setMyPermissions = (state, { data }) => {
  return {
    ...state,
    getMyPermissions: {
      data,
      isPending: false,
    },
  };
};

export const getMyPermissionsFailure = (state, { error }) => {
  return {
    ...state,
    getMyPermissions: {
      ...INITIAL_STATE.getMyPermissions,
      isPending: false,
      error,
    },
  };
};

const getFavoriteDocumentsRequest = state => ({
  ...state,
  favoriteDocuments: {
    ...state.favoriteDocuments,
    isPending: true,
  },
});

const getFavoriteDocumentsSuccess = (state, { data }) => ({
  ...state,
  favoriteDocuments: {
    ...state.favoriteDocuments,
    isPending: false,
    data,
  },
});

const getFavoriteDocumentsFailure = state => ({
  ...state,
  favoriteDocuments: {
    ...state.favoriteDocuments,
    isPending: false,
  },
});

const addFavoriteDocumentRequest = (state, { _id }) => ({
  ...state,
  addFavoriteDocument: {
    ...state.addFavoriteDocument,
    [_id]: {
      ...state.addFavoriteDocument?.[_id],
      isPending: true,
      error: null,
    },
  },
});

const addFavoriteDocumentSuccess = (state, { _id }) => ({
  ...state,
  addFavoriteDocument: {
    ...state.addFavoriteDocument,
    [_id]: {
      ...state.addFavoriteDocument?.[_id],
      isPending: false,
      error: null,
    },
  },
});

const addFavoriteDocumentFailure = (state, { _id, error }) => ({
  ...state,
  addFavoriteDocument: {
    ...state.addFavoriteDocument,
    [_id]: {
      ...state.addFavoriteDocument?.[_id],
      isPending: false,
      error,
    },
  },
});

const removeFavoriteDocumentRequest = (state, { _id }) => ({
  ...state,
  removeFavoriteDocument: {
    ...state.removeFavoriteDocument,
    [_id]: {
      ...state.removeFavoriteDocument?.[_id],
      isPending: true,
      error: null,
    },
  },
});

const removeFavoriteDocumentSuccess = (state, { _id }) => {
  return ({
    ...state,
    removeFavoriteDocument: {
      ...state.removeFavoriteDocument,
      [_id]: {
        ...state.removeFavoriteDocument?.[_id],
        isPending: false,
        error: null,
      },
    },
  });
};

const removeFavoriteDocumentFailure = (state, { _id, error }) => ({
  ...state,
  removeFavoriteDocument: {
    ...state.removeFavoriteDocument,
    [_id]: {
      ...state.removeFavoriteDocument?.[_id],
      isPending: false,
      error,
    },
  },
});

export const getRolePermissionsRequest = state => {
  return {
    ...state,
    getRolePermissions: {
      ...INITIAL_STATE.getRolePermissions,
      isPending: true,
    },
  };
};

export const getRolePermissionsSuccess = (state, { data }) => {
  return {
    ...state,
    getRolePermissions: {
      ...INITIAL_STATE.getRolePermissions,
      data,
      isPending: false,
    },
  };
};

export const getRolePermissionsFailure = (state, { error }) => {
  return {
    ...state,
    getRolePermissions: {
      ...INITIAL_STATE.getRolePermissions,
      isPending: false,
      error,
    },
  };
};

export const getRolePermissionsReset = state => {
  return {
    ...state,
    getRolePermissions: { ...INITIAL_STATE.getRolePermissions },
  };
};

export const getRolesRequest = state => {
  return {
    ...state,
    getRoles: {
      ...INITIAL_STATE.getRoles,
      isPending: true,
    },
  };
};

export const getRolesSuccess = (state, { data }) => {
  return {
    ...state,
    getRoles: {
      ...INITIAL_STATE.getRoles,
      data,
      isPending: false,
    },
  };
};

export const getRolesFailure = (state, { error }) => {
  return {
    ...state,
    getRoles: {
      ...INITIAL_STATE.getRoles,
      isPending: false,
      error,
    },
  };
};

export const getRoleUsersRequest = state => {
  return {
    ...state,
    getRoleUsers: {
      ...state.getRoleUsers,
      isPending: true,
    },
  };
};

export const getRoleUsersSuccess = (state, { data }) => {
  return {
    ...state,
    getRoleUsers: {
      ...state.getRoleUsers,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getRoleUsersFailure = (state, { error }) => {
  return {
    ...state,
    getRoleUsers: {
      ...state.getRoleUsers,
      isPending: false,
      isRequested: false,
      error,
    },
  };
};

export const getRoleUsersReset = state => {
  return {
    ...state,
    getRoleUsers: { ...INITIAL_STATE.getRoleUsers },
  };
};

export const getUserOwnedRolesRequest = state => {
  return {
    ...state,
    getUserOwnedRoles: {
      ...state.getUserOwnedRoles,
      isPending: true,
    },
  };
};

export const getUserOwnedRolesSuccess = (state, { data }) => {
  return {
    ...state,
    getUserOwnedRoles: {
      ...state.getUserOwnedRoles,
      data,
      isPending: false,
    },
  };
};

export const getUserOwnedRolesFailure = (state, { error }) => {
  return {
    ...state,
    getUserOwnedRoles: {
      ...state.getUserOwnedRoles,
      isPending: false,
      error,
    },
  };
};

export const getUserRolesRequest = state => {
  return {
    ...state,
    getUserRoles: {
      ...state.getUserRoles,
      isPending: true,
    },
  };
};

export const getUserRolesSuccess = (state, { data }) => {
  return {
    ...state,
    getUserRoles: {
      ...state.getUserRoles,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getUserRolesFailure = (state, { error }) => {
  return {
    ...state,
    getUserRoles: {
      ...state.getUserRoles,
      isPending: false,
      isRequested: false,
      error,
    },
  };
};

export const getUserRolesReset = state => {
  return {
    ...state,
    getUserRoles: { ...INITIAL_STATE.getUserRoles },
  };
};

export const getCompaniesRequest = state => {
  return {
    ...state,
    getCompanies: {
      ...state.getCompanies,
      isPending: true,
    },
  };
};

export const getCompaniesSuccess = (state, { data }) => {
  return {
    ...state,
    getCompanies: {
      ...state.getCompanies,
      data,
      isPending: false,
    },
  };
};

export const getCompaniesFailure = (state, { error }) => {
  return {
    ...state,
    getCompanies: {
      ...state.getCompanies,
      isPending: false,
      error,
    },
  };
};

export const getSelectedCountryTimezone = (state, { data }) => {
  return {
    ...state,
    getSelectedCountryTimezone: {
      ...state.getSelectedCountryTimezone,
      data,
    },
  };
};

export const setSelectedCities = (state, { data }) => {
  return {
    ...state,
    getSelectedCities: {
      ...state.getSelectedCities,
      data,
    },
  };
};

export const setSelectedDomainTypes = (state, { data }) => {
  return {
    ...state,
    getSelectedDomainTypes: {
      ...state.getSelectedDomainTypes,
      data,
    },
  };
};

export const setSelectedDomainType = (state, { data }) => {
  return {
    ...state,
    selectedDomainType: data,
  };
};

export const getDivisionRequest = state => {
  return {
    ...state,
    division: {
      ...state.division,
      isPending: true,
    },
  };
};

export const getDivisionSuccess = (state, { data }) => {
  return {
    ...state,
    division: {
      ...state.division,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getDivisionFailure = (state, { error }) => {
  return {
    ...state,
    division: {
      ...state.division,
      isPending: false,
      error,
    },
  };
};

export const getDivisionsRequest = state => {
  return {
    ...state,
    divisions: {
      ...state.divisions,
      isPending: true,
    },
  };
};

export const getDivisionsSuccess = (state, { data }) => {
  return {
    ...state,
    divisions: {
      ...state.divisions,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getDivisionsFailure = (state, { error }) => {
  return {
    ...state,
    divisions: {
      ...state.divisions,
      isPending: false,
      error,
    },
  };
};

export const getAllDivisionsRequest = state => {
  return {
    ...state,
    allDivisions: {
      ...state.allDivisions,
      isPending: true,
    },
  };
};

export const getAllDivisionsSuccess = (state, { data }) => {
  return {
    ...state,
    allDivisions: {
      ...state.allDivisions,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getAllDivisionsFailure = (state, { error }) => {
  return {
    ...state,
    allDivisions: {
      ...state.allDivisions,
      isPending: false,
      error,
    },
  };
};

export const getDivisionsCitiesRequest = state => {
  return {
    ...state,
    getDivisionsCities: {
      ...INITIAL_STATE.getDivisionsCities,
      isPending: true,
    },
  };
};

export const getDivisionsCitiesSuccess = (state, { data }) => {
  return {
    ...state,
    getDivisionsCities: {
      ...INITIAL_STATE.getDivisionsCities,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getDivisionsCitiesFailure = (state, { error }) => {
  return {
    ...state,
    getDivisionsCities: {
      ...INITIAL_STATE.getDivisionsCities,
      isPending: false,
      error,
    },
  };
};

export const getDivisionsCountriesRequest = state => {
  return {
    ...state,
    getDivisionsCountries: {
      ...INITIAL_STATE.getDivisionsCountries,
      isPending: true,
    },
  };
};

export const getDivisionsCountriesSuccess = (state, { data }) => {
  return {
    ...state,
    getDivisionsCountries: {
      ...INITIAL_STATE.getDivisionsCountries,
      data,
      isPending: false,
    },
  };
};

export const getDivisionsCountriesFailure = (state, { error }) => {
  return {
    ...state,
    getDivisionsCountries: {
      ...INITIAL_STATE.getDivisionsCountries,
      isPending: false,
      error,
    },
  };
};

export const getConfigWithKeyRequest = state => {
  return {
    ...state,
    configData: {
      ...INITIAL_STATE.configData,
      isPending: true,
    },
  };
};

export const getConfigWithKeySuccess = (state, { data }) => {
  return {
    ...state,
    configData: {
      ...INITIAL_STATE.configData,
      data,
      isPending: false,
    },
  };
};

export const getConfigWithKeyFailure = (state, { error }) => {
  return {
    ...state,
    configData: {
      ...INITIAL_STATE.configData,
      isPending: false,
      error,
    },
  };
};
export const getAvailableDomainTypesForCountrySelectorRequest = state => {
  return {
    ...state,
    availableDomainTypesForCountry: {
      ...INITIAL_STATE.availableDomainTypesForCountry,
      isPending: true,
    },
  };
};

export const getAvailableDomainTypesForCountrySelectorSuccess = (state, { data }) => {
  return {
    ...state,
    availableDomainTypesForCountry: {
      ...INITIAL_STATE.availableDomainTypesForCountry,
      data,
      isPending: false,
    },
  };
};

export const getAvailableDomainTypesForCountrySelectorFailure = (state, { error }) => {
  return {
    ...state,
    availableDomainTypesForCountry: {
      ...INITIAL_STATE.availableDomainTypesForCountry,
      isPending: false,
      error,
    },
  };
};

export const getAvailableIntegrationTypesForCountryRequest = state => {
  return {
    ...state,
    availableIntegrationTypesForCountry: {
      ...INITIAL_STATE.availableIntegrationTypesForCountry,
      isPending: true,
    },
  };
};

export const getAvailableIntegrationTypesForCountrySuccess = (state, { data }) => {
  return {
    ...state,
    availableIntegrationTypesForCountry: {
      ...INITIAL_STATE.availableIntegrationTypesForCountry,
      data,
      isPending: false,
    },
  };
};

export const getAvailableIntegrationTypesForCountryFailure = (state, { error }) => {
  return {
    ...state,
    availableIntegrationTypesForCountry: {
      ...INITIAL_STATE.availableIntegrationTypesForCountry,
      isPending: false,
      error,
    },
  };
};

export const getSlottedOrderActiveDomainTypesRequest = state => (
  {
    ...state,
    slottedOrderActiveDomainTypes: {
      ...INITIAL_STATE.slottedOrderActiveDomainTypes,
      isPending: true,
    },
  }
);

export const getSlottedOrderActiveDomainTypesSuccess = (state, { data }) => (
  {
    ...state,
    slottedOrderActiveDomainTypes: {
      ...INITIAL_STATE.slottedOrderActiveDomainTypes,
      data,
      isPending: false,
    },
  }
);

export const getSlottedOrderActiveDomainTypesFailure = (state, { error }) => (
  {
    ...state,
    slottedActiveDomainTypes: {
      ...INITIAL_STATE.slottedOrderActiveDomainTypes,
      isPending: false,
      error,
    },
  }
);

const HANDLERS = {
  [Types.GET_COUNTRIES_REQUEST]: getCountriesRequest,
  [Types.GET_COUNTRIES_SUCCESS]: getCountriesSuccess,
  [Types.GET_COUNTRIES_FAILURE]: getCountriesFailure,
  [Types.GET_OPERATIONAL_COUNTRIES_REQUEST]: getOperationalCountriesRequest,
  [Types.GET_OPERATIONAL_COUNTRIES_SUCCESS]: getOperationalCountriesSuccess,
  [Types.GET_OPERATIONAL_COUNTRIES_FAILURE]: getOperationalCountriesFailure,
  [Types.GET_COUNTRY_GROUPS_REQUEST]: getCountryGroupsRequest,
  [Types.GET_COUNTRY_GROUPS_SUCCESS]: getCountryGroupsSuccess,
  [Types.GET_COUNTRY_GROUPS_FAILURE]: getCountryGroupsFailure,
  [Types.GET_CITIES_REQUEST]: getCitiesRequest,
  [Types.GET_CITIES_SUCCESS]: getCitiesSuccess,
  [Types.GET_CITIES_FAILURE]: getCitiesFailure,
  [Types.GET_REGIONS_REQUEST]: getRegionsRequest,
  [Types.GET_REGIONS_SUCCESS]: getRegionsSuccess,
  [Types.GET_REGIONS_FAILURE]: getRegionsFailure,
  [Types.GET_MAIN_STORES_REQUEST]: getMainStoresRequest,
  [Types.GET_MAIN_STORES_SUCCESS]: getMainStoresSuccess,
  [Types.GET_MAIN_STORES_FAILURE]: getMainStoresFailure,
  [Types.GET_NONAGREEMENT_WAREHOUSES_REQUEST]: getNonagreementWarehousesRequest,
  [Types.GET_NONAGREEMENT_WAREHOUSES_SUCCESS]: getNonagreementWarehousesSuccess,
  [Types.GET_NONAGREEMENT_WAREHOUSES_FAILURE]: getNonagreementWarehousesFailure,
  [Types.GET_WAREHOUSES_REQUEST]: getWarehousesRequest,
  [Types.GET_WAREHOUSES_SUCCESS]: getWarehousesSuccess,
  [Types.GET_WAREHOUSES_FAILURE]: getWarehousesFailure,
  [Types.GET_ACTIVE_WAREHOUSES_REQUEST]: getActiveWarehousesRequest,
  [Types.GET_ACTIVE_WAREHOUSES_SUCCESS]: getActiveWarehousesSuccess,
  [Types.GET_ACTIVE_WAREHOUSES_FAILURE]: getActiveWarehousesFailure,
  [Types.GET_FILTERED_WAREHOUSES_REQUEST]: getFilteredWarehousesRequest,
  [Types.GET_FILTERED_WAREHOUSES_SUCCESS]: getFilteredWarehousesSuccess,
  [Types.GET_FILTERED_WAREHOUSES_FAILURE]: getFilteredWarehousesFailure,
  [Types.GET_FILTERED_WAREHOUSES_FOR_DIVISION_REQUEST]: getFilteredWarehousesForDivisionRequest,
  [Types.GET_FILTERED_WAREHOUSES_FOR_DIVISION_SUCCESS]: getFilteredWarehousesForDivisionSuccess,
  [Types.GET_FILTERED_WAREHOUSES_FOR_DIVISION_FAILURE]: getFilteredWarehousesForDivisionFailure,
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.GET_SUPPLIERS_REQUEST]: getSuppliersRequest,
  [Types.GET_SUPPLIERS_SUCCESS]: getSuppliersSuccess,
  [Types.GET_SUPPLIERS_FAILURE]: getSuppliersFailure,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST]: getMarketProductCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS]: getMarketProductCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE]: getMarketProductCategoriesFailure,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST]: getMarketProductSubCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS]: getMarketProductSubCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE]: getMarketProductSubCategoriesFailure,
  [Types.CLEAR_MARKET_PRODUCT_SUB_CATEGORIES]: clearMarketProductSubCategories,
  [Types.GET_MARKET_PRODUCTS_REQUEST]: getMarketProductsRequest,
  [Types.GET_MARKET_PRODUCTS_SUCCESS]: getMarketProductsSuccess,
  [Types.GET_MARKET_PRODUCTS_FAILURE]: getMarketProductsFailure,
  [Types.CLEAR_MARKET_PRODUCTS]: clearMarketProducts,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST]: getMarketProductMasterCategoriesRequest,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_SUCCESS]: getMarketProductMasterCategoriesSuccess,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_FAILURE]: getMarketProductMasterCategoriesFailure,
  [Types.GET_MARKET_FRANCHISES_REQUEST]: getMarketFranchisesRequest,
  [Types.GET_MARKET_FRANCHISES_SUCCESS]: getMarketFranchisesSuccess,
  [Types.GET_MARKET_FRANCHISES_FAILURE]: getMarketFranchisesFailure,
  [Types.GET_TRANSFER_GROUPS_REQUEST]: getTransferGroupsRequest,
  [Types.GET_TRANSFER_GROUPS_SUCCESS]: getTransferGroupsSuccess,
  [Types.GET_TRANSFER_GROUPS_FAILURE]: getTransferGroupsFailure,
  [Types.GET_USER_OWNED_PAGES_REQUEST]: getUserOwnedPagesRequest,
  [Types.GET_USER_OWNED_PAGES_SUCCESS]: getUserOwnedPagesSuccess,
  [Types.GET_USER_OWNED_PAGES_FAILURE]: getUserOwnedPagesFailure,
  [Types.GET_USER_OWNED_PAGES_RESET]: getUserOwnedPagesReset,
  [Types.GET_ALL_PAGES_REQUEST]: getAllPagesRequest,
  [Types.GET_ALL_PAGES_SUCCESS]: getAllPagesSuccess,
  [Types.GET_ALL_PAGES_FAILURE]: getAllPagesFailure,
  [Types.SET_CURRENT_PAGE_PERM_KEY]: setCurrentPagePermKey,
  [Types.GET_CURRENT_PAGE_REQUEST]: getCurrentPageRequest,
  [Types.GET_CURRENT_PAGE_SUCCESS]: getCurrentPageSuccess,
  [Types.GET_CURRENT_PAGE_FAILURE]: getCurrentPageFailure,
  [Types.GET_CURRENT_PAGE_DOCS_REQUEST]: getCurrentPageDocsRequest,
  [Types.GET_CURRENT_PAGE_DOCS_SUCCESS]: getCurrentPageDocsSuccess,
  [Types.GET_CURRENT_PAGE_DOCS_FAILURE]: getCurrentPageDocsFailure,
  [Types.GET_MY_PERMISSIONS_REQUEST]: getMyPermissionsRequest,
  [Types.GET_MY_PERMISSIONS_SUCCESS]: getMyPermissionsSuccess,
  [Types.GET_MY_PERMISSIONS_FAILURE]: getMyPermissionsFailure,
  [Types.SET_MY_PERMISSIONS]: setMyPermissions,
  [Types.GET_FAVORITE_DOCUMENTS_REQUEST]: getFavoriteDocumentsRequest,
  [Types.GET_FAVORITE_DOCUMENTS_SUCCESS]: getFavoriteDocumentsSuccess,
  [Types.GET_FAVORITE_DOCUMENTS_FAILURE]: getFavoriteDocumentsFailure,
  [Types.ADD_FAVORITE_DOCUMENT_REQUEST]: addFavoriteDocumentRequest,
  [Types.ADD_FAVORITE_DOCUMENT_SUCCESS]: addFavoriteDocumentSuccess,
  [Types.ADD_FAVORITE_DOCUMENT_FAILURE]: addFavoriteDocumentFailure,
  [Types.REMOVE_FAVORITE_DOCUMENT_REQUEST]: removeFavoriteDocumentRequest,
  [Types.REMOVE_FAVORITE_DOCUMENT_SUCCESS]: removeFavoriteDocumentSuccess,
  [Types.REMOVE_FAVORITE_DOCUMENT_FAILURE]: removeFavoriteDocumentFailure,
  [Types.GET_ROLE_PERMISSIONS_REQUEST]: getRolePermissionsRequest,
  [Types.GET_ROLE_PERMISSIONS_SUCCESS]: getRolePermissionsSuccess,
  [Types.GET_ROLE_PERMISSIONS_FAILURE]: getRolePermissionsFailure,
  [Types.GET_ROLE_PERMISSIONS_RESET]: getRolePermissionsReset,
  [Types.GET_ROLES_REQUEST]: getRolesRequest,
  [Types.GET_ROLES_SUCCESS]: getRolesSuccess,
  [Types.GET_ROLES_FAILURE]: getRolesFailure,
  [Types.GET_ROLE_USERS_REQUEST]: getRoleUsersRequest,
  [Types.GET_ROLE_USERS_SUCCESS]: getRoleUsersSuccess,
  [Types.GET_ROLE_USERS_FAILURE]: getRoleUsersFailure,
  [Types.GET_ROLE_USERS_RESET]: getRoleUsersReset,
  [Types.GET_USER_OWNED_ROLES_REQUEST]: getUserOwnedRolesRequest,
  [Types.GET_USER_OWNED_ROLES_SUCCESS]: getUserOwnedRolesSuccess,
  [Types.GET_USER_OWNED_ROLES_FAILURE]: getUserOwnedRolesFailure,
  [Types.GET_USER_ROLES_REQUEST]: getUserRolesRequest,
  [Types.GET_USER_ROLES_SUCCESS]: getUserRolesSuccess,
  [Types.GET_USER_ROLES_FAILURE]: getUserRolesFailure,
  [Types.GET_USER_ROLES_RESET]: getUserRolesReset,
  [Types.GET_COMPANIES_REQUEST]: getCompaniesRequest,
  [Types.GET_COMPANIES_SUCCESS]: getCompaniesSuccess,
  [Types.GET_COMPANIES_FAILURE]: getCompaniesFailure,
  [Types.GET_SELECTED_COUNTRY_TIMEZONE]: getSelectedCountryTimezone,
  [Types.SET_SELECTED_CITIES]: setSelectedCities,
  [Types.SET_SELECTED_DOMAIN_TYPES]: setSelectedDomainTypes,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.GET_DIVISIONS_CITIES_REQUEST]: getDivisionsCitiesRequest,
  [Types.GET_DIVISIONS_CITIES_SUCCESS]: getDivisionsCitiesSuccess,
  [Types.GET_DIVISIONS_CITIES_FAILURE]: getDivisionsCitiesFailure,
  [Types.GET_DIVISIONS_COUNTRIES_REQUEST]: getDivisionsCountriesRequest,
  [Types.GET_DIVISIONS_COUNTRIES_SUCCESS]: getDivisionsCountriesSuccess,
  [Types.GET_DIVISIONS_COUNTRIES_FAILURE]: getDivisionsCountriesFailure,
  [Types.GET_DIVISION_REQUEST]: getDivisionRequest,
  [Types.GET_DIVISION_SUCCESS]: getDivisionSuccess,
  [Types.GET_DIVISION_FAILURE]: getDivisionFailure,
  [Types.GET_DIVISIONS_REQUEST]: getDivisionsRequest,
  [Types.GET_DIVISIONS_SUCCESS]: getDivisionsSuccess,
  [Types.GET_DIVISIONS_FAILURE]: getDivisionsFailure,
  [Types.GET_ALL_DIVISIONS_REQUEST]: getAllDivisionsRequest,
  [Types.GET_ALL_DIVISIONS_SUCCESS]: getAllDivisionsSuccess,
  [Types.GET_ALL_DIVISIONS_FAILURE]: getAllDivisionsFailure,
  [Types.GET_CONFIG_WITH_KEY_REQUEST]: getConfigWithKeyRequest,
  [Types.GET_CONFIG_WITH_KEY_SUCCESS]: getConfigWithKeySuccess,
  [Types.GET_CONFIG_WITH_KEY_FAILURE]: getConfigWithKeyFailure,
  [Types.GET_AVAILABLE_DOMAIN_TYPES_FOR_COUNTRY_SELECTOR_REQUEST]: getAvailableDomainTypesForCountrySelectorRequest,
  [Types.GET_AVAILABLE_DOMAIN_TYPES_FOR_COUNTRY_SELECTOR_SUCCESS]: getAvailableDomainTypesForCountrySelectorSuccess,
  [Types.GET_AVAILABLE_DOMAIN_TYPES_FOR_COUNTRY_SELECTOR_FAILURE]: getAvailableDomainTypesForCountrySelectorFailure,
  [Types.GET_AVAILABLE_INTEGRATION_TYPES_FOR_COUNTRY_REQUEST]: getAvailableIntegrationTypesForCountryRequest,
  [Types.GET_AVAILABLE_INTEGRATION_TYPES_FOR_COUNTRY_SUCCESS]: getAvailableIntegrationTypesForCountrySuccess,
  [Types.GET_AVAILABLE_INTEGRATION_TYPES_FOR_COUNTRY_FAILURE]: getAvailableIntegrationTypesForCountryFailure,
  [Types.GET_SLOTTED_ORDER_ACTIVE_DOMAIN_TYPES_REQUEST]: getSlottedOrderActiveDomainTypesRequest,
  [Types.GET_SLOTTED_ORDER_ACTIVE_DOMAIN_TYPES_SUCCESS]: getSlottedOrderActiveDomainTypesSuccess,
  [Types.GET_SLOTTED_ORDER_ACTIVE_DOMAIN_TYPES_FAILURE]: getSlottedOrderActiveDomainTypesFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
