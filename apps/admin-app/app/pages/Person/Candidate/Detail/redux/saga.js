import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getPersonCandidateDetail,
  getSignedFileUrl,
  updatePersonCandidate,
  isBanned,
} from '@shared/api/person';
import { getForm } from '@shared/api/dynamicForm';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { isPersonHasActiveCourierError } from '../utils';

function* getPersonCandidateFormRequest({ formType, formName }) {
  try {
    const country = getSelectedCountry();
    const countryCode = get(country, ['code', 'alpha2'], '');
    const data = yield call(getForm, { formType, formName, countryCode });
    yield put(Creators.getPersonCandidateFormSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonCandidateFormFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPersonCandidateFormInitialValueRequest({ id }) {
  try {
    const data = yield call(getPersonCandidateDetail, { id });
    // eslint-disable-next-line redux-saga/yield-effects
    const fileUrlsCall = data.files?.map(file => call(getSignedFileUrl, { url: file.uploadedFileName }));
    if (fileUrlsCall) {
      const fileUrls = yield all(fileUrlsCall);
      data.files = data.files.map((file, index) => ({
        ...file,
        name: fileUrls[index].fileName,
        type: fileUrls[index].fileType,
        thumbUrl: fileUrls[index].signedUrl,
        uid: fileUrls[index].signedUrl,
      }));
      yield put(Creators.getPersonCandidateFormInitialValueSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getPersonCandidateFormInitialValueFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* submitPersonCandidateFormRequest({ id, data, formType, formName }) {
  try {
    const country = getSelectedCountry();
    const countryCode = get(country, ['code', 'alpha2'], '');
    const { files, ...formValues } = data;
    let fileKeysForBackend = [];

    fileKeysForBackend = files.filter(file => !Object.prototype.hasOwnProperty.call(file, 'originFileObj'))
      .map(file => ({ fileType: file.fileType, fileName: file.fileName, uploadedFileName: file.uploadedFileName }));

    const formData = { ...formValues, files: fileKeysForBackend };
    yield call(updatePersonCandidate, { id, data: formData, formType, formName, countryCode });
    const { path } = ROUTE.PERSON_CANDIDATE_LIST;
    history.push(path);
  }
  catch (error) {
    yield put(Creators.submitPersonCandidateFormFailure({ error }));
    if (isPersonHasActiveCourierError(error)) {
      yield put(Creators.enablePersonCandidateManualOperation());
    }
    yield put(ToastCreators.error({ error }));
  }
}

function* getPersonCandidateIsBannedRequest({ uniqueIdentifier }) {
  try {
    const { banned } = yield call(isBanned, { uniqueIdentifier });
    yield put(Creators.getPersonCandidateIsBannedSuccess({ isBanned: banned }));
  }
  catch (error) {
    yield put(Creators.getPersonCandidateIsBannedFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPersonCandidateFormRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_FORM_REQUEST, getPersonCandidateFormRequest);
}

function* watchPersonCandidateFormInitialValueRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_FORM_INITIAL_VALUE_REQUEST, getPersonCandidateFormInitialValueRequest);
}

function* watchSubmitPersonCandidateFormRequest() {
  yield takeLatest(Types.SUBMIT_PERSON_CANDIDATE_FORM_REQUEST, submitPersonCandidateFormRequest);
}

function* watchPersonCandidateIsBannedRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_IS_BANNED_REQUEST, getPersonCandidateIsBannedRequest);
}

export default function* personCandidateDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPersonCandidateFormRequest),
      fork(watchPersonCandidateFormInitialValueRequest),
      fork(watchSubmitPersonCandidateFormRequest),
      fork(watchPersonCandidateIsBannedRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
