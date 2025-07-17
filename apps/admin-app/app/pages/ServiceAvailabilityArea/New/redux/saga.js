import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { create } from '@shared/api/serviceAvailablityArea';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';
import { getFormattedRequestBody } from '../../utils';

function* createSaaRequest({ data, countries }) {
  const body = getFormattedRequestBody(data, countries);
  try {
    const dataFetched = yield call(create, body);

    yield put(Creators.createSaaSuccess({ data: dataFetched }));
    yield put(ToastCreators.success());
    const path = ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL.path.replace(':id', dataFetched?.serviceAvailabilityArea?._id);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createSaaFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchSaaRequest() {
  yield takeLatest(Types.CREATE_SAA_REQUEST, createSaaRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchSaaRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
