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

import {
  getAnnouncementDetail as getAnnouncementDetailApi,
  updateFieldAnnouncementDetail as updateFieldAnnouncementDetailApi,
} from '@shared/api/fieldAnnouncement';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { arrangeAnnouncementDetail } from '../utils';

function* getAnnouncementDetailRequest({ requestBody: announcementId }) {
  try {
    const announcementDetail = yield call(getAnnouncementDetailApi, announcementId);
    yield put(Creators.getAnnouncementDetailSuccess({ data: arrangeAnnouncementDetail(announcementDetail) }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(Creators.getWarehouseAnnouncementDetailFailure({ error }));
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchAnnouncementRequest() {
  yield takeLatest(
    Types.GET_ANNOUNCEMENT_DETAIL_REQUEST,
    getAnnouncementDetailRequest,
  );
}

function* updateWarehouseAnnouncementDetailRequest(data) {
  try {
    const warehouseAnnouncementDetail = yield call(
      updateFieldAnnouncementDetailApi,
      data,
    );
    yield put(
      Creators.updateWarehouseAnnouncementDetailSuccess({ data: warehouseAnnouncementDetail }),
    );
    yield put(ToastCreators.success({}));
    yield put(
      Creators.getAnnouncementDetailRequest({ requestBody: warehouseAnnouncementDetail._id }),
    );
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.updateWarehouseAnnouncementDetailFailure({ error }));
  }
}

function* watchUpdateWarehouseAnnouncementDetailRequest() {
  yield takeLatest(
    Types.UPDATE_WAREHOUSE_ANNOUNCEMENT_DETAIL_REQUEST,
    updateWarehouseAnnouncementDetailRequest,
  );
}
export default function* WarehouseAnnouncementRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchAnnouncementRequest),
      fork(watchUpdateWarehouseAnnouncementDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
