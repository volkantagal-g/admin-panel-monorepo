import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { get, uniqueId } from 'lodash';
import moment from 'moment';

import {
  getEmployeeInformationForAssetPrintForm,
  getEmployeeAssets,
  returnEmployeeAsset as returnEmployeeAssetRequestApi,
  getEmployeeAssetList,
  assignEmployeeAsset,
  getEmployeeNonPrivateInformation as getEmployeeNonPrivateInformationApi,
  partialAssetsReturn as partialAssetsReturnApi,
  assignmentConfirmedByEmployee as assignmentConfirmedByEmployeeApi,
  returnConfirmedByEmployee as returnConfirmedByEmployeeApi,
} from '@shared/api/employee';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { employeeAssetListSelector } from './selectors';
import { getAssetFormPrintHTML, getReturnAssetsFormPrintHTML } from '../printTemplates';
import { ASSET_ASSIGNMENT_STATUSES } from '@app/pages/Asset/constants';

function* getEmployeeAssetListRequest({ employeeId }) {
  try {
    const assets = yield call(getEmployeeAssets, { employeeId });
    const rowKeyAddedAssets = assets.map(oldAsset => ({ ...oldAsset, rowKey: uniqueId() }));
    yield put(Creators.getEmployeeAssetListSuccess({ data: rowKeyAddedAssets }));
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetListFailure({ error }));
  }
}

