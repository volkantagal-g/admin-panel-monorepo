import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRecipes, createRecipe } from '@shared/api/recipes';
import { getLimitAndOffset } from '@shared/utils/common';
import { filtersSelector, recipesSelector, countryCodeSelector } from './selectors';

export function* getRecipesRequest({ limit, offset, queryText, status, domainTypes, countryCode }) {
  try {
    const data = yield call(getRecipes, {
      status,
      limit,
      offset,
      queryText,
      domainTypes,
      countryCode,
    });
    yield put(Creators.getRecipesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRecipesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createRecipeRequest({ body, onSuccess }) {
  try {
    const data = yield call(createRecipe, { body });
    yield put(ToastCreators.success());

    if (onSuccess && typeof onSuccess === 'function') {
      yield call(onSuccess);
    }

    yield put(Creators.createRecipeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createRecipeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetRecipesRequest() {
  yield takeLatest(Types.GET_RECIPES_REQUEST, getRecipesRequest);
}

export function* watchCreateRecipeRequest() {
  yield takeLatest(Types.CREATE_RECIPE_REQUEST, createRecipeRequest);
}

function* recipesListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const task = yield fork(watchGetRecipesRequest);

    yield take(Types.DESTROY_PAGE);
    yield cancel(task);
  }
}

function* modalSaga() {
  while (yield take(Types.OPEN_NEW_RECIPE_MODAL)) {
    const task = yield fork(watchCreateRecipeRequest);
    yield take(Types.CREATE_RECIPE_SUCCESS);
    yield cancel(task);
    yield put(Creators.closeNewRecipeModal());

    const countryCode = yield select(countryCodeSelector);
    const queryText = yield select(filtersSelector.getQueryText);
    const status = yield select(filtersSelector.getSelectedStatus);
    const domainTypes = yield select(filtersSelector.getSelectedDomains);
    const limit = yield select(recipesSelector.getCurrentPageSize);
    const currentPage = yield select(recipesSelector.getCurrentPage);

    yield put(Creators.getRecipesRequest({
      ...getLimitAndOffset({ currentPage, rowsPerPage: limit }),
      queryText,
      status,
      domainTypes,
      countryCode,
    }));
  }
}

export default function* rootSaga() {
  yield all([
    recipesListRoot(),
    modalSaga(),
  ]);
}
