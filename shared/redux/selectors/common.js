import { createSelector } from 'reselect';
import { get, includes, isEmpty, keyBy } from 'lodash';

import { getStateObject, createMap } from '@shared/utils/common';

import {
  ACTIVE_TRANSFER_GROUP_STATUS,
  REDUX_KEY,
  STORE_CONVERSION_MARKET_FRANCHISE_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPES,
} from '@shared/shared/constants';
import { getSelectedCountry, getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const reducerKey = REDUX_KEY.COMMON;
const DEFAULT_EMPTY_ARRAY = [];

export const countriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'countries');
    },
    ({ data }) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'countries');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getMap: createSelector(
    state => state?.[reducerKey]?.countries,
    ({ data } = {}) => {
      if (!data) return {};
      return createMap(data);
    },
  ),
};

export const operationalCountriesSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.operationalCountries,
    ({ data } = {}) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.operationalCountries,
    ({ isPending } = { isPending: false }) => {
      return isPending;
    },
  ),
  getMap: createSelector(
    state => state?.[reducerKey]?.operationalCountries,
    ({ data } = {}) => {
      if (!data) return {};
      return createMap(data);
    },
  ),
};

export const countryGroupsSelector = {
  getData: createSelector(
    state => state[reducerKey].countryGroups?.data,
    value => value,
  ),
  getIsPending: createSelector(
    state => state[reducerKey].countryGroups?.isPending,
    value => value,
  ),
};

export const countryIdToCountryGroupMapSelector = {
  getData: createSelector(
    countryGroupsSelector.getData,
    countryGroups => {
      const theMap = new Map();
      countryGroups.forEach(countryGroup => {
        countryGroup.countryIds.forEach(countryId => {
          theMap.set(countryId, countryGroup);
        });
      });
      return theMap;
    },
  ),
  getIsPending: createSelector(
    countryGroupsSelector.getIsPending,
    areCountryGroupsPending => areCountryGroupsPending,
  ),
};

export const regionsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'regions');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'regions');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const mainStoresSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'mainStores');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'mainStores');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const nonagreementWarehousesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'nonagreementWarehouses');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'nonagreementWarehouses');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getCitiesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCities');
    },
    ({ data }) => {
      return data;
    },
  ),
  getCitiesMap: createSelector(
    state => getStateObject(state, reducerKey, 'getCities'),
    ({ data }) => createMap(data),
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCities');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getOperationalCities: createSelector(
    state => state[reducerKey]?.getCities?.data,
    cities => cities?.filter(city => city.operational),
  ),
  getOperationalOrWasOperationalCities: createSelector(
    state => state[reducerKey]?.getCities?.data,
    cities => cities?.filter(city => city.operational || city.wasOperational),
  ),
};

export const getWarehousesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getWarehouses');
    },
    ({ data = [] }) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getWarehousesMap: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getWarehouses');
    },
    ({ data = [] }) => {
      return createMap(data);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getWarehouses');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getActiveWarehousesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getActiveWarehouses');
    },
    ({ data = [] }) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getWarehousesMap: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getActiveWarehouses');
    },
    ({ data = [] }) => {
      return createMap(data);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getActiveWarehouses');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getFilteredWarehousesSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'getFilteredWarehouses'),
    ({ data = [] }) => data?.warehouses || DEFAULT_EMPTY_ARRAY,
  ),
  getFilteredWarehousesMap: createSelector(
    state => getStateObject(state, reducerKey, 'getFilteredWarehouses'),
    ({ data = [] }) => createMap(data?.warehouses || DEFAULT_EMPTY_ARRAY),
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'getFilteredWarehouses'),
    ({ isPending }) => isPending,
  ),
};

export const getFilteredWarehousesForDivisionSelector = {
  getData: state => state?.[reducerKey]?.getFilteredWarehousesForDivision?.data?.warehouses || DEFAULT_EMPTY_ARRAY,
  getIsPending: state => state?.[reducerKey]?.getFilteredWarehousesForDivision?.isPending,
};

export const getBrandsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBrands');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBrands');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getSuppliersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getSuppliers');
    },
    ({ data }) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getSuppliers');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getStoreConversionData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getSuppliers');
    },
    ({ data }) => {
      return data.filter(item => {
        return get(item, 'isStoreConversionSupplier', false);
      });
    },
  ),
  getSuppliersByTypeBreakdown: createSelector(
    state => state[reducerKey]?.getSuppliers,
    ({ data }) => {
      const tempManufacturers = [];
      const tempSuppliers = [];

      data?.forEach(supplier => {
        if (supplier.types && supplier.types.includes('supplier')) {
          tempSuppliers.push(supplier);
        }
        if (supplier.types && supplier.types.includes('manufacturer')) {
          tempManufacturers.push(supplier);
        }
      });

      return { manufacturers: tempManufacturers, suppliers: tempSuppliers };
    },
  ),
};

