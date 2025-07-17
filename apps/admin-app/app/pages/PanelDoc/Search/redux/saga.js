import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getByFilters as getPanelDocsByFilterApi } from '@shared/api/panelDoc';
import { getLangKey } from '@shared/i18n';

import { Types, Creators } from './actions';

function* getPanelDocsByFilter({ filters }) {
  try {
    yield put(Creators.setResultShown({ isResultShown: true }));
    const data = yield call(getPanelDocsByFilterApi, { ...filters, isActive: true, populate: { users: true, page: true } });
    yield put(Creators.getPanelDocsByFilterSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getPanelDocsByFilterFailure({ error, message }));
  }
}

function* watchGetPanelDocsByFilterRequest() {
  yield takeLatest(Types.GET_PANEL_DOCS_BY_FILTER_REQUEST, getPanelDocsByFilter);
}

function* getAdminGuidesRequest() {
  try {
    const data = yield call(getPanelDocsByFilterApi, { isActive: true, isAdminGuide: true });
    yield put(Creators.getAdminGuidesSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getAdminGuidesFailure({ error, message }));
  }
}

function* watchGetAdminGuidesRequest() {
  yield takeLatest(Types.GET_ADMIN_GUIDES_REQUEST, getAdminGuidesRequest);
}

function* getHighlightedDocumentsRequest() {
  try {
    const data = yield call(getPanelDocsByFilterApi, { isActive: true, isHighlighted: true });
    yield put(Creators.getHighlightedDocumentsSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getHighlightedDocumentsFailure({ error, message }));
  }
}

function* watchGethighlightedDocumentsRequest() {
  yield takeLatest(Types.GET_HIGHLIGHTED_DOCUMENTS_REQUEST, getHighlightedDocumentsRequest);
}

export default function* panelDocSearchPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPanelDocsByFilterRequest),
      fork(watchGetAdminGuidesRequest),
      fork(watchGethighlightedDocumentsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
