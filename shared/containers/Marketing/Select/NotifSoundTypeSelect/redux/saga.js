import { all, call, cancel, takeLatest, fork, put, take } from 'redux-saga/effects';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';
import { getMarketConfig } from '@shared/api/marketConfig';
import { Creators, Types } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getNotifSoundTypesRequest() {
  try {
    const requestBody = {
      key: ADMIN_PANEL_CONFIGS.TRANSACTIONAL_NOTIFICATION_SOUND_TYPES,
      type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
    };
    const data = yield call(getMarketConfig, requestBody);

    yield put(Creators.getNotifSoundTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotifSoundTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetNotifSoundTypesServiceRequest() {
  yield takeLatest(Types.GET_NOTIF_SOUND_TYPES_REQUEST, getNotifSoundTypesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetNotifSoundTypesServiceRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
