import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { filterCourier as filterCouriersApi } from '@shared/api/courierHandler';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { formatCourierListParams } from '../utils';

export function* getCourierList({ filters, pagination }) {
  try {
    const { limit, offset } = getLimitAndOffset(pagination);
    const reqParams = formatCourierListParams(filters);
    const { couriers, totalCount } = yield call(filterCouriersApi, { limit, offset, reqParams });
    yield put(Creators.getCourierListSuccess({ data: couriers, totalCount }));
  }
  catch (error) {
    yield put(Creators.getCourierListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetCourierListRequest() {
  yield takeLatest(Types.GET_COURIER_LIST_REQUEST, getCourierList);
}

export default function* courierListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetCourierListRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
