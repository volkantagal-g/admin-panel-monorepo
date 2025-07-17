import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getById } from '@shared/api/serviceAvailablityArea';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Types, Creators } from './actions';

function* getSaaByIdRequest({ id }) {
  try {
    const dataFetched = yield call(getById, { id });
    yield put(Creators.getSaaByIdSuccess({ data: dataFetched }));
  }
  catch (error) {
    yield put(Creators.getSaaByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
    const { path } = ROUTE.SERVICE_AVAILABILITY_AREA_LIST;
    history.push(path);
  }
}
function* watchSaaRequest() {
  yield takeLatest(Types.GET_SAA_BY_ID_REQUEST, getSaaByIdRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchSaaRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
