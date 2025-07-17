import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import moment from 'moment-timezone';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportExcel } from '@shared/utils/common';

import { Types, Creators } from './actions';
import { filtersSelector } from './selectors';

import { getOrderGrowthMonitoringData as getOrderGrowthMonitoringDataApi } from '@shared/api/orderGrowthMonitoring';

import {
  getCityOperationStats,
  getCountryCitiesOperationStats,
  getCourierStatusCountsWithCourierPlanV2,
} from '@shared/api/businessMonitoring';
import { getWarehouseStatsForPermittedDomainType } from '@shared/api/liveMonitoring';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { CourierStatusCountWithCourierPlanResponse } from '@shared/api/businessMonitoring/types';

import {
  CsvRowDataType,
  FilterType,
  FormattedOrderGrowthMonitoringDataType,
  OperationStats,
  OperationStatsForWarehouse,
  OrderGrowthMonitoringDataType,
} from '../orderGrowthMonitoring';
import { formatDataToExport } from '../commonUtils';

function* getOrderGrowthMonitoringData() {
  const filters: FilterType = yield select(filtersSelector.getData);
  const requestBody = { onlyCityData: !!filters?.selectedCity };

  try {
    const data: OrderGrowthMonitoringDataType = yield call(getOrderGrowthMonitoringDataApi, requestBody);
    const operationData: OperationStats = yield call(getCountryCitiesOperationStats, requestBody);
    yield put(Creators.getOrderGrowthMonitoringDataSuccess({ data }));
    yield put(Creators.getOperationStatsSuccess({ data: operationData }));
  }
  catch (error) {
    yield put(Creators.getOrderGrowthMonitoringDataFailure({ error }));
    yield put(Creators.getOperationStatsFailure({ error }));
  }
}

function* getOrderGrowthMonitoringWarehouseData() {
  const filters: FilterType = yield select(filtersSelector.getData);
  const requestBody = { onlyCityData: !!filters?.selectedCity };
  const timezone: string = yield select(getSelectedCountryTimezone.getData);

  try {
    requestBody.selectedCity = filters?.selectedCity;
    const params = {
      startDate: moment.tz(timezone).subtract(1, 'day').endOf('day').toISOString(),
      endDate: moment.tz(timezone).toISOString(),
      cities: [filters.selectedCity],
      domainTypes: [GETIR_DOMAIN_TYPES.GETIR10, GETIR_DOMAIN_TYPES.MARKET, GETIR_DOMAIN_TYPES.VOYAGER],
    };

    const statsParams = { selectedCityId: filters.selectedCity };
    const courierStatusCounts: CourierStatusCountWithCourierPlanResponse = yield call(getCourierStatusCountsWithCourierPlanV2, requestBody);
    const cityOperationStats: OperationStatsForWarehouse = yield call(getCityOperationStats, statsParams);
    const { warehouseStats: warehouseData } = yield call(getWarehouseStatsForPermittedDomainType, params);

    yield put(Creators.getOrderGrowthMonitoringWarehouseDataSuccess({
      data: {
        warehouseData,
        cityOperationStats,
        courierStatusCounts,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getOrderGrowthMonitoringWarehouseDataFailure({ error }));
  }
}

function* exportCSVRequest({ domainType, dataToExport }: { domainType: number, dataToExport: [] }) {
  try {
    const { data, columns } = formatDataToExport({ dataToExport, domainType });
    const date = moment();
    exportExcel(data, `liveMonitoring_${date.format('YYYY.MM.DD HH:mm:ss')}.csv`, columns);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetOrderGrowthMonitoringDataRequest() {
  yield takeLatest(Types.GET_ORDER_GROWTH_MONITORING_DATA_REQUEST, getOrderGrowthMonitoringData);
}

function* watchGetOrderGrowthMonitoringWarehouseDataRequest() {
  yield takeLatest(Types.GET_ORDER_GROWTH_MONITORING_WAREHOUSE_DATA_REQUEST, getOrderGrowthMonitoringWarehouseData);
}

function* watchExportCSVRequest() {
  yield takeLatest(Types.EXPORT_CSV_REQUEST, exportCSVRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOrderGrowthMonitoringDataRequest),
      fork(watchGetOrderGrowthMonitoringWarehouseDataRequest),
      fork(watchExportCSVRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
