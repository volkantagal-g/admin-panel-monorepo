import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,

  getProductConfigurationRequest: ['productId'],
  getProductConfigurationSuccess: ['data'],
  getProductConfigurationFailure: ['error'],

  // Common lookup actions (dynamic from service)
  getDemographyLookupRequest: ['search'],
  getDemographyLookupSuccess: ['data'],
  getDemographyLookupFailure: ['error'],

  getSizesRequest: null,
  getSizesSuccess: ['sizes'],
  getSizesFailure: ['error'],

  getSizeLookupRequest: ['search'],
  getSizeLookupSuccess: ['data'],
  getSizeLookupFailure: ['error'],

  getDomainTypeLookupRequest: ['search'],
  getDomainTypeLookupSuccess: ['data'],
  getDomainTypeLookupFailure: ['error'],

  getWarehouseTypeLookupRequest: ['search'],
  getWarehouseTypeLookupSuccess: ['data'],
  getWarehouseTypeLookupFailure: ['error'],

  getMainWarehousesAndCitiesRequest: null,
  getMainWarehousesAndCitiesSuccess: ['mainWarehousesAndCities'],
  getMainWarehousesAndCitiesFailure: ['error'],

  updateProductConfigurationRequest: ['productId', 'request'],
  updateProductConfigurationSuccess: ['data'],
  updateProductConfigurationFailure: ['error'],

  getCentralWarehouseListRequest: null,
  getCentralWarehouseListSuccess: ['data'],
  getCentralWarehouseListFailure: ['error'],

  getCityLookupRequest: ['search'],
  getCityLookupSuccess: ['cities'],
  getCityLookupFailure: ['error'],

  getDarkstoresRequest: ['request'],
  getDarkstoresSuccess: ['darkstores'],
  getDarkstoresFailure: ['error'],

  setEditMode: ['isEditMode'],
  setSaveModalOpen: ['isOpen'],
  setUpdating: ['isUpdating'],
});

export { Types, Creators };
