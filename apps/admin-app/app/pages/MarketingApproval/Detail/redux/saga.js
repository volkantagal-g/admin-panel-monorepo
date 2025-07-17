import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getGeneratedContentForPromoId, updateNotifications } from '@shared/api/aiContentGeneration';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getGeneratedContentForPromoIdRequest({ promoId }) {
  try {
    const { data } = yield call(getGeneratedContentForPromoId, { promoId });
    yield put(Creators.getGeneratedContentForPromoIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGeneratedContentForPromoIdFailure({ error }));
  }
}

function* updateNotificationsRequest({ promoId, content }) {
  try {
    const { data } = yield call(updateNotifications, { promoId, content });
    yield put(Creators.updateNotificationsSuccess({ data }));
    yield put(Creators.getGeneratedContentForPromoIdRequest({ promoId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateNotificationsFailure({ error }));
  }
}

function* watchUpdateNotificationsRequest() {
  yield takeLatest(Types.UPDATE_NOTIFICATIONS_REQUEST, updateNotificationsRequest);
}

function* watchGetGeneratedContentForPromoIdRequest() {
  yield takeLatest(Types.GET_GENERATED_CONTENT_FOR_PROMO_ID_REQUEST, getGeneratedContentForPromoIdRequest);
}

export default function* generatedContentRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetGeneratedContentForPromoIdRequest),
      fork(watchUpdateNotificationsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
