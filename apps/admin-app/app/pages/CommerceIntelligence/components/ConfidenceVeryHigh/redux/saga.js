import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { Creators, Types } from './actions';

function* fetchLevel3Categories() {
  try {
    const params = {
      countryCode: 'TR',
      level: 30,
      fields: ['_id', 'name'],
    };
    const response = yield call(marketProductChainManagementAPI.categories.getMasterCategoryV2, params);
    const formattedCategories = response.map(category => ({
      name: category.name.tr,
      value: category._id,
      label: category.name.tr,
    }));
    yield put(Creators.fetchLevel3CategoriesSuccess(formattedCategories));
  }
  catch (error) {
    yield put(Creators.fetchLevel3CategoriesFailure(error.message || t('commerceIntelligence:UNKNOWN_ERROR')));
  }
}

function* fetchLevel4Categories({ l3CategoryIds }) {
  try {
    if (!l3CategoryIds?.length) {
      yield put(Creators.fetchLevel4CategoriesSuccess([]));
      return;
    }

    const CACHE_KEY = 'L4_CATEGORIES_CACHE_DATA';
    const CACHE_EXPIRY_KEY = 'L4_CATEGORIES_CACHE_EXPIRY';
    const CACHE_DURATION = 5 * 60 * 1000;
    const now = Date.now();

    let l4Categories = [];
    let shouldFetchFromAPI = true;

    const storedL4Categories = localStorage.getItem(CACHE_KEY);
    const storedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

    if (storedL4Categories && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (now < expiryTime) {
        l4Categories = JSON.parse(storedL4Categories);
        shouldFetchFromAPI = false;
      }
    }

    if (shouldFetchFromAPI) {
      const response = yield call(marketProductChainManagementAPI.chain.L4Lookup);
      if (response.success) {
        l4Categories = response.data;
        localStorage.setItem(CACHE_KEY, JSON.stringify(l4Categories));
        localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_DURATION).toString());
      }
      else {
        throw new Error(t('commerceIntelligence:FAILED_TO_FETCH_L4_CATEGORIES'));
      }
    }

    const filteredL4Options = l4Categories
      .filter(category => l3CategoryIds.includes(category.parent))
      .map(category => ({
        name: category.name.tr,
        value: category.id,
        label: category.name.tr,
      }));

    yield put(Creators.fetchLevel4CategoriesSuccess(filteredL4Options));
  }
  catch (error) {
    yield put(Creators.fetchLevel4CategoriesFailure(error.message || t('commerceIntelligence:UNKNOWN_ERROR')));
  }
}

function* watchFetchLevel3Categories() {
  yield takeLatest(Types.FETCH_LEVEL3_CATEGORIES_REQUEST, fetchLevel3Categories);
}

function* watchFetchLevel4Categories() {
  yield takeLatest(Types.FETCH_LEVEL4_CATEGORIES_REQUEST, fetchLevel4Categories);
}

export const saga = function* rootSaga() {
  yield all([
    fork(watchFetchLevel3Categories),
    fork(watchFetchLevel4Categories),
  ]);
};
