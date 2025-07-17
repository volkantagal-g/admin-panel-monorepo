import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { getClientOrderCounts, getClientDownloadSignupStats } from '@shared/api/getirMarketDashboard';
import { getOrderPromoDistributionBetweenDates } from '@shared/api/dailyTracking';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getConfigKey } from '@shared/api/marketConfig';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';

import { Types, Creators } from './actions';
import { formatDateRange } from '../utils';
import { CLIENT_ORDER_COUNTS_GROWTH_COMPARISON_GROUPS } from '../constants';
import { filtersSelector } from './selectors';
import { GetWarehouseOrderStatsParams, getWarehouseOrderStats } from '@shared/api/getirMarketDashboard/v2';
import { GetWarehouseOrderStatsType } from '@shared/api/getirMarketDashboard/type';

export function* getOrderPromoDistributionBetweenDatesRequest({ payload }) {
  const domainType = yield select(filtersSelector.getDomainTypes);
  try {
    const { startDateRange, endDateRange, ...restOfPayload } = payload;

    const firstDatePayload = {
      startDate: moment(startDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(startDateRange?.[1]).endOf('day').toISOString(),
      ...restOfPayload,
      domainTypes: [domainType],
    };
    const secondDatePayload = {
      startDate: moment(endDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(endDateRange?.[1]).endOf('day').toISOString(),
      ...restOfPayload,
      domainTypes: [domainType],
    };
    const [firstDateResult, secondDateResult] = yield all([
      call(getOrderPromoDistributionBetweenDates, firstDatePayload),
      call(getOrderPromoDistributionBetweenDates, secondDatePayload),
    ]);

    yield put(Creators.getOrderPromoDistributionBetweenDatesSuccess({
      data: {
        [formatDateRange(startDateRange)]: firstDateResult,
        [formatDateRange(endDateRange)]: secondDateResult,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getOrderPromoDistributionBetweenDatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetOrderPromoDistributionBetweenDatesRequest() {
  yield takeLatest(Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST, getOrderPromoDistributionBetweenDatesRequest);
}

export function* getClientOrderCountsRequest({ payload }) {
  const domainType = yield select(filtersSelector.getDomainTypes);
  try {
    const { startDateRange, endDateRange, cities, warehouses, integrationTypes, hours } = payload;
    const basePayload = {
      domainTypes: [domainType],
      cities,
      warehouses,
      integrationTypes,
      rankGroups: CLIENT_ORDER_COUNTS_GROWTH_COMPARISON_GROUPS,
      hours,
    };
    const firstDatePayload = removeEmptyFieldsFromParams({
      ...basePayload,
      startDate: moment(startDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(startDateRange?.[1]).endOf('day').toISOString(),
    });
    const secondDatePayload = removeEmptyFieldsFromParams({
      ...basePayload,
      startDate: moment(endDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(endDateRange?.[1]).endOf('day').toISOString(),
    });
    const [firstDateResult, secondDateResult] = yield all([
      call(getClientOrderCounts, firstDatePayload),
      call(getClientOrderCounts, secondDatePayload),
    ]);
    yield put(Creators.getClientOrderCountsSuccess({
      data: {
        [formatDateRange(startDateRange)]: firstDateResult?.rankStats,
        [formatDateRange(endDateRange)]: secondDateResult?.rankStats,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getClientOrderCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetClientOrderCountsRequest() {
  yield takeLatest(Types.GET_CLIENT_ORDER_COUNTS_REQUEST, getClientOrderCountsRequest);
}

export function* getClientDownloadSignupStatsRequest({ payload }) {
  try {
    const { startDateRange, endDateRange, cities } = payload;

    const firstDatePayload = removeEmptyFieldsFromParams({
      startDate: moment(startDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(startDateRange?.[1]).endOf('day').toISOString(),
      cities,
    });
    const secondDatePayload = removeEmptyFieldsFromParams({
      startDate: moment(endDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(endDateRange?.[1]).endOf('day').toISOString(),
      cities,
    });

    const [firstDateResult, secondDateResult] = yield all([
      call(getClientDownloadSignupStats, firstDatePayload),
      call(getClientDownloadSignupStats, secondDatePayload),
    ]);

    yield put(Creators.getClientDownloadSignupStatsSuccess({
      data: {
        [formatDateRange(startDateRange)]: firstDateResult,
        [formatDateRange(endDateRange)]: secondDateResult,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getClientDownloadSignupStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetClientDownloadSignupStatsRequest() {
  yield takeLatest(Types.GET_CLIENT_DOWNLOAD_SIGNUP_STATS_REQUEST, getClientDownloadSignupStatsRequest);
}

export function* getWarehouseStatsRequest({ payload }) {
  const domainType = yield select(filtersSelector.getDomainTypes);

  try {
    const { startDateRange, endDateRange, cities, hours, integrationTypes } = payload;
    const basePayload = {
      domainTypes: [domainType],
      cities,
      hours,
      integrationTypes,
    };
    const firstDatePayload = removeEmptyFieldsFromParams({
      ...basePayload,
      startDate: moment(startDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(startDateRange?.[1]).endOf('day').toISOString(),
    });
    const secondDatePayload = removeEmptyFieldsFromParams({
      ...basePayload,
      startDate: moment(endDateRange?.[0]).startOf('day').toISOString(),
      endDate: moment(endDateRange?.[1]).endOf('day').toISOString(),
    });

    const [firstDateResult, secondDateResult] : [GetWarehouseOrderStatsType, GetWarehouseOrderStatsType] = yield all([
      call(getWarehouseOrderStats, firstDatePayload as GetWarehouseOrderStatsParams),
      call(getWarehouseOrderStats, secondDatePayload as GetWarehouseOrderStatsParams),
    ]);

    yield put(Creators.getWarehouseStatsSuccess({
      data: {
        [formatDateRange(startDateRange)]: firstDateResult.warehouseOrderStats,
        [formatDateRange(endDateRange)]: secondDateResult.warehouseOrderStats,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getWarehouseStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetWarehouseStatsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_STATS_REQUEST, getWarehouseStatsRequest);
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

function* watchGetActiveIntegrationTypesConfigRequest() {
  yield takeLatest(Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_REQUEST, getActiveIntegrationTypesConfigRequest);
}

export default function* getirMarketGrowthComparisonPageRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOrderPromoDistributionBetweenDatesRequest),
      fork(watchGetClientOrderCountsRequest),
      fork(watchGetClientDownloadSignupStatsRequest),
      fork(watchGetWarehouseStatsRequest),
      fork(watchGetActiveIntegrationTypesConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
