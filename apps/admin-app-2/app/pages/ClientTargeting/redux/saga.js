import { take, call, put, fork, all, takeLatest, cancel } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getCuisines,
  getRestaurantsByName,
  searchChainRestaurants,
  getChainRestaurantBranches,
  getRestaurantProducts,
  getChainRestaurantProducts,
  createClientListTemplate,
  createClientList,
  getPersonaClientFlags,
  getRFMSegments,
  getFoodPromosBySearchCode,
  getDataScienceModels,
  getPersonaDomainTypes,
  getGetirDriveVouchers,
} from '@shared/api/clientTargeting';
import { getTestList } from '@shared/api/abTesting';
import { getAllTestCodes } from '@shared/api/abTestingV2';
import { getLocalPromosBySearchCode } from '@shared/api/marketing';
import { getFilteredPromos } from '@shared/api/promo';
import { getBrands, getVendors } from '@shared/api/water';
import { getBrands as getProductBrands } from '@shared/api/brand';
import { searchArtisanShops, getArtisanChainShops } from '@shared/api/artisanShop';
import { getArtisanTypes } from '@shared/api/artisan';
import { getOrderCancelReasons, getPartialRefundReasons } from '@shared/api/marketOrder';
import { getJobTitlesByFilter, getPostTypes, getJobCategories, getDrivingLicenses } from '@shared/api/getirJobs/core';

import { prepareParams } from './prepareParams';
import { Types, Creators } from './actions';
import { isValidDataScienceInput } from '../utils';
import { getLangKey } from '@shared/i18n';

