import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getPageRolesRequest: { permKey: null },
  getPageRolesSuccess: { data: [] },
  getPageRolesFailure: { error: null },
  getPageRolesReset: { },
  getPageByIdRequest: { id: null },
  getPageByIdSuccess: { data: {} },
  getPageByIdFailure: { error: null },
  updatePageRequest: { id: null, permKey: null, onSuccess: () => {}, updateData: {} },
  updatePageSuccess: { data: {} },
  updatePageFailure: { error: null },

  addPageOwnersRequest: { pageId: null, ownerIds: [], afterSuccess: null },
  addPageOwnersSuccess: { data: [] },
  addPageOwnersFailure: { error: null },

  removePageOwnersRequest: { pageId: null, ownerIds: [], afterSuccess: null },
  removePageOwnersSuccess: { data: [] },
  removePageOwnersFailure: { error: null },

  addPageToRolesByPageOwnerRequest: { roles: null, countries: null, pageId: null, permKey: null, hasGlobalAccess: null, componentAccess: [] },
  removePageFromRoleByPageOwnerRequest: { role: null, pageId: null, permKey: null },
  updatePageCountriesOfRoleByPageOwnerRequest: { role: null, countries: null, pageId: null, permKey: null, hasGlobalAccess: null, componentAccess: [] },
  exportRolesExcel: { page: null },
  exportRolesExcelFailure: { error: null },
  getPanelDocsByFiltersRequest: { pageId: '', users: '' },
  getPanelDocsByFiltersSuccess: { data: [] },
  getPanelDocsByFiltersFailure: { error: null },
  getPanelDocsByFiltersReset: { },
  panelDocUpdateActivenessRequest: { _id: '', pageId: '', isActive: null },
  panelDocUpdateActivenessSuccess: { data: [] },
  panelDocUpdateActivenessFailure: { error: null },
  removePanelDocRequest: { _id: '', pageId: '' },
  removePanelDocSuccess: { data: [] },
  removePanelDocFailure: { error: null },
  createPanelDocRequest: { name: '', pageId: '' },
  createPanelDocSuccess: { data: [] },
  createPanelDocFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PAGE.DETAIL}_` });
