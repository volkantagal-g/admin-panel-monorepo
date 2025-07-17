import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getConfigKey, getSmartSuggestions } from '@shared/api/promo';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getConfigKeyRequest({ body }) {
  try {
    const data = yield call(getConfigKey, { body });
    yield put(Creators.getConfigKeySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetConfigKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_KEY_REQUEST, getConfigKeyRequest);
}

function* getSmartSuggestionsRequest({ body }) {
  try {
    const data = yield call(getSmartSuggestions, { body });
    yield put(Creators.getSmartSuggestionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSmartSuggestionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSmartSuggestionsRequest() {
  yield takeLatest(Types.GET_SMART_SUGGESTIONS_REQUEST, getSmartSuggestionsRequest);
}

export default function* promoDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetConfigKeyRequest),
      fork(watchGetSmartSuggestionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
