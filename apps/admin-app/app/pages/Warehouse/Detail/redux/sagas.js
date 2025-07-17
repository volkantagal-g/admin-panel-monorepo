import { all, call, cancel, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import {
  getWarehouseById,
  updateWarehouseInfo,
  updateWarehouseAddress,
  updateWarehouseType,
  updateWarehouseGLN,
  updateWarehouseDomainTypes,
  updateWarehouseMainStore,
  unassignFranchise,
  assignFranchise,
  updateWarehouseBusinessDecisions,
  updateWarehouseConfig,
  archiveWarehouse,
  deactivateWarehouse,
  activateWarehouse,
  updateWarehouseStatus,
  updateBaseWorkingHoursType,
  updateWarehouseManpower,
  updateAlgorithmConfig,
  getWarehouseSegments,
  updateWarehouseDeliveryFeeSegment,
  updateWarehouseProductPricingSegment,
  updateWarehousePromoAggressionLevel,
  updateWarehouseTestStatus,
  updateWarehouseAcceptReturns,
  updateBasePeakHoursType,
  getWarehouseShipmentFrequencies,
  getWarehouseShipmentPreparations,
  addWarehouseShipmentFrequency,
  addWarehouseShipmentPreparation,
  getShipmentFrequencies,
  getShipmentPreparations,
  updateWarehouseShipmentFrequency,
  updateWarehouseShipmentPreparation,
  assignFranchiseArea,
  updateWarehouseBudgetInfo,
  updateTransferReceiving,
  getFilteredWarehouses,
} from '@shared/api/warehouse';
import { getEmployeesPure } from '@shared/api/employee';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  deleteTransferGroupOfWarehouse,
  getWarehouseTransferGroupByWarehouse,
  updateTransferGroupOfWarehouse,
} from '@shared/api/transferGroup';

import {
  getWorkingHours,
  createWarehouseWorkingHours,
  updateWorkingHoursByWarehouse,
  updateWorkingHoursMessageByWarehouse,
} from '@shared/api/workingHours';
import {
  CITY_BASE_PEAK_HOURS,
  CITY_BASE_WORKING_HOURS,
  COUNTRY_BASE_WORKING_HOURS,
  GETIR_MARKET_DOMAIN_TYPES,
  GETIR_WORKING_HOURS_DOMAIN_TYPES,
  HTTP_STATUS_CODE,
  WAREHOUSE_BASE_PEAK_HOURS,
  WAREHOUSE_BASE_WORKING_HOURS,
  WAREHOUSE_HAS_NOT_PEAK_HOURS,
  WAREHOUSE_HAS_NOT_WORKING_HOURS,
} from '@shared/shared/constants';

import { createRequestBody } from '@shared/utils/warehouse';
import {
  createNewBlock,
  createNewSection,
  getWarehouseLocationTemplates,
  getWarehouseSections,
  saveWarehouseLocationSelfCode,
  updateLocationWriteOffEnabled,
  updateWarehouseLocationActivate,
  updateWarehouseLocationAllowedForTransfer,
  updateWarehouseLocationArchive,
  updateWarehouseLocationDeactivate,
} from '@shared/api/warehouseLocation';
import { warehouseSelector } from './selectors';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { createWarehousePeakHours, getPeakHours, updatePeakHoursByWarehouse, updatePeakHoursMessageByWarehouse } from '@shared/api/peakHours';

function* getWarehouseRequest({ id }) {
  try {
    const data = yield call(getWarehouseById, { id });
    const { warehouseTransferGroup } = yield call(getWarehouseTransferGroupByWarehouse, { warehouse: id });
    yield call(watchGetWorkingHours, data);
    yield call(watchGetPeakHours, data);
    yield put(Creators.getWarehouseTransferGroupSuccess({ data: warehouseTransferGroup }));
    yield put(Creators.getWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    // this is workaround solution, it will be removed soon
    if (error?.response?.status === HTTP_STATUS_CODE.BAD_REQUEST) {
      history.push(ROUTE.WAREHOUSE_LIST.path);
    }
  }
}

function* watchGetWarehouseRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_REQUEST, getWarehouseRequest);
}

