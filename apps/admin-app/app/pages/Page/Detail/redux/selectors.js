import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PAGE.DETAIL;

export const getPageByIdSelector = {
  getData: state => state[reducerKey]?.getPageById?.data,
  getIsPending: state => state[reducerKey]?.getPageById?.isPending,
};

export const getPageRolesSelector = {
  getData: state => state[reducerKey]?.pageRoles?.data,
  getIsPending: state => state[reducerKey]?.pageRoles?.isPending,
  getIsRequested: state => state[reducerKey]?.pageRoles?.isRequested,
};

export const updatePageSelector = {
  getData: state => state[reducerKey]?.updatePage?.data,
  getIsPending: state => state[reducerKey]?.updatePage?.isPending,
};

export const addPageOwnersSelector = {
  getData: state => state[reducerKey]?.addPageOwners?.data,
  getIsPending: state => state[reducerKey]?.addPageOwners?.isPending,
};

export const removePageOwnersSelector = {
  getData: state => state[reducerKey]?.removePageOwners?.data,
  getIsPending: state => state[reducerKey]?.removePageOwners?.isPending,
};

export const getPanelDocsByFiltersSelector = {
  getData: state => state[reducerKey]?.getPanelDocsByFilters?.data,
  getIsPending: state => state[reducerKey]?.getPanelDocsByFilters?.isPending,
  getIsRequested: state => state[reducerKey]?.getPanelDocsByFilters?.isRequested,
};

export const panelDocUpdateActivenessSelector = { getIsPending: state => state[reducerKey]?.panelDocUpdateActiveness?.isPending };

export const removePanelDocSelector = { getIsPending: state => state[reducerKey]?.removePanelDoc?.isPending };

export const createPanelDocSelector = { getIsPending: state => state[reducerKey]?.createPanelDoc?.isPending };
