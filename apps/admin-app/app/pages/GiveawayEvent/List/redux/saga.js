import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { isEmpty } from 'lodash-es';

import { deliverGiveawayEvent, getDrawDiscountCode, getGiveawayEvents } from '@shared/api/giveawayEvents';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';

function* getGiveawayEventsRequest({ limit = 10, offset = 0, queryText, eventId, gsm }) {
  try {
    const data = yield call(getGiveawayEvents, { limit, offset, queryText, eventId });
    if(queryText && queryText === gsm) {
      const product = data.draws?.find(record => record.gsm === gsm);
      if(!isEmpty(product) ) {
        const { event: { _id: eventId }, gsm, countryCode, _id: id } = product;
        yield put(Creators.deliverGiveawayEventRequest({ gsm, countryCode, eventId, id }));
      }  
    }
    yield put(Creators.getGiveawayEventsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGiveawayEventsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* deliverGiveawayEventRequest({ gsm, countryCode, eventId, id }) {
  try {
    yield call(deliverGiveawayEvent, { gsm, countryCode, eventId });
    yield put(Creators.deliverGiveawayEventSuccess({ id, isDelivered: true }));
    yield put(ToastCreators.success({ message: t('giveawayPage:NOTIFICATIONS.DELIVER_SUCCESS'), toastOptions: { autoClose: false } }));
  }
  catch (error) {
    yield put(Creators.deliverGiveawayEventFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { autoClose: false } }));
  }
}
function* getDrawDiscountCodeRequest({ discountCodeId, id }) {
  try {
    const data = yield call(getDrawDiscountCode, { discountCodeId });
    yield put(Creators.getDrawDiscountCodeSuccess({ id, code: data.discountCode?.code }));
  }
  catch (error) {
    yield put(Creators.getDrawDiscountCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetGiveawayEventsRequest() {
  yield takeLatest(Types.GET_GIVEAWAY_EVENTS_REQUEST, getGiveawayEventsRequest);
}
function* watchDeliverGiveawayEventRequest() {
  yield takeLatest(Types.DELIVER_GIVEAWAY_EVENT_REQUEST, deliverGiveawayEventRequest);
}
function* watchGetDrawDiscountCodeRequest() {
  yield takeLatest(Types.GET_DRAW_DISCOUNT_CODE_REQUEST, getDrawDiscountCodeRequest);
}

export default function* giveawayEventsListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetGiveawayEventsRequest),
      fork(watchDeliverGiveawayEventRequest),
      fork(watchGetDrawDiscountCodeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
