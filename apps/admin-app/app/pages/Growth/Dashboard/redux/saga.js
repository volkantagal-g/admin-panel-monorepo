import { all, call, cancel, fork, put, take, takeLatest, takeEvery } from 'redux-saga/effects';

import { isEmpty } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

import {
  getPermittedOrderCountsData,
  getPermittedMissedCountsData,
  getPermittedNetRevenuesData,
  getRawDataByDateAndTypeWithinDateRangesForGrowthDashboard,
} from '@shared/api/growthDashboard/index';
import {
  getMissedOrderCountsOfDeliveryTypes as getFoodMissedOrderCountsOfDeliveryTypes,
  getOrderCountsOfDeliveryTypes as getFoodOrderCountsOfDeliveryTypes,
  getNetRevenuesOfDeliveryTypes as getFoodNetRevenuesOfDeliveryTypes,
} from '@shared/api/foodGrowthDashboard/index';
import {
  getMissedOrderCountsOfDeliveryTypes as getLocalsMissedOrderCountsOfDeliveryTypes,
  getOrderCountsOfDeliveryTypes as getLocalsOrderCountsOfDeliveryTypes,
  getNetRevenuesOfDeliveryTypes as getLocalsNetRevenuesOfDeliveryTypes,
} from '@shared/api/localsGrowthDashboard/index';

import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { getMarketConfig } from '@shared/api/marketConfig';

