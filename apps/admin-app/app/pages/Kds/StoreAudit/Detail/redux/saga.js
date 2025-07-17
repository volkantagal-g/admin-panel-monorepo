import { all, cancel, call, select, fork, put, take, takeLatest } from 'redux-saga/effects';
import { set, cloneDeep } from 'lodash';
import axios from 'axios';

import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';
import { getStoreAuditDetail, updateStoreAuditDetail, getS3SignedUrl } from '@shared/api/kds/auditForm';
import { getAuditFormTypeDetail } from '@shared/api/kds/auditFormType';
import { Types, Creators } from './actions';
import { storeAuditDetailSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getStoreAuditDetailRequest({ id }) {
  try {
    const data = yield call(getStoreAuditDetail, { id });
    yield call(getKdsAuditFormTypeDetailRequest, { id: data.auditFormTypeId });
    yield put(Creators.getStoreAuditDetailSuccess({ data, initialData: cloneDeep(data) }));
  }
  catch (error) {
    yield put(Creators.getStoreAuditDetailFailure({ error }));
  }
}

function* getKdsAuditFormTypeDetailRequest({ id }) {
  try {
    const data = yield call(getAuditFormTypeDetail, { id });
    yield put(Creators.getKdsAuditFormTypeDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKdsAuditFormTypeDetailFailure({ error }));
  }
}

function* updateStoreAuditAnswerRequest({ questionGroupId, question }) {
  try {
    const auditDetail = yield select(storeAuditDetailSelector.getData);
    const questionGroups = auditDetail.questionGroups.map(questionGroup => {
      if (questionGroup._id === questionGroupId) {
        questionGroup.questions.map(_question => {
          if (_question._id === question._id) {
            return question;
          }
          return _question;
        });
      }
      return questionGroup;
    });

    const data = {
      ...auditDetail,
      auditDetail: { questionGroups },
    };

    const uploadedImageCollapsePanel = {
      questionGroupIds: [questionGroupId],
      questionIds: [question._id],
    };

    yield put(Creators.updateStoreAuditAnswerSuccess({ data, uploadedImageCollapsePanel }));
  }
  catch (error) {
    yield put(Creators.updateStoreAuditAnswerFailure({ error }));
  }
}

function* updateStoreAuditQuestionNoteRequest({ questionGroupId, question }) {
  try {
    const auditDetail = yield select(storeAuditDetailSelector.getData);
    const questionGroups = auditDetail.questionGroups.map(questionGroup => {
      if (questionGroup._id === questionGroupId) {
        questionGroup.questions.map(_question => {
          if (_question._id === question._id) {
            return question;
          }
          return _question;
        });
      }
      return questionGroup;
    });

    const data = {
      ...auditDetail,
      auditDetail: { questionGroups },
    };

    yield put(Creators.updateStoreAuditNoteSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateStoreAuditNoteFailure({ error }));
  }
}

function* uploadImagesToS3Request({ question, questionGroupId, fileList }) {
  try {
    const filesAlreadyUploaded = [];
    const filesWillBeUploaded = [];
    fileList.forEach(file => {
      if (Object.prototype.hasOwnProperty.call(file, 'originFileObj')) {
        filesWillBeUploaded.push(file);
      }
      else {
        filesAlreadyUploaded.push(file);
      }
    });
    const files = [...filesAlreadyUploaded];

    const signedUrlsCall = yield filesWillBeUploaded.map(file => {
      return call(getS3SignedUrl, { contentType: file.type, key: file.uid });
    });

    const signedUrlsAndFileKeys = yield all(signedUrlsCall);
    let filesUploaded = [];

    if (filesWillBeUploaded.length) {
      filesUploaded = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { url } = signedUrlAndFileKey;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filesWillBeUploaded[index].originFileObj);

        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve({ name: filesWillBeUploaded[index].uid });
            }
            catch (error) {
              reject(error);
            }
            fileReader.onerror = reject;
          };
        });
      }));
    }

    yield put(Creators.uploadImagesToS3Success());
    yield put(ToastCreators.success());
    set(question, 'files', [...files, ...filesUploaded]);
    yield put(Creators.updateStoreAuditAnswerRequest({ questionGroupId, question }));
  }
  catch (error) {
    yield put(Creators.uploadImagesToS3Failure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateStoreAuditDetailRequest({ data, isPowerUserRequest }) {
  try {
    yield call(updateStoreAuditDetail, { data, isPowerUserRequest });
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateStoreAuditDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetStoreAuditDetailRequest() {
  yield takeLatest(Types.GET_STORE_AUDIT_DETAIL_REQUEST, getStoreAuditDetailRequest);
}

function* watchUpdateStoreAuditAnswerRequest() {
  yield takeLatest(Types.UPDATE_STORE_AUDIT_ANSWER_REQUEST, updateStoreAuditAnswerRequest);
}

function* watchUpdateStoreAuditQuestionNoteRequest() {
  yield takeLatest(Types.UPDATE_STORE_AUDIT_NOTE_REQUEST, updateStoreAuditQuestionNoteRequest);
}

function* watchUploadImagesToS3Request() {
  yield takeLatest(Types.UPLOAD_IMAGES_TO_S3_REQUEST, uploadImagesToS3Request);
}

function* watchUpdateStoreAuditDetailRequest() {
  yield takeLatest(Types.UPDATE_STORE_AUDIT_DETAIL_REQUEST, updateStoreAuditDetailRequest);
}

function* watchGetKdsAuditFormTypeDetailRequest() {
  yield takeLatest(Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_REQUEST, getKdsAuditFormTypeDetailRequest);
}

export default function* getStoreAuditDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetStoreAuditDetailRequest),
      fork(watchUpdateStoreAuditAnswerRequest),
      fork(watchUploadImagesToS3Request),
      fork(watchUpdateStoreAuditDetailRequest),
      fork(watchUpdateStoreAuditQuestionNoteRequest),
      fork(watchGetKdsAuditFormTypeDetailRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
