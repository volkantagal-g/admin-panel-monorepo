import { all, takeLatest, call, cancel, fork, put, take, actionChannel } from 'redux-saga/effects';

import { getMarketProducts } from '@shared/api/marketProduct';
import { createRecipeImageUrl, getRecipeById, updateRecipe } from '@shared/api/recipes';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { getSegments } from '@shared/api/segments';

function* getRecipeByIdRequest({ recipeId }) {
  try {
    const data = yield call(getRecipeById, { recipeId });
    yield put(Creators.getRecipeByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRecipeByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateRecipeRequest({ id, body }) {
  try {
    const data = yield call(updateRecipe, { id, body });
    yield put(Creators.updateRecipeSuccess({ data }));
    yield put(
      Creators.getRecipeByIdRequest({ recipeId: id }),
    );
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRecipeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getMarketProductsRequest({ filters }) {
  try {
    const data = yield call(getMarketProducts, filters);
    yield put(Creators.getMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getTableMarketProductsRequest({ filters }) {
  try {
    const data = yield call(getMarketProducts, filters);
    yield put(Creators.getTableMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTableMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getModalMarketProductsRequest({ filters }) {
  try {
    const data = yield call(getMarketProducts, filters);
    yield put(Creators.getModalMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getModalMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSegmentsRequest({ filters }) {
  try {
    const data = yield call(getSegments, filters);
    yield put(Creators.getSegmentsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSegmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createRecipeImageUrlRequest({ key, loadedImage, extension }) {
  try {
    const { signedUrl, cdnUrl } = yield call(createRecipeImageUrl, { extension });
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
    yield put(Creators.createRecipeImageUrlSuccess({ data: { key, signedUrl, cdnUrl } }));
  }
  catch (error) {
    yield put(Creators.createRecipeImageUrlFailure({ key, error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRecipeByIdRequest() {
  yield takeLatest(Types.GET_RECIPE_BY_ID_REQUEST, getRecipeByIdRequest);
}

function* watchUpdateRecipeRequest() {
  yield takeLatest(Types.UPDATE_RECIPE_REQUEST, updateRecipeRequest);
}

function* watchGetMarketProductsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest);
}

function* watchGetTableMarketProductsRequest() {
  yield takeLatest(Types.GET_TABLE_MARKET_PRODUCTS_REQUEST, getTableMarketProductsRequest);
}

function* watchGetModalMarketProductsRequest() {
  yield takeLatest(Types.GET_MODAL_MARKET_PRODUCTS_REQUEST, getModalMarketProductsRequest);
}

function* watchGetSegmentsRequest() {
  yield takeLatest(Types.GET_SEGMENTS_REQUEST, getSegmentsRequest);
}

function* watchCreateRecipeImageUrlRequest() {
  const channel = yield actionChannel(Types.CREATE_RECIPE_IMAGE_URL_REQUEST);

  while (true) {
    const payload = yield take(channel);
    yield call(createRecipeImageUrlRequest, payload);
  }
}

export default function* marketProductDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRecipeByIdRequest),
      fork(watchUpdateRecipeRequest),
      fork(watchGetMarketProductsRequest),
      fork(watchGetTableMarketProductsRequest),
      fork(watchGetModalMarketProductsRequest),
      fork(watchGetSegmentsRequest),
      fork(watchCreateRecipeImageUrlRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
