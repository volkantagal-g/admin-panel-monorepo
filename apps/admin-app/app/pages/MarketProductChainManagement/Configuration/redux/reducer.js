import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  sizes: [],
  demographies: [],
  warehouseTypes: [],
  mainWarehousesAndCities: [],
  cities: [],
  cityOptions: [],
  darkstores: [],
  isEditMode: false,
  isSaveModalOpen: false,
  isLoading: false,
  isUpdating: false,
  error: null,
  domainTypes: [],
  masterCategoryId: '',
  masterCategoryName: '',
  segment: 0,
  storageType: '',
  isLocal: false,
  // Pre-populated form values
  mainWarehouses: [],
  warehouses: [],
  // Dynamic lookup options from service
  dynamicDemographyOptions: [],
  dynamicSizeOptions: [],
  dynamicDomainTypeOptions: [],
  dynamicWarehouseTypeOptions: [],
  // Final processed options (with fallback logic applied)
  processedDemographyOptions: [],
  processedSizeOptions: [],
  processedDomainTypeOptions: [],
  processedWarehouseTypeOptions: [],
};

const initPage = (state = INITIAL_STATE) => ({
  ...INITIAL_STATE,
  // Preserve main warehouses and cities data if it exists
  mainWarehousesAndCities: state?.mainWarehousesAndCities || [],
});

const destroyPage = () => INITIAL_STATE;

const getProductConfigurationRequest = state => ({ ...state, isLoading: true });
const getProductConfigurationSuccess = (state, { data }) => {
  // Only update state if not in updating mode to prevent UI flashing
  if (state.isUpdating) {
    return {
      ...state,
      domainTypes: data.domainTypes || [],
      masterCategoryId: data.masterCategoryId || '',
      masterCategoryName: data.masterCategoryName || '',
      segment: data.segment || 0,
      storageType: data.storageType || '',
      demographies: data.demography || [],
      sizes: data.size || [],
      isLocal: data.isLocal || false,
      warehouseTypes: data.warehouseTypes || [],

      // Form values from saga
      mainWarehouses: data.formData?.mainWarehouses || [],
      cities: data.formData?.cities || [],
      warehouses: data.formData?.warehouses || [],

      // Dropdown options from saga - only update if not currently showing different data
      mainWarehousesAndCities: data.dropdownOptions?.mainWarehousesAndCities || state.mainWarehousesAndCities,
      cityOptions: data.dropdownOptions?.cityOptions || state.cityOptions,
      darkstores: data.dropdownOptions?.darkstores || state.darkstores,

      isLoading: false,
    };
  }

  return {
    ...state,
    domainTypes: data.domainTypes || [],
    masterCategoryId: data.masterCategoryId || '',
    masterCategoryName: data.masterCategoryName || '',
    segment: data.segment || 0,
    storageType: data.storageType || '',
    demographies: data.demography || [],
    sizes: data.size || [],
    isLocal: data.isLocal || false,
    warehouseTypes: data.warehouseTypes || [],

    // Form values from saga
    mainWarehouses: data.formData?.mainWarehouses || [],
    cities: data.formData?.cities || [],
    warehouses: data.formData?.warehouses || [],

    // Dropdown options from saga
    mainWarehousesAndCities: data.dropdownOptions?.mainWarehousesAndCities || [],
    cityOptions: data.dropdownOptions?.cityOptions || [],
    darkstores: data.dropdownOptions?.darkstores || [],

    isLoading: false,
  };
};
const getProductConfigurationFailure = (state, { error }) => ({
  ...state,
  error,
  isLoading: false,
});

// Get data handlers
const getSizesRequest = state => ({ ...state, isLoading: true });
const getSizesSuccess = (state, { sizes }) => ({ ...state, sizes, isLoading: false });
const getSizesFailure = (state, { error }) => ({ ...state, error, isLoading: false });

// Dynamic lookup handlers
const getDemographyLookupRequest = state => ({ ...state, isLoading: true });
const getDemographyLookupSuccess = (state, { data }) => ({
  ...state,
  dynamicDemographyOptions: data.demographies || [],
  processedDemographyOptions: data.processedDemographyOptions || [],
  isLoading: false,
});
const getDemographyLookupFailure = (state, { error }) => ({ ...state, error, isLoading: false });