function* getEmployeesRequest() {
  try {
    const { employees } = yield call(getEmployeesPure, {});
    yield put(Creators.getEmployeesSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeesRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_REQUEST, getEmployeesRequest);
}

function* getWarehouseShipmentFrequenciesRequest({ warehouseId }) {
  try {
    const warehouseShipmentFrequencies = yield call(getWarehouseShipmentFrequencies, { warehouseId });
    yield put(Creators.getWarehouseShipmentFrequenciesSuccess({ data: warehouseShipmentFrequencies }));
  }
  catch (error) {
    yield put(Creators.getWarehouseShipmentFrequenciesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseShipmentFrequenciesRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SHIPMENT_FREQUENCIES_REQUEST, getWarehouseShipmentFrequenciesRequest);
}

function* getWarehouseShipmentPreparationsRequest({ warehouseId }) {
  try {
    const warehouseShipmentPreparations = yield call(getWarehouseShipmentPreparations, { warehouseId });
    yield put(Creators.getWarehouseShipmentPreparationsSuccess({ data: warehouseShipmentPreparations }));
  }
  catch (error) {
    yield put(Creators.getWarehouseShipmentPreparationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseShipmentPreparationsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SHIPMENT_PREPARATIONS_REQUEST, getWarehouseShipmentPreparationsRequest);
}

function* addWarehouseShipmentFrequencyRequest({ warehouseId, shipmentFrequency }) {
  try {
    yield call(addWarehouseShipmentFrequency, { warehouseId, shipmentFrequency });
    yield call(getWarehouseShipmentFrequenciesRequest, { warehouseId });
  }
  catch (error) {
    yield put(Creators.addWarehouseShipmentFrequencyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddWarehouseShipmentFrequencyRequest() {
  yield takeLatest(Types.ADD_WAREHOUSE_SHIPMENT_FREQUENCY_REQUEST, addWarehouseShipmentFrequencyRequest);
}

function* addWarehouseShipmentPreparationRequest({ warehouseId, shipmentPreparation }) {
  try {
    yield call(addWarehouseShipmentPreparation, { warehouseId, shipmentPreparation });
    yield call(getWarehouseShipmentPreparationsRequest, { warehouseId });
  }
  catch (error) {
    yield put(Creators.addWarehouseShipmentPreparationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddWarehouseShipmentPreparationRequest() {
  yield takeLatest(Types.ADD_WAREHOUSE_SHIPMENT_PREPARATION_REQUEST, addWarehouseShipmentPreparationRequest);
}

function* updateWarehouseShipmentFrequencyRequest({ warehouseId, shipmentFrequency }) {
  try {
    yield call(updateWarehouseShipmentFrequency, { warehouseId, shipmentFrequency });
    yield call(getWarehouseShipmentFrequenciesRequest, { warehouseId });
  }
  catch (error) {
    yield put(Creators.updateWarehouseShipmentFrequencyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateWarehouseShipmentFrequencyRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_SHIPMENT_FREQUENCY_REQUEST, updateWarehouseShipmentFrequencyRequest);
}

function* updateWarehouseShipmentPreparationRequest({ warehouseId, shipmentPreparation }) {
  try {
    yield call(updateWarehouseShipmentPreparation, { warehouseId, shipmentPreparation });
    yield call(getWarehouseShipmentPreparationsRequest, { warehouseId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateWarehouseShipmentPreparationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateWarehouseShipmentPreparationRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_SHIPMENT_PREPARATION_REQUEST, updateWarehouseShipmentPreparationRequest);
}

function* getShipmentFrequenciesRequest() {
  try {
    const shipmentFrequencies = yield call(getShipmentFrequencies, {});
    yield put(Creators.getShipmentFrequenciesSuccess({ data: shipmentFrequencies }));
  }
  catch (error) {
    yield put(Creators.getShipmentFrequenciesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetShipmentFrequenciesRequest() {
  yield takeLatest(Types.GET_SHIPMENT_FREQUENCIES_REQUEST, getShipmentFrequenciesRequest);
}

function* getShipmentPreparationsRequest() {
  try {
    const shipmentPreparations = yield call(getShipmentPreparations, {});
    yield put(Creators.getShipmentPreparationsSuccess({ data: shipmentPreparations }));
  }
  catch (error) {
    yield put(Creators.getShipmentPreparationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetShipmentPreparationsRequest() {
  yield takeLatest(Types.GET_SHIPMENT_PREPARATIONS_REQUEST, getShipmentPreparationsRequest);
}

// eslint-disable-next-line consistent-return
function* watchGetWorkingHours(warehouseObject) {
  try {
    const { _id, baseWorkingHourType, city, country } = warehouseObject;
    const requestParams = { types: [baseWorkingHourType || CITY_BASE_WORKING_HOURS] };

    switch (baseWorkingHourType) {
      case COUNTRY_BASE_WORKING_HOURS:
        requestParams.countryIds = [country._id];
        break;
      case WAREHOUSE_BASE_WORKING_HOURS:
        requestParams.warehouseIds = [_id];
        break;
      case CITY_BASE_WORKING_HOURS:
      default:
        requestParams.cityIds = [city._id];
        break;
    }

    const { workingHours: data } = yield call(getWorkingHours, requestParams);
    yield put(Creators.getWarehouseWorkingHoursSuccess({ data }));
    return data;
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPeakHours(warehouseObject) {
  try {
    const { _id, basePeakHourType, city } = warehouseObject;
    const requestParams = { types: [basePeakHourType || CITY_BASE_PEAK_HOURS] };
    switch (basePeakHourType) {
      case WAREHOUSE_BASE_PEAK_HOURS:
        requestParams.warehouseIds = [_id];
        break;
      case CITY_BASE_PEAK_HOURS:
      default:
        requestParams.cityIds = [city._id];
        break;
    }

    const { peakHours: data } = yield call(getPeakHours, requestParams);
    yield put(Creators.getWarehousePeakHoursSuccess({ data }));
    return data;
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    return null;
  }
}

function* updateWarehouseInfoRequest({ id, updateData }) {
  try {
    const { warehouseGLN, ...warehouseData } = updateData;
    let { warehouse: data } = yield call(updateWarehouseInfo, { id, updateData: warehouseData });
    if (warehouseGLN !== data.warehouseGLN.toString()) {
      try {
        const { warehouse: gln } = yield call(updateWarehouseGLN, { id, warehouseGLN });
        data = { ...data, ...gln };
      }
      catch (error) {
        yield put(ToastCreators.error({ error }));
      }
    }
    yield put(Creators.updateWarehouseInfoSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseInfoFailure(error));
  }
}

function* watchUpdateWarehouseInfoRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_INFO_REQUEST, updateWarehouseInfoRequest);
}

function* updateWarehouseBudgetInfoRequest({ id, SAPReferenceCode, updatedBudgetInfoData }) {
  try {
    const { budgetItem: data } = yield call(updateWarehouseBudgetInfo, { id, SAPReferenceCode, updatedBudgetInfoData });
    yield put(Creators.updateWarehouseBudgetInfoSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseBudgetInfoFailure(error));
  }
}

function* watchUpdateWarehouseBudgetInfoRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_BUDGET_INFO_REQUEST, updateWarehouseBudgetInfoRequest);
}

function* updateWarehouseTestStatusRequest(warehouseData) {
  try {
    const data = yield call(updateWarehouseTestStatus, warehouseData);
    const { isTestWarehouse } = data;
    yield put(Creators.updateWarehouseTestStatusSuccess({ isTestWarehouse }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseInfoFailure(error));
  }
}

function* watchUpdateWarehouseTestStatusRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_TEST_STATUS_REQUEST, updateWarehouseTestStatusRequest);
}

function* updateWarehouseAcceptReturnsRequest(warehouseData) {
  try {
    const data = yield call(updateWarehouseAcceptReturns, warehouseData);
    const { acceptReturns } = data;
    yield put(Creators.updateWarehouseAcceptReturnsSuccess({ acceptReturns }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseAcceptReturnsFailure(error));
  }
}

function* watchUpdateWarehouseAcceptReturnsRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_ACCEPT_RETURNS_REQUEST, updateWarehouseAcceptReturnsRequest);
}

function* updateWarehouseAddressRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseAddress, { id, updateData });
    yield put(Creators.updateWarehouseAddressSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseAddressFailure(error));
  }
}

function* watchUpdateWarehouseAddressRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_ADDRESS_REQUEST, updateWarehouseAddressRequest);
}

export function* updateTransferReceivingRequest({ id, updateData }) {
  try {
    const { transferReceivingWindows } = yield call(updateTransferReceiving, { id, updateData });
    yield put(Creators.updateTransferReceivingSuccess({ data: transferReceivingWindows }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateTransferReceivingFailure(error));
  }
}

function* watchUpdateTransferReceivingRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_RECEIVING_REQUEST, updateTransferReceivingRequest);
}

function* updateWarehouseTypeRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseType, { id, updateData });
    yield put(Creators.updateWarehouseTypeSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseTypeFailure(error));
  }
}

function* watchUpdateWarehouseTypeRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_TYPE_REQUEST, updateWarehouseTypeRequest);
}

function* updateWarehouseDomainTypesRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseDomainTypes, { id, updateData });
    yield put(Creators.updateWarehouseDomainTypesSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseDomainTypesFailure(error));
  }
}

function* watchUpdateWarehouseDomainTypesRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_DOMAIN_TYPES_REQUEST, updateWarehouseDomainTypesRequest);
}

function* updateWarehouseMainStoreRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseMainStore, { id, updateData });
    yield put(Creators.updateWarehouseMainStoreSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseMainStoreFailure(error));
  }
}

function* watchUpdateWarehouseMainStoreRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_MAIN_STORE_REQUEST, updateWarehouseMainStoreRequest);
}

function* updateWarehouseManpowerRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseManpower, { id, updateData });
    yield put(Creators.updateWarehouseManpowerSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseManpowerFailure(error));
  }
}

function* updateAlgorithmConfigRequest({ warehouseId, algorithmConfig }) {
  try {
    yield call(updateAlgorithmConfig, { warehouseId, algorithmConfig: JSON.parse(algorithmConfig) });
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateAlgorithmConfigFailure(error));
  }
}

function* watchUpdateWarehouseManpowerRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_MANPOWER_REQUEST, updateWarehouseManpowerRequest);
}
function* watchUpdateAlgorithmConfigRequest() {
  yield takeLatest(Types.UPDATE_ALGORITHM_CONFIG_REQUEST, updateAlgorithmConfigRequest);
}

function* unassignFranchiseRequest({ id, franchiseId }) {
  try {
    const data = yield call(unassignFranchise, { id, franchiseId });
    yield put(Creators.unassignFranchiseSuccess({ data }));
    yield put(Creators.getWarehouseRequest({ id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.unassignFranchiseFailure(error));
  }
}

function* watchUnassignFranchiseRequest() {
  yield takeLatest(Types.UNASSIGN_FRANCHISE_REQUEST, unassignFranchiseRequest);
}

function* assignFranchiseRequest({ id, franchiseId }) {
  try {
    const data = yield call(assignFranchise, { id, franchiseId });
    yield put(Creators.assignFranchiseSuccess({ data }));
    yield put(Creators.getWarehouseRequest({ id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.assignFranchiseFailure(error));
  }
}

function* watchAssignFranchiseRequest() {
  yield takeLatest(Types.ASSIGN_FRANCHISE_REQUEST, assignFranchiseRequest);
}

function* updateWarehouseBusinessDecisionsRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseBusinessDecisions, { id, updateData });
    yield put(Creators.updateWarehouseBusinessDecisionsSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseBusinessDecisionsFailure(error));
  }
}

function* watchUpdateWarehouseBusinessDecisionsRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_BUSINESS_DECISIONS_REQUEST, updateWarehouseBusinessDecisionsRequest);
}

function* updateWarehouseConfigRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseConfig, { id, updateData });
    yield put(Creators.updateWarehouseConfigSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseConfigFailure(error));
  }
}

function* watchUpdateWarehouseConfigRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_CONFIG_REQUEST, updateWarehouseConfigRequest);
}

function* archiveWarehouseRequest({ id }) {
  try {
    const { warehouse: data } = yield call(archiveWarehouse, { id });
    yield put(Creators.archiveWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.archiveWarehouseFailure(error));
  }
}

function* watchArchiveWarehouseRequest() {
  yield takeLatest(Types.ARCHIVE_WAREHOUSE_REQUEST, archiveWarehouseRequest);
}

function* deactivateWarehouseRequest({ id }) {
  try {
    const { warehouse: data } = yield call(deactivateWarehouse, { id });
    yield put(Creators.deactivateWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.deactivateWarehouseFailure(error));
  }
}

function* watchDeactivateWarehouseRequest() {
  yield takeLatest(Types.DEACTIVATE_WAREHOUSE_REQUEST, deactivateWarehouseRequest);
}

function* activateWarehouseRequest({ id }) {
  try {
    const { warehouse: data } = yield call(activateWarehouse, { id });
    yield put(Creators.activateWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.activateWarehouseFailure(error));
  }
}

function* watchActivateWarehouseRequest() {
  yield takeLatest(Types.ACTIVATE_WAREHOUSE_REQUEST, activateWarehouseRequest);
}

function* updateWarehouseStatusRequest({ id, updateData }) {
  try {
    const { warehouse: data } = yield call(updateWarehouseStatus, { id, updateData });
    yield put(Creators.updateWarehouseStatusSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseStatusFailure(error));
  }
}

function* watchUpdateWarehouseStatusRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_STATUS_REQUEST, updateWarehouseStatusRequest);
}

function* updateTransferGroupOfWarehouseRequest({ warehouse, transferGroup }) {
  try {
    const { warehouseTransferGroup: data } = yield call(updateTransferGroupOfWarehouse, { warehouse, transferGroup });
    yield put(Creators.updateTransferGroupOfWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateTransferGroupOfWarehouseFailure(error));
  }
}

function* watchUpdateTransferGroupOfWarehouseRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSE_REQUEST, updateTransferGroupOfWarehouseRequest);
}

function* deleteTransferGroupOfWarehouseRequest({ warehouse }) {
  try {
    yield call(deleteTransferGroupOfWarehouse, { warehouse });
    yield put(Creators.deleteTransferGroupOfWarehouseSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.deleteTransferGroupOfWarehouseFailure(error));
  }
}

function* watchDeleteTransferGroupOfWarehouseRequest() {
  yield takeLatest(Types.DELETE_TRANSFER_GROUP_OF_WAREHOUSE_REQUEST, deleteTransferGroupOfWarehouseRequest);
}

