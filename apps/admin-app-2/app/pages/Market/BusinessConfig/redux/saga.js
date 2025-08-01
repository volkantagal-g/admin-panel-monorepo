import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

import {
  getMarketBusinessConfigs,
  updateBusinessConfigValue,
  updateBusinessConfigCustomValue,
} from '@shared/api/market/businessConfig';
import { getAllConfigKeyTypePairs } from '@app/pages/Market/BusinessConfig/utils';

export function* getMarketBusinessConfigsRequest({ configKeys }) {
  try {
    const data = yield call(getMarketBusinessConfigs, { configKeys });
    yield put(Creators.getMarketBusinessConfigsSuccess({ marketBusinessConfigs: data }));
  }
  catch (error) {
    yield put(Creators.getMarketBusinessConfigsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketBusinessConfigsRequest() {
  yield takeLatest(Types.GET_MARKET_BUSINESS_CONFIGS_REQUEST, getMarketBusinessConfigsRequest);
}

export function* updateBusinessConfigValueRequest({ configBody }) {
  try {
    const data = yield call(updateBusinessConfigValue, { configBody });
    yield put(Creators.updateBusinessConfigValueSuccess({ businessConfigValue: data }));
    yield call(getMarketBusinessConfigsRequest, { configKeys: getAllConfigKeyTypePairs() });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBusinessConfigValueFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateBusinessConfigValueRequest() {
  yield takeLatest(Types.UPDATE_BUSINESS_CONFIG_VALUE_REQUEST, updateBusinessConfigValueRequest);
}

export function* updateBusinessConfigCustomValueRequest({ configCustomBody }) {
  try {
    const data = yield call(updateBusinessConfigCustomValue, { configCustomBody });
    yield put(Creators.updateBusinessConfigCustomValueSuccess({ businessConfigCustomValue: data }));
    yield call(getMarketBusinessConfigsRequest, { configKeys: getAllConfigKeyTypePairs() });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBusinessConfigCustomValueFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateBusinessConfigCustomValueRequest() {
  yield takeLatest(Types.UPDATE_BUSINESS_CONFIG_CUSTOM_VALUE_REQUEST, updateBusinessConfigCustomValueRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketBusinessConfigsRequest),
      fork(watchUpdateBusinessConfigValueRequest),
      fork(watchUpdateBusinessConfigCustomValueRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
