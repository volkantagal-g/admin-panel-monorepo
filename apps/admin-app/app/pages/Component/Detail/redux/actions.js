import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getComponentByIdRequest: { id: null },
  getComponentByIdSuccess: { data: {} },
  getComponentByIdFailure: { error: null },
  updateComponentRequest: { id: null, updateData: {} },
  updateComponentSuccess: { data: {} },
  updateComponentFailure: { error: null },
  getComponentRolesRequest: { permKey: null },
  getComponentRolesSuccess: { data: [] },
  getComponentRolesFailure: { error: null },
  getComponentRolesReset: {},
  addComponentToRolesByPageOwnerRequest: {
    roles: null,
    countries: null,
    pageId: null,
    componentId: null,
    permKey: null,
    hasGlobalAccess: null,
  },
  removeComponentFromRoleByPageOwnerRequest: { role: null, pageId: null, componentId: null, permKey: null },
  updateComponentCountriesOfRoleByPageOwnerRequest: {
    role: null,
    countries: null,
    pageId: null,
    componentId: null,
    permKey: null,
    hasGlobalAccess: null,
  },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMPONENT.DETAIL}_` });