function* getFoodPromosBySearchCodeRequest({ params }) {
  try {
    const data = yield call(getFoodPromosBySearchCode, { params });
    yield put(Creators.getFoodPromosBySearchCodeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFoodPromosBySearchCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocalsPromosBySearchCodeRequest({ params }) {
  try {
    const { data } = yield call(getLocalPromosBySearchCode, { params });
    yield put(Creators.getLocalsPromosBySearchCodeSuccess({ data: data.content }));
  }
  catch (error) {
    yield put(Creators.getLocalsPromosBySearchCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketPromosBySearchCodeRequest({ params }) {
  try {
    const { promos } = yield call(getFilteredPromos, { ...params });
    yield put(Creators.getMarketPromosBySearchCodeSuccess({ data: promos }));
  }
  catch (error) {
    yield put(Creators.getMarketPromosBySearchCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFilteredGetirDriveVouchersRequest({ params }) {
  try {
    const { data } = yield call(getGetirDriveVouchers, params);
    yield put(Creators.getFilteredGetirDriveVouchersSuccess({ data: data?.vouchers }));
  }
  catch (error) {
    yield put(Creators.getFilteredGetirDriveVouchersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFilteredBrandsRequest({ params }) {
  try {
    const data = yield call(getProductBrands, params);
    yield put(Creators.getFilteredBrandsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFilteredBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCuisinesRequest() {
  try {
    const data = yield call(getCuisines);
    yield put(Creators.getCuisinesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCuisinesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGwmpBrandsRequest() {
  try {
    const data = yield call(getBrands);
    yield put(Creators.getAllGwmpBrandsSuccess({ data: data?.payload }));
  }
  catch (error) {
    yield put(Creators.getAllGwmpBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGwmpVendorsRequest() {
  try {
    const data = yield call(getVendors);
    yield put(Creators.getAllGwmpVendorsSuccess({ data: data?.payload }));
  }
  catch (error) {
    yield put(Creators.getAllGwmpVendorsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRestaurantsByNameRequest({ searchString, activeKey }) {
  try {
    const data = yield call(getRestaurantsByName, { searchString });
    yield put(Creators.getRestaurantsByNameSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsByNameFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* searchChainRestaurantsRequest({ searchString, activeKey }) {
  try {
    const data = yield call(searchChainRestaurants, searchString);
    yield put(Creators.searchChainRestaurantsSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.searchChainRestaurantsFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* searchABTestCodeRequest({ testCode, activeKey }) {
  try {
    const data = yield call(getTestList, { testCode });
    yield put(Creators.searchABTestCodeSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.searchABTestCodeFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getABTestCodesFromDataRequest({ activeKey }) {
  try {
    const data = yield call(getAllTestCodes);
    yield put(Creators.getABTestCodesFromDataSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.getABTestCodesFromDataFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChainRestaurantBranchesRequest({ chainRestaurantId, activeKey }) {
  try {
    const data = yield call(getChainRestaurantBranches, chainRestaurantId);
    yield put(Creators.getChainRestaurantBranchesSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.getChainRestaurantBranchesFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChainRestaurantProductsRequest({ chainRestaurantId, activeKey }) {
  try {
    const data = yield call(getChainRestaurantProducts, chainRestaurantId);
    yield put(Creators.getChainRestaurantProductsSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.getChainRestaurantProductsFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRestaurantProductsRequest({ restaurantId, activeKey }) {
  try {
    const data = yield call(getRestaurantProducts, restaurantId);
    yield put(Creators.getRestaurantProductsSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.getRestaurantProductsFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createClientListTemplateRequest({ data }) {
  try {
    const preparedData = prepareParams(data);
    yield call(createClientListTemplate, preparedData);
    yield put(ToastCreators.success({}));
  }
  catch ({ message }) {
    yield put(ToastCreators.error({ message, toastOptions: { autoClose: 5000 } }));
  }
}

function* createClientListRequest({ data }) {
  let isValid = false;
  let preparedData = null;
  // this part is the validation, separated so that timeout errors don't happen in the same region as validation error
  try {
    preparedData = prepareParams(data);
    isValid = true;
  }
  catch ({ message }) {
    yield put(ToastCreators.error({ message, toastOptions: { autoClose: 5000 } }));
  }

  // only if the params valid, try to send the request
  try {
    if (isValid) {
      yield call(createClientList, preparedData);
      yield put(ToastCreators.success({}));
    }
  }
  catch ({ createClientListMessage }) {
    // TODO: fix this when requests actually return errors, not timeouts
    yield put(ToastCreators.success({}));
  }
  // always reset the isPending after anything done
  yield put(Creators.createClientListSuccess());
}

function* searchArtisanShopsRequest({ name, artisanType, chainId, activeKey }) {
  try {
    const data = yield call(searchArtisanShops, { name, artisanType, chainId });
    yield put(Creators.searchArtisanShopsSuccess({ data, activeKey }));
  }
  catch (error) {
    yield put(Creators.searchArtisanShopsFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPersonaClientFlagsRequest() {
  try {
    // eslint-disable-next-line camelcase
    const { persona_flags: personaFlags } = yield call(getPersonaClientFlags);
    // this part of code can be use for multiple countries in the future
    const data = personaFlags ? Object.values(personaFlags)[0] : null;
    yield put(Creators.getPersonaClientFlagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonaClientFlagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getArtisanTypesRequest() {
  try {
    const data = yield call(getArtisanTypes);
    yield put(Creators.getArtisanTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getArtisanChainShopsRequest() {
  try {
    const data = yield call(getArtisanChainShops);
    yield put(Creators.getArtisanChainShopsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanChainShopsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirJobsJobTitlesByFiltersRequest({ searchString, activeKey }) {
  try {
    const langKey = getLangKey();
    const { data } = yield call(getJobTitlesByFilter, { langKey, searchString, limit: 50, page: 1 });
    yield put(Creators.getGetirJobsJobTitlesByFiltersSuccess({ data: data.titles || [], activeKey }));
  }
  catch (error) {
    yield put(Creators.getGetirJobsJobTitlesByFiltersFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirJobsPostTypesRequest() {
  try {
    const langKey = getLangKey();
    const { data } = yield call(getPostTypes, { langKey });
    const formattedData = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    yield put(Creators.getGetirJobsPostTypesSuccess({ data: formattedData }));
  }
  catch (error) {
    yield put(Creators.getGetirJobsPostTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirJobsDrivingLicensesRequest() {
  try {
    const langKey = getLangKey();
    const { data } = yield call(getDrivingLicenses, { langKey });
    const formattedData = Object.values(data.constants.drivingLicenses).map(value => ({
      value: value.constantId,
      label: value.name[langKey],
    }));
    yield put(Creators.getGetirJobsDrivingLicensesSuccess({ data: formattedData }));
  }
  catch (error) {
    yield put(Creators.getGetirJobsDrivingLicensesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirMarketOrderCancelReasonsRequest({ domainType }) {
  try {
    const { cancelReasons } = yield call(getOrderCancelReasons, { domainType });
    yield put(Creators.getGetirMarketOrderCancelReasonsSuccess({ data: cancelReasons }));
  }
  catch (error) {
    yield put(Creators.getGetirMarketOrderCancelReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGetirJobsCategoryRequest() {
  try {
    const langKey = getLangKey();
    const { data } = yield call(getJobCategories, { langKey });
    const formattedData = Object.values(data.constants.categories).map(value => ({
      value: value.name.tr,
      label: value.name[langKey],
    }));
    yield put(Creators.getGetirJobsCategorySuccess({ data: formattedData }));
  }
  catch (error) {
    yield put(Creators.getGetirJobsCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRFMSegmentsRequest({ activeKey }) {
  try {
    const data = yield call(getRFMSegments, {});
    const segments = get(data, ['response', 'segments'], []);
    yield put(Creators.getRFMSegmentsSuccess({ data: segments, activeKey }));
  }
  catch (error) {
    yield put(Creators.getRFMSegmentsFailure({ error, activeKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDataScienceModelsRequest({ activeKey, section, domainType }) {
  try {
    const data = yield call(getDataScienceModels, { clientTargetingSection: domainType });

    const uniqueDataScienceModes = new Map();

    if (Array.isArray(data?.modelList) && data?.modelList.length) {
      data?.modelList.forEach(model => {
        const { _id: id } = model;

        // Model validations
        if (!uniqueDataScienceModes.has(id)) {
          if (isEmpty(model.inputList)) return false;
          if (!model.inputList.every(input => isValidDataScienceInput(input))) return false;

          uniqueDataScienceModes.set(id, model);
        }

        return true;
      });
    }

    const dataScienceModels = Array.from(uniqueDataScienceModes.values());

    yield put(Creators.getDataScienceModelsSuccess({ data: dataScienceModels, activeKey, section }));
  }
  catch (error) {
    yield put(Creators.getDataScienceModelsFailure({ error, activeKey, section }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPersonaDomainTypesRequest({ activeKey, section }) {
  try {
    const data = yield call(getPersonaDomainTypes);
    yield put(Creators.getPersonaDomainTypesSuccess({ data: data?.options, activeKey, section }));
  }
  catch (error) {
    yield put(Creators.getPersonaDomainTypesFailure({ error, activeKey, section }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getOrderFeedbackReasonsRequest({ domainType }) {
  try {
    const data = yield call(getPartialRefundReasons, { domainType });
    yield put(
      Creators.getOrderFeedbackReasonsSuccess({ data }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderFeedbackReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchArtisanShopsRequest() {
  yield takeLatest(Types.SEARCH_ARTISAN_SHOPS_REQUEST, searchArtisanShopsRequest);
}

function* watchCreateClientListRequest() {
  yield takeLatest(Types.CREATE_CLIENT_LIST_REQUEST, createClientListRequest);
}

function* watchCreateClientListTemplateRequest() {
  yield takeLatest(Types.CREATE_CLIENT_LIST_TEMPLATE_REQUEST, createClientListTemplateRequest);
}

function* watchGetRestaurantProductsRequest() {
  yield takeLatest(Types.GET_RESTAURANT_PRODUCTS_REQUEST, getRestaurantProductsRequest);
}

function* watchGetChainRestaurantProductsRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANT_PRODUCTS_REQUEST, getChainRestaurantProductsRequest);
}

function* watchGetChainRestaurantBranchesRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANT_BRANCHES_REQUEST, getChainRestaurantBranchesRequest);
}

function* watchSearchChainRestaurantsRequest() {
  yield takeLatest(Types.SEARCH_CHAIN_RESTAURANTS_REQUEST, searchChainRestaurantsRequest);
}

function* watchSearchABTestCodeRequest() {
  yield takeLatest(Types.SEARCH_AB_TEST_CODE_REQUEST, searchABTestCodeRequest);
}

function* watchGetABTestCodesFromDataRequest() {
  yield takeLatest(Types.GET_AB_TEST_CODES_FROM_DATA_REQUEST, getABTestCodesFromDataRequest);
}

function* watchGetRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_BY_NAME_REQUEST, getRestaurantsByNameRequest);
}

function* watchGetFoodPromosBySearchCodeRequest() {
  yield takeLatest(Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_REQUEST, getFoodPromosBySearchCodeRequest);
}

function* watchGetLocalsPromosBySearchCodeRequest() {
  yield takeLatest(Types.GET_LOCALS_PROMOS_BY_SEARCH_CODE_REQUEST, getLocalsPromosBySearchCodeRequest);
}

function* watchGetMarketPromosBySearchCodeRequest() {
  yield takeLatest(Types.GET_MARKET_PROMOS_BY_SEARCH_CODE_REQUEST, getMarketPromosBySearchCodeRequest);
}

function* watchFilteredGetirDriveVouchersRequest() {
  yield takeLatest(Types.GET_FILTERED_GETIR_DRIVE_VOUCHERS_REQUEST, getFilteredGetirDriveVouchersRequest);
}

function* watchFilteredBrandsRequest() {
  yield takeLatest(Types.GET_FILTERED_BRANDS_REQUEST, getFilteredBrandsRequest);
}

function* watchGetCuisinesRequest() {
  yield takeLatest(Types.GET_CUISINES_REQUEST, getCuisinesRequest);
}

function* watchGwmpBrandsRequest() {
  yield takeLatest(Types.GET_ALL_GWMP_BRANDS_REQUEST, getGwmpBrandsRequest);
}

function* watchGwmpVendorsRequest() {
  yield takeLatest(Types.GET_ALL_GWMP_VENDORS_REQUEST, getGwmpVendorsRequest);
}

function* watchGetPersonaClientFlagsRequest() {
  yield takeLatest(Types.GET_PERSONA_CLIENT_FLAGS_REQUEST, getPersonaClientFlagsRequest);
}

function* watchGetRFMSegmentsRequest() {
  yield takeLatest(Types.GET_RFM_SEGMENTS_REQUEST, getRFMSegmentsRequest);
}

function* watchGetDataScienceModelsRequest() {
  yield takeLatest(Types.GET_DATA_SCIENCE_MODELS_REQUEST, getDataScienceModelsRequest);
}

function* watchGetPersonaDomainTypesRequest() {
  yield takeLatest(Types.GET_PERSONA_DOMAIN_TYPES_REQUEST, getPersonaDomainTypesRequest);
}

function* watchGetArtisanTypesRequest() {
  yield takeLatest(Types.GET_ARTISAN_TYPES_REQUEST, getArtisanTypesRequest);
}

function* watchGetArtisanChainShopsRequest() {
  yield takeLatest(Types.GET_ARTISAN_CHAIN_SHOPS_REQUEST, getArtisanChainShopsRequest);
}

function* watchGetGetirJobsJobTitlesByFiltersRequest() {
  yield takeLatest(Types.GET_GETIR_JOBS_JOB_TITLES_BY_FILTERS_REQUEST, getGetirJobsJobTitlesByFiltersRequest);
}

function* watchGetGetirJobsPostTypesRequest() {
  yield takeLatest(Types.GET_GETIR_JOBS_POST_TYPES_REQUEST, getGetirJobsPostTypesRequest);
}

function* watchGetirJobsDrivingLicensesRequest() {
  yield takeLatest(Types.GET_GETIR_JOBS_POST_TYPES_REQUEST, getGetirJobsDrivingLicensesRequest);
}

function* watchGetirMarketOrderCancelReasonsRequest() {
  yield takeLatest(Types.GET_GETIR_MARKET_ORDER_CANCEL_REASONS_REQUEST, getGetirMarketOrderCancelReasonsRequest);
}

function* watchGetGetirJobsCategoryRequest() {
  yield takeLatest(Types.GET_GETIR_JOBS_CATEGORY_REQUEST, getGetirJobsCategoryRequest);
}

export function* watchGetOrderFeedbackReasonsRequest() {
  yield takeLatest(Types.GET_ORDER_FEEDBACK_REASONS_REQUEST, getOrderFeedbackReasonsRequest);
}

export default function* clientTrackingRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFoodPromosBySearchCodeRequest),
      fork(watchGetLocalsPromosBySearchCodeRequest),
      fork(watchGetMarketPromosBySearchCodeRequest),
      fork(watchFilteredGetirDriveVouchersRequest),
      fork(watchGetCuisinesRequest),
      fork(watchGwmpBrandsRequest),
      fork(watchGwmpVendorsRequest),
      fork(watchGetRestaurantsByNameRequest),
      fork(watchSearchChainRestaurantsRequest),
      fork(watchGetChainRestaurantBranchesRequest),
      fork(watchGetChainRestaurantProductsRequest),
      fork(watchGetRestaurantProductsRequest),
      fork(watchCreateClientListRequest),
      fork(watchCreateClientListTemplateRequest),
      fork(watchArtisanShopsRequest),
      fork(watchGetPersonaClientFlagsRequest),
      fork(watchGetRFMSegmentsRequest),
      fork(watchGetDataScienceModelsRequest),
      fork(watchGetPersonaDomainTypesRequest),
      fork(watchGetArtisanTypesRequest),
      fork(watchGetArtisanChainShopsRequest),
      fork(watchGetGetirJobsJobTitlesByFiltersRequest),
      fork(watchGetGetirJobsPostTypesRequest),
      fork(watchGetirJobsDrivingLicensesRequest),
      fork(watchGetirMarketOrderCancelReasonsRequest),
      fork(watchGetGetirJobsCategoryRequest),
      fork(watchSearchABTestCodeRequest),
      fork(watchGetABTestCodesFromDataRequest),
      fork(watchFilteredBrandsRequest),
      fork(watchGetOrderFeedbackReasonsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
