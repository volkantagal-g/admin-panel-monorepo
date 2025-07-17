import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { get } from 'lodash';
import axios from 'axios';

import {
  createFieldAnnouncement as createFieldAnnouncementApi,
  getSignedUrlForFile as getSignedUrlForFileApi,
} from '@shared/api/fieldAnnouncement';
import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';
import { Types, Creators as AnnouncementCreateCreators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

function* createWarehouseAnnouncementRequest({ requestBody: warehouseAnnouncement }) {
  try {
    yield call(createFieldAnnouncementApi, warehouseAnnouncement);
    yield put(ToastCreators.success());
    history.push(ROUTE.FIELD_ANNOUNCEMENT_LIST.path);
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(AnnouncementCreateCreators.createWarehouseAnnouncementFailure({ error }));
  }
}

function* createFranchiseAnnouncementRequest({ requestBody: franchiseAnnouncement }) {
  try {
    const { announcementFiles } = franchiseAnnouncement;
    let announcementFileNames = [];

    if (announcementFiles?.length) {
      const signedUrlsCall = yield announcementFiles.map(file => {
        return call(getSignedUrlForFileApi, { contentType: file.type, fileName: file.name });
      });
      const signedUrlsAndFileKeys = yield all(signedUrlsCall);

      announcementFileNames = yield all(signedUrlsAndFileKeys.map((signedUrlAndFileKey, index) => {
        const { url, fileName } = signedUrlAndFileKey;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(announcementFiles[index].originFileObj);

        return new Promise((resolve, reject) => {
          fileReader.onloadend = async e => {
            const { result } = e.target;
            try {
              await axios.put(url, base64ToBinary(result), { headers: getHeaderFromBase64(result) });
              resolve(fileName);
            }
            catch (error) {
              reject(error);
            }
            fileReader.onerror = reject;
          };
        });
      }));
    }

    yield call(createFieldAnnouncementApi, { ...franchiseAnnouncement, announcementFiles: announcementFileNames });
    yield put(ToastCreators.success());
    history.push(ROUTE.FIELD_ANNOUNCEMENT_LIST.path);
  }
  catch (error) {
    yield put(AnnouncementCreateCreators.createFranchiseAnnouncementFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchWarehouseAnnouncementRequest() {
  yield takeLatest(
    Types.CREATE_WAREHOUSE_ANNOUNCEMENT_REQUEST,
    createWarehouseAnnouncementRequest,
  );
}

function* watchFranchiseAnnouncementRequest() {
  yield takeLatest(
    Types.CREATE_FRANCHISE_ANNOUNCEMENT_REQUEST,
    createFranchiseAnnouncementRequest,
  );
}

export default function* WarehouseAnnouncementRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchWarehouseAnnouncementRequest),
      fork(watchFranchiseAnnouncementRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