export const getMarketProductCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ data }) => {
      return data || DEFAULT_EMPTY_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketProductSubCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketProductsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProducts');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProducts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketProductMasterCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductMasterCategories');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductMasterCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketFranchisesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketFranchises');
    },
    ({ data }) => {
      return data;
    },
  ),
  getStoreConversionFranchises: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketFranchises');
    },
    ({ data = [] }) => {
      return data.filter(item => {
        return item.franchiseType === STORE_CONVERSION_MARKET_FRANCHISE_TYPE;
      });
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketFranchises');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getTransferGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ data }) => {
      return data;
    },
  ),
  getActiveGroups: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ data = [] }) => {
      return data.filter(item => {
        return item.status === ACTIVE_TRANSFER_GROUP_STATUS;
      });
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ total }) => {
      return total;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getUserOwnedPagesSelector = {
  getData: state => state[reducerKey].getUserOwnedPages.data,
  getIsPending: state => state[reducerKey].getUserOwnedPages.isPending,
  getIsRequested: state => state[reducerKey].getUserOwnedPages.isRequested,
};

export const getAllPagesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey]?.getAllPages,
    ({ isPending }) => isPending,
  ),
};

export const getCurrentPagePermKeySelector = state => state[reducerKey]?.currentPagePermKey;

// pages stored in a map so we don't fetch everytime we navigate
export const getCurrentPageSelector = {
  getData: state => state[reducerKey].getCurrentPageMap?.[getCurrentPagePermKeySelector(state)]?.data,
  getIsPending: state => state[reducerKey].getCurrentPageMap?.[getCurrentPagePermKeySelector(state)]?.isPending,
  getError: state => state[reducerKey].getCurrentPageMap?.[getCurrentPagePermKeySelector(state)]?.error,
};

export const getCurrentPageDocsSelector = {
  getData: state => state[reducerKey].getCurrentPageDocsMap?.[getCurrentPagePermKeySelector(state)]?.data,
  getIsPending: state => state[reducerKey].getCurrentPageDocsMap?.[getCurrentPagePermKeySelector(state)]?.isPending,
  getError: state => state[reducerKey].getCurrentPageDocsMap?.[getCurrentPagePermKeySelector(state)]?.error,
};

export const getMyPermissionsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMyPermissions');
    },
    ({ data }) => {
      let permissions = data;
      if (isEmpty(data)) {
        permissions = JSON.parse(localStorage.getItem('permissions'));
      }
      return permissions;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMyPermissions');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMyPermKeySet = createSelector(getMyPermissionsSelector.getData, permissions => {
  const selectedCountryId = get(getSelectedCountry(), '_id', '');

  const permissionsByCountry = (permissions || DEFAULT_EMPTY_ARRAY).filter(permission => {
    return permission.hasGlobalAccess || includes(permission.countries, selectedCountryId);
  });
  const permKeySet = new Set();
  permissionsByCountry.forEach(permission => {
    permKeySet.add(permission.permKey);
  });
  return permKeySet;
});

export const favoriteDocumentsSelector = {
  getIsPending: state => state[reducerKey]?.favoriteDocuments.isPending,
  getData: createSelector(
    state => state[reducerKey]?.favoriteDocuments.data,
    data => {
      return (data || DEFAULT_EMPTY_ARRAY).map(item => item.panelDoc);
    },
  ),
};

export const favoriteDocumentMapSelector = createSelector(
  favoriteDocumentsSelector.getData,
  favoriteDocuments => {
    return keyBy(favoriteDocuments, '_id');
  },
);

export const addFavoriteDocumentSelector = (state, _id) => state[reducerKey]?.addFavoriteDocument?.[_id];

export const removeFavoriteDocumentSelector = (state, _id) => state[reducerKey]?.removeFavoriteDocument?.[_id];

export const getRolePermissionsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRolePermissions');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRolePermissions');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getRolesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRoles');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRoles');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getRoleUsersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRoleUsers');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRoleUsers');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getIsRequested: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRoleUsers');
    },
    ({ isRequested }) => {
      return isRequested;
    },
  ),
};

export const getUserOwnedRolesSelector = {
  getData: state => state[reducerKey]?.getUserOwnedRoles?.data,
  getIsPending: state => state[reducerKey]?.getUserOwnedRoles?.isPending,
};

export const getUserRolesSelector = {
  getData: state => state[reducerKey]?.getUserRoles?.data,
  getIsPending: state => state[reducerKey]?.getUserRoles?.isPending,
  getIsRequested: state => state[reducerKey]?.getUserRoles?.isRequested,
};

export const getCompaniesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCompanies');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCompanies');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getSelectedCountryTimezone = {
  getData: createSelector(
    () => {
      return getSelectedCountry();
    },
    data => {
      return data.timezones[0].timezone;
    },
  ),
};

