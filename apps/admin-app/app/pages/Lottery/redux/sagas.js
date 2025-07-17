import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createLottery, updateLottery, createLotterySegments, getLotteryById, getLotterySegmentsById } from '@shared/api/lottery';
import { Types, Creators } from './actions';
import { ROUTE } from '@app/routes';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* createLotteryRequest({ body }) {
  try {
    const data = yield call(createLottery, { body });
    yield put(ToastCreators.success());
    const lotteryId = data?._id;
    const path = ROUTE.LOTTERY_DETAIL.path.replace(':id', lotteryId);
    history.push(path);
    yield put(Creators.createLotterySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createLotteryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateLotteryRequest({ body }) {
  try {
    const data = yield call(updateLottery, { body });
    yield put(ToastCreators.success());
    yield put(Creators.updateLotterySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateLotteryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createLotterySegmentsRequest({ body }) {
  try {
    const data = yield call(createLotterySegments, { body });
    yield put(ToastCreators.success());
    yield put(Creators.createLotterySegmentsSuccess({ data }));
    yield put(Creators.getLotterySegmentsByIdRequest({ id: body.lotteryId }));
  }
  catch (error) {
    yield put(Creators.createLotterySegmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLotteryByIdRequest({ id }) {
  try {
    const data = yield call(getLotteryById, { id });
    yield put(Creators.getLotteryByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLotteryByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLotterySegmentsByIdRequest({ id }) {
  try {
    const data = yield call(getLotterySegmentsById, { id });
    yield put(Creators.getLotterySegmentsByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLotterySegmentsByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateLotteryRequest() {
  yield takeLatest(Types.CREATE_LOTTERY_REQUEST, createLotteryRequest);
}

function* watchCreateLotterySegmentsRequest() {
  yield takeLatest(Types.CREATE_LOTTERY_SEGMENTS_REQUEST, createLotterySegmentsRequest);
}

function* watchGetLotteryByIdRequest() {
  yield takeLatest(Types.GET_LOTTERY_BY_ID_REQUEST, getLotteryByIdRequest);
}

function* watchGetLotterySegmentsByIdRequest() {
  yield takeLatest(Types.GET_LOTTERY_SEGMENTS_BY_ID_REQUEST, getLotterySegmentsByIdRequest);
}

function* watchUpdateLotteryRequest() {
  yield takeLatest(Types.UPDATE_LOTTERY_REQUEST, updateLotteryRequest);
}

export default function* root() {
  const backgroundTasks = yield all([
    fork(watchCreateLotteryRequest),
    fork(watchCreateLotterySegmentsRequest),
    fork(watchGetLotteryByIdRequest),
    fork(watchGetLotterySegmentsByIdRequest),
    fork(watchUpdateLotteryRequest),
  ]);
  yield take(Types.DESTROY_PAGE);
  yield cancel(backgroundTasks);
}
