import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  addRolesToReportTag,
  getReportTagById,
  getRolesByReportTags,
  removeRoleFromReportTag,
  updateReportTag,
  getReportTypes,
} from '@shared/api/report';
import { getRoles } from '@shared/api/role';

import { Types, Creators } from './actions';
import { REPORT_TAG_FORM_MODE } from '../../constants';

export function* getReportTagByIdRequest({ id }) {
  try {
    const data = yield call(getReportTagById, id);
    yield put(Creators.getReportTagByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTagByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchReportTagByIdRequest() {
  yield takeLatest(Types.GET_REPORT_TAG_BY_ID_REQUEST, getReportTagByIdRequest);
}

export function* updateReportTagRequest({ data }) {
  try {
    const updateData = yield call(updateReportTag, data);
    yield put(Creators.updateReportTagSuccess({ data: updateData }));
    // after update finished, make the form readonly
    yield put(Creators.setFormMode({ formMode: REPORT_TAG_FORM_MODE.READONLY }));
  }
  catch (error) {
    yield put(Creators.updateReportTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchUpdateReportTagRequest() {
  yield takeLatest(Types.UPDATE_REPORT_TAG_REQUEST, updateReportTagRequest);
}

export function* addRolesToReportTagRequest({ reportTagId, roleIds }) {
  try {
    const updateData = yield call(addRolesToReportTag, { reportTagId, roleIds });
    yield put(Creators.addRolesToReportTagSuccess({ data: updateData }));
    yield put(ToastCreators.success());
    // update role list
    yield put(Creators.getRolesByReportTagsRequest({ reportTagIds: [reportTagId], shouldBringRoleDetails: true }));
  }
  catch (error) {
    yield put(Creators.addRolesToReportTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchAddRolesToReportTagRequest() {
  yield takeLatest(Types.ADD_ROLES_TO_REPORT_TAG_REQUEST, addRolesToReportTagRequest);
}

export function* getRolesByReportTagsRequest({ reportTagIds, shouldBringRoleDetails }) {
  try {
    const updateData = yield call(getRolesByReportTags, { reportTagIds });
    yield put(Creators.getRolesByReportTagsSuccess({ data: updateData }));
    if (shouldBringRoleDetails) {
      yield put(Creators.getRolesDetailsRequest({ roleIds: updateData }));
    }
  }
  catch (error) {
    yield put(Creators.getRolesByReportTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetRolesByReportTagsRequest() {
  yield takeLatest(Types.GET_ROLES_BY_REPORT_TAGS_REQUEST, getRolesByReportTagsRequest);
}

export function* getRolesDetailsRequest({ roleIds }) {
  try {
    let result = [];
    // empty array returns all roles, no roles no details needed
    if (roleIds?.length) {
      result = yield call(getRoles, { roleIds });
    }
    yield put(Creators.getRolesDetailsSuccess({ data: result }));
  }
  catch (error) {
    yield put(Creators.getRolesDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetRolesDetailsRequest() {
  yield takeLatest(Types.GET_ROLES_DETAILS_REQUEST, getRolesDetailsRequest);
}

export function* removeRoleFromReportTagRequest({ reportTagId, roleId }) {
  try {
    const updateData = yield call(removeRoleFromReportTag, { reportTagId, roleId });
    yield put(Creators.removeRoleFromReportTagSuccess({ data: updateData }));
    // update role list
    yield put(Creators.getRolesByReportTagsRequest({ reportTagIds: [reportTagId], shouldBringRoleDetails: true }));
  }
  catch (error) {
    yield put(Creators.removeRoleFromReportTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchRemoveRoleFromReportTagRequest() {
  yield takeLatest(Types.REMOVE_ROLE_FROM_REPORT_TAG_REQUEST, removeRoleFromReportTagRequest);
}

export function* getReportTypesRequest({ data: dataIn }) {
  try {
    const data = yield call(getReportTypes, { ...dataIn, fields: { permittedUsers: 0, __v: 0, parameters: 0 } });
    yield put(Creators.getReportTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchReportTypesRequest() {
  yield takeLatest(Types.GET_REPORT_TYPES_REQUEST, getReportTypesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchReportTagByIdRequest),
      fork(watchUpdateReportTagRequest),
      fork(watchAddRolesToReportTagRequest),
      fork(watchGetRolesByReportTagsRequest),
      fork(watchGetRolesDetailsRequest),
      fork(watchRemoveRoleFromReportTagRequest),
      fork(watchReportTypesRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
