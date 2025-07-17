import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';

import history from '@shared/utils/history';
import {
  getThirdPartyCompanyById,
  getCredentialsByCompanyId,
  getAllowedRoutes,
  updateThirdPartyCompanyById,
  deleteThirdPartyCompanyById,
  activateThirdPartyCompanyById,
  deactivateThirdPartyCompanyById,
  createCredentialByCompanyId,
  activateCredentialByCompanyAndCredentialId,
  deactivateCredentialByCompanyAndCredentialId,
  deleteCredentialByCompanyAndCredentialId,
  generateCredentialSignatureByCredentialId,
  getThirdPartyCompanyChangeLogs as getCompanyChangeLogsApi,
  getThirdPartyCompanyCredentialsChangeLogs as getCompanyCredentialsChangeLogsApi,
} from '@shared/api/thirdPartyCompany';
import { Types, Creators } from './actions';
import { changeLogTableUISelector, getThirdPartyCompanyByIdSelector } from './selectors';
import { CHANGE_LOG_TYPE_ENUM } from '../../constants';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* getThirdPartyCompanyByIdRequest({ id }) {
  try {
    const companyId = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    const data = yield call(getThirdPartyCompanyById, { id: id ?? companyId });
    yield put(Creators.getThirdPartyCompanyByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getThirdPartyCompanyByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetThirdPartyCompanyByIdRequest() {
  yield takeLatest(Types.GET_THIRD_PARTY_COMPANY_BY_ID_REQUEST, getThirdPartyCompanyByIdRequest);
}

export function* getCredentialsByCompanyIdRequest({ id }) {
  try {
    const companyId = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    const data = yield call(getCredentialsByCompanyId, { id: id ?? companyId });
    yield put(Creators.getCredentialsByCompanyIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCredentialsByCompanyIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetCredentialsByCompanyIdRequest() {
  yield takeLatest(Types.GET_CREDENTIALS_BY_COMPANY_ID_REQUEST, getCredentialsByCompanyIdRequest);
}

export function* getAllowedRoutesRequest() {
  try {
    const { routes: allowedRoutes } = yield call(getAllowedRoutes);
    yield put(Creators.getAllowedRoutesSuccess({ allowedRoutes }));
  }
  catch (error) {
    yield put(Creators.getAllowedRoutesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetAllowedRoutesRequest() {
  yield takeLatest(Types.GET_ALLOWED_ROUTES_REQUEST, getAllowedRoutesRequest);
}

export function* updateThirdPartyCompanyByIdRequest({ body }) {
  try {
    const data = yield call(updateThirdPartyCompanyById, { body });
    yield put(Creators.updateThirdPartyCompanyByIdSuccess({ data }));
    yield put(Creators.getThirdPartyCompanyByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateThirdPartyCompanyByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchUpdateThirdPartyCompanyByIdRequest() {
  yield takeLatest(Types.UPDATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST, updateThirdPartyCompanyByIdRequest);
}

export function* deleteThirdPartyCompanyByIdRequest({ id }) {
  try {
    const data = yield call(deleteThirdPartyCompanyById, { id });
    yield put(Creators.deleteThirdPartyCompanyByIdSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(ROUTE.THIRD_PARTY_COMPANY_LIST.path);
  }
  catch (error) {
    yield put(Creators.deleteThirdPartyCompanyByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeleteThirdPartyCompanyByIdRequest() {
  yield takeLatest(Types.DELETE_THIRD_PARTY_COMPANY_BY_ID_REQUEST, deleteThirdPartyCompanyByIdRequest);
}

export function* activateThirdPartyCompanyByIdRequest() {
  try {
    const companyId = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    const data = yield call(activateThirdPartyCompanyById, { id: companyId });
    yield put(Creators.activateThirdPartyCompanyByIdSuccess({ data }));
    yield call(getThirdPartyCompanyByIdRequest, { id: companyId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateThirdPartyCompanyByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchActivateThirdPartyCompanyByIdRequest() {
  yield takeLatest(Types.ACTIVATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST, activateThirdPartyCompanyByIdRequest);
}

export function* dectivateThirdPartyCompanyByIdRequest() {
  try {
    const companyId = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    const data = yield call(deactivateThirdPartyCompanyById, { id: companyId });
    yield put(Creators.deactivateThirdPartyCompanyByIdSuccess({ data }));
    yield call(getThirdPartyCompanyByIdRequest, { id: companyId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateThirdPartyCompanyByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeactivateThirdPartyCompanyByIdRequest() {
  yield takeLatest(Types.DEACTIVATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST, dectivateThirdPartyCompanyByIdRequest);
}

export function* createCredentialByCompanyIdRequest({ id, environment }) {
  try {
    const data = yield call(createCredentialByCompanyId, { id, environment });
    yield put(Creators.createCredentialByCompanyIdSuccess({ data }));
    // update credential list with the recent credential created
    yield call(getCredentialsByCompanyIdRequest, { id });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createCredentialByCompanyIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateCredentialByCompanyIdRequest() {
  yield takeLatest(Types.CREATE_CREDENTIAL_BY_COMPANY_ID_REQUEST, createCredentialByCompanyIdRequest);
}

export function* deleteCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }) {
  try {
    const data = yield call(deleteCredentialByCompanyAndCredentialId, { companyId, credentialId });
    yield put(Creators.deleteCredentialByCompanyAndCredentialIdSuccess({ data }));
    // update credential list with the recent credential created
    yield call(getCredentialsByCompanyIdRequest, { id: companyId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteCredentialByCompanyAndCredentialIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeleteCredentialByCompanyAndCredentialIdRequest() {
  yield takeLatest(Types.DELETE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST, deleteCredentialByCompanyAndCredentialIdRequest);
}

export function* activateCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }) {
  try {
    const data = yield call(activateCredentialByCompanyAndCredentialId, { companyId, credentialId });
    yield put(Creators.activateCredentialByCompanyAndCredentialIdSuccess({ data }));
    // update credential list with the recent credential created
    yield call(getCredentialsByCompanyIdRequest, { id: companyId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateCredentialByCompanyAndCredentialIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchActivateCredentialByCompanyAndCredentialIdRequest() {
  yield takeLatest(Types.ACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST, activateCredentialByCompanyAndCredentialIdRequest);
}

export function* deactivateCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }) {
  try {
    const data = yield call(deactivateCredentialByCompanyAndCredentialId, { companyId, credentialId });
    yield put(Creators.deactivateCredentialByCompanyAndCredentialIdSuccess({ data }));
    // update credential list with the recent credential created
    yield call(getCredentialsByCompanyIdRequest, { id: companyId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateCredentialByCompanyAndCredentialIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeactivateCredentialByCompanyAndCredentialIdRequest() {
  yield takeLatest(Types.DEACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST, deactivateCredentialByCompanyAndCredentialIdRequest);
}

export function* generateCredentialSignatureByCredentialIdRequest({ credentialId }) {
  try {
    const { signature } = yield call(generateCredentialSignatureByCredentialId, { credentialId });
    yield put(Creators.generateCredentialSignatureByCredentialIdSuccess({ signature, credentialId }));
  }
  catch (error) {
    yield put(Creators.generateCredentialSignatureByCredentialIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGenerateCredentialSignatureByCredentialIdRequest() {
  yield takeLatest(Types.GENERATE_CREDENTIAL_SIGNATURE_BY_CREDENTIAL_ID_REQUEST, generateCredentialSignatureByCredentialIdRequest);
}

export function* getCompanyChangeLogs({ companyId, forceLimit, forceOffset }) {
  try {
    const companyIdInState = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    const { limit, offset } = yield select(changeLogTableUISelector.getCompanyGeneralChangeLogPagination);
    const apiParams = { key: companyId ?? companyIdInState, limit: forceLimit ?? limit, offset: forceOffset ?? offset };
    const { changeLogs } = yield call(getCompanyChangeLogsApi, apiParams);
    yield put(Creators.getCompanyChangeLogsSuccess({ changeLogs }));
  }
  catch (error) {
    yield put(Creators.getCompanyChangeLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCompanyCredentialsChangeLogs({ credentialKey, forceLimit, forceOffset }) {
  try {
    const { limit, offset } = yield select(changeLogTableUISelector.getCredentialChangeLogPagination);
    const credentialKeyInState = yield select(changeLogTableUISelector.getCurrentSelectedCredentialKey);
    const apiParams = { key: credentialKey ?? credentialKeyInState, limit: forceLimit ?? limit, offset: forceOffset ?? offset };
    const { changeLogs } = yield call(getCompanyCredentialsChangeLogsApi, apiParams);
    yield put(Creators.getCompanyCredentialsChangeLogsSuccess({ changeLogs }));
  }
  catch (error) {
    yield put(Creators.getCompanyCredentialsChangeLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* handleCompanyGeneralChangeLogClicked() {
  yield put(Creators.getCompanyChangeLogsRequest({}));
}

export function* handleCompanyCredentialChangeLogClicked() {
  yield put(Creators.getCompanyCredentialsChangeLogsRequest({}));
}

export function* watchGetCompanyChangeLogsRequest() {
  yield takeLatest(Types.GET_COMPANY_CHANGE_LOGS_REQUEST, getCompanyChangeLogs);
}

export function* handleCompanyChangeLogTablePaginationChanged({ limit, offset }) {
  const currentChangeLogType = yield select(changeLogTableUISelector.getCurrentChangeLogType);
  if (currentChangeLogType === CHANGE_LOG_TYPE_ENUM.COMPANY) {
    const companyId = yield select(getThirdPartyCompanyByIdSelector.getCompanyId);
    yield put(Creators.getCompanyChangeLogsRequest({ companyId, forceLimit: limit, forceOffset: offset }));
  }
  else if (currentChangeLogType === CHANGE_LOG_TYPE_ENUM.CREDENTIAL) {
    const credentialKey = yield select(changeLogTableUISelector.getCurrentSelectedCredentialKey);
    yield put(Creators.getCompanyCredentialsChangeLogsRequest({ credentialKey, forceLimit: limit, forceOffset: offset }));
  }
}

export function* watchGetCompanyCredentialsChangeLogsRequest() {
  yield takeLatest(Types.GET_COMPANY_CREDENTIALS_CHANGE_LOGS_REQUEST, getCompanyCredentialsChangeLogs);
}

export function* watchCompanyCredentiaChangeLogClicked() {
  yield takeLatest(Types.COMPANY_CREDENTIAL_CHANGE_LOG_CLICKED, getCompanyCredentialsChangeLogs);
}

export function* watchCompanyChangeLogTablePaginationChanged() {
  yield takeLatest(Types.COMPANY_CHANGE_LOG_TABLE_PAGINATION_CHANGED, handleCompanyChangeLogTablePaginationChanged);
}

export function* watchCompanyGeneralChangeLogClicked() {
  yield takeLatest(Types.COMPANY_GENERAL_CHANGE_LOG_CLICKED, handleCompanyGeneralChangeLogClicked);
}

export function* watchCompanyCredentialChangeLogClicked() {
  yield takeLatest(Types.COMPANY_CREDENTIAL_CHANGE_LOG_CLICKED, handleCompanyCredentialChangeLogClicked);
}

export default function* thirdPartyCompanyDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetThirdPartyCompanyByIdRequest),
      fork(watchGetCredentialsByCompanyIdRequest),
      fork(watchGetAllowedRoutesRequest),
      fork(watchUpdateThirdPartyCompanyByIdRequest),
      fork(watchDeleteThirdPartyCompanyByIdRequest),
      fork(watchActivateThirdPartyCompanyByIdRequest),
      fork(watchDeactivateThirdPartyCompanyByIdRequest),
      fork(watchCreateCredentialByCompanyIdRequest),
      fork(watchDeleteCredentialByCompanyAndCredentialIdRequest),
      fork(watchActivateCredentialByCompanyAndCredentialIdRequest),
      fork(watchDeactivateCredentialByCompanyAndCredentialIdRequest),
      fork(watchGenerateCredentialSignatureByCredentialIdRequest),
      fork(watchGetCompanyChangeLogsRequest),
      fork(watchGetCompanyCredentialsChangeLogsRequest),
      fork(watchCompanyCredentiaChangeLogClicked),
      fork(watchCompanyChangeLogTablePaginationChanged),
      fork(watchCompanyGeneralChangeLogClicked),
      fork(watchCompanyCredentialChangeLogClicked),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
