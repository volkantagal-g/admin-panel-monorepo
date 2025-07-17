import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getDocumentTypes,
  forceAgreement,
  unforceAgreement,
  getPreviousAgreements,
  saveAgreement,
  getSignedAgreementUploadUrl,
} from '@shared/api/customerAgreement';
import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';

function* getDocumentTypesRequest() {
  try {
    const { types: documentTypes } = yield call(getDocumentTypes);
    yield put(Creators.getDocumentTypesSuccess({ documentTypes }));
  }
  catch (error) {
    yield put(Creators.getDocumentTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDocumentTypesRequest() {
  yield takeLatest(Types.GET_DOCUMENT_TYPES_REQUEST, getDocumentTypesRequest);
}

function* setAgreementForcedRequest({ agreementId, forced, selectedAgreementType }) {
  try {
    let response = null;
    if (forced) {
      response = yield call(forceAgreement, { agreementId });
    }
    else {
      response = yield call(unforceAgreement, { agreementId });
    }
    const { success } = response;
    yield put(ToastCreators.success());
    yield put(Creators.setAgreementForcedSuccess({ success }));

    yield put(Creators.getPreviousAgreementsRequest({ agreementType: selectedAgreementType }));
  }
  catch (error) {
    yield put(Creators.setAgreementForcedFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSetAgreementForcedRequest() {
  yield takeLatest(Types.SET_AGREEMENT_FORCED_REQUEST, setAgreementForcedRequest);
}

// save agreement
function* saveAgreementRequest({ agreementType, files, nextVersion }) {
  try {
    if (!files) {
      return;
    }
    const formattedFiles = files.map(file => {
      const { fileLanguage, uploadDetails } = file;
      const { name } = uploadDetails;

      return {
        language: fileLanguage,
        name,
      };
    });

    /**
     * we need all promises to be resolved first.
     * overall process is designed to fail if one of the file upload promises fails
     * by the requirement of consuming save endpoint.
     */
    yield all(files.map(file => {
      const { uploadDetails } = file;
      const { preSignedUrl: signedUrl, content: data } = uploadDetails;
      return axios.put(signedUrl, base64ToBinary(data), { headers: getHeaderFromBase64(data) });
    }));

    const { success } = yield call(saveAgreement, { agreementType, files: formattedFiles, nextVersion });
    yield put(ToastCreators.success());
    yield put(Creators.saveAgreementSuccess({ success }));
    yield put(Creators.getPreviousAgreementsRequest({ agreementType }));
  }
  catch (error) {
    yield put(Creators.saveAgreementFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSaveAgreementRequest() {
  yield takeLatest(Types.SAVE_AGREEMENT_REQUEST, saveAgreementRequest);
}

function* getPreviousAgreementsRequest({ agreementType, page }) {
  try {
    const response = yield call(getPreviousAgreements, { agreementType, page });
    const { agreements: previousAgreements, prev, next } = response;
    yield put(Creators.getPreviousAgreementsSuccess({ previousAgreements, pagination: { page, prev, next } }));
  }
  catch (error) {
    yield put(Creators.getPreviousAgreementsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPreviousAgreementsRequest() {
  yield takeLatest(Types.GET_PREVIOUS_AGREEMENTS_REQUEST, getPreviousAgreementsRequest);
}

function* setUploadUrlsRequest({ agreementType, agreementLanguage, doc }) {
  try {
    const { files, nextVersion, preSignedUrls } = yield call(getSignedAgreementUploadUrl, { agreementType, agreementLanguage });
    const data = { files, nextVersion, preSignedUrls };
    yield put(Creators.setUploadUrlsSuccess({ data, doc }));
  }
  catch (error) {
    yield put(Creators.setUploadUrlsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSetUploadUrlsRequest() {
  yield takeLatest(Types.SET_UPLOAD_URLS_REQUEST, setUploadUrlsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDocumentTypesRequest),
      fork(watchSetAgreementForcedRequest),
      fork(watchGetPreviousAgreementsRequest),
      fork(watchSaveAgreementRequest),
      fork(watchSetUploadUrlsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
