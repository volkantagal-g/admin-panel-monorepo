import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import moment from 'moment';
import { isFunction } from 'lodash';

import {
  getPageById,
  updatePage,
  getPageRoles,
  addPageOwners,
  removePageOwners,
} from '@shared/api/page';
import {
  getByFilters,
  updateActiveness,
  removePanelDoc,
  createPanelDoc,
} from '@shared/api/panelDoc';
import {
  addPageToRolesByPageOwner as addPageToRolesByPageOwnerAPI,
  removePageFromRoleByPageOwner as removePageFromRoleByPageOwnerAPI,
  updatePageCountriesOfRoleByPageOwner as updatePageCountriesOfRoleByPageOwnerAPI,
} from '@shared/api/role';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getLangKey, t } from '@shared/i18n';
import { createMap, exportExcel } from '@shared/utils/common';
import { getPermittedRolesByPermKey } from '@shared/api/permission';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

const MOMENT_DAY_FORMAT = 'YYYY-MM-DD';

function* getPageByIdRequest({ id }) {
  try {
    const data = yield call(getPageById, { id, isPopulatePageOwners: true });
    yield put(Creators.getPageByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPageByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPageRolesRequest({ permKey }) {
  try {
    const data = yield call(getPageRoles, { permKey, populateComponentAccess: true });
    yield put(Creators.getPageRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPageRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePageRequest({ id, permKey, updateData, onSuccess }) {
  try {
    const data = yield call(updatePage, { id, permKey, updateData });
    yield put(Creators.updatePageSuccess({ data }));
    yield put(Creators.getPageByIdRequest({ id }));
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    let errorMessage = error.response.data.data;
    if (errorMessage?.tr || errorMessage?.en) {
      errorMessage = errorMessage[getLangKey()];
    }

    yield put(Creators.updatePageFailure({ error }));
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* addPageOwnersRequest({ pageId, ownerIds, afterSuccess }) {
  try {
    const data = yield call(addPageOwners, { pageId, ownerIds });
    yield put(Creators.addPageOwnersSuccess({ data }));
    yield put(Creators.getPageByIdRequest({ id: pageId }));
    yield put(ToastCreators.success());
    if (afterSuccess) {
      yield call(afterSuccess);
    }
  }
  catch (error) {
    yield put(Creators.addPageOwnersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddPageOwnersRequest() {
  yield takeLatest(Types.ADD_PAGE_OWNERS_REQUEST, addPageOwnersRequest);
}

function* removePageOwnersRequest({ pageId, ownerIds, afterSuccess }) {
  try {
    yield call(removePageOwners, { pageId, ownerIds });
    yield put(Creators.removePageOwnersSuccess({ ownerIds }));
    yield put(Creators.getPageByIdRequest({ id: pageId }));
    yield put(ToastCreators.success());
    if (afterSuccess) {
      yield call(afterSuccess);
    }
  }
  catch (error) {
    yield put(Creators.removePageOwnersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRemovePageOwnersRequest() {
  yield takeLatest(Types.REMOVE_PAGE_OWNERS_REQUEST, removePageOwnersRequest);
}

function* addPageToRolesByPageOwner({
  roles,
  countries,
  pageId,
  permKey,
  componentAccess,
  hasGlobalAccess,
}) {
  try {
    yield call(addPageToRolesByPageOwnerAPI, {
      roleIds: roles,
      countryIds: countries,
      pageId,
      componentAccess,
      hasGlobalAccess,
    });
    yield put(Creators.getPageRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* removePageFromRoleByPageOwner({ role, pageId, permKey }) {
  try {
    yield call(removePageFromRoleByPageOwnerAPI, { role, pageId });
    yield put(Creators.getPageRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePageCountriesOfRoleByPageOwner({
  role,
  countries,
  pageId,
  componentAccess,
  permKey,
  hasGlobalAccess,
}) {
  try {
    yield call(updatePageCountriesOfRoleByPageOwnerAPI, {
      role,
      countries,
      pageId,
      componentAccess,
      hasGlobalAccess,
    });
    yield put(Creators.getPageRolesRequest({ permKey, isActive: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getPanelDocsByFiltersRequest({ pageId }) {
  try {
    const data = yield call(getByFilters, { pageId, populate: { users: true } });
    yield put(Creators.getPanelDocsByFiltersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPanelDocsByFiltersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* panelDocUpdateActivenessRequest({ _id, pageId, isActive }) {
  let isSuccess = false;
  try {
    yield call(updateActiveness, { _id, pageId, isActive });
    isSuccess = true;
    yield put(Creators.panelDocUpdateActivenessSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.panelDocUpdateActivenessFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 5000 } }));
  }

  if (isSuccess) {
    yield put(Creators.getPanelDocsByFiltersRequest({ pageId }));
    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.DOC_INFO_ACTIVE_INACTIVE });
  }
}

function* removePanelDocRequest({ _id, pageId }) {
  let isSuccess = false;
  try {
    yield call(removePanelDoc, { _id, pageId });
    isSuccess = true;
    yield put(Creators.removePanelDocSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.removePanelDocFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 3000 } }));
  }

  if (isSuccess) {
    yield put(Creators.getPanelDocsByFiltersRequest({ pageId }));
  }
}

function* createPanelDocRequest({ name, pageId }) {
  let isSuccess = false;
  try {
    yield call(createPanelDoc, { name, pageId });
    isSuccess = true;
    yield put(Creators.createPanelDocSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.message?.[getLangKey()];
    yield put(Creators.createPanelDocFailure({ error }));
    yield put(ToastCreators.error({ error, message, toastOptions: { autoClose: 3000 } }));
  }

  if (isSuccess) {
    yield put(Creators.getPanelDocsByFiltersRequest({ pageId }));
  }
}

function* watchGetPageByIdRequest() {
  yield takeLatest(Types.GET_PAGE_BY_ID_REQUEST, getPageByIdRequest);
}

function* watchGetPageRolesRequest() {
  yield takeLatest(Types.GET_PAGE_ROLES_REQUEST, getPageRolesRequest);
}

function* watchUpdatePageByIdRequest() {
  yield takeLatest(Types.UPDATE_PAGE_REQUEST, updatePageRequest);
}

function* watchAddPageToRolesByPageOwnerRequest() {
  yield takeLatest(Types.ADD_PAGE_TO_ROLES_BY_PAGE_OWNER_REQUEST, addPageToRolesByPageOwner);
}

function* watchRemovePageFromRoleByPageOwnerRequest() {
  yield takeLatest(Types.REMOVE_PAGE_FROM_ROLE_BY_PAGE_OWNER_REQUEST, removePageFromRoleByPageOwner);
}

function* watchUpdatePageCountriesOfRoleByPageOwnerRequest() {
  yield takeLatest(Types.UPDATE_PAGE_COUNTRIES_OF_ROLE_BY_PAGE_OWNER_REQUEST, updatePageCountriesOfRoleByPageOwner);
}

export function* exportRolesExcel({ page }) {
  try {
    const data = yield call(getPageRoles, { permKey: page.permKey, populateRoleOwners: true });
    const language = yield select(getSelectedLanguage);
    const countries = yield select(countriesSelector.getData);
    const countryMap = createMap(countries);
    const componentsRolesPromises = page.components.map(
      async component => getPermittedRolesByPermKey({ permKey: component.permKey, populateRoleOwners: true }),
    );
    const componentsRoles = yield call([Promise, Promise.all], componentsRolesPromises);

    const dataToExport = [];
    data.forEach(role => {
      const pageId = page._id;
      const pageName = page.name[language];
      const roleId = role._id;
      const roleName = role.name;

      const permittedCountryNames = role.permittedCountries.map(countryId => countryMap[countryId]?.name[language]);
      const accessGrantedCountries = role.hasGlobalAccess ? t('global:GLOBAL') : permittedCountryNames.join(',');

      dataToExport.push({
        pageId,
        componentId: '',
        name: pageName,
        roleId,
        roleName,
        description: role.description[language],
        activeness: role.isActive ? t('global:ACTIVE') : t('global:INACTIVE'),
        roleOwners: role.roleOwners.map(({ email, name }) => `${name} - (${email})`).join(', '),
        createdAt: moment(role.accessGrantedDate).format(MOMENT_DAY_FORMAT),
        accessGrantedCountries,
      });
    });

    for (let i = 0; i < page.components.length; i++) {
      const component = page.components[i];
      const componentRoles = componentsRoles[i];

      componentRoles.forEach(role => {
        const permittedCountryNames = role.permittedCountries.map(countryId => countryMap[countryId]?.name[language]);
        const accessGrantedCountries = role.hasGlobalAccess ? t('global:GLOBAL') : permittedCountryNames.join(',');

        dataToExport.push({
          pageId: '',
          componentId: component._id,
          name: component.name[language],
          roleId: role._id,
          roleName: role.name,
          description: role.description[language],
          activeness: role.isActive ? t('global:ACTIVE') : t('global:INACTIVE'),
          roleOwners: role.roleOwners.map(({ email, name }) => `${name} - (${email})`).join(', '),
          createdAt: moment(role.accessGrantedDate).format(MOMENT_DAY_FORMAT),
          accessGrantedCountries,
        });
      });
    }

    const date = moment();
    const pageName = page.name[language].replace(/ /g, '-');
    exportExcel(dataToExport, `AllAccessGrantedRolesList_${pageName}_${date.format(MOMENT_DAY_FORMAT)}.csv`, [
      {
        title: t('pagePage:ROLE_EXPORT.PAGE_ID'),
        key: 'pageId',
      },
      {
        title: t('pagePage:COMPONENT_ID'),
        key: 'componentId',
      },
      {
        title: t('pagePage:PAGE_OR_COMPONENT_NAME'),
        key: 'name',
      },
      {
        title: t('pagePage:ROLE_EXPORT.ROLE_ID'),
        key: 'roleId',
      },
      {
        title: t('pagePage:ROLE_EXPORT.ROLE_NAME'),
        key: 'roleName',
      },
      {
        title: t('pagePage:ROLE_EXPORT.DESCRIPTION'),
        key: 'description',
      },
      {
        title: t('global:ACTIVENESS'),
        key: 'activeness',
      },
      {
        title: t('pagePage:ROLE_EXPORT.ROLE_OWNERS'),
        key: 'roleOwners',
      },
      {
        title: t('pagePage:ROLE_EXPORT.CREATION_DATE'),
        key: 'createdAt',
      },
      {
        title: t('pagePage:ROLE_EXPORT.ACCESS_GRANTED_COUNTRIES'),
        key: 'accessGrantedCountries',
      },
    ]);
  }
  catch (error) {
    yield put(Creators.exportRolesExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportRolesExcel() {
  yield takeLatest(Types.EXPORT_ROLES_EXCEL, exportRolesExcel);
}

function* watchGetPanelDocsByFiltersRequest() {
  yield takeLatest(Types.GET_PANEL_DOCS_BY_FILTERS_REQUEST, getPanelDocsByFiltersRequest);
}

function* watchPanelDocUpdateActivenessRequest() {
  yield takeLatest(Types.PANEL_DOC_UPDATE_ACTIVENESS_REQUEST, panelDocUpdateActivenessRequest);
}

function* watchRemovePanelDocRequest() {
  yield takeLatest(Types.REMOVE_PANEL_DOC_REQUEST, removePanelDocRequest);
}

function* watchCreatePanelDocRequest() {
  yield takeLatest(Types.CREATE_PANEL_DOC_REQUEST, createPanelDocRequest);
}

export default function* pageDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPageByIdRequest),
      fork(watchUpdatePageByIdRequest),
      fork(watchAddPageOwnersRequest),
      fork(watchRemovePageOwnersRequest),
      fork(watchGetPageRolesRequest),
      fork(watchAddPageToRolesByPageOwnerRequest),
      fork(watchRemovePageFromRoleByPageOwnerRequest),
      fork(watchUpdatePageCountriesOfRoleByPageOwnerRequest),
      fork(watchExportRolesExcel),
      fork(watchGetPanelDocsByFiltersRequest),
      fork(watchPanelDocUpdateActivenessRequest),
      fork(watchRemovePanelDocRequest),
      fork(watchCreatePanelDocRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(Creators.getPageRolesReset());
    yield put(Creators.getPanelDocsByFiltersReset());
  }
}
