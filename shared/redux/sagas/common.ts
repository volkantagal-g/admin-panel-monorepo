import { take, call, put, fork, all, takeLatest, retry } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment-timezone';
import { eventChannel } from 'redux-saga';

import { Types, Creators } from '../actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCities, getCountries, getRegions, getDivision, getDivisions } from '@shared/api/countryInfo';
import {
  getMainStores,
  getWarehouses,
  getNonagreementWarehouses,
  getActiveWarehouses,
  getFilteredWarehouses,
  getFilteredWarehousesForDivision,
} from '@shared/api/warehouse';
import { getBrands } from '@shared/api/brand';
import { getSuppliers } from '@shared/api/supplier';
import { getMarketProductCategories } from '@shared/api/marketProductCategory';
import { getMarketProducts } from '@shared/api/marketProduct';
import { getMarketProductMasterCategories } from '@shared/api/marketProductMasterCategory';
import { getMarketFranchises } from '@shared/api/marketFranchise';
import { getTransferGroups } from '@shared/api/transferGroup';
import { getUserRoles } from '@shared/api/user';
import { getPages, getPagesRaw, getUserOwnedPages } from '@shared/api/page';
import {
  addFavorite,
  getByFilters as getPanelDocsByFilter,
  getMyFavoriteDocuments,
  removeFavorite,
} from '@shared/api/panelDoc';
import { getRolePermissions, getMyPermissions } from '@shared/api/permission';
import { getRoles, getRoleUsers, getUserOwnedRoles } from '@shared/api/role';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getCompanies } from '@shared/api/company';
import { getMarketConfig } from '@shared/api/marketConfig';
import highChartOptions from '../../utils/highChartOptions';
import { socketHandler } from '@shared/api/socket';
import { DEFAULT_RETRY_TIMES, DEFAULT_RETRY_MS, ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { indexedDbCache } from '@shared/utils/indexedDbCache';

export const setPermissionsToLocalStorage = permissions => {
  localStorage.setItem('permissions', JSON.stringify(permissions));
};

const setSelectedCitiesToLocalStorage = selectedCities => {
  localStorage.setItem('selectedCities', selectedCities);
};

const setSelectedDomainTypesToLocalStorage = selectedDomainTypes => {
  localStorage.setItem('selectedDomainTypes', selectedDomainTypes);
};

const setSelectedDomainTypeToLocalStorage = selectedDomainType => {
  localStorage.setItem('selectedDomainType', selectedDomainType);
};

// Generic type which includes "type" field + any other fields
// take, takeLatest etc assumes that the action has "type" field
// which fixes the error of "Argument of type 'string' is not assignable to parameter of type 'TakeableChannel<unknown>'."
type ActionWithTypeType<T> = {
  type: string;
} & T;

function* getCountriesRequest() {
  try {
    const data = yield retry(DEFAULT_RETRY_TIMES, DEFAULT_RETRY_MS, getCountries, { includeNonOperationals: true });
    yield put(Creators.getCountriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCountriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOperationalCountriesRequest() {
  try {
    const data = yield retry(DEFAULT_RETRY_TIMES, DEFAULT_RETRY_MS, getCountries, { includeNonOperationals: false });
    yield put(Creators.getOperationalCountriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOperationalCountriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCountriesRequest() {
  yield takeLatest(Types.GET_COUNTRIES_REQUEST, getCountriesRequest);
}

function* watchGetOperationalCountriesRequest() {
  yield takeLatest(Types.GET_OPERATIONAL_COUNTRIES_REQUEST, getOperationalCountriesRequest);
}

// Global Dashboards will use this
function* watchGetCountryGroupsRequest() {
  while (true) {
    try {
      yield take(Types.GET_COUNTRY_GROUPS_REQUEST);
      const { value } = yield call(getMarketConfig, { key: 'co:panel:DASHBOARD_COUNTRY_GROUPS', type: 'Array' });
      yield put(Creators.getCountryGroupsSuccess({ data: value }));
    }
    catch (error) {
      yield put(Creators.getCountryGroupsFailure({ error }));
    }
  }
}

function* watchGetRegionsRequest() {
  while (true) {
    try {
      const { cityId } = yield take(Types.GET_REGIONS_REQUEST);
      const data = yield call(getRegions, { cityId });
      yield put(Creators.getRegionsSuccess({ data }));
    }
    catch (error) {
      yield put(Creators.getRegionsFailure({ error }));
    }
  }
}

function* watchGetMainStoresRequest() {
  while (true) {
    try {
      yield take(Types.GET_MAIN_STORES_REQUEST);
      const data = yield call(getMainStores);
      const warehouses = _.get(data, 'warehouses', []);
      yield put(Creators.getMainStoresSuccess({ data: warehouses }));
    }
    catch (error) {
      yield put(Creators.getMainStoresFailure({ error }));
    }
  }
}

function* watchGetNonagreementWarehousesRequest() {
  while (true) {
    try {
      yield take(Types.GET_NONAGREEMENT_WAREHOUSES_REQUEST);
      const data = yield call(getNonagreementWarehouses);
      const warehouses = _.get(data, 'warehouses', []);
      yield put(Creators.getNonagreementWarehousesSuccess({ data: warehouses }));
    }
    catch (error) {
      yield put(Creators.getNonagreementWarehousesFailure({ error }));
    }
  }
}

export function* getCitiesRequest({ countryId }) {
  try {
    const data = yield call(getCities, { countryId });
    yield put(Creators.getCitiesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCitiesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getWarehousesRequest({ countryId, cityId, domainTypes }) {
  try {
    const { warehouses: data } = yield call(getWarehouses, { country: countryId, city: cityId, domainTypes });
    yield put(Creators.getWarehousesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehousesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getActiveWarehousesRequest({ countryId, cityId, domainTypes }) {
  try {
    const { warehouses: data } = yield call(getActiveWarehouses, { country: countryId, city: cityId, domainTypes });
    yield put(Creators.getActiveWarehousesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActiveWarehousesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getFilteredWarehousesRequest({
  domainTypes,
  cities,
  states,
  statuses,
  warehouseTypes,
  name,
  limit,
  offset,
  fields,
  populate,
}) {
  try {
    const { warehouses, totalCount } = yield call(getFilteredWarehouses, {
      domainTypes,
      cities,
      states,
      statuses,
      warehouseTypes,
      name,
      fields,
      limit,
      offset,
      populate,
    });

    yield put(Creators.getFilteredWarehousesSuccess({ data: { warehouses, totalCount } }));
  }
  catch (error) {
    yield put(Creators.getFilteredWarehousesFailure({ error }));
  }
}
function* getFilteredWarehousesForDivisionRequest({ cities, domainTypes, fields }) {
  try {
    const { warehouses, totalCount } = yield call(getFilteredWarehousesForDivision, { cities, domainTypes, fields });

    yield put(Creators.getFilteredWarehousesForDivisionSuccess({ data: { warehouses, totalCount } }));
  }
  catch (error) {
    yield put(Creators.getFilteredWarehousesForDivisionFailure({ error }));
  }
}

function* getBrandsRequest({ limit, offset }) {
  try {
    const data = yield call(getBrands, { limit, offset });
    yield put(Creators.getBrandsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSuppliersRequest({ limit, offset, fields }) {
  try {
    const { suppliers: data } = yield call(getSuppliers, { limit, offset, fields });
    yield put(Creators.getSuppliersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSuppliersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductCategoriesRequest({ isSubCategory, limit, offset, status, fields }) {
  try {
    const data = yield call(getMarketProductCategories, { isSubCategory, limit, offset, status, fields });
    yield put(Creators.getMarketProductCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductSubCategoriesRequest({ parent, parents, limit, offset, status, fields }) {
  try {
    const data = yield call(getMarketProductCategories, {
      parent,
      parents,
      limit,
      offset,
      isSubCategory: true,
      status,
      fields,
    });
    yield put(Creators.getMarketProductSubCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductSubCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* clearMarketProductSubCategories() {
  yield put(Creators.clearMarketProductSubCategories());
}

function* getMarketProductsRequest({
  isActive,
  statusList,
  limit,
  offset,
  queryText,
  filterOptions,
  fields = [],
  ids = [],
  populate,
  useAPIGatewayCache,
  supplyFieldsPopulateOptions,
  shouldGetSuppliersAndManufacturerFromNewPricingService,
}) {
  try {
    const params = {
      isActive,
      statusList,
      limit,
      offset,
      queryText,
      filterOptions,
      fields,
      ids,
      populate,
      useAPIGatewayCache,
      supplyFieldsPopulateOptions,
      shouldGetSuppliersAndManufacturerFromNewPricingService,
    };

    const data = yield call(getMarketProducts, params);
    yield put(Creators.getMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* clearMarketProducts() {
  yield put(Creators.clearMarketProducts());
}

function* getMarketProductMasterCategoriesRequest({ queryText, level, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, { queryText, level, limit, offset });
    yield put(Creators.getMarketProductMasterCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductMasterCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* marketFranchisesRequest() {
  try {
    const { franchises } = yield call(getMarketFranchises, {});
    yield put(Creators.getMarketFranchisesSuccess({ data: franchises }));
  }
  catch (error) {
    yield put(Creators.getMarketFranchisesFailure({ error }));
  }
}

function* getTransferGroupsRequest({ limit, offset }) {
  try {
    const { transferGroups: data, total } = yield call(getTransferGroups, { limit, offset });
    yield put(Creators.getTransferGroupsSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getTransferGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUserOwnedPagesRequest({ userId }) {
  try {
    const data = yield call(getUserOwnedPages, { userId });
    yield put(Creators.getUserOwnedPagesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserOwnedPagesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUserOwnedPagesRequest() {
  yield takeLatest(Types.GET_USER_OWNED_PAGES_REQUEST, getUserOwnedPagesRequest);
}

function* getAllPagesRequest() {
  try {
    yield indexedDbCache(cachedAt => getPagesRaw({ cachedAt, populatePageOwners: true }), 'pages');
    yield put(Creators.getAllPagesSuccess());
  }
  catch (error) {
    yield put(Creators.getAllPagesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

type GetCurrentPageRequestPropsType = ActionWithTypeType<{ permKey: string, showError: boolean }>;
function* getCurrentPageRequest({ permKey, showError }: GetCurrentPageRequestPropsType) {
  try {
    const data = yield call(getPages, { permKeys: [permKey] });
    yield put(Creators.getCurrentPageSuccess({ data: data[0], permKey }));
  }
  catch (error) {
    yield put(Creators.getCurrentPageFailure({ error, permKey }));
    if (showError) {
      yield put(ToastCreators.error({ error }));
    }
  }
}

function* getCurrentPageDocsRequest({ pageId, isActive, permKey, showError }) {
  try {
    const data = yield call(getPanelDocsByFilter, { pageId, isActive });
    yield put(Creators.getCurrentPageDocsSuccess({ data, permKey }));
  }
  catch (error) {
    yield put(Creators.getCurrentPageDocsFailure({ error, permKey }));
    if (showError) {
      yield put(ToastCreators.error({ error }));
    }
  }
}

function* getMyPermissionsRequest() {
  try {
    const permissions = yield retry(DEFAULT_RETRY_TIMES, DEFAULT_RETRY_MS, getMyPermissions);
    yield setPermissionsToLocalStorage(permissions);
    yield put(Creators.getMyPermissionsSuccess({ data: permissions }));
  }
  catch (error) {
    yield put(Creators.getMyPermissionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFavoriteDocumentsRequest() {
  try {
    const data = yield call(getMyFavoriteDocuments, {});
    yield put(Creators.getFavoriteDocumentsSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getFavoriteDocumentsFailure({ error }));
    yield put(ToastCreators.error({ error, message }));
  }
}

function* watchGetFavoriteDocumentsRequest() {
  yield takeLatest(Types.GET_FAVORITE_DOCUMENTS_REQUEST, getFavoriteDocumentsRequest);
}

function* addFavoriteDocumentRequest({ _id }) {
  try {
    const data = yield call(addFavorite, { _id });
    yield put(Creators.getFavoriteDocumentsRequest());
    yield put(Creators.addFavoriteDocumentSuccess({ data, _id }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.addFavoriteDocumentFailure({ error, _id }));
    yield put(ToastCreators.error({ error, message }));
  }
}

function* watchAddFavoriteDocumentRequest() {
  yield takeLatest(Types.ADD_FAVORITE_DOCUMENT_REQUEST, addFavoriteDocumentRequest);
}

function* removeFavoriteDocumentRequest({ _id }) {
  try {
    const data = yield call(removeFavorite, { _id });
    yield put(Creators.getFavoriteDocumentsRequest());
    yield put(Creators.removeFavoriteDocumentSuccess({ data, _id }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.removeFavoriteDocumentFailure({ error, _id }));
    yield put(ToastCreators.error({ error, message }));
  }
}

function* watchRemoveFavoriteDocumentRequest() {
  yield takeLatest(Types.REMOVE_FAVORITE_DOCUMENT_REQUEST, removeFavoriteDocumentRequest);
}

function* getRolePermissionsRequest({ roleId }) {
  try {
    const data = yield call(getRolePermissions, { roleId });
    yield put(Creators.getRolePermissionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRolePermissionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRolesRequest({ limit, offset, queryText, isActive, roleIds, sortOptions }) {
  try {
    const data = yield call(getRoles, { limit, offset, queryText, isActive, roleIds, sortOptions });
    yield put(Creators.getRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRoleUsersRequest({ roleId, isActive, populateEmployeeInfo }) {
  try {
    const data = yield call(getRoleUsers, { roleId, isActive, populateEmployeeInfo });
    yield put(Creators.getRoleUsersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRoleUsersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUserOwnedRolesRequest({ userId }) {
  try {
    const data = yield call(getUserOwnedRoles, { userId });
    yield put(Creators.getUserOwnedRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserOwnedRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUserRolesRequest({ userId }) {
  try {
    const data = yield call(getUserRoles, { userId });
    yield put(Creators.getUserRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCompaniesRequest() {
  try {
    const data = yield call(getCompanies);
    yield put(Creators.getCompaniesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCompaniesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setSelectedCities() {
  while (true) {
    const { data } = yield take(Types.SET_SELECTED_CITIES);
    setSelectedCitiesToLocalStorage(JSON.stringify(data));
    yield put({ type: Types.SET_SELECTED_CITIES, data });
  }
}

export function* setSelectedDomainTypes() {
  while (true) {
    const { data } = yield take(Types.SET_SELECTED_DOMAIN_TYPES);
    setSelectedDomainTypesToLocalStorage(JSON.stringify(data));
    yield put({ type: Types.SET_SELECTED_DOMAIN_TYPES, data });
  }
}

export function* createSocketEventChannel(eventName, extraArgs) {
  yield call(socketHandler.connect.bind(socketHandler));

  return eventChannel(emitter => {
    const handler = data => {
      return emitter(data);
    };

    // socket.on(SOCKET_EVENTS.ARTISAN_ORDER_CHECKOUT_FAILED_EVENT, newMarketCheckoutHandler);

    socketHandler.subscribe({ eventName, cb: handler, extraArgs });

    return () => {
      socketHandler.unsubscribe({ eventName, cb: handler, extraArgs });
    };
  });
}

function* getDivisionCitiesWithCountryInfo({ countryId }) {
  const data = yield call(getCities, { countryId });
  return data.map(x => ({ ...x, countryId }));
}

function* getDivisionsCities({ division }) {
  try {
    const countryIds = division.countries;
    const allForks = yield all(
      countryIds.map(country => {
        return call(getDivisionCitiesWithCountryInfo, { countryId: country.id });
      }),
    );
    const divisionsCities = _.uniq(
      allForks.reduce((sum, resp) => {
        return [...sum, ...resp];
      }, []),
    );
    yield put(Creators.getDivisionsCitiesSuccess({ data: divisionsCities }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getDivisionsCitiesFailure({ error }));
  }
}

function* watchGetDivisionsCitiesRequest() {
  yield takeLatest(Types.GET_DIVISIONS_CITIES_REQUEST, getDivisionsCities);
}

function* getDivisionCountries({ division }) {
  try {
    const countryIds = division.countries;
    const countries = yield call(getCountries);

    const divisionsCountries = countries.filter(c => {
      return countryIds.find(country => country.id === c._id);
    });

    yield put(Creators.getDivisionsCountriesSuccess({ data: divisionsCountries }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getDivisionsCountriesFailure({ error }));
  }
}

function* watchGetDivisionsCountriesRequest() {
  yield takeLatest(Types.GET_DIVISIONS_COUNTRIES_REQUEST, getDivisionCountries);
}

function* getDivisionRequest({ countryIds, divisionId }) {
  try {
    const data = yield call(getDivision, { countryIds, divisionId });
    yield put(Creators.getDivisionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDivisionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDivisionRequest() {
  yield takeLatest(Types.GET_DIVISION_REQUEST, getDivisionRequest);
}

function* getDivisionsRequest({ countryIds, divisionIds }) {
  try {
    const data = yield call(getDivisions, { countryIds, divisionIds });
    yield put(Creators.getDivisionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDivisionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDivisionsRequest() {
  yield takeLatest(Types.GET_DIVISIONS_REQUEST, getDivisionsRequest);
}

function* getAllDivisionsRequest() {
  try {
    const data = yield retry(DEFAULT_RETRY_TIMES, DEFAULT_RETRY_MS, getDivisions, {});
    yield put(Creators.getAllDivisionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAllDivisionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigWithKeyRequest({ body }) {
  const { key, type } = body;
  try {
    const data = yield call(getMarketConfig, { key, type });
    yield put(Creators.getConfigWithKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigWithKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAvailableDomainTypesForCountrySelectorRequest() {
  const requestBody = {
    key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
    type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
  };
  try {
    const data = yield call(getMarketConfig, requestBody);
    yield put(Creators.getAvailableDomainTypesForCountrySelectorSuccess({ data }));
  }
  catch (error) {
    // Note: Some pages depend on the error passed
    yield put(Creators.getAvailableDomainTypesForCountrySelectorFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAvailableIntegrationTypesForCountryRequest() {
  const requestBody = {
    key: ADMIN_PANEL_CONFIGS.ACTIVE_INTEGRATION_TYPES,
    type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
  };
  try {
    const data = yield call(getMarketConfig, requestBody);
    yield put(Creators.getAvailableIntegrationTypesForCountrySuccess({ data }));
  }
  catch (error) {
    // Note: Some pages depend on the error passed
    yield put(Creators.getAvailableIntegrationTypesForCountryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSlottedOrderActiveDomainTypesRequest() {
  const requestBody = {
    key: ADMIN_PANEL_CONFIGS.SLOTTED_ORDER_ACTIVE_DOMAIN_TYPES,
    type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
  };
  try {
    const data = yield call(getMarketConfig, requestBody);
    yield put(Creators.getSlottedOrderActiveDomainTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSlottedOrderActiveDomainTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAllDivisionsRequest() {
  yield takeLatest(Types.GET_ALL_DIVISIONS_REQUEST, getAllDivisionsRequest);
}

export function* watchSetSelectedDomainType() {
  while (true) {
    const { data } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    setSelectedDomainTypeToLocalStorage(JSON.stringify(data));
  }
}

export function* setInit() {
  const { timezone } = getSelectedCountry().timezones[0];
  yield moment.tz.setDefault(timezone);
  moment.locale(getLangKey());
  highChartOptions();
}

function* watchGetCitiesRequest() {
  yield takeLatest(Types.GET_CITIES_REQUEST, getCitiesRequest);
}

function* watchGetWarehousesRequest() {
  yield takeLatest(Types.GET_WAREHOUSES_REQUEST, getWarehousesRequest);
}

function* watchGetActiveWarehousesRequest() {
  yield takeLatest(Types.GET_ACTIVE_WAREHOUSES_REQUEST, getActiveWarehousesRequest);
}

function* watchGetFilteredWarehousesRequest() {
  yield takeLatest(Types.GET_FILTERED_WAREHOUSES_REQUEST, getFilteredWarehousesRequest);
}
function* watchGetFilteredWarehousesForDivisionRequest() {
  yield takeLatest(Types.GET_FILTERED_WAREHOUSES_FOR_DIVISION_REQUEST, getFilteredWarehousesForDivisionRequest);
}

function* watchGetBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchGetSuppliersRequest() {
  yield takeLatest(Types.GET_SUPPLIERS_REQUEST, getSuppliersRequest);
}

function* watchGetMarketProductCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest);
}

function* watchGetMarketProductSubCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST, getMarketProductSubCategoriesRequest);
}

function* watchClearMarketProductSubCategories() {
  yield take(Types.CLEAR_MARKET_PRODUCT_SUB_CATEGORIES);
  clearMarketProductSubCategories();
}

function* watchGetMarketProductsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest);
}

function* watchClearMarketProducts() {
  yield take(Types.CLEAR_MARKET_PRODUCTS);
  clearMarketProducts();
}

function* watchGetMarketProductMasterCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST, getMarketProductMasterCategoriesRequest);
}

function* watchGetMarketFranchisesRequest() {
  yield takeLatest(Types.GET_MARKET_FRANCHISES_REQUEST, marketFranchisesRequest);
}

function* watchTransferGroupsRequest() {
  yield takeLatest(Types.GET_TRANSFER_GROUPS_REQUEST, getTransferGroupsRequest);
}

function* watchGetAllPagesRequest() {
  yield takeLatest(Types.GET_ALL_PAGES_REQUEST, getAllPagesRequest);
}

function* watchGetCurrentPageRequest() {
  yield takeLatest(Types.GET_CURRENT_PAGE_REQUEST, getCurrentPageRequest);
}

function* watchGetCurrentPageDocsRequest() {
  yield takeLatest(Types.GET_CURRENT_PAGE_DOCS_REQUEST, getCurrentPageDocsRequest);
}

function* watchGetMyPermissionsRequest() {
  yield takeLatest(Types.GET_MY_PERMISSIONS_REQUEST, getMyPermissionsRequest);
}

function* watchGetRolePermissionsRequest() {
  yield takeLatest(Types.GET_ROLE_PERMISSIONS_REQUEST, getRolePermissionsRequest);
}

function* watchGetRolesRequest() {
  yield takeLatest(Types.GET_ROLES_REQUEST, getRolesRequest);
}

function* watchGetRoleUsersRequest() {
  yield takeLatest(Types.GET_ROLE_USERS_REQUEST, getRoleUsersRequest);
}

function* watchGetUserOwnedRolesRequest() {
  yield takeLatest(Types.GET_USER_OWNED_ROLES_REQUEST, getUserOwnedRolesRequest);
}

function* watchGetUserRolesRequest() {
  yield takeLatest(Types.GET_USER_ROLES_REQUEST, getUserRolesRequest);
}

function* watchGetCompaniesRequest() {
  yield takeLatest(Types.GET_COMPANIES_REQUEST, getCompaniesRequest);
}

function* watchGetConfigWithKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_WITH_KEY_REQUEST, getConfigWithKeyRequest);
}

function* watchAvailableDomainTypesForCountrySelectorRequest() {
  yield takeLatest(Types.GET_AVAILABLE_DOMAIN_TYPES_FOR_COUNTRY_SELECTOR_REQUEST, getAvailableDomainTypesForCountrySelectorRequest);
}

function* watchAvailableIntegrationTypesForCountryRequest() {
  yield takeLatest(Types.GET_AVAILABLE_INTEGRATION_TYPES_FOR_COUNTRY_REQUEST, getAvailableIntegrationTypesForCountryRequest);
}

function* watchGetSlottedOrderActiveDomainTypesRequest() {
  yield takeLatest(Types.GET_SLOTTED_ORDER_ACTIVE_DOMAIN_TYPES_REQUEST, getSlottedOrderActiveDomainTypesRequest);
}

function* watchInit() {
  yield takeLatest(Types.INIT, setInit);
}

export default function* commonRoot() {
  yield all([
    fork(watchInit),
    fork(watchGetCitiesRequest),
    fork(watchGetCountriesRequest),
    fork(watchGetOperationalCountriesRequest),
    fork(watchGetCountryGroupsRequest),
    fork(watchGetRegionsRequest),
    fork(watchGetMainStoresRequest),
    fork(watchGetNonagreementWarehousesRequest),
    fork(watchGetWarehousesRequest),
    fork(watchGetActiveWarehousesRequest),
    fork(watchGetFilteredWarehousesRequest),
    fork(watchGetFilteredWarehousesForDivisionRequest),
    fork(watchGetBrandsRequest),
    fork(watchGetSuppliersRequest),
    fork(watchGetMarketProductCategoriesRequest),
    fork(watchGetMarketProductSubCategoriesRequest),
    fork(watchClearMarketProductSubCategories),
    fork(watchGetMarketProductsRequest),
    fork(watchClearMarketProducts),
    fork(watchGetMarketProductMasterCategoriesRequest),
    fork(watchGetMarketFranchisesRequest),
    fork(watchTransferGroupsRequest),
    fork(watchGetUserOwnedPagesRequest),
    fork(watchGetAllPagesRequest),
    fork(watchGetCurrentPageRequest),
    fork(watchGetCurrentPageDocsRequest),
    fork(watchGetMyPermissionsRequest),
    fork(watchGetFavoriteDocumentsRequest),
    fork(watchAddFavoriteDocumentRequest),
    fork(watchRemoveFavoriteDocumentRequest),
    fork(watchGetRolePermissionsRequest),
    fork(watchGetRolesRequest),
    fork(watchGetRoleUsersRequest),
    fork(watchGetUserOwnedRolesRequest),
    fork(watchGetUserRolesRequest),
    fork(watchGetCompaniesRequest),
    fork(setSelectedCities),
    fork(setSelectedDomainTypes),
    fork(watchSetSelectedDomainType),
    fork(watchGetDivisionRequest),
    fork(watchGetDivisionsRequest),
    fork(watchGetAllDivisionsRequest),
    fork(watchGetDivisionsCountriesRequest),
    fork(watchGetDivisionsCitiesRequest),
    fork(watchGetConfigWithKeyRequest),
    fork(watchAvailableDomainTypesForCountrySelectorRequest),
    fork(watchAvailableIntegrationTypesForCountryRequest),
    fork(watchGetSlottedOrderActiveDomainTypesRequest),
  ]);
}
