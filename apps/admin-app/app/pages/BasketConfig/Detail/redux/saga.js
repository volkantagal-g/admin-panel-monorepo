import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  bulkUpdateBasketAmounts,
  getBasketAmounts,
} from '@shared/api/basketConfig';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

export function* getDiscountedBasketAmountsRequest({ warehouseId }) {
  try {
    const data = yield call(getBasketAmounts, { warehouseId });
    yield put(Creators.getDiscountedBasketAmountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDiscountedBasketAmountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateDiscountedBasketAmountsRequest({
  warehouseId,
  domainType,
  minDiscountedAmount,
  maxDiscountedAmount,
  basketAmountSource,
  zoneBasedBasketAmounts,
  onSuccess,
}) {
  try {
    const data = yield call(bulkUpdateBasketAmounts, {
      basketAmounts: [
        {
          warehouseId,
          domainType,
          minDiscountedAmount,
          maxDiscountedAmount,
          basketAmountSource,
          zoneBasedBasketAmounts,
        },
      ],
    });
    yield put(Creators.updateDiscountedBasketAmountsSuccess({ data }));
    yield put(ToastCreators.success());
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateDiscountedBasketAmountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetDiscountedBasketAmountsRequest() {
  yield takeLatest(
    Types.GET_DISCOUNTED_BASKET_AMOUNTS_REQUEST,
    getDiscountedBasketAmountsRequest,
  );
}
export function* watchUpdateDiscountedBasketAmountsRequest() {
  yield takeLatest(
    Types.UPDATE_DISCOUNTED_BASKET_AMOUNTS_REQUEST,
    updateDiscountedBasketAmountsRequest,
  );
}

export default function* basketConfigDetailsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDiscountedBasketAmountsRequest),
      fork(watchUpdateDiscountedBasketAmountsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
