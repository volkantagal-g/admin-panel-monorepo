import { get } from 'lodash';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { message } from 'antd';

import {
  marketProductChainManagementAPI,
  updateProductConfiguration,
} from '@shared/api/marketProductChainManagement';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  TRANSLATION_NAMESPACE,
  DEMOGRAPHY_LABELS,
  SIZE_LABELS,
  DOMAIN_NAME,
  DOMAIN_TYPE,
  WAREHOUSE_TYPE_LABELS,
} from '@app/pages/MarketProductChainManagement/constants';
import { Creators, Types } from './actions';

const mapMainWarehouseData = warehouse => ({
  id: warehouse.id,
  warehouseId: warehouse.warehouseId,
  name: { tr: warehouse.name, en: warehouse.name },
  countryCode: warehouse.countryCode,
  state: warehouse.state,
  domainTypes: warehouse.domainTypes || [],
  city: warehouse.city,
  region: warehouse.region,
  value: warehouse.id,
  label: warehouse.name,
});

const mapCityData = city => ({
  id: city.id,
  cityId: city.cityId,
  name: city.name,
  value: city.id,
  label: city.name.tr || city.name.en,
});

const mapDarkstoreData = darkstore => ({
  id: darkstore.vertexId,
  name: {
    tr: darkstore.name,
    en: darkstore.name,
  },
  value: darkstore.vertexId,
  label: darkstore.name,
  cityName: darkstore.city?.nameTR || darkstore.city?.nameEN,
  regionName: darkstore.region?.nameTR || darkstore.region?.nameEN,
  domainTypes: darkstore.domainTypes?.map(domain => domain.domainType) || [],
  warehouseTypes: darkstore.warehouseType?.warehouseType,
  demography: darkstore.demography?.demography,
  size: darkstore.size?.size,
  warehouseId: darkstore.legacyId || darkstore.warehouseId,
  state: darkstore.state,
  countryCode: darkstore.countryCode,
});

// Mapping functions for lookup data - backend response structure
const mapDemographyLookupData = item => ({
  id: item.id,
  demography: item.demography,
  name: item.name,
  value: item.demography,
  label: item.name || `Demography ${item.demography}`,
});

const mapSizeLookupData = item => ({
  id: item.id,
  size: item.size,
  name: item.name,
  value: item.size,
  label: item.name || `Size ${item.size}`,
});

const mapDomainTypeLookupData = item => ({
  id: item.id,
  domainType: item.domainType,
  name: item.name,
  value: item.domainType,
  label: item.name || `Domain Type ${item.domainType}`,
});

const mapWarehouseTypeLookupData = item => ({
  id: item.id,
  warehouseType: item.warehouseType,
  name: item.name,
  value: item.warehouseType,
  label: item.name || `Warehouse Type ${item.warehouseType}`,
});

// Fallback helper functions for hardcoded labels
const createOptionsFromLabels = (labels, translate = t) => {
  return Object.entries(labels).map(([value, labelKey]) => {
    const label = typeof labelKey === 'object' && labelKey !== null
      ? (labelKey.en || labelKey.tr || String(labelKey))
      : translate(labelKey);

    return {
      value: Number(value),
      label,
    };
  });
};

const createDomainTypeOptionsFromState = (domainTypes = []) => {
  return domainTypes.map(domainNumber => {
    const domainKey = Object.keys(DOMAIN_TYPE).find(key => DOMAIN_TYPE[key] === domainNumber);
    const label = (domainKey && DOMAIN_NAME[domainKey])
      ? DOMAIN_NAME[domainKey]
      : `Domain ${domainNumber}`;

    return {
      value: domainNumber,
      label: typeof label === 'object' ? (label.en || label.tr || String(label)) : String(label),
    };
  });
};

