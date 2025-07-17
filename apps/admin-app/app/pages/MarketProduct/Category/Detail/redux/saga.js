import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import { set } from 'lodash';

import {
  updateMarketProductCategory,
  getMarketProductCategoryById,
  createMarketProductCategoryImageUrl,
  activateMarketProductCategory,
  deactivateMarketProductCategory,
  updateMarketProductCategoryAdditionalInfo, updateMarketProductCategoryImage,
} from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketProductCategorySlugs } from '@shared/api/marketProductCategorySlug';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

export function* getMarketProductCategoryByIdRequest({ id }) {
  try {
    const data = yield call(getMarketProductCategoryById, { id });
    yield put(Creators.getMarketProductCategoryByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoryByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductCategoryRequest({ id, body }) {
  try {
    const data = yield call(updateMarketProductCategory, { id, body });
    yield put(Creators.updateMarketProductCategorySuccess({ data }));
    yield put(Creators.getMarketProductCategoryByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductCategoryAdditionalInfoRequest({ id, body }) {
  try {
    const data = yield call(updateMarketProductCategoryAdditionalInfo, { id, body });
    yield put(Creators.updateMarketProductCategoryAdditionalInfoSuccess({ data }));
    yield put(Creators.getMarketProductCategoryByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductCategoryAdditionalInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductCategoryImageUrlRequest({ id, loadedImage, extension, body, imagePath, isAppliedToOtherLanguages }) {
  try {
    const { signedUrl, cdnUrl } = yield call(createMarketProductCategoryImageUrl, { extension });
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
    set(body, imagePath, cdnUrl);
    if (isAppliedToOtherLanguages) {
      const baseImagePath = imagePath[0];
      const countryLanguages = getSelectedCountryLanguages();
      countryLanguages.forEach(lang => {
        const imagePathWithLang = [baseImagePath, lang];
        set(body, imagePathWithLang, cdnUrl);
      });
    }
    // TODO temporarily condition
    const { domainType, picURL } = body;
    if (domainType === GETIR_10_DOMAIN_TYPE) {
      yield updateMarketProductCategoryRequest({ id, body: { picURL } });
    }
    yield call(updateMarketProductCategoryImage, { id, body });
    yield put(Creators.getMarketProductCategoryByIdRequest({ id }));
    yield put(Creators.updateMarketProductCategoryImageUrlSuccess());
  }
  catch (error) {
    yield put(Creators.updateMarketProductCategoryImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* activateMarketProductCategoryRequest({ id }) {
  try {
    const data = yield call(activateMarketProductCategory, { id });
    yield put(Creators.activateMarketProductCategorySuccess({ data }));
    yield put(Creators.getMarketProductCategoryByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateMarketProductCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deactivateMarketProductCategoryRequest({ id }) {
  try {
    const data = yield call(deactivateMarketProductCategory, { id });
    yield put(Creators.deactivateMarketProductCategorySuccess({ data }));
    yield put(Creators.getMarketProductCategoryByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateMarketProductCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getMarketProductCategorySlugsRequest({ id }) {
  try {
    const data = yield call(getMarketProductCategorySlugs, { id });
    yield put(Creators.getMarketProductCategorySlugsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategorySlugsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductCategoryByIdRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST, getMarketProductCategoryByIdRequest);
}

export function* watchUpdateMarketProductCategoryRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST, updateMarketProductCategoryRequest);
}

export function* watchUpdateMarketProductCategoryAdditionalInfoRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST, updateMarketProductCategoryAdditionalInfoRequest);
}

export function* watchUpdateMarketProductCategoryImageUrlRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST, updateMarketProductCategoryImageUrlRequest);
}

export function* watchActivateMarketProductCategoryRequest() {
  yield takeLatest(Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, activateMarketProductCategoryRequest);
}

export function* watchDeactivateMarketProductCategoryRequest() {
  yield takeLatest(Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, deactivateMarketProductCategoryRequest);
}
export function* watchGetMarketProductCategorySlugsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST, getMarketProductCategorySlugsRequest);
}

export default function* marketProductCategoryDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoryByIdRequest),
      fork(watchUpdateMarketProductCategoryRequest),
      fork(watchUpdateMarketProductCategoryAdditionalInfoRequest),
      fork(watchUpdateMarketProductCategoryImageUrlRequest),
      fork(watchActivateMarketProductCategoryRequest),
      fork(watchDeactivateMarketProductCategoryRequest),
      fork(watchGetMarketProductCategorySlugsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
