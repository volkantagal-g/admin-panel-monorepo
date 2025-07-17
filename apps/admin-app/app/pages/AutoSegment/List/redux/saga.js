import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getAutoSegmentTemplates,
  createNewAutoSegmentTemplate,
  updateAutoSegmentTemplate,
  activateAutoSegmentTemplate,
  deactivateAutoSegmentTemplate,
  activateAutoSegmentTemplateVersion,
  getAutoSegmentTemplate as getAutoSegmentTemplateApi,
} from '@shared/api/autoSegment';
import {
  getClientListTemplateFilter as getClientListTemplateFilterApi,
  getClientListTemplate as getClientListTemplateApi,
} from '@shared/api/clientTargeting';
import { getSegmentClientCounts } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { AUTO_SEGMENT_STATUS } from '../../constants';

function* getAutoSegments({ limit, offset, areInactivesIncluded }) {
  try {
    const apiParams = { limit, offset };
    if (!areInactivesIncluded) {
      apiParams.status = AUTO_SEGMENT_STATUS.ACTIVE;
    }
    const { data } = yield call(getAutoSegmentTemplates, apiParams);
    yield put(Creators.getAutoSegmentsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAutoSegmentsFailure({ error }));
  }
}

function* watchGetAutoSegmentsRequest() {
  yield takeLatest(Types.GET_AUTO_SEGMENTS_REQUEST, getAutoSegments);
}

function* createAutoSegmentRequest({ payload }) {
  try {
    const { data } = yield call(createNewAutoSegmentTemplate, { payload });
    yield put(Creators.createAutoSegmentSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createAutoSegmentFailure({ error }));
  }
}

function* watchCreateAutoSegmentRequest() {
  yield takeLatest(Types.CREATE_AUTO_SEGMENT_REQUEST, createAutoSegmentRequest);
}

function* updateAutoSegmentRequest({ id, updateData }) {
  try {
    const { data } = yield call(updateAutoSegmentTemplate, { id, updateData });
    yield put(Creators.updateAutoSegmentSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateAutoSegmentFailure({ error }));
  }
}

function* watchUpdateAutoSegmentRequest() {
  yield takeLatest(Types.UPDATE_AUTO_SEGMENT_REQUEST, updateAutoSegmentRequest);
}

function* activateAutoSegmentTemplateVersionRequest({ id, updateData }) {
  try {
    const { data } = yield call(activateAutoSegmentTemplateVersion, { id, updateData });
    yield put(Creators.activateAutoSegmentTemplateVersionSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.activateAutoSegmentTemplateVersionFailure({ error }));
  }
}

function* watchActivateAutoSegmentTemplateVersionRequest() {
  yield takeLatest(Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_VERSION_REQUEST, activateAutoSegmentTemplateVersionRequest);
}

function* activateAutoSegmentTemplateRequest({ id }) {
  try {
    const { data } = yield call(activateAutoSegmentTemplate, { id });
    yield put(Creators.activateAutoSegmentTemplateSuccess({ autoSegmentTemplate: data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateAutoSegmentTemplateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchActivateAutoSegmentTemplateRequest() {
  yield takeLatest(Types.ACTIVATE_AUTO_SEGMENT_TEMPLATE_REQUEST, activateAutoSegmentTemplateRequest);
}

function* deactivateAutoSegmentTemplateRequest({ id }) {
  try {
    const { data } = yield call(deactivateAutoSegmentTemplate, { id });
    yield put(Creators.deactivateAutoSegmentTemplateSuccess({ autoSegmentTemplate: data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateAutoSegmentTemplateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeactivateAutoSegmentTemplateRequest() {
  yield takeLatest(Types.DEACTIVATE_AUTO_SEGMENT_TEMPLATE_REQUEST, deactivateAutoSegmentTemplateRequest);
}

function* getClientListTemplatesRequest({ name }) {
  try {
    const data = yield call(getClientListTemplateFilterApi, { name });
    yield put(Creators.getClientListTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
  }
}

function* getInitialClientListTemplateRequest({ id }) {
  try {
    const data = yield call(getClientListTemplateApi, { clientListTemplateId: id });
    yield put(Creators.getClientListTemplatesSuccess({ data: [data] }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
  }
}

function* watchGetClientListTemplatesRequest() {
  yield takeLatest(Types.GET_CLIENT_LIST_TEMPLATES_REQUEST, getClientListTemplatesRequest);
}

function* watchGetInitialClientListTemplateRequest() {
  yield takeLatest(Types.GET_INITIAL_CLIENT_LIST_TEMPLATE_REQUEST, getInitialClientListTemplateRequest);
}

function* getSegmentClientCountsRequest({ autoSegmentId, segments }) {
  try {
    const { count } = yield call(getSegmentClientCounts, { segments });
    yield put(Creators.getSegmentClientCountsSuccess({ autoSegmentId, count }));
  }
  catch (error) {
    yield put(Creators.getSegmentClientCountsFailure({ error }));
  }
}

function* getAutoSegmentTemplateRequest({ id }) {
  try {
    const data = yield call(getAutoSegmentTemplateApi, { id });
    yield put(Creators.getAutoSegmentTemplateSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAutoSegmentTemplateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSegmentClientCountsRequest() {
  yield takeLatest(Types.GET_SEGMENT_CLIENT_COUNTS_REQUEST, getSegmentClientCountsRequest);
}

function* watchGetAutoSegmentTemplateRequest() {
  yield takeLatest(Types.GET_AUTO_SEGMENT_TEMPLATE_REQUEST, getAutoSegmentTemplateRequest);
}

export default function* autoSegmentListPagePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAutoSegmentsRequest),
      fork(watchCreateAutoSegmentRequest),
      fork(watchUpdateAutoSegmentRequest),
      fork(watchActivateAutoSegmentTemplateRequest),
      fork(watchDeactivateAutoSegmentTemplateRequest),
      fork(watchGetClientListTemplatesRequest),
      fork(watchGetInitialClientListTemplateRequest),
      fork(watchActivateAutoSegmentTemplateVersionRequest),
      fork(watchGetSegmentClientCountsRequest),
      fork(watchGetAutoSegmentTemplateRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