const getSizeLookupRequest = state => ({ ...state, isLoading: true });
const getSizeLookupSuccess = (state, { data }) => ({
  ...state,
  dynamicSizeOptions: data.sizes || [],
  processedSizeOptions: data.processedSizeOptions || [],
  isLoading: false,
});
const getSizeLookupFailure = (state, { error }) => ({ ...state, error, isLoading: false });

const getDomainTypeLookupRequest = state => ({ ...state, isLoading: true });
const getDomainTypeLookupSuccess = (state, { data }) => ({
  ...state,
  dynamicDomainTypeOptions: data.domainTypes || [],
  processedDomainTypeOptions: data.processedDomainTypeOptions || [],
  isLoading: false,
});
const getDomainTypeLookupFailure = (state, { error }) => ({ ...state, error, isLoading: false });

const getWarehouseTypeLookupRequest = state => ({ ...state, isLoading: true });
const getWarehouseTypeLookupSuccess = (state, { data }) => ({
  ...state,
  dynamicWarehouseTypeOptions: data.warehouseTypes || [],
  processedWarehouseTypeOptions: data.processedWarehouseTypeOptions || [],
  isLoading: false,
});
const getWarehouseTypeLookupFailure = (state, { error }) => ({ ...state, error, isLoading: false });

const getMainWarehousesAndCitiesRequest = state => ({ ...state, isLoading: true });
const getMainWarehousesAndCitiesSuccess = (state, { mainWarehousesAndCities }) => ({
  ...state,
  mainWarehousesAndCities,
  isLoading: false,
});
const getMainWarehousesAndCitiesFailure = (state, { error }) => ({ ...state, error, isLoading: false });

const updateProductConfigurationRequest = state => ({ ...state, isLoading: true });
const updateProductConfigurationSuccess = state => ({
  ...state,
  isLoading: false,
  isEditMode: false,
});
const updateProductConfigurationFailure = (state, { error }) => ({
  ...state,
  error,
  isLoading: false,
});

const getCentralWarehouseListRequest = state => ({ ...state, isLoading: true });
const getCentralWarehouseListSuccess = (state, { data }) => ({
  ...state,
  mainWarehousesAndCities: data,
  isLoading: false,
});
const getCentralWarehouseListFailure = (state, { error }) => ({
  ...state,
  error,
  isLoading: false,
});

const getCityLookupRequest = state => ({ ...state, isLoading: true });
const getCityLookupSuccess = (state, { cities }) => {
  // Transform new cities from search
  const searchedCities = cities.map(city => ({
    id: city.id,
    cityId: city.cityId,
    name: city.name,
    value: city.id,
    label: city.name.tr || city.name.en,
  }));

  // Get existing matched cities from initial load (preserve them)
  const existingMatchedCities = state.cityOptions.filter(city => state.cities && state.cities.includes(city.value));

  // Merge and deduplicate: Keep existing matched cities + add new search results
  const allCities = [...existingMatchedCities];

  // Add new cities if they don't already exist
  searchedCities.forEach(newCity => {
    if (!allCities.find(existing => existing.value === newCity.value)) {
      allCities.push(newCity);
    }
  });

  return {
    ...state,
    cityOptions: allCities,
    isLoading: false,
  };
};
const getCityLookupFailure = (state, { error }) => ({
  ...state,
  error,
  isLoading: false,
});

const getDarkstoresRequest = state => ({ ...state, isLoading: true });
const getDarkstoresSuccess = (state, { darkstores }) => {
  // Merge new darkstore options with existing selections
  // This ensures that:
  // 1. New darkstore options are available for selection
  // 2. Current form selections are preserved
  // 3. User can see which darkstores are currently selected from the previous API call

  const currentWarehouses = state.warehouses || [];

  // If we have existing selections, mark them as selected in the new darkstore list
  const updatedDarkstores = darkstores.map(darkstore => ({
    ...darkstore,
    isSelected: currentWarehouses.includes(darkstore.value),
  }));

  return {
    ...state,
    darkstores: updatedDarkstores,
    isLoading: false,
    mainWarehouses: state.mainWarehouses || [],
    cities: state.cities || [],
    warehouses: state.warehouses || [],
  };
};
const getDarkstoresFailure = (state, { error }) => ({
  ...state,
  error,
  isLoading: false,
});

