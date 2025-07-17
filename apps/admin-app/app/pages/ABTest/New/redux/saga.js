import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createTest, getSignedABTestCSVFileURL } from '@shared/api/abTesting';
import { getClientListTemplateFilter } from '@shared/api/clientTargeting';
import { t } from '@shared/i18n';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';
import { uploadToS3 } from '@shared/api/upload';
import { ERROR_CODE_DUPLICATE_KEY } from '../../constants';

const TOAST_AUTO_CLOSE_IN_MS = 3000;

function* createABTestRequest({ requestData }) {
  try {
    const data = yield call(createTest, requestData);

    if (!!data.error && data.error?.customCode === ERROR_CODE_DUPLICATE_KEY) {
      yield put(ToastCreators.error({ message: t('error:DIFFERENT_VALUE_WITH_FIELD_NAME', { fieldName: t('abTestingPage:TEST_CODE') }) }));
      return;
    }
    yield put(Creators.createABTestSuccess({ data }));
    yield put(ToastCreators.success());
    const path = ROUTE.AB_TEST_DETAIL.path.replace(':id', data?._id);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientListTemplatesRequest({ name }) {
  try {
    const data = yield call(getClientListTemplateFilter, { name });
    yield put(Creators.getClientListTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importVariationsCSVFileRequest({ fileData, variationIndex, variationDescription, totalCount, callback }) {
  try {
    const { url: signedUrl, fileKey } = yield call(getSignedABTestCSVFileURL, { fileName: variationDescription, contentType: 'text/csv' });
    yield call(uploadToS3, { signedUrl, data: fileData });

    yield put(Creators.importVariationsCSVFileSuccess());
    if (typeof callback === 'function') {
      callback(`variations[${variationIndex}].variationFileURL`, fileKey);
      callback(`variations[${variationIndex}].totalCount`, totalCount);
    }
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importVariationsCSVFileFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateABTestRequest() {
  yield takeLatest(Types.CREATE_AB_TEST_REQUEST, createABTestRequest);
}

function* watchGetClientListTemplatesRequest() {
  yield takeLatest(Types.GET_CLIENT_LIST_TEMPLATES_REQUEST, getClientListTemplatesRequest);
}

function* watchImportVariationsCSVFileRequest() {
  yield takeLatest(Types.IMPORT_VARIATIONS_CSV_FILE_REQUEST, importVariationsCSVFileRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateABTestRequest),
      fork(watchGetClientListTemplatesRequest),
      fork(watchImportVariationsCSVFileRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
