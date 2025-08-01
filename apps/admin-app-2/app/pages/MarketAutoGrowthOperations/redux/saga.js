import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { AUTO_TYPES_LOG } from '@app/pages/MarketAutoGrowthOperations/constants';
import { getUser } from '@shared/redux/selectors/auth';
import { exportAutoGrowth } from '@app/pages/MarketAutoGrowthOperations/util';
import {
  actionConfigUpdate,
  exportTargetsCSV,
  getActions,
  getChangeReasons,
  getDayTypes,
  getDomain,
  getHourTypes,
  getLimitDayTypes,
  getLimitEffectList,
  getLimitMetrics,
  getLimitPromoTypes,
  getLimits,
  getLimitWarehouseList,
  getPacketList,
  getPackets,
  getPromocode,
  getPromoset,
  getTargets,
  getTresholdTypes,
  getWarehouseList,
  getWarehouseType,
  importTargetsCSV,
  insertPacketConfig,
  insertTargetConfig,
  limitConfigUpdate,
  logUpdates,
  packetConfigUpdate,
  promosetConfigUpdate,
} from '@shared/api/marketAutoGrowthOperations';

export function* logUpdateDecorator({ domainType, tableType, changeReason, error, params }) {
  return yield put(Creators.logUpdatesRequest({
    domainType,
    userName: getUser()?.name,
    userId: getUser()?._id,
    userMail: getUser()?.email,
    tableType,
    changeReason,
    error,
    params,
  }));
}