function* watchCreateWarehouseWorkingHours(warehouseObject, workingHours) {
  try {
    const { country, city, region, id, domainTypes } = warehouseObject;
    const getirMarketDomainTypes = new Set(GETIR_WORKING_HOURS_DOMAIN_TYPES);
    const warehouseWorkingHours = new Set(workingHours);

    const allForks = yield all(domainTypes.map(domainType => {
      if (!warehouseWorkingHours.has(domainType) && getirMarketDomainTypes.has(domainType)) {
        const requestBody = createRequestBody({
          countryId: country._id,
          cityId: city._id,
          regionId: region._id,
          warehouseId: id,
          domainType,
        });
        // eslint-disable-next-line consistent-return
        return fork(createWarehouseWorkingHours, requestBody);
      }
      return false;
    }));
    const shouldTriggerRequestAgain = allForks.some(forkItem => {
      return forkItem !== false;
    });
    if (shouldTriggerRequestAgain) {
      yield delay(1000);
      yield call(watchGetWorkingHours, warehouseObject);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateBaseWorkingHoursTypeFailure(error));
  }
}

function* updateBaseWorkingHoursTypeRequest({ id, updateData }) {
  let tempId;
  let tempUpdateData;
  try {
    [tempId, tempUpdateData] = [id, updateData];
    const { warehouse: data } = yield call(updateBaseWorkingHoursType, { id, updateData });
    yield put(Creators.getWarehouseSuccess({ data }));
    const workingHours = yield call(watchGetWorkingHours, data);
    const mappedWorkingHours = workingHours.map(workingHour => {
      return workingHour.domainType;
    });
    const workingHoursType = updateData.baseWorkingHourType;
    if (workingHoursType === WAREHOUSE_BASE_WORKING_HOURS && !(_.isEqual(mappedWorkingHours, data.domainTypes))) {
      yield call(watchCreateWarehouseWorkingHours, data, mappedWorkingHours);
    }
  }
  catch (error) {
    const errorCode = _.get(error, 'response.data.code');
    if (errorCode === WAREHOUSE_HAS_NOT_WORKING_HOURS) {
      const warehouseObject = yield select(warehouseSelector.getData);
      yield call(watchCreateWarehouseWorkingHours, warehouseObject, []);
      yield put(Creators.updateBaseWorkingHoursTypeRequest({ id: tempId, updateData: tempUpdateData }));
    }
    else {
      yield put(ToastCreators.error({ error }));
      yield put(Creators.updateBaseWorkingHoursTypeFailure(error));
    }
  }
}

function* watchUpdateBaseWorkingHoursTypeRequest() {
  yield takeLatest(Types.UPDATE_BASE_WORKING_HOURS_TYPE_REQUEST, updateBaseWorkingHoursTypeRequest);
}

function* updateWorkingHoursRequest({ id, updateData }) {
  try {
    const data = yield call(updateWorkingHoursByWarehouse, { id, updateData });
    yield put(Creators.updateWorkingHoursSuccess(data));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateBaseWorkingHoursTypeFailure(error));
  }
}

function* watchUpdateWorkingHoursRequest() {
  yield takeLatest(Types.UPDATE_WORKING_HOURS_REQUEST, updateWorkingHoursRequest);
}

function* updateWorkingHoursMessageRequest({ id, updateData }) {
  try {
    const { workingHours } = yield call(updateWorkingHoursMessageByWarehouse, { id, updateData });
    yield put(Creators.updateWorkingHoursMessageSuccess(workingHours));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWorkingHoursMessageSuccess(error));
  }
}

function* watchUpdateWorkingHoursMessageRequest() {
  yield takeLatest(Types.UPDATE_WORKING_HOURS_MESSAGE_REQUEST, updateWorkingHoursMessageRequest);
}

function* watchCreateWarehousePeakHours(warehouseObject, peakHours) {
  try {
    const { city, region, id, domainTypes } = warehouseObject;
    const getirMarketDomainTypes = new Set(GETIR_MARKET_DOMAIN_TYPES);
    const warehousePeakHours = new Set(peakHours);
    const allForks = yield all(domainTypes
      .filter(domainType => (!warehousePeakHours.has(domainType) && getirMarketDomainTypes.has(domainType)))
      .map(domainType => {
        const requestBody = createRequestBody({
          cityId: city._id,
          regionId: region._id,
          warehouseId: id,
          domainType,
        });
        return call(createWarehousePeakHours, requestBody);
      }));
    if (allForks.length > 0) {
      yield delay(1000);
      yield call(watchGetPeakHours, warehouseObject);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateBasePeakHoursTypeFailure(error));
  }
}