function* getProductConfigurationSaga({ productId }) {
  try {
    const response = yield call(marketProductChainManagementAPI.products.getProductDetail, productId);

    if (response.success) {
      // Prepare combined data structure with both IDs and full objects
      const transformedData = {
        ...response.data,
        // Extract form values and keep full objects for dropdown options
        formData: {
          mainWarehouses: response.data.matchedCentralWarehouses?.map(item => item.value || item.id) || [],
          cities: response.data.matchedCities?.map(item => item.value || item.id) || [],
          warehouses: response.data.matchedDarkstores?.map(item => item.value || item.id) || [],
        },
        dropdownOptions: {
          mainWarehousesAndCities: response.data.matchedCentralWarehouses || [],
          cityOptions: response.data.matchedCities || [],
          darkstores: response.data.matchedDarkstores || [],
        },
      };

      yield put(Creators.getProductConfigurationSuccess(transformedData));
    }
    else {
      throw new Error('Failed to fetch product configuration');
    }
  }
  catch (error) {
    yield put(Creators.getProductConfigurationFailure(
      get(error, 'message', 'An error occurred while fetching product configuration'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch product configuration') }));
  }
}

function* updateProductConfigurationSaga({ productId, request }) {
  try {
    // Set updating state to prevent UI flashing
    yield put(Creators.setUpdating(true));
    const response = yield call(updateProductConfiguration, productId, request);

    if (response.success) {
      yield put(Creators.updateProductConfigurationSuccess(response.data));
      yield put(ToastCreators.success({ message: 'Product configuration updated successfully' }));
      yield put(Creators.setEditMode(false));

      // Fetch fresh product data sequentially to prevent UI flashing
      yield call(getProductConfigurationSaga, { productId });
    }
    else {
      throw new Error('Failed to update product configuration');
    }
  }
  catch (error) {
    yield put(Creators.updateProductConfigurationFailure(
      get(error, 'message', 'An error occurred while updating product configuration'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to update product configuration') }));
  }
  finally {
    // Reset updating state
    yield put(Creators.setUpdating(false));
  }
}

function* getCentralWarehouseListSaga() {
  try {
    const response = yield call(marketProductChainManagementAPI.centralWarehouse.getCentralWarehouseList);

    if (response.success) {
      const mappedData = response.data.map(mapMainWarehouseData);
      yield put(Creators.getCentralWarehouseListSuccess(mappedData));
    }
    else {
      throw new Error('Failed to fetch central warehouse list');
    }
  }
  catch (error) {
    yield put(Creators.getCentralWarehouseListFailure(
      get(error, 'message', 'An error occurred while fetching central warehouse list'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch central warehouse list') }));
  }
}

function* getCityLookupSaga({ search }) {
  try {
    const response = yield call(marketProductChainManagementAPI.location.getCityLookup, search);

    if (response.success) {
      const cities = response.data?.cities?.map(mapCityData) || [];
      yield put(Creators.getCityLookupSuccess(cities));
    }
    else {
      throw new Error('Failed to fetch city lookup');
    }
  }
  catch (error) {
    yield put(Creators.getCityLookupFailure(
      get(error, 'message', 'An error occurred while fetching city lookup'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch city lookup') }));
  }
}

function* getDarkstoresSaga({ request }) {
  try {
    const { formValues } = request;

    const filterFields = {
      warehouseType: 'warehouseTypes',
      domainType: 'domainTypes',
      demography: 'demographies',
      size: 'sizes',
      centralWarehouseVertexIds: 'mainWarehouses',
      cityVertexIds: 'cities',
    };

    const filters = Object.entries(filterFields).reduce((acc, [key, formField]) => {
      const values = formValues[formField];
      if (values?.length) {
        acc[key] = values;
      }
      return acc;
    }, {});

    if (!filters || Object.keys(filters).length === 0) {
      message.warning(t(`${TRANSLATION_NAMESPACE}:PLEASE_SELECT_AT_LEAST_ONE_FILTER`));
      return;
    }

    message.loading({
      content: t(`${TRANSLATION_NAMESPACE}:SEARCHING_DARKSTORES`),
      key: 'darkstoreOp',
      duration: 0,
    });

    const requestBody = {
      warehouseTypes: filters.warehouseType || [],
      domainTypes: filters.domainType || [],
      demographies: filters.demography || [],
      sizes: filters.size || [],
      centralWarehouseVertexIds: filters.centralWarehouseVertexIds || [],
      cityVertexIds: filters.cityVertexIds || [],
      search: filters.search || null,
    };

    const response = yield call(
      marketProductChainManagementAPI.darkstore.filterPlanogramDarkstores,
      requestBody,
    );

    message.destroy('darkstoreOp');

    if (response.success) {
      const mappedDarkstores = response.data?.darkstores?.map(mapDarkstoreData) || [];
      yield put(Creators.getDarkstoresSuccess(mappedDarkstores));

      const resultCount = mappedDarkstores.length;

      if (resultCount === 0) {
        message.warning({
          content: t(`${TRANSLATION_NAMESPACE}:NO_DARKSTORE_FOUND`),
          key: 'darkstoreOp',
          duration: 3,
        });
      }
      else {
        message.success({
          content: t(`${TRANSLATION_NAMESPACE}:DARKSTORE_FOUND_COUNT`, { count: resultCount }),
          key: 'darkstoreOp',
          duration: 3,
        });
      }
    }
    else {
      message.error({
        content: response.message || t(`${TRANSLATION_NAMESPACE}:FAILED_TO_FETCH_DARKSTORES`),
        key: 'darkstoreOp',
        duration: 5,
      });

      throw new Error(response.message || t(`${TRANSLATION_NAMESPACE}:FAILED_TO_FETCH_DARKSTORES`));
    }
  }
  catch (error) {
    message.destroy('darkstoreOp');

    message.error({
      content: get(error, 'message', t(`${TRANSLATION_NAMESPACE}:ERROR_DURING_DARKSTORE_SEARCH`)),
      key: 'darkstoreOp',
      duration: 5,
    });

    yield put(Creators.getDarkstoresFailure(
      get(error, 'message', t(`${TRANSLATION_NAMESPACE}:ERROR_DURING_DARKSTORE_SEARCH`)),
    ));
  }
}

function* watchGetProductConfiguration() {
  yield takeLatest(
    Types.GET_PRODUCT_CONFIGURATION_REQUEST,
    getProductConfigurationSaga,
  );
}

function* watchUpdateProductConfiguration() {
  yield takeLatest(
    Types.UPDATE_PRODUCT_CONFIGURATION_REQUEST,
    updateProductConfigurationSaga,
  );
}

function* watchGetCentralWarehouseList() {
  yield takeLatest(
    Types.GET_CENTRAL_WAREHOUSE_LIST_REQUEST,
    getCentralWarehouseListSaga,
  );
}

function* watchGetCityLookup() {
  yield takeLatest(
    Types.GET_CITY_LOOKUP_REQUEST,
    getCityLookupSaga,
  );
}

function* watchGetDarkstores() {
  yield takeLatest(
    Types.GET_DARKSTORES_REQUEST,
    getDarkstoresSaga,
  );
}

// Lookup saga functions
function* getDemographyLookupSaga({ search }) {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getDemographyLookup, search);

    if (response.success && response.data.demographies?.length > 0) {
      // Use dynamic data from service
      const mappedData = {
        demographies: response.data.demographies.map(mapDemographyLookupData),
        processedDemographyOptions: response.data.demographies.map(mapDemographyLookupData),
      };
      yield put(Creators.getDemographyLookupSuccess(mappedData));
    }
    else {
      // Fallback to hardcoded labels
      const fallbackOptions = createOptionsFromLabels(DEMOGRAPHY_LABELS);
      const mappedData = {
        demographies: [],
        processedDemographyOptions: fallbackOptions,
      };
      yield put(Creators.getDemographyLookupSuccess(mappedData));
    }
  }
  catch (error) {
    // On error, use hardcoded fallback
    const fallbackOptions = createOptionsFromLabels(DEMOGRAPHY_LABELS);
    const mappedData = {
      demographies: [],
      processedDemographyOptions: fallbackOptions,
    };
    yield put(Creators.getDemographyLookupSuccess(mappedData));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch demography lookup, using fallback') }));
  }
}

function* getSizeLookupSaga({ search }) {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getSizeLookup, search);

    if (response.success && response.data.sizes?.length > 0) {
      const mappedData = {
        sizes: response.data.sizes.map(mapSizeLookupData),
        processedSizeOptions: response.data.sizes.map(mapSizeLookupData),
      };
      yield put(Creators.getSizeLookupSuccess(mappedData));
    }
    else {
      const fallbackOptions = createOptionsFromLabels(SIZE_LABELS);
      const mappedData = {
        sizes: [],
        processedSizeOptions: fallbackOptions,
      };
      yield put(Creators.getSizeLookupSuccess(mappedData));
    }
  }
  catch (error) {
    const fallbackOptions = createOptionsFromLabels(SIZE_LABELS);
    const mappedData = {
      sizes: [],
      processedSizeOptions: fallbackOptions,
    };
    yield put(Creators.getSizeLookupSuccess(mappedData));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch size lookup, using fallback') }));
  }
}

function* getDomainTypeLookupSaga({ search }) {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup, search);

    if (response.success && response.data.domainTypes?.length > 0) {
      const mappedData = {
        domainTypes: response.data.domainTypes.map(mapDomainTypeLookupData),
        processedDomainTypeOptions: response.data.domainTypes.map(mapDomainTypeLookupData),
      };
      yield put(Creators.getDomainTypeLookupSuccess(mappedData));
    }
    else {
      // For domain types, we need to get current state
      const { configuration } = yield select();
      const fallbackOptions = createDomainTypeOptionsFromState(configuration.domainTypes);
      const mappedData = {
        domainTypes: [],
        processedDomainTypeOptions: fallbackOptions,
      };
      yield put(Creators.getDomainTypeLookupSuccess(mappedData));
    }
  }
  catch (error) {
    const { configuration } = yield select();
    const fallbackOptions = createDomainTypeOptionsFromState(configuration.domainTypes);
    const mappedData = {
      domainTypes: [],
      processedDomainTypeOptions: fallbackOptions,
    };
    yield put(Creators.getDomainTypeLookupSuccess(mappedData));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch domain type lookup, using fallback') }));
  }
}

function* getWarehouseTypeLookupSaga({ search }) {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getWarehouseTypeLookup, search);

    if (response.success && response.data.warehouseTypes?.length > 0) {
      const mappedData = {
        warehouseTypes: response.data.warehouseTypes.map(mapWarehouseTypeLookupData),
        processedWarehouseTypeOptions: response.data.warehouseTypes.map(mapWarehouseTypeLookupData),
      };
      yield put(Creators.getWarehouseTypeLookupSuccess(mappedData));
    }
    else {
      const fallbackOptions = createOptionsFromLabels(WAREHOUSE_TYPE_LABELS);
      const mappedData = {
        warehouseTypes: [],
        processedWarehouseTypeOptions: fallbackOptions,
      };
      yield put(Creators.getWarehouseTypeLookupSuccess(mappedData));
    }
  }
  catch (error) {
    const fallbackOptions = createOptionsFromLabels(WAREHOUSE_TYPE_LABELS);
    const mappedData = {
      warehouseTypes: [],
      processedWarehouseTypeOptions: fallbackOptions,
    };
    yield put(Creators.getWarehouseTypeLookupSuccess(mappedData));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch warehouse type lookup, using fallback') }));
  }
}

// Lookup saga watchers
function* watchGetDemographyLookup() {
  yield takeLatest(
    Types.GET_DEMOGRAPHY_LOOKUP_REQUEST,
    getDemographyLookupSaga,
  );
}

function* watchGetSizeLookup() {
  yield takeLatest(
    Types.GET_SIZE_LOOKUP_REQUEST,
    getSizeLookupSaga,
  );
}

function* watchGetDomainTypeLookup() {
  yield takeLatest(
    Types.GET_DOMAIN_TYPE_LOOKUP_REQUEST,
    getDomainTypeLookupSaga,
  );
}

function* watchGetWarehouseTypeLookup() {
  yield takeLatest(
    Types.GET_WAREHOUSE_TYPE_LOOKUP_REQUEST,
    getWarehouseTypeLookupSaga,
  );
}

export default function* configurationSagas() {
  yield all([
    watchGetProductConfiguration(),
    watchUpdateProductConfiguration(),
    watchGetCentralWarehouseList(),
    watchGetCityLookup(),
    watchGetDarkstores(),
    watchGetDemographyLookup(),
    watchGetSizeLookup(),
    watchGetDomainTypeLookup(),
    watchGetWarehouseTypeLookup(),
  ]);
}
