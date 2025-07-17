import { call, put, takeLatest, select } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getOnOffResult, updateWarehouseConfig } from '@shared/api/onOffPromoConfig';
import * as selectors from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getResultListRequestSaga() {
  try {
    const data = yield call(getOnOffResult);
    yield put(Creators.getOnOffResultSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOnOffResultFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateWarehouseConfigSaga() {
  try {
    const changedConfig = yield select(selectors.changeConfigSelector.getChangedConfig);
    yield call(updateWarehouseConfig, { changedConfig });
    yield put(Creators.getChangedConfigSuccess({ changedConfig }));
    yield put(ToastCreators.success({ message: 'Success' }));
  }
  catch (error) {
    yield put(Creators.getChangedConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export default function* onOffPageSagaRoot() {
  yield takeLatest(
    Types.GET_ON_OFF_RESULT_REQUEST,
    getResultListRequestSaga,
  );
  yield takeLatest(
    Types.SET_CHANGED_CONFIG,
    updateWarehouseConfigSaga,
  );
}