/* GENERAL */
export function* getDomainTypeListSaga() {
  try {
    const data = yield call(getDomain);
    if (data && data !== []) {
      const [greeting] = data;
      yield put(Creators.getDomainTypeListSuccess({ data, defaultDomainType: greeting }));
    }
    else yield put(Creators.getDomainTypeListFailure({ error: 'DOMAIN_TYPE_NOT_FOUND' }));
  }
  catch (error) {
    yield put(Creators.getDomainTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getHourTypesSaga({ domainType }) {
  try {
    const data = yield call(getHourTypes, { domainType });
    yield put(Creators.getHourTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getHourTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getDayTypesSaga({ domainType }) {
  try {
    const data = yield call(getDayTypes, { domainType });
    yield put(Creators.getDayTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDayTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getChangeReasonsSaga() {
  try {
    const data = yield call(getChangeReasons);
    yield put(Creators.getChangeReasonsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getChangeReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* logUpdatesSaga({
  domainType,
  userName,
  userId,
  userMail,
  tableType,
  changeReason,
  error: hasError,
  params,
}) {
  try {
    const data = yield call(logUpdates, {
      domainType,
      userName,
      userId,
      userMail,
      tableType,
      changeReason,
      error: hasError,
      params,
    });
    yield put(Creators.logUpdatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.logUpdatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

/* PROMO SET */
export function* getPromoSetDataSaga({ domainType, promoObjectiveType, warehouseType }) {
  try {
    const data = yield call(getPromoset, { domainType, warehouseType, promoObjectiveType });
    yield put(Creators.getPromoSetSuccess({ data }));
    yield put(Creators.getAggListRequest({ domainType, warehouseType, promoObjectiveType }));
  }
  catch (error) {
    yield put(Creators.getPromoSetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getPromoWarehouseTypeListSaga({ domainType }) {
  try {
    const data = yield call(getWarehouseType, { domainType });
    yield put(Creators.getPromoWarehouseTypeListSuccess({ data }));

    const selectedPromo = yield select(promoSetSelector.selectedPromo);
    const selectedWarehouse = yield select(promoSetSelector.selectedWarehouse);

    if (domainType !== '' && selectedPromo !== '' && selectedWarehouse !== '') {
      yield put(Creators.getPromoSetRequest({
        domainType,
        promoObjectiveType: selectedPromo,
        warehouseType: selectedWarehouse,
      }));
    }
  }
  catch (error) {
    yield put(Creators.getPromoWarehouseTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAggListSaga({ domainType, promoObjectiveType, warehouseType }) {
  try {
    const data = yield call(getPromocode, { domainType, promoObjectiveType, warehouseType });
    yield put(Creators.getAggListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAggListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* insertPackageConfigSaga({ insertData, changeReason, afterSuccess }) {
  const {
    domainType,
    warehouseType,
    promoObjectiveType,
    bucketType,
    packet,
    secondPacket,
    active,
    isUpdated,
  } = insertData;

  try {
    const status = yield call(insertPacketConfig, {
      domainType,
      warehouseType,
      promoObjectiveType,
      bucketType,
      packet,
      secondPacket,
      active,
      isUpdated,
    });
    if (status === true) {
      yield put(Creators.insertPackageConfigSuccess({ data: insertData }));
      yield put(Creators.addBucketLine({ data: afterSuccess }));
      yield call(logUpdateDecorator, {
        domainType,
        tableType: AUTO_TYPES_LOG.PROMOSET,
        changeReason,
        error: false,
        params: {
          warehouseType,
          promoType: promoObjectiveType,
        },
      });
      yield put(Creators.getPromoSetRequest({ domainType, promoObjectiveType, warehouseType }));
      yield put(Creators.getPacketRequest({ domainType }));
    }
    else {
      yield put(Creators.insertPackageConfigFailure({ error: 'FAIL_PLEASE_CHECK' }));
      yield call(logUpdateDecorator, {
        domainType,
        tableType: AUTO_TYPES_LOG.PROMOSET,
        changeReason,
        error: true,
        params: {
          warehouseType,
          promoType: promoObjectiveType,
          errorMessage: 'Fail, please check!',
        },
      });
    }
  }
  catch (error) {
    yield put(Creators.insertPackageConfigFailure({ error }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.PROMOSET,
      changeReason,
      error: true,
      params: {
        warehouseType,
        promoType: promoObjectiveType,
        errorMessage: error?.message,
      },
    });
    yield put(ToastCreators.error({ error }));
  }
}

export function* promosetConfigUpdateSaga({ promoObjectiveType, warehouseType, domainType, updateData, changeReason }) {
  try {
    const tempUpdateData = updateData.map(element => {
      if (element && typeof element?.set !== 'number') {
        const newElement = element;
        newElement.set = parseFloat(element.set);
        return newElement;
      }
      return element;
    });
    const data = yield call(promosetConfigUpdate, {
      promoObjectiveType,
      warehouseType,
      domainType,
      updateData: tempUpdateData,
    });
    yield put(Creators.promosetConfigUpdateSuccess({ data }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.PROMOSET,
      changeReason,
      error: false,
      params: {
        warehouseType,
        promoType: promoObjectiveType,
      },
    });

    yield call(getPromoWarehouseTypeListSaga, { domainType });
    yield put(Creators.getPacketRequest({ domainType }));
  }
  catch (error) {
    yield put(Creators.promosetConfigUpdateFailure({ error }));
    yield put(Creators.getPromoSetRequest({ promoObjectiveType, warehouseType, domainType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.PROMOSET,
      changeReason,
      error: true,
      params: {
        warehouseType,
        promoType: promoObjectiveType,
        errorMessage: error?.message,
      },
    });
    yield put(ToastCreators.error({ error }));
  }
}

/* TARGET */
export function* getTargetSaga({ year, month, domainType, warehouseType }) {
  try {
    const data = yield call(getTargets, { year, month, domainType, warehouseType });
    yield put(Creators.getTargetSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTargetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* insertTargetConfigSaga({ domainType, year, month, updateData, changeReason, warehouseType }) {
  try {
    const filteredData = updateData.filter(item => item.is_updated === 1);
    yield call(insertTargetConfig, { domainType, year, month, updateData: filteredData, warehouseType });
    yield put(Creators.insertTargetConfigSuccess());
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.TARGET,
      changeReason,
      error: false,
      params: { year, month },
    });
    yield put(Creators.getTargetRequest({ year, month, domainType, warehouseType }));
  }
  catch (error) {
    yield put(Creators.insertTargetConfigFailure({ error }));
    yield put(Creators.getTargetRequest({ year, month, domainType, warehouseType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.TARGET,
      changeReason,
      error: true,
      params: { year, month, errorMessage: error?.message },
    });
    yield put(ToastCreators.error({ error }));
  }
}

/* PACKET */
export function* getPacketSaga({ domainType }) {
  try {
    const data = yield call(getPackets, { domainType });
    yield put(Creators.getPacketSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPacketFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updatePacketConfigSaga({ domainType, updateData, changeReason }) {
  try {
    const data = yield call(packetConfigUpdate, { domainType, updateData });
    yield put(Creators.updatePacketConfigSuccess({ data }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.PACKET,
      changeReason,
      error: false,
      params: {},
    });
    yield put(Creators.getPacketRequest({ domainType }));
  }
  catch (error) {
    yield put(Creators.updatePacketConfigFailure({ error }));
    yield put(Creators.getPacketRequest({ domainType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.PACKET,
      changeReason,
      error: true,
      params: { errorMessage: error?.message },
    });
    yield put(ToastCreators.error({ error }));
  }
}

/* ACTION */
export function* getActionSaga({ domainType }) {
  try {
    const data = yield call(getActions, { domainType });
    yield put(Creators.getActionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getPacketListSaga({ domainType }) {
  try {
    const data = yield call(getPacketList, { domainType });
    yield put(Creators.getPacketListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPacketListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getWarehouseListSaga({ domainType }) {
  try {
    const data = yield call(getWarehouseList, { domainType });
    yield put(Creators.getWarehouseListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* actionConfigUpdateSaga({ domainType, updateData, changeReason }) {
  try {
    const data = yield call(actionConfigUpdate, { domainType, updateData });
    yield put(Creators.actionConfigUpdateSuccess({ data }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.ACTION,
      changeReason,
      error: false,
      params: {},
    });
  }
  catch (error) {
    yield put(Creators.actionConfigUpdateFailure({ error }));
    yield put(Creators.getActionRequest({ domainType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.ACTION,
      changeReason,
      error: true,
      params: { errorMessage: error?.message },
    });
    yield put(ToastCreators.error({ error }));
  }
}

/* LİMİT */
export function* getLimitsSaga({ domainType }) {
  try {
    const data = yield call(getLimits, { domainType });
    yield put(Creators.getLimitsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLimitDayTypesSaga({ domainType }) {
  try {
    const data = yield call(getLimitDayTypes, { domainType });
    yield put(Creators.getLimitDayTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitDayTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLimitMetricsSaga({ domainType }) {
  try {
    const data = yield call(getLimitMetrics, { domainType });
    yield put(Creators.getLimitMetricsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitMetricsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLimitPromoTypesSaga({ domainType }) {
  try {
    const data = yield call(getLimitPromoTypes, { domainType });
    yield put(Creators.getLimitPromoTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitPromoTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getThresholdTypesSaga({ domainType }) {
  try {
    const data = yield call(getTresholdTypes, { domainType });
    yield put(Creators.getTresholdTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTresholdTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLimitWarehouseListSaga({ domainType }) {
  try {
    const data = yield call(getLimitWarehouseList, { domainType });
    yield put(Creators.getLimitWarehouseListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitWarehouseListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getLimitEffectListSaga({ domainType }) {
  try {
    const data = yield call(getLimitEffectList, { domainType });
    yield put(Creators.getLimitEffectListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLimitEffectListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* limitConfigUpdateSaga({ domainType, updateData, changeReason }) {
  try {
    const data = yield call(limitConfigUpdate, { domainType, updateData });
    yield put(Creators.limitConfigUpdateSuccess({ data }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.LIMIT,
      changeReason,
      error: false,
      params: {},
    });
  }
  catch (error) {
    yield put(Creators.limitConfigUpdateFailure({ error }));
    yield put(Creators.getLimitsRequest({ domainType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.LIMIT,
      changeReason,
      error: true,
      params: { errorMessage: error?.message },
    });
    yield put(ToastCreators.error({ error }));
  }
}

function* exportSaga({ data }) {
  try {
    exportAutoGrowth(data);
    yield put(Creators.exportSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importTargetsCSVRequest({ domainType, year, month, updateData, selectedReason, warehouseType }) {
  try {
    const payload = updateData.map(item => ({
      date: item.date,
      is_updated: 1,
      cpTarget: item.cpTarget?.toString(),
      orderTarget: item.orderTarget?.toString(),
      warehouseType: item.segment === '*' ? undefined : item.segment,
    }));
    yield call(importTargetsCSV, { domainType, year, month, updateData: payload });
    yield put(Creators.importTargetsCSVSuccess({ data: payload }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.TARGET,
      changeReason: selectedReason,
      error: false,
      params: { year, month },
    });
    yield put(Creators.getTargetRequest({ year, month, domainType, warehouseType }));
  }
  catch (error) {
    yield put(Creators.importTargetsCSVFailure({ error }));
    yield put(Creators.getTargetRequest({ year, month, domainType, warehouseType }));
    yield call(logUpdateDecorator, {
      domainType,
      tableType: AUTO_TYPES_LOG.TARGET,
      changeReason: selectedReason,
      error: true,
      params: { year, month, errorMessage: error?.message },
    });
    yield put(ToastCreators.error({ error }));
  }
}

function* exportTargetsCSVRequest({ domainType, year, month }) {
  try {
    const data = yield call(exportTargetsCSV, { domainType, year, month });
    let csvTitle = [];
    csvTitle = data?.length > 0 && Object.keys(data[0]).map(key => {
      return ({ key, title: key, default: '' });
    });
    const csvContent = { fields: csvTitle, content: data };
    exportAutoGrowth(csvContent);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export default function* autoGrowthSagaRoot() {
  /* GENERAL */
  yield takeLatest(Types.GET_DOMAIN_TYPE_LIST_REQUEST, getDomainTypeListSaga);
  yield takeLatest(Types.GET_HOUR_TYPES_REQUEST, getHourTypesSaga);
  yield takeLatest(Types.GET_DAY_TYPES_REQUEST, getDayTypesSaga);
  yield takeLatest(Types.LOG_UPDATES_REQUEST, logUpdatesSaga);
  yield takeLatest(Types.GET_CHANGE_REASONS_REQUEST, getChangeReasonsSaga);
  yield takeLatest(Types.EXPORT_REQUEST, exportSaga);

  /* PROMO SET */
  yield takeLatest(Types.GET_PROMO_SET_REQUEST, getPromoSetDataSaga);
  yield takeLatest(Types.GET_PROMO_WAREHOUSE_TYPE_LIST_REQUEST, getPromoWarehouseTypeListSaga);
  yield takeLatest(Types.GET_AGG_LIST_REQUEST, getAggListSaga);
  yield takeLatest(Types.INSERT_PACKAGE_CONFIG_REQUEST, insertPackageConfigSaga);
  yield takeLatest(Types.PROMOSET_CONFIG_UPDATE_REQUEST, promosetConfigUpdateSaga);

  /* TARGET */
  yield takeLatest(Types.GET_TARGET_REQUEST, getTargetSaga);
  yield takeLatest(Types.INSERT_TARGET_CONFIG_REQUEST, insertTargetConfigSaga);

  /* PACKET */
  yield takeLatest(Types.GET_PACKET_REQUEST, getPacketSaga);
  yield takeLatest(Types.UPDATE_PACKET_CONFIG_REQUEST, updatePacketConfigSaga);

  /* ACTION */
  yield takeLatest(Types.GET_ACTION_REQUEST, getActionSaga);
  yield takeLatest(Types.GET_WAREHOUSE_LIST_REQUEST, getWarehouseListSaga);
  yield takeLatest(Types.GET_PACKET_LIST_REQUEST, getPacketListSaga);
  yield takeLatest(Types.ACTION_CONFIG_UPDATE_REQUEST, actionConfigUpdateSaga);

  /* LİMİT */
  yield takeLatest(Types.GET_LIMITS_REQUEST, getLimitsSaga);
  yield takeLatest(Types.GET_LIMIT_DAY_TYPES_REQUEST, getLimitDayTypesSaga);
  yield takeLatest(Types.GET_LIMIT_METRICS_REQUEST, getLimitMetricsSaga);
  yield takeLatest(Types.GET_LIMIT_PROMO_TYPES_REQUEST, getLimitPromoTypesSaga);
  yield takeLatest(Types.GET_TRESHOLD_TYPES_REQUEST, getThresholdTypesSaga);
  yield takeLatest(Types.LIMIT_CONFIG_UPDATE_REQUEST, limitConfigUpdateSaga);
  yield takeLatest(Types.GET_LIMIT_EFFECT_LIST_REQUEST, getLimitEffectListSaga);
  yield takeLatest(Types.GET_LIMIT_WAREHOUSE_LIST_REQUEST, getLimitWarehouseListSaga);
  yield takeLatest(Types.IMPORT_TARGETS_CSV_REQUEST, importTargetsCSVRequest);
  yield takeLatest(Types.EXPORT_TARGETS_CSV_REQUEST, exportTargetsCSVRequest);
}
