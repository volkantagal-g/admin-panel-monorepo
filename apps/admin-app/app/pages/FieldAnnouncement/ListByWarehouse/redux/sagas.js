import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getFieldAnnouncementsListByWarehouse as getFieldAnnouncementsListByWarehouseApi } from '@shared/api/fieldAnnouncement';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* warehouseAnnouncementListByWarehouseRequest({
  warehouses,
  limit,
  offset,
}) {
  try {
    const warehouseAnnouncementListByWarehouses = yield call(
      getFieldAnnouncementsListByWarehouseApi,
      {
        warehouseIds: warehouses,
        offset,
        limit,
      },
    );

    yield put(
      Creators.getWarehouseAnnouncementsListByWarehouseSuccess(
        warehouseAnnouncementListByWarehouses,
      ),
    );
  }
  catch (error) {
    yield put(
      Creators.getWarehouseAnnouncementsListByWarehouseFailure({ error }),
    );
    yield put(ToastCreators.error({ error }));
  }
}

function* watchWarehouseAnnouncementListByWarehouseRequest() {
  yield takeLatest(
    Types.GET_WAREHOUSE_ANNOUNCEMENTS_LIST_BY_WAREHOUSE_REQUEST,
    warehouseAnnouncementListByWarehouseRequest,
  );
}

export default function* warehouseAnnouncementListByWarehousesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchWarehouseAnnouncementListByWarehouseRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
