import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { getGlobalRuleSet, setGlobalRuleSet, getResults, duplicate } from '@shared/api/popup';

import { Types, Creators } from '@app/pages/Popup/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { filtersSelector } from '@app/pages/Popup/List/redux/selectors';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const results = yield call(getResults, filters);
    yield put(Creators.getResultsSuccess(results));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getGlobalRulesetRequest() {
  try {
    const ruleSet = yield call(getGlobalRuleSet);
    yield put(Creators.getGlobalRulesetSuccess(ruleSet));
  }
  catch (error) {
    yield put(Creators.getGlobalRulesetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setGlobalRulesetRequest({ data }) {
  try {
    const ruleSet = yield call(setGlobalRuleSet, data);
    yield put(Creators.setGlobalRulesetSuccess(ruleSet));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.setGlobalRulesetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* duplicatePopup({ id }) {
  try {
    const { data } = yield call(duplicate, id);
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.POPUP_DETAIL.path, { id: data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSetTableFilters() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

function* watchResultsRequest() {
  yield takeLatest(Types.GET_RESULTS_REQUEST, getResultsRequest);
}

function* watchGetGlobalRulesetRequest() {
  yield takeLatest(Types.GET_GLOBAL_RULESET_REQUEST, getGlobalRulesetRequest);
}

function* watchSetGlobalRulesetRequest() {
  yield takeLatest(Types.SET_GLOBAL_RULESET_REQUEST, setGlobalRulesetRequest);
}

function* watchDuplicatePopup() {
  yield takeLatest(Types.DUPLICATE_POPUP, duplicatePopup);
}

export default function* popupListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSetTableFilters),
      fork(watchResultsRequest),
      fork(watchGetGlobalRulesetRequest),
      fork(watchSetGlobalRulesetRequest),

      fork(watchDuplicatePopup),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
