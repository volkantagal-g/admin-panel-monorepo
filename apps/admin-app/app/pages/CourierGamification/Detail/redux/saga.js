import { select, all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { detailCourierGamificationTaskByIdSelector } from './selectors';
import {
  getCourierGamificationTaskById as getCourierGamificationTaskByIdApi,
  updateCourierGamificationTask as updateCourierGamificationTaskApi,
  deleteGMFCTaskById as deleteGMFCTaskByIdApi,
} from '@shared/api/courierGamification';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { addMissingAdminOptionFields } from '../helper';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* deleteTaskByIdRequest() {
  try {
    const currId = yield select(detailCourierGamificationTaskByIdSelector.getCurrId);
    yield call(deleteGMFCTaskByIdApi, currId);
  }
  catch (error) {
    yield put(Creators.deleteTaskByIdFailure({ error }));
    yield put(ToastCreators.error({ message: error?.response?.data?.error }));
  }
  finally {
    yield call(history.push, ROUTE.COURIER_GAMIFICATION_TASK_LIST.path);
  }
}

function* updateTaskDetailCourierGMFCRequest({ requestBody }) {
  try {
    const currId = yield select(detailCourierGamificationTaskByIdSelector.getCurrId);
    const data = yield call(updateCourierGamificationTaskApi, { requestBody, id: currId });
    const taskDataApi = data?.task;
    const { courierCount, status, createdAt, updatedAt, id, ...taskData } = taskDataApi;

    yield put(Creators.updateTaskDetailCourierGMFCSuccess({
      taskData: { ...taskData, adminOptions: addMissingAdminOptionFields(taskData?.adminOptions) },
      courierCount,
      status,
    }));
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateTaskDetailCourierGMFCFailure({ error }));
    yield put(ToastCreators.error({ message: error?.response?.data?.error }));
  }
}

function* getCourierGamificationTaskByIdRequest({ currId }) {
  try {
    const data = yield call(getCourierGamificationTaskByIdApi, currId);
    const taskDataApi = data?.task;
    const { courierCount, status, createdAt, updatedAt, updatedBy, createdBy, id, ...taskData } = taskDataApi;
    yield put(Creators.detailCourierGamificationTaskByIdSuccess({
      taskData: { ...taskData, adminOptions: addMissingAdminOptionFields(taskData?.adminOptions) },
      courierCount,
      status,
    }));
  }
  catch (error) {
    yield put(Creators.detailCourierGamificationTaskByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCourierGamificationTaskRequest() {
  yield takeLatest(Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_REQUEST, getCourierGamificationTaskByIdRequest);
  yield takeLatest(Types.UPDATE_TASK_DETAIL_COURIER_GMFC_REQUEST, updateTaskDetailCourierGMFCRequest);
  yield takeLatest(Types.DELETE_TASK_BY_ID_REQUEST, deleteTaskByIdRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierGamificationTaskRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
