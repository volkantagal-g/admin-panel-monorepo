import {
  all,
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';

import history from '@shared/utils/history';
import { search } from '@shared/api/client';
import { createPersonalPromo } from '@shared/api/personalPromo';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* getClients({ gsm }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = { gsm };

    const { clients } = yield call(
      search,
      requestBody,
    );
    yield put(Creators.getClientsSuccess({ data: clients }));
  }
  catch (error) {
    yield put(Creators.getClientsFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export function* watchClientsRequest() {
  yield takeLatest(Types.GET_CLIENTS_REQUEST, getClients);
}

function* createPersonalPromoRequest({ body }) {
  try {
    // Extract sendPush from body, it's only needed for push notification below
    const { sendPush, pushData, ...promoBody } = body;

    // If sendPush is true, create promo with push notification, otherwise send null
    let data;
    if (sendPush) {
      const pushNotificationBody = {
        clientId: body.client,
        notificationType: 'TXN',
        notificationData: pushData,
        notificationInterruptionLevel: 'ACTIVE',
      };
      data = yield call(createPersonalPromo, { ...promoBody, pushData: pushNotificationBody });
    }
    else {
      data = yield call(createPersonalPromo, { ...promoBody });
    }
    yield put(Creators.createPersonalPromoSuccess({ data }));

    // Redirect to personal promo detail page
    const promoId = data?.createPersonalPromo?._id;
    const path = ROUTE.GETIR_PERSONAL_PROMO_DETAIL.path.replace(':promoId', promoId);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createPersonalPromoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePersonalPromoRequest() {
  yield takeLatest(Types.CREATE_PERSONAL_PROMO_REQUEST, createPersonalPromoRequest);
}

export default function* getClientsRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchClientsRequest),
      fork(watchCreatePersonalPromoRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
