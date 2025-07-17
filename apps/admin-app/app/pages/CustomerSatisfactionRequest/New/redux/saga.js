import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  createCustomerSatisfactionRequest as createCustomerSatisfactionRequestApi,
  filterProductsRequest as filterProductsApi,
} from '@shared/api/customerSatisfactionRequest';
import { Types, Creators } from './actions';

function* createCustomerSatisfactionRequest({ requestBody }) {
  try {
    const data = yield call(createCustomerSatisfactionRequestApi, requestBody);
    yield put(Creators.createCustomerSatisfactionRequestSuccess({ data }));
    yield put(
      ToastCreators.success(),
    );
  }
  catch (error) {
    yield put(Creators.createCustomerSatisfactionRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateCustomerSatisfactionRequestRequest() {
  yield takeLatest(
    Types.CREATE_CUSTOMER_SATISFACTION_REQUEST_REQUEST,
    createCustomerSatisfactionRequest,
  );
}
function* filterProductsRequest({ requestBody }) {
  try {
    const { data, total } = yield call(filterProductsApi, requestBody);
    yield put(Creators.filterProductsSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.filterProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchfilterProductsRequest() {
  yield takeLatest(Types.FILTER_PRODUCTS_REQUEST, filterProductsRequest);
}

export default function* customerSatisfactionRequestPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateCustomerSatisfactionRequestRequest),
      fork(watchfilterProductsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
