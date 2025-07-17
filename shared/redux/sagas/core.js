import { call, put, fork, all, takeLatest } from 'redux-saga/effects';

import { getByFilters } from '@shared/api/panelDoc';
import { getPages } from '@shared/api/page';
import { getRoles } from '@shared/api/role';

import { Creators as CoreCreators, Types as CoreTypes } from '@shared/redux/actions/core';
import { Creators as TostCreators } from '@shared/redux/actions/toast';

function* searchPanelDocsRequest({ searchText }) {
  try {
    const data = yield call(getByFilters, { searchText, isActive: true });
    yield put(CoreCreators.searchPanelDocsSuccess({ data }));
  }
  catch (error) {
    yield put(TostCreators.error({ error }));
    yield put(CoreCreators.searchPanelDocsFailure({ error }));
  }
}

function* searchPagesRequest({ searchText }) {
  try {
    const data = yield call(getPages, { searchText });
    yield put(CoreCreators.searchPagesSuccess({ data }));
  }
  catch (error) {
    yield put(TostCreators.error({ error }));
    yield put(CoreCreators.searchPagesFailure({ error }));
  }
}

function* searchRolesRequest({ searchText }) {
  try {
    const data = yield call(getRoles, { queryText: searchText });
    yield put(CoreCreators.searchRolesSuccess({ data }));
  }
  catch (error) {
    yield put(TostCreators.error({ error }));
    yield put(CoreCreators.searchRolesFailure({ error }));
  }
}

function* watchSearchPanelDocsRequest() {
  yield takeLatest(CoreTypes.SEARCH_PANEL_DOCS_REQUEST, searchPanelDocsRequest);
}

function* watchSearchPagesRequest() {
  yield takeLatest(CoreTypes.SEARCH_PAGES_REQUEST, searchPagesRequest);
}

function* watchSearchRolesRequest() {
  yield takeLatest(CoreTypes.SEARCH_ROLES_REQUEST, searchRolesRequest);
}

export default function* core() {
  yield all([
    fork(watchSearchPanelDocsRequest),
    fork(watchSearchPagesRequest),
    fork(watchSearchRolesRequest),
  ]);
}
