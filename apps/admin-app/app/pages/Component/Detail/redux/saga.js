import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getComponentById, updateComponent } from '@shared/api/component';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getPermittedRolesByPermKey } from '@shared/api/permission';
import {
  addComponentToRolesByPageOwner as addComponentToRolesByPageOwnerAPI,
  removePageFromRoleByPageOwner as removePageFromRoleByPageOwnerAPI,
  updateComponentCountriesOfRoleByPageOwner as updateComponentCountriesOfRoleByPageOwnerAPI,
} from '@shared/api/role';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

function* getComponentByIdRequest({ id }) {
  try {
    const data = yield call(getComponentById, { id });
    yield put(Creators.getComponentByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getComponentByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateComponentRequest({ id, updateData }) {
  try {
    const data = yield call(updateComponent, { id, updateData });
    yield put(Creators.updateComponentSuccess({ data }));
    yield put(Creators.getComponentByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateComponentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getComponentRoles({ permKey }) {
  try {
    const data = yield call(getPermittedRolesByPermKey, { permKey });
    yield put(Creators.getComponentRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getComponentRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* addComponentToRolesByPageOwner({
  roles,
  countries,
  pageId,
  componentId,
  permKey,
  hasGlobalAccess,
}) {
  try {
    yield call(addComponentToRolesByPageOwnerAPI, {
      roleIds: roles,
      countryIds: countries,
      pageId,
      componentId,
      hasGlobalAccess,
    });
    yield put(Creators.getComponentRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* removeComponentFromRoleByPageOwner({
  role,
  pageId,
  componentId,
  permKey,
}) {
  try {
    yield call(removePageFromRoleByPageOwnerAPI, { role, pageId, componentId });
    yield put(Creators.getComponentRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* updateComponentCountriesOfRoleByPageOwner({
  role,
  countries,
  pageId,
  componentId,
  permKey,
  hasGlobalAccess,
}) {
  try {
    yield call(updateComponentCountriesOfRoleByPageOwnerAPI, {
      role,
      countries,
      pageId,
      componentId,
      hasGlobalAccess,
    });
    yield put(Creators.getComponentRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetComponentByIdRequest() {
  yield takeLatest(Types.GET_COMPONENT_BY_ID_REQUEST, getComponentByIdRequest);
}

function* watchUpdateComponentByIdRequest() {
  yield takeLatest(Types.UPDATE_COMPONENT_REQUEST, updateComponentRequest);
}

function* watchGetComponentRolesRequest() {
  yield takeLatest(Types.GET_COMPONENT_ROLES_REQUEST, getComponentRoles);
}

function* watchAddComponentToRolesByPageOwnerRequest() {
  yield takeLatest(Types.ADD_COMPONENT_TO_ROLES_BY_PAGE_OWNER_REQUEST, addComponentToRolesByPageOwner);
}

function* watchRemoveComponentFromRoleByPageOwnerRequest() {
  yield takeLatest(Types.REMOVE_COMPONENT_FROM_ROLE_BY_PAGE_OWNER_REQUEST, removeComponentFromRoleByPageOwner);
}

function* updateComponentCountriesOfRoleByPageOwnerRequest() {
  yield takeLatest(Types.UPDATE_COMPONENT_COUNTRIES_OF_ROLE_BY_PAGE_OWNER_REQUEST, updateComponentCountriesOfRoleByPageOwner);
}

export default function* pageDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetComponentByIdRequest),
      fork(watchUpdateComponentByIdRequest),
      fork(watchGetComponentRolesRequest),
      fork(watchAddComponentToRolesByPageOwnerRequest),
      fork(watchRemoveComponentFromRoleByPageOwnerRequest),
      fork(updateComponentCountriesOfRoleByPageOwnerRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(Creators.getComponentRolesReset());
    yield put(CommonCreators.getUserOwnedPagesReset());
  }
}