function* updateBasePeakHoursTypeRequest({ id, updateData }) {
  let tempId;
  let tempUpdateData;
  try {
    [tempId, tempUpdateData] = [id, updateData];
    const { warehouse: data } = yield call(updateBasePeakHoursType, { id, updateData });
    yield put(Creators.getWarehouseSuccess({ data }));
    const peakHours = yield call(watchGetPeakHours, data);
    const mappedPeakHours = peakHours.map(peakHour => {
      return peakHour.domainType;
    });
    const peakHoursType = updateData.basePeakHourType;
    if (peakHoursType === WAREHOUSE_BASE_PEAK_HOURS && !(_.isEqual(mappedPeakHours, data.domainTypes))) {
      yield call(watchCreateWarehousePeakHours, data, mappedPeakHours);
    }
  }
  catch (error) {
    const errorCode = _.get(error, 'response.data.code');
    if (errorCode === WAREHOUSE_HAS_NOT_PEAK_HOURS) {
      const warehouseObject = yield select(warehouseSelector.getData);
      yield call(watchCreateWarehousePeakHours, warehouseObject, []);
      yield put(Creators.updateBasePeakHoursTypeRequest({ id: tempId, updateData: tempUpdateData }));
    }
    else {
      yield put(ToastCreators.error({ error }));
      yield put(Creators.updateBasePeakHoursTypeFailure(error));
    }
  }
}

function* watchUpdateBasePeakHoursTypeRequest() {
  yield takeLatest(Types.UPDATE_BASE_PEAK_HOURS_TYPE_REQUEST, updateBasePeakHoursTypeRequest);
}

function* updatePeakHoursRequest({ id, updateData }) {
  try {
    const data = yield call(updatePeakHoursByWarehouse, { id, updateData });
    yield put(Creators.updatePeakHoursSuccess(data));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateBasePeakHoursTypeFailure(error));
  }
}

function* watchUpdatePeakHoursRequest() {
  yield takeLatest(Types.UPDATE_PEAK_HOURS_REQUEST, updatePeakHoursRequest);
}

function* updatePeakHoursMessageRequest({ id, updateData }) {
  try {
    const { peakHours } = yield call(updatePeakHoursMessageByWarehouse, { id, updateData });
    yield put(Creators.updatePeakHoursMessageSuccess(peakHours));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updatePeakHoursMessageSuccess(error));
  }
}

function* watchUpdatePeakHoursMessageRequest() {
  yield takeLatest(Types.UPDATE_PEAK_HOURS_MESSAGE_REQUEST, updatePeakHoursMessageRequest);
}

function* getWarehouseLocationTemplatesRequest({ warehouseType }) {
  try {
    const { warehouseLocationTemplates: data } = yield call(getWarehouseLocationTemplates, { warehouseType });
    yield put(Creators.getWarehouseLocationTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getWarehouseLocationTemplatesFailure(error));
  }
}

function* watchGetWarehouseLocationTemplatesRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_LOCATION_TEMPLATES_REQUEST, getWarehouseLocationTemplatesRequest);
}

function* getWarehouseSectionsRequest({ warehouseId }) {
  try {
    const { sections: data } = yield call(getWarehouseSections, { requestBody: { warehouseId } });
    yield put(Creators.getWarehouseSectionsSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getWarehouseSectionsFailure(error));
  }
}

function* watchGetWarehouseSectionsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SECTIONS_REQUEST, getWarehouseSectionsRequest);
}

function* createNewSectionRequest({ warehouseId, template, sectionOpts }) {
  try {
    yield call(createNewSection, { requestBody: { warehouseId, template, sectionOpts } });
    yield put(Creators.createNewSectionSuccess());
    yield put(Creators.getWarehouseLocationTemplatesRequest());
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.createNewSectionFailure(error));
  }
}

function* watchCreateNewSectionRequest() {
  yield takeLatest(Types.CREATE_NEW_SECTION_REQUEST, createNewSectionRequest);
}

function* createNewBlockRequest({ warehouseId, sectionId, template, blockOpts }) {
  try {
    yield call(createNewBlock, { requestBody: { warehouseId, sectionId, template, blockOpts } });
    yield put(Creators.createNewBlockSuccess());
    yield put(Creators.getWarehouseLocationTemplatesRequest());
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.createNewBlockFailure(error));
  }
}

function* watchCreateNewBlockRequest() {
  yield takeLatest(Types.CREATE_NEW_BLOCK_REQUEST, createNewBlockRequest);
}

function* updateWarehouseLocationActivateRequest({ warehouseLocationId }) {
  try {
    /**
     * @TODO ask should applyToChildren variable used from here
    */
    const data = yield call(updateWarehouseLocationActivate, { requestBody: { warehouseLocationId, applyToChildren: false } });
    yield put(Creators.updateWarehouseLocationActivateSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseLocationActivateFailure(error));
  }
}

function* watchUpdateWarehouseLocationActivateRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_LOCATION_ACTIVATE_REQUEST, updateWarehouseLocationActivateRequest);
}

function* updateWarehouseLocationDeactivateRequest({ warehouseLocationId }) {
  try {
    const data = yield call(updateWarehouseLocationDeactivate, { requestBody: { warehouseLocationId } });
    yield put(Creators.updateWarehouseLocationDeactivateSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    const errorCode = _.get(error, 'response.data.code');
    yield put(ToastCreators.error({ message: t(`error:${errorCode}`) }));
    yield put(Creators.updateWarehouseLocationDeactivateFailure(error));
  }
}

function* watchUpdateWarehouseLocationDeactivateRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_LOCATION_DEACTIVATE_REQUEST, updateWarehouseLocationDeactivateRequest);
}

function* updateWarehouseLocationAllowedForTransferRequest({ locationId, isAllowed }) {
  try {
    const data = yield call(updateWarehouseLocationAllowedForTransfer, { requestBody: { locationId, isAllowed } });
    yield put(Creators.updateWarehouseLocationAllowedForTransferSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseLocationAllowedForTransferFailure(error));
  }
}

function* watchUpdateWarehouseLocationAllowedForTransferRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_LOCATION_ALLOWED_FOR_TRANSFER_REQUEST, updateWarehouseLocationAllowedForTransferRequest);
}

function* updateWarehouseLocationArchiveRequest({ warehouseLocationId }) {
  try {
    const data = yield call(updateWarehouseLocationArchive, { requestBody: { warehouseLocationId } });
    yield put(Creators.updateWarehouseLocationArchiveSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehouseLocationArchiveFailure(error));
  }
}

function* watchUpdateWarehouseLocationArchiveRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_LOCATION_ARCHIVE_REQUEST, updateWarehouseLocationArchiveRequest);
}

function* saveWarehouseLocationSelfCodeRequest({ warehouseLocationId, selfCode }) {
  try {
    const data = yield call(saveWarehouseLocationSelfCode, { requestBody: { warehouseLocationId, selfCode } });
    yield put(Creators.saveWarehouseLocationSelfCodeSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.saveWarehouseLocationSelfCodeFailure(error));
  }
}

function* watchSaveWarehouseLocationSelfCodeRequest() {
  yield takeLatest(Types.SAVE_WAREHOUSE_LOCATION_SELF_CODE_REQUEST, saveWarehouseLocationSelfCodeRequest);
}