function* returnEmployeeAssetRequest({ employeeId, assetId, assignmentId, returnDate, returnNote, returnDeviceStatus }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const requestBody = { employeeId, assetId, assignmentId, returnDate, returnNote, returnDeviceStatus };

    const data = yield call(returnEmployeeAssetRequestApi, { ...requestBody, cancelSource });
    yield put(Creators.returnEmployeeAssetSuccess({ data }));
    yield put(Creators.getEmployeeAssetListRequest({ employeeId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.returnEmployeeAssetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAvailableAssetsRequest({ deviceType }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const requestBody = {
      deviceType,
      assignmentStatus: ASSET_ASSIGNMENT_STATUSES.ASSIGNABLE,
      assignedEmployeeExists: false,
    };
    const { assets: data } = yield call(getEmployeeAssetList, { ...requestBody, cancelSource });
    yield put(Creators.getAvailableAssetsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAvailableAssetsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* assignEmployeeAssetRequest({ employeeId, asset, assignDate, assignNote, deviceType, payrollCountryCode, t }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const requestBody = { employeeId, asset, assignDate, assignNote, cancelSource };
    const { assets: data } = yield call(assignEmployeeAsset, { ...requestBody, cancelSource });
    yield put(Creators.getAvailableAssetsRequest({ deviceType, t, payrollCountryCode }));
    yield put(Creators.assignEmployeeAssetSuccess({ data }));
    yield put(ToastCreators.success());
    yield put(Creators.getEmployeeAssetListRequest({ employeeId }));
  }
  catch (error) {
    yield put(Creators.assignEmployeeAssetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* printEmployeeAssets({ t, employeeId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const employeeData = yield call(getEmployeeInformationForAssetPrintForm, { employeeId, cancelSource });
    const employeeDataForPrintForm = {
      fullName: get(employeeData, ['fullName'], ''),
      department: get(employeeData, ['departmentName'], ''),
      uniqueIdentifier: get(employeeData, ['uniqueIdentifier'], ''),
      jobTitle: get(employeeData, ['jobTitle'], ''),
      birthday: moment(get(employeeData, ['birthday'], '')).format(DEFAULT_DATE_FORMAT),
    };
    const { payrollCountryCode } = employeeData;
    const metaDataForPrintForm = { today: moment().format(DEFAULT_DATE_FORMAT) };

    let assetList;
    assetList = yield select(employeeAssetListSelector.getData);
    if (!assetList?.length) {
      yield put(Creators.getEmployeeAssetListRequest({ employeeId }));
      yield take(Types.GET_EMPLOYEE_ASSET_LIST_SUCCESS);
      assetList = yield select(employeeAssetListSelector.getData);
    }
    const assetListForPrintForm = assetList.map(asset => {
      return {
        type: t(`assetPage:ASSET_TYPES.${asset.deviceType}`),
        name: get(asset, 'name', ''),
        deviceSerialNumber: get(asset, 'deviceSerialNumber', ''),
        brand: get(asset, 'brand', ''),
        model: get(asset, ['deviceConfig', 'deviceModel'], ''),
        assignDate: asset.assignDate ? moment(asset.assignDate).format(DEFAULT_DATE_FORMAT) : '',
        returnDate: asset.returnDate ? moment(asset.returnDate).format(DEFAULT_DATE_FORMAT) : '',
      };
    });

    const htmlTemplate = getAssetFormPrintHTML({
      assetList: assetListForPrintForm,
      employee: employeeDataForPrintForm,
      metaData: metaDataForPrintForm,
      payrollCountryCode,
    });
    const winPrint = window.open('', '_blank');
    winPrint.document.write(htmlTemplate);
    winPrint.document.close();
    setTimeout(() => {
      winPrint.print();
      winPrint.close();
    }, 250);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* printReturnAssetsForm({ t, employeeId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const employeeData = yield call(getEmployeeInformationForAssetPrintForm, { employeeId, cancelSource });
    const employeeDataForReturnForm = { fullName: get(employeeData, ['fullName'], '') };
    const { payrollCountryCode } = employeeData;
    let assetList;
    assetList = yield select(employeeAssetListSelector.getData);
    if (!assetList?.length) {
      yield put(Creators.getEmployeeAssetListRequest({ employeeId }));
      yield take(Types.GET_EMPLOYEE_ASSET_LIST_SUCCESS);
      assetList = yield select(employeeAssetListSelector.getData);
    }
    const assetListForReturnForm = assetList.map(asset => {
      return {
        type: t(`assetPage:ASSET_TYPES.${asset.deviceType}`),
        amount: 1,
        name: get(asset, 'name', ''),
        deviceSerialNumber: get(asset, 'deviceSerialNumber', ''),
        brand: get(asset, 'brand', ''),
        model: get(asset, ['deviceConfig', 'deviceModel'], ''),
        returnDate: asset.returnDate ? moment(asset.returnDate).format(DEFAULT_DATE_FORMAT) : '',
        returnDeviceStatus: asset.returnDeviceStatus ? t(`assetPage:ASSET_DEVICE_STATUSES.${asset.returnDeviceStatus}`) : '',
      };
    });

    const htmlTemplate = getReturnAssetsFormPrintHTML({
      assetList: assetListForReturnForm,
      employee: employeeDataForReturnForm,
      payrollCountryCode,
    });
    const winPrint = window.open('', '_blank');
    winPrint.document.write(htmlTemplate);
    winPrint.document.close();
    winPrint.print();
    winPrint.close();
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getEmployeeNonPrivateInformation({ employeeId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const data = yield call(getEmployeeNonPrivateInformationApi, { employeeId, cancelSource });
    yield put(Creators.getEmployeeNonPrivateInformationSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEmployeeNonPrivateInformationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* partialAssetsReturn({ assets, employeeId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const data = yield call(partialAssetsReturnApi, { assets, employeeId, cancelSource });
    yield put(Creators.partialAssetsReturnSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.partialAssetsReturnFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* assignmentConfirmedByEmployee({ assignmentId, isConfirmed }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    yield call(assignmentConfirmedByEmployeeApi, { assignmentId, isConfirmed, cancelSource });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* returnConfirmedByEmployee({ assignmentId, isConfirmed }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    yield call(returnConfirmedByEmployeeApi, { assignmentId, isConfirmed, cancelSource });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeAssetListRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_ASSET_LIST_REQUEST, getEmployeeAssetListRequest);
}

function* watchReturnEmployeeAssetRequest() {
  yield takeLatest(Types.RETURN_EMPLOYEE_ASSET_REQUEST, returnEmployeeAssetRequest);
}

function* watchGetAvailableAssetsRequest() {
  yield takeLatest(Types.GET_AVAILABLE_ASSETS_REQUEST, getAvailableAssetsRequest);
}

function* watchAssignEmployeeRequest() {
  yield takeLatest(Types.ASSIGN_EMPLOYEE_ASSET_REQUEST, assignEmployeeAssetRequest);
}

function* watchPrintEmployeeAssets() {
  yield takeLatest(Types.PRINT_EMPLOYEE_ASSETS, printEmployeeAssets);
}

function* watchPrintReturnAssetsForm() {
  yield takeLatest(Types.PRINT_RETURN_ASSETS_FORM, printReturnAssetsForm);
}

function* watchGetEmployeeNonPrivateInformationRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_NON_PRIVATE_INFORMATION_REQUEST, getEmployeeNonPrivateInformation);
}

function* watchPartialAssetsReturnRequest() {
  yield takeLatest(Types.PARTIAL_ASSETS_RETURN_REQUEST, partialAssetsReturn);
}

function* watchAssignmentConfirmedByEmployeeRequest() {
  yield takeLatest(Types.ASSIGNMENT_CONFIRMED_BY_EMPLOYEE_REQUEST, assignmentConfirmedByEmployee);
}

function* watchReturnConfirmedByEmployeeRequest() {
  yield takeLatest(Types.RETURN_CONFIRMED_BY_EMPLOYEE_REQUEST, returnConfirmedByEmployee);
}

export default function* employeeNewPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEmployeeAssetListRequest),
      fork(watchReturnEmployeeAssetRequest),
      fork(watchGetAvailableAssetsRequest),
      fork(watchAssignEmployeeRequest),
      fork(watchPrintEmployeeAssets),
      fork(watchPrintReturnAssetsForm),
      fork(watchGetEmployeeNonPrivateInformationRequest),
      fork(watchPartialAssetsReturnRequest),
      fork(watchAssignmentConfirmedByEmployeeRequest),
      fork(watchReturnConfirmedByEmployeeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
