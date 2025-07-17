import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getById as getPanelDocByIdApi } from '@shared/api/panelDoc';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* getPanelDocById({ _id }) {
  try {
    const data = yield call(getPanelDocByIdApi, { _id, populate: { page: true } });
    yield put(Creators.getPanelDocByIdSuccess({ data }));
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.getPanelDocByIdFailure({ error }));
    yield put(ToastCreators.error({ error, message }));
  }
}

function* watchGetPanelDocByIdRequest() {
  yield takeLatest(Types.GET_PANEL_DOC_BY_ID_REQUEST, getPanelDocById);
}

export default function* panelDocPreviewPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPanelDocByIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