function* getRawDataByDateAndTypeRequest({ data, requestType }) {
  try {
    const response = yield call(getRawDataByDateAndTypeWithinDateRangesForGrowthDashboard, data);
    yield put(Creators.getRawDataByDateAndTypeSuccess({ data: response, requestType }));
  }
  catch (error) {
    yield put(Creators.getRawDataByDateAndTypeFailure({ error, requestType }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderCountsRequest({ data, timestamps }) {
  try {
    const { successData = null } = yield call(getPermittedOrderCountsData, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(successData)) {
      Object.keys(successData).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: successData[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: successData[key][timestamps?.previous],
        };
      });
    }

    yield put(Creators.getOrderCountsSuccess({ data: formattedResponse }));
  }
  catch (error) {
    yield put(Creators.getOrderCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMissedOrderCountsRequest({ data, timestamps }) {
  try {
    const { successData = null } = yield call(getPermittedMissedCountsData, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(successData)) {
      Object.keys(successData).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: successData[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: successData[key][timestamps?.previous],
        };
      });
    }

    yield put(Creators.getMissedOrderCountsSuccess({ data: formattedResponse }));
  }
  catch (error) {
    yield put(Creators.getMissedOrderCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getNetRevenuesRequest({ data, timestamps }) {
  try {
    const { successData = null } = yield call(getPermittedNetRevenuesData, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(successData)) {
      Object.keys(successData).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: successData[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: successData[key][timestamps?.previous],
        };
      });
    }

    yield put(Creators.getNetRevenuesSuccess({ data: formattedResponse }));
  }
  catch (error) {
    yield put(Creators.getNetRevenuesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOrderCountsOfDeliveryTypesRequest({ data, requestDomain, timestamps }) {
  try {
    let callFunction = getFoodOrderCountsOfDeliveryTypes;

    if (data.filters.domainType === GETIR_LOCALS_DOMAIN_TYPE) {
      callFunction = getLocalsOrderCountsOfDeliveryTypes;
    }

    const response = yield call(callFunction, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(response)) {
      Object.keys(response).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: response[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: response[key][timestamps?.previous],
        };
      });
    }

    yield put(
      Creators.getOrderCountsOfDeliveryTypesSuccess({
        data: formattedResponse,
        requestDomain,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderCountsOfDeliveryTypesFailure({ error, requestDomain }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMissedOrderCountsOfDeliveryTypesRequest({ data, requestDomain, timestamps }) {
  try {
    let callFunction = getFoodMissedOrderCountsOfDeliveryTypes;

    if (data.filters.domainType === GETIR_LOCALS_DOMAIN_TYPE) {
      callFunction = getLocalsMissedOrderCountsOfDeliveryTypes;
    }

    const response = yield call(callFunction, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(response)) {
      Object.keys(response).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: response[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: response[key][timestamps?.previous],
        };
      });
    }

    yield put(
      Creators.getMissedOrderCountsOfDeliveryTypesSuccess({
        data: formattedResponse,
        requestDomain,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getMissedOrderCountsOfDeliveryTypesFailure({ error, requestDomain }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getNetRevenuesOfDeliveryTypesRequest({ data, requestDomain, timestamps }) {
  try {
    let callFunction = getFoodNetRevenuesOfDeliveryTypes;

    if (data.filters.domainType === GETIR_LOCALS_DOMAIN_TYPE) {
      callFunction = getLocalsNetRevenuesOfDeliveryTypes;
    }

    const response = yield call(callFunction, data);
    const formattedResponse = {
      current: {},
      previous: {},
    };

    if (!isEmpty(response)) {
      Object.keys(response).forEach(key => {
        formattedResponse.current = {
          ...formattedResponse.current,
          [key]: response[key][timestamps?.current],
        };
        formattedResponse.previous = {
          ...formattedResponse.previous,
          [key]: response[key][timestamps?.previous],
        };
      });
    }

    yield put(
      Creators.getNetRevenuesOfDeliveryTypesSuccess({ data: formattedResponse, requestDomain }),
    );
  }
  catch (error) {
    yield put(Creators.getNetRevenuesOfDeliveryTypesFailure({ error, requestDomain }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigWKeyRequest({ body }) {
  try {
    const { key, type } = body;
    const { customValue } = yield call(getMarketConfig, { key, type });
    yield put(Creators.getConfigWKeySuccess({ data: customValue }));
  }
  catch (error) {
    yield put(Creators.getConfigWKeyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRawDataByDateAndTypeRequest() {
  yield takeEvery(Types.GET_RAW_DATA_BY_DATE_AND_TYPE_REQUEST, getRawDataByDateAndTypeRequest);
}

function* watchGetOrderCountsRequest() {
  yield takeEvery(Types.GET_ORDER_COUNTS_REQUEST, getOrderCountsRequest);
}

function* watchGetMissedOrderCountsRequest() {
  yield takeEvery(Types.GET_MISSED_ORDER_COUNTS_REQUEST, getMissedOrderCountsRequest);
}

function* watchGetNetRevenuesRequest() {
  yield takeEvery(Types.GET_NET_REVENUES_REQUEST, getNetRevenuesRequest);
}

function* watchGetOrderCountsOfDeliveryTypesRequest() {
  yield takeEvery(
    Types.GET_ORDER_COUNTS_OF_DELIVERY_TYPES_REQUEST,
    getOrderCountsOfDeliveryTypesRequest,
  );
}

function* watchGetMissedOrderCountsOfDeliveryTypesRequest() {
  yield takeEvery(
    Types.GET_MISSED_ORDER_COUNTS_OF_DELIVERY_TYPES_REQUEST,
    getMissedOrderCountsOfDeliveryTypesRequest,
  );
}

function* watchGetNetRevenuesOfDeliveryTypesRequest() {
  yield takeEvery(
    Types.GET_NET_REVENUES_OF_DELIVERY_TYPES_REQUEST,
    getNetRevenuesOfDeliveryTypesRequest,
  );
}

function* watchGetConfigWKeyRequest() {
  yield takeLatest(Types.GET_CONFIG_W_KEY_REQUEST, getConfigWKeyRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRawDataByDateAndTypeRequest),
      fork(watchGetOrderCountsOfDeliveryTypesRequest),
      fork(watchGetMissedOrderCountsOfDeliveryTypesRequest),
      fork(watchGetNetRevenuesOfDeliveryTypesRequest),
      fork(watchGetOrderCountsRequest),
      fork(watchGetMissedOrderCountsRequest),
      fork(watchGetNetRevenuesRequest),
      fork(watchGetConfigWKeyRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
