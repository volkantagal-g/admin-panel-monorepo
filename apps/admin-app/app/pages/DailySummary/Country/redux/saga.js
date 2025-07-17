import { all, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getConfigKey } from '@shared/api/marketConfig';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';

function* getCountryDailySummaryDataRequest({ config, tableKey, dateRanges, cities, division, selectedDivisionCountries }) {
  try {
    const { endpoint, customRequestBody, errorMsg } = config;
    const requestBody = {
      ...customRequestBody,
      filters: {
        ...customRequestBody.filters,
        dateRanges,
        cities,
      },
      headers: {
        division,
        selectedDivisionCountries,
      },
    };

    const { successData, errors } = yield call(endpoint, requestBody);

    if (errors?.length) {
      yield put(ToastCreators.error({ message: errorMsg, toastOptions: { autoClose: 4000 } }));
    }
    yield put(Creators.setLastSuccessfulDateRanges({ dateRanges }));
    yield put(Creators.getCountryDailySummaryDataSuccess({ config, tableKey, data: successData }));
  }
  catch (error) {
    yield put(Creators.getCountryDailySummaryDataFailure({ config, tableKey, error }));
    const { errorMsg } = config;
    yield put(ToastCreators.error({ message: errorMsg, error }));
  }
}

function* getActiveDomainTypesConfigRequest() {
  try {
    const data = yield call(getConfigKey, {
      useApiGwCache: true,
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    });

    yield put(Creators.getActiveDomainTypesConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActiveDomainTypesConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getActiveIntegrationTypesConfigRequest() {
  try {
    const data = yield call(getConfigKey, {
      useApiGwCache: true,
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_INTEGRATION_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    });

    yield put(Creators.getActiveIntegrationTypesConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActiveIntegrationTypesConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCountryDailySummaryData() {
  yield takeEvery(Types.GET_COUNTRY_DAILY_SUMMARY_DATA_REQUEST, getCountryDailySummaryDataRequest);
}

function* watchGetActiveDomainTypesConfigRequest() {
  yield takeEvery(Types.GET_ACTIVE_DOMAIN_TYPES_CONFIG_REQUEST, getActiveDomainTypesConfigRequest);
}

function* watchGetActiveIntegrationTypesConfigRequest() {
  yield takeEvery(Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_REQUEST, getActiveIntegrationTypesConfigRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCountryDailySummaryData),
      fork(watchGetActiveDomainTypesConfigRequest),
      fork(watchGetActiveIntegrationTypesConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
