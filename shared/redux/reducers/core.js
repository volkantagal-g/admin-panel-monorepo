import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/core';

export const INITIAL_STATE = {
  searchPanelDocs: { data: [], error: null, isPending: false },
  searchPages: { data: [], error: null, isPending: false },
  searchRoles: { data: [], error: null, isPending: false },
};

const searchPanelDocsRequest = state => {
  return {
    ...state,
    searchPanelDocs: {
      ...state.searchPanelDocs,
      isPending: true,
    },
  };
};

const searchPanelDocsSuccess = (state, { data }) => {
  return {
    ...state,
    searchPanelDocs: {
      ...state.searchPanelDocs,
      data,
      isPending: false,
    },
  };
};

const searchPanelDocsFailure = (state, { error }) => {
  return {
    ...state,
    searchPanelDocs: {
      ...state.searchPanelDocs,
      error,
      isPending: false,
    },
  };
};

const searchPagesRequest = state => {
  return {
    ...state,
    searchPages: {
      ...state.searchPages,
      isPending: true,
    },
  };
};

const searchPagesSuccess = (state, { data }) => {
  return {
    ...state,
    searchPages: {
      ...state.searchPages,
      data,
      isPending: false,
    },
  };
};

const searchPagesFailure = (state, { error }) => {
  return {
    ...state,
    searchPages: {
      ...state.searchPages,
      error,
      isPending: false,
    },
  };
};

const searchRolesRequest = state => {
  return {
    ...state,
    searchRoles: {
      ...state.searchRoles,
      isPending: true,
    },
  };
};

const searchRolesSuccess = (state, { data }) => {
  return {
    ...state,
    searchRoles: {
      ...state.searchRoles,
      data,
      isPending: false,
    },
  };
};

const searchRolesFailure = (state, { error }) => {
  return {
    ...state,
    searchRoles: {
      ...state.searchRoles,
      error,
      isPending: false,
    },
  };
};

export const HANDLERS = {
  [Types.SEARCH_PANEL_DOCS_REQUEST]: searchPanelDocsRequest,
  [Types.SEARCH_PANEL_DOCS_SUCCESS]: searchPanelDocsSuccess,
  [Types.SEARCH_PANEL_DOCS_FAILURE]: searchPanelDocsFailure,

  [Types.SEARCH_PAGES_REQUEST]: searchPagesRequest,
  [Types.SEARCH_PAGES_SUCCESS]: searchPagesSuccess,
  [Types.SEARCH_PAGES_FAILURE]: searchPagesFailure,

  [Types.SEARCH_ROLES_REQUEST]: searchRolesRequest,
  [Types.SEARCH_ROLES_SUCCESS]: searchRolesSuccess,
  [Types.SEARCH_ROLES_FAILURE]: searchRolesFailure,

};

export default createReducer(INITIAL_STATE, HANDLERS);
