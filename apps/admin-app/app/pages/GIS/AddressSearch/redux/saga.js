import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { addressAutoComplete } from '@shared/api/gis/addressSearch';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

const errorMessagePath = 'response.data.details.0.message';

function* addressSearchRequest({ body }) {
  try {
    const data = yield call(addressAutoComplete, { body });
    yield put(Creators.addressSearchSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, errorMessagePath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.addressSearchFailure({ error: errorMessage }));
  }
}

function* watchAddressSearchRequest() {
  yield takeLatest(Types.ADDRESS_SEARCH_REQUEST, addressSearchRequest);
}

export default function* gisAddressSearchRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchAddressSearchRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