function* updateLocationWriteOffEnabledRequest({ warehouseLocationId, isAllowed }) {
  try {
    const data = yield call(updateLocationWriteOffEnabled, { requestBody: { warehouseLocationId, isAllowed } });
    yield put(Creators.updateLocationWriteOffEnabledSuccess({ data }));
    const { _id } = yield select(warehouseSelector.getData);
    yield put(Creators.getWarehouseSectionsRequest({ warehouseId: _id }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateLocationWriteOffEnabledFailure(error));
  }
}

function* watchUpdateLocationWriteOffEnabledRequest() {
  yield takeLatest(Types.UPDATE_LOCATION_WRITE_OFF_ENABLED_REQUEST, updateLocationWriteOffEnabledRequest);
}

function* getWarehouseSegmentsRequest() {
  try {
    const { segments } = yield call(getWarehouseSegments, {});
    yield put(Creators.getWarehouseSegmentsSuccess({ data: segments }));
  }
  catch (error) {
    yield put(Creators.getWarehouseSegmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseSegmentsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SEGMENTS_REQUEST, getWarehouseSegmentsRequest);
}

function* updateWarehouseDeliveryFeeSegmentRequest({ warehouseId, segmentId }) {
  try {
    const data = yield call(updateWarehouseDeliveryFeeSegment, { warehouseId, segmentId });
    yield put(Creators.updateWarehouseDeliveryFeeSegmentSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateWarehouseDeliveryFeeSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateWarehouseDeliveryFeeSegmentRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_DELIVERY_FEE_SEGMENT_REQUEST, updateWarehouseDeliveryFeeSegmentRequest);
}

function* updateWarehouseProductPricingSegmentRequest({ warehouseId, segmentId }) {
  try {
    const data = yield call(updateWarehouseProductPricingSegment, { warehouseId, segmentId });
    yield put(Creators.updateWarehouseProductPricingSegmentSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateWarehouseProductPricingSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateWarehouseProductPricingSegmentRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_PRODUCT_PRICING_SEGMENT_REQUEST, updateWarehouseProductPricingSegmentRequest);
}

function* updateWarehousePromoAggressionLevelRequest({ id, updateData }) {
  try {
    const { warehouse } = yield call(updateWarehousePromoAggressionLevel, { id, updateData });
    yield put(Creators.updateWarehousePromoAggressionLevelSuccess({ data: warehouse }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateWarehousePromoAggressionLevelFailure(error));
  }
}
function* watchUpdateWarehousePromoAggressionLevelRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_PROMO_AGGRESSION_LEVEL_REQUEST, updateWarehousePromoAggressionLevelRequest);
}

export function* assignFranchiseAreaRequest({ warehouseId, franchiseAreaId }) {
  try {
    const data = yield call(assignFranchiseArea, { warehouseId, franchiseAreaId });
    yield put(Creators.assignFranchiseAreaSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.assignFranchiseAreaFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchAssignFranchiseAreaRequest() {
  yield takeLatest(Types.ASSIGN_FRANCHISE_AREA_REQUEST, assignFranchiseAreaRequest);
}
export function* warehousesFilterRequest({
  name,
  fields,
}) {
  try {
    const { warehouses, totalCount } = yield call(getFilteredWarehouses, {
      name,
      fields,
    });
    yield put(Creators.getWarehousesFilterSuccess({ warehouses, totalCount }));
  }
  catch (error) {
    yield put(Creators.getWarehousesFilterFailure({ error }));
  }
}

function* watchWarehousesFilterRequest() {
  yield takeLatest(Types.GET_WAREHOUSES_FILTER_REQUEST, warehousesFilterRequest);
}
export default function* warehousesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseRequest),
      fork(watchGetEmployeesRequest),
      fork(watchUpdateWarehouseInfoRequest),
      fork(watchUpdateWarehouseBudgetInfoRequest),
      fork(watchUpdateWarehouseAddressRequest),
      fork(watchUpdateWarehouseTypeRequest),
      fork(watchUpdateWarehouseDomainTypesRequest),
      fork(watchUpdateWarehouseMainStoreRequest),
      fork(watchUnassignFranchiseRequest),
      fork(watchAssignFranchiseRequest),
      fork(watchUpdateWarehouseBusinessDecisionsRequest),
      fork(watchUpdateWarehouseConfigRequest),
      fork(watchArchiveWarehouseRequest),
      fork(watchDeactivateWarehouseRequest),
      fork(watchActivateWarehouseRequest),
      fork(watchUpdateWarehouseStatusRequest),
      fork(watchUpdateTransferGroupOfWarehouseRequest),
      fork(watchDeleteTransferGroupOfWarehouseRequest),
      fork(watchUpdateBaseWorkingHoursTypeRequest),
      fork(watchUpdateWorkingHoursRequest),
      fork(watchUpdateWorkingHoursMessageRequest),
      fork(watchUpdateBasePeakHoursTypeRequest),
      fork(watchUpdatePeakHoursRequest),
      fork(watchUpdatePeakHoursMessageRequest),
      fork(watchGetWarehouseLocationTemplatesRequest),
      fork(watchGetWarehouseSectionsRequest),
      fork(watchCreateNewSectionRequest),
      fork(watchCreateNewBlockRequest),
      fork(watchUpdateWarehouseLocationActivateRequest),
      fork(watchUpdateWarehouseLocationDeactivateRequest),
      fork(watchUpdateWarehouseLocationAllowedForTransferRequest),
      fork(watchUpdateWarehouseLocationArchiveRequest),
      fork(watchSaveWarehouseLocationSelfCodeRequest),
      fork(watchUpdateLocationWriteOffEnabledRequest),
      fork(watchUpdateWarehouseManpowerRequest),
      fork(watchUpdateAlgorithmConfigRequest),
      fork(watchGetWarehouseSegmentsRequest),
      fork(watchUpdateWarehouseDeliveryFeeSegmentRequest),
      fork(watchUpdateWarehouseProductPricingSegmentRequest),
      fork(watchUpdateWarehouseTestStatusRequest),
      fork(watchUpdateWarehousePromoAggressionLevelRequest),
      fork(watchUpdateWarehouseAcceptReturnsRequest),
      fork(watchGetWarehouseShipmentFrequenciesRequest),
      fork(watchGetWarehouseShipmentPreparationsRequest),
      fork(watchAddWarehouseShipmentFrequencyRequest),
      fork(watchAddWarehouseShipmentPreparationRequest),
      fork(watchGetShipmentFrequenciesRequest),
      fork(watchGetShipmentPreparationsRequest),
      fork(watchUpdateWarehouseShipmentFrequencyRequest),
      fork(watchUpdateWarehouseShipmentPreparationRequest),
      fork(watchAssignFranchiseAreaRequest),
      fork(watchUpdateTransferReceivingRequest),
      fork(watchWarehousesFilterRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