const setEditMode = (state, { isEditMode }) => ({ ...state, isEditMode });
const setSaveModalOpen = (state, { isOpen }) => ({ ...state, isSaveModalOpen: isOpen });
const setUpdating = (state, { isUpdating }) => ({ ...state, isUpdating });

const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,

  [Types.GET_PRODUCT_CONFIGURATION_REQUEST]: getProductConfigurationRequest,
  [Types.GET_PRODUCT_CONFIGURATION_SUCCESS]: getProductConfigurationSuccess,
  [Types.GET_PRODUCT_CONFIGURATION_FAILURE]: getProductConfigurationFailure,

  [Types.GET_SIZES_REQUEST]: getSizesRequest,
  [Types.GET_SIZES_SUCCESS]: getSizesSuccess,
  [Types.GET_SIZES_FAILURE]: getSizesFailure,

  // Dynamic lookup handlers
  [Types.GET_DEMOGRAPHY_LOOKUP_REQUEST]: getDemographyLookupRequest,
  [Types.GET_DEMOGRAPHY_LOOKUP_SUCCESS]: getDemographyLookupSuccess,
  [Types.GET_DEMOGRAPHY_LOOKUP_FAILURE]: getDemographyLookupFailure,

  [Types.GET_SIZE_LOOKUP_REQUEST]: getSizeLookupRequest,
  [Types.GET_SIZE_LOOKUP_SUCCESS]: getSizeLookupSuccess,
  [Types.GET_SIZE_LOOKUP_FAILURE]: getSizeLookupFailure,

  [Types.GET_DOMAIN_TYPE_LOOKUP_REQUEST]: getDomainTypeLookupRequest,
  [Types.GET_DOMAIN_TYPE_LOOKUP_SUCCESS]: getDomainTypeLookupSuccess,
  [Types.GET_DOMAIN_TYPE_LOOKUP_FAILURE]: getDomainTypeLookupFailure,

  [Types.GET_WAREHOUSE_TYPE_LOOKUP_REQUEST]: getWarehouseTypeLookupRequest,
  [Types.GET_WAREHOUSE_TYPE_LOOKUP_SUCCESS]: getWarehouseTypeLookupSuccess,
  [Types.GET_WAREHOUSE_TYPE_LOOKUP_FAILURE]: getWarehouseTypeLookupFailure,

  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_REQUEST]: getMainWarehousesAndCitiesRequest,
  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_SUCCESS]: getMainWarehousesAndCitiesSuccess,
  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_FAILURE]: getMainWarehousesAndCitiesFailure,

  [Types.UPDATE_PRODUCT_CONFIGURATION_REQUEST]: updateProductConfigurationRequest,
  [Types.UPDATE_PRODUCT_CONFIGURATION_SUCCESS]: updateProductConfigurationSuccess,
  [Types.UPDATE_PRODUCT_CONFIGURATION_FAILURE]: updateProductConfigurationFailure,

  [Types.GET_CENTRAL_WAREHOUSE_LIST_REQUEST]: getCentralWarehouseListRequest,
  [Types.GET_CENTRAL_WAREHOUSE_LIST_SUCCESS]: getCentralWarehouseListSuccess,
  [Types.GET_CENTRAL_WAREHOUSE_LIST_FAILURE]: getCentralWarehouseListFailure,

  [Types.GET_CITY_LOOKUP_REQUEST]: getCityLookupRequest,
  [Types.GET_CITY_LOOKUP_SUCCESS]: getCityLookupSuccess,
  [Types.GET_CITY_LOOKUP_FAILURE]: getCityLookupFailure,

  [Types.GET_DARKSTORES_REQUEST]: getDarkstoresRequest,
  [Types.GET_DARKSTORES_SUCCESS]: getDarkstoresSuccess,
  [Types.GET_DARKSTORES_FAILURE]: getDarkstoresFailure,

  [Types.SET_EDIT_MODE]: setEditMode,
  [Types.SET_SAVE_MODAL_OPEN]: setSaveModalOpen,
  [Types.SET_UPDATING]: setUpdating,
};

export default createReducer(INITIAL_STATE, HANDLERS);
