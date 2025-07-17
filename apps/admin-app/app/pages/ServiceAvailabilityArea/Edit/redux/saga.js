import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isEqual } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getById, updateGeneral, updateGeoJSON } from '@shared/api/serviceAvailablityArea';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';
import { getFormattedRequestBody } from '../../utils';

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

function* editFirstPartRequest({ data }) {
  // only non geoJson fields can be updated by this
  if (data.geoJSON !== undefined) {
    yield put(ToastCreators.error());
    return;
  }

  const body = getFormattedRequestBody(data);
  try {
    const dataFetched = yield call(updateGeneral, body);
    yield put(Creators.editFirstPartSuccess({ data: dataFetched }));
    yield put(ToastCreators.success());
    const { path } = ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL;
    history.push(path.replace(':id', data.id));
  }
  catch (error) {
    yield put(Creators.editFirstPartFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchEditFirstPartRequest() {
  yield takeLatest(Types.EDIT_FIRST_PART_REQUEST, editFirstPartRequest);
}

function* editGeoRequest({ data }) {
  // only geoJson can be updated by this
  const keys = Object.keys(data).sort();
  if (!isEqual(keys, ['geoJSON', 'id'])) {
    yield put(ToastCreators.error());
    return;
  }
  const body = getFormattedRequestBody(data);

  try {
    const dataFetched = yield call(updateGeoJSON, body);
    yield put(Creators.editGeoSuccess({ data: dataFetched }));
    yield put(ToastCreators.success());
    const { path } = ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL;
    history.push(path.replace(':id', data.id));
  }
  catch (error) {
    yield put(Creators.editGeoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchEditGeoRequest() {
  yield takeLatest(Types.EDIT_GEO_REQUEST, editGeoRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchSaaRequest), fork(watchEditFirstPartRequest), fork(watchEditGeoRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
