import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

import {
  getMarketFranchiseById,
  updateCommissionRates,
  updateMarketFranchise,
  updateMarketFranchiseWithSAP,
  createNewCrisisCard,
  getNewCardUploadSignedUrl,
  updateCrisisCard,
  getCrisisLogsListRequest,
  exportCrisisLogsList,
  getCrisisCardList,
  exportCrisisCardList,
  getCrisisCardById,
  removeCrisisCardById,
  createFranchiseArea,
  updateFranchiseArea,
  deleteFranchiseArea,
} from '@shared/api/marketFranchise';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';
import { getLangKey, t } from '@shared/i18n';

function* getMarketFranchiseRequest({ id }) {
  try {
    const data = yield call(getMarketFranchiseById, { id });
    yield put(Creators.getMarketFranchiseSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketFranchiseRequest() {
  yield takeLatest(Types.GET_MARKET_FRANCHISE_REQUEST, getMarketFranchiseRequest);
}

function* updateCommissionRatesRequest({ id, updateData }) {
  try {
    const data = yield call(updateCommissionRates, { id, updateData });
    yield put(Creators.updateCommissionRatesSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateCommissionRatesRequest() {
  yield takeLatest(Types.UPDATE_COMMISSION_RATES_REQUEST, updateCommissionRatesRequest);
}

function* updateMarketFranchiseRequest({ id, updateData }) {
  try {
    const data = yield call(updateMarketFranchise, { id, updateData });
    yield put(Creators.updateMarketFranchiseSuccess({ data }));
    yield put(Creators.getMarketFranchiseRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateMarketFranchiseRequest() {
  yield takeLatest(Types.UPDATE_MARKET_FRANCHISE_REQUEST, updateMarketFranchiseRequest);
}

function* updateMarketFranchiseWithSAPRequest({ referenceCode, updateData }) {
  try {
    const data = yield call(updateMarketFranchiseWithSAP, { referenceCode, updateData });
    yield put(Creators.updateMarketFranchiseWithSAPSuccess({ data }));
    yield put(Creators.getMarketFranchiseRequest({ id: data._id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateMarketFranchiseWithSAPRequest() {
  yield takeLatest(Types.UPDATE_MARKET_FRANCHISE_WITH_SAP_REQUEST, updateMarketFranchiseWithSAPRequest);
}

function* createNewCardRequest({ requestBody }) {
  try {
    const { files, ...formValues } = requestBody;
    let fileKeysUploaded = [];

    if (files.length > 0) {
      const signedUrlsCall = files.map(file => call(getNewCardUploadSignedUrl, { contentType: file.type, key: file.name }));
      const signedUrlsAndFileKeys = yield all(signedUrlsCall);
      fileKeysUploaded = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { url, fileName } = signedUrlAndFileKey;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[index].originFileObj);
        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve(fileName);
            }
            catch (err) {
              reject(err);
            }
          };
          fileReader.onerror = reject;
        });
      }));
    }
    const formData = { ...formValues, files: fileKeysUploaded };
    yield call(createNewCrisisCard, { data: formData });
    yield put(Creators.createNewCrisisCardSuccess());
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.createNewCrisisCardFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateNewCardRequest() {
  yield takeLatest(Types.CREATE_NEW_CRISIS_CARD_REQUEST, createNewCardRequest);
}

function* updateCardRequest({ requestBody }) {
  try {
    const { files, ...formValues } = requestBody;
    let fileKeysUploaded = [];
    const newFiles = [];
    const existingFiles = [];

    files.forEach(file => {
      if (Object.prototype.hasOwnProperty.call(file, 'originFileObj')) {
        newFiles.push(file);
      }
      else {
        existingFiles.push(file.name);
      }
    });

    if (newFiles.length > 0) {
      const signedUrlsCall = newFiles.map(file => call(getNewCardUploadSignedUrl, { contentType: file.type, key: file.name }));
      const signedUrlsAndFileKeys = yield all(signedUrlsCall);

      fileKeysUploaded = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { fileName, url } = signedUrlAndFileKey;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(newFiles[index].originFileObj);
        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve(fileName);
            }
            catch (err) {
              reject(err);
            }
          };
          fileReader.onerror = reject;
        });
      }));
    }
    const formData = { notes: formValues.notes, _id: formValues._id, files: [...fileKeysUploaded, ...existingFiles], topicId: formValues.topicId };
    yield call(updateCrisisCard, { ...formData });
    yield put(Creators.updateCrisisCardSuccess());
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.updateCrisisCardFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateCardRequest() {
  yield takeLatest(Types.UPDATE_CRISIS_CARD_REQUEST, updateCardRequest);
}

function* getCrisisLogsRequest({ limit, offset, franchiseId, cardNumber }) {
  try {
    const { data, count } = yield call(getCrisisLogsListRequest, { limit, offset, franchiseId, cardNumber });
    yield put(Creators.getCrisisLogsSuccess({ data, count }));
  }
  catch (error) {
    yield put(Creators.getCrisisLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCrisisLogsRequest() {
  yield takeLatest(Types.GET_CRISIS_LOGS_REQUEST, getCrisisLogsRequest);
}

function* exportCrisisLogsListRequest({ franchiseId, cardNumber }) {
  try {
    const { url } = yield call(exportCrisisLogsList, {
      franchiseId,
      cardNumber,
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
    });
    window.open(url);
    yield put(Creators.exportCrisisLogsSuccess());
  }
  catch (error) {
    yield put(Creators.exportCrisisLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportCrisisLogsRequest() {
  yield takeLatest(Types.EXPORT_CRISIS_LOGS_REQUEST, exportCrisisLogsListRequest);
}

function* getCrisisCardListRequest({ franchiseId, topicId, limit, offset }) {
  try {
    const { data, count } = yield call(getCrisisCardList, { franchiseId, topicId, limit, offset });
    yield put(Creators.getCrisisCardListSuccess({ data, count }));
  }
  catch (error) {
    yield put(Creators.getCrisisCardListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCrisisCardListRequest() {
  yield takeLatest(Types.GET_CRISIS_CARD_LIST_REQUEST, getCrisisCardListRequest);
}

function* exportCrisisCardListRequest({ franchiseId, topicId }) {
  try {
    const { url } = yield call(exportCrisisCardList, {
      franchiseId,
      topicId,
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
    });
    window.open(url);
    yield put(Creators.exportCrisisCardListSuccess());
  }
  catch (error) {
    yield put(Creators.exportCrisisCardListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportCrisisCardListRequest() {
  yield takeLatest(Types.EXPORT_CRISIS_CARD_LIST_REQUEST, exportCrisisCardListRequest);
}

function* getCrisisCardRequest({ cardId }) {
  try {
    const data = yield call(getCrisisCardById, { cardId });
    yield put(Creators.getCrisisCardSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCrisisCardFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCrisisCardRequest() {
  yield takeLatest(Types.GET_CRISIS_CARD_REQUEST, getCrisisCardRequest);
}

function* removeCrisisCardRequest({ cardId }) {
  try {
    yield call(removeCrisisCardById, { cardId });
    yield put(Creators.removeCrisisCardSuccess());
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.removeCrisisCardFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRemoveCrisisCardRequest() {
  yield takeLatest(Types.REMOVE_CRISIS_CARD_REQUEST, removeCrisisCardRequest);
}

export function* createFranchiseAreaRequest({ areaName, franchiseId }) {
  try {
    const data = yield call(createFranchiseArea, { areaName, franchiseId });
    yield put(Creators.createFranchiseAreaSuccess({ data }));
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.createFranchiseAreaFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateFranchiseAreaRequest() {
  yield takeLatest(Types.CREATE_FRANCHISE_AREA_REQUEST, createFranchiseAreaRequest);
}

export function* updateFranchiseAreaRequest({ areaName, franchiseAreaId }) {
  try {
    yield call(updateFranchiseArea, { areaName, franchiseAreaId });
    yield put(Creators.updateFranchiseAreaSuccess());
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.updateFranchiseAreaFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateFranchiseAreaRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_AREA_REQUEST, updateFranchiseAreaRequest);
}

export function* deleteFranchiseAreaRequest({ franchiseAreaId }) {
  try {
    yield call(deleteFranchiseArea, { franchiseAreaId });
    yield put(Creators.deleteFranchiseAreaSuccess());
    yield put(ToastCreators.success({ message: t('success:SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.deleteFranchiseAreaFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeleteFranchiseAreaRequest() {
  yield takeLatest(Types.DELETE_FRANCHISE_AREA_REQUEST, deleteFranchiseAreaRequest);
}

export default function* marketFranchisesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketFranchiseRequest),
      fork(watchUpdateCommissionRatesRequest),
      fork(watchUpdateMarketFranchiseRequest),
      fork(watchUpdateMarketFranchiseWithSAPRequest),
      fork(watchCreateNewCardRequest),
      fork(watchUpdateCardRequest),
      fork(watchGetCrisisLogsRequest),
      fork(watchExportCrisisLogsRequest),
      fork(watchGetCrisisCardListRequest),
      fork(watchExportCrisisCardListRequest),
      fork(watchGetCrisisCardRequest),
      fork(watchRemoveCrisisCardRequest),
      fork(watchCreateFranchiseAreaRequest),
      fork(watchUpdateFranchiseAreaRequest),
      fork(watchDeleteFranchiseAreaRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