export const getSelectedCities = {
  getData: createSelector(
    state => {
      let selectedCities;
      if (state) {
        selectedCities = state[reducerKey].getSelectedCities.data;
      }
      if (isEmpty(selectedCities)) {
        selectedCities = JSON.parse(localStorage.getItem('selectedCities')) || DEFAULT_EMPTY_ARRAY;
      }
      return selectedCities;
    },
    data => {
      return data;
    },
  ),
};

export const getSelectedDomainTypes = {
  getData: createSelector(
    state => {
      let selectedDomainTypes;
      if (state) {
        selectedDomainTypes = state[reducerKey].getSelectedDomainTypes.data;
      }
      if (isEmpty(selectedDomainTypes)) {
        selectedDomainTypes = JSON.parse(localStorage.getItem('selectedDomainTypes')) || DEFAULT_EMPTY_ARRAY;
      }
      return selectedDomainTypes;
    },
    data => {
      return data;
    },
  ),
};

export const getSelectedDomainType = (state => {
  let selectedDomainType;
  if (state && state[reducerKey]) {
    selectedDomainType = state[reducerKey].selectedDomainType;
  }
  if (isEmpty(selectedDomainType)) {
    selectedDomainType = JSON.parse(localStorage.getItem('selectedDomainType')) || GETIR_10_DOMAIN_TYPE;
  }
  return selectedDomainType;
});

export const getDivisionsCitiesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getDivisionsCities');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getDivisionsCities');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getOperationalCities: createSelector(
    state => state[reducerKey]?.getDivisionsCities?.data,
    cities => cities?.filter(city => city.operational),
  ),
};

export const getDivisionsCountriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getDivisionsCountries');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getDivisionsCountries');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getOperationalCountries: createSelector(
    state => state[reducerKey]?.getDivisionsCountries?.data,
    countries => countries?.filter(country => country.operational),
  ),
};

export const getDivisionSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.division.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.division.isPending,
  ),
};

export const getDivisionsSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.divisions.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.divisions.isPending,
  ),
};

export const getAllDivisionsSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.allDivisions.data?.divisions || DEFAULT_EMPTY_ARRAY,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.allDivisions.isPending,
  ),
};

export const getConfigWithKeySelector = {
  getData: state => state?.[reducerKey]?.configData?.data,
  getIsPending: state => state?.[reducerKey]?.configData?.isPending,
};

export const availableDomainTypesForCountrySelector = {
  getDomainTypesV2: createSelector(
    state => state?.[reducerKey]?.availableDomainTypesForCountry?.data,
    getSelectedCountryV2,
    (data, selectedCountry) => {
      const code = selectedCountry?.code?.alpha2;
      return data?.customValue?.[code] || data?.value;
    },
  ),

  getDomainTypes: createSelector(
    state => state?.[reducerKey]?.availableDomainTypesForCountry?.data,
    (state, acceptableDomainTypes) => {
      return new Set(acceptableDomainTypes || GETIR_MARKET_DOMAIN_TYPES);
    },
    (availableDomainTypesConfig, acceptableDomainTypes) => {
      const { code: { alpha2: countryCode } } = getSelectedCountry();

      if (isEmpty(availableDomainTypesConfig)) {
        return [...acceptableDomainTypes];
      }

      let countryAvailableDomainTypes = availableDomainTypesConfig?.customValue?.[countryCode];
      if (isEmpty(countryAvailableDomainTypes)) {
        countryAvailableDomainTypes = availableDomainTypesConfig?.value || DEFAULT_EMPTY_ARRAY;
      }

      return countryAvailableDomainTypes?.filter(domainType => acceptableDomainTypes.has(domainType));
    },
  ),
  getIsPending: state => state?.[reducerKey]?.availableDomainTypesForCountry?.isPending,
};

export const availableIntegrationTypesForCountrySelector = {
  getData: state => state?.[reducerKey]?.availableIntegrationTypesForCountry?.data,
  getIsPending: state => state?.[reducerKey]?.availableIntegrationTypesForCountry?.isPending,
  getCurrentCountrySpecificData: createSelector(
    state => state?.[reducerKey]?.availableIntegrationTypesForCountry?.data,
    getSelectedCountryV2,
    (data, country) => {
      const { code: { alpha2: countryCode } } = country;
      return data?.customValue?.[countryCode] || data?.value || DEFAULT_EMPTY_ARRAY;
    },
  ),
};

export const slottedOrderActiveDomainTypesSelector = {
  getData: state => state?.[reducerKey]?.slottedOrderActiveDomainTypes?.data,
  getIsPending: state => state?.[reducerKey]?.slottedOrderActiveDomainTypes?.isPending,
  getCurrentCountrySpecificData: createSelector(
    state => state?.[reducerKey]?.slottedOrderActiveDomainTypes?.data,
    getSelectedCountryV2,
    (data, country) => {
      const { code: { alpha2: countryCode } } = country;
      return data?.customValue?.[countryCode] || data?.value || DEFAULT_EMPTY_ARRAY;
    },
  ),
};
