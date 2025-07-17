import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getPageById: {
    isPending: false,
    data: {},
    error: null,
  },
  pageRoles: {
    isPending: false,
    isRequested: false,
    data: [],
    error: null,
  },
  updatePage: {
    isPending: false,
    data: {},
    error: null,
  },
  addPageOwners: {
    isPending: false,
    data: [],
    error: null,
  },
  removePageOwners: {
    isPending: false,
    data: [],
    error: null,
  },
  exportRolesExcel: { error: null },
  getPanelDocsByFilters: {
    data: [],
    isPending: false,
    isRequested: false,
    error: null,
  },
  panelDocUpdateActiveness: {
    isPending: false,
    error: null,
  },
  removePanelDoc: {
    isPending: false,
    data: [],
    error: null,
  },
  createPanelDoc: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getPageByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPageById: {
      ...INITIAL_STATE.getPageById,
      isPending: true,
    },
  };
};

export const getPageByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getPageById: {
      ...INITIAL_STATE.getPageById,
      data,
      isPending: false,
    },
  };
};

export const getPageByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPageById: {
      ...INITIAL_STATE.getPageById,
      isPending: false,
      error,
    },
  };
};

export const getPageRolesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pageRoles: {
      ...state.pageRoles,
      isPending: true,
    },
  };
};

export const getPageRolesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pageRoles: {
      ...state.pageRoles,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getPageRolesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pageRoles: {
      ...state.pageRoles,
      isPending: false,
      isRequested: false,
      error,
    },
  };
};

export const getPageRolesReset = state => ({
  ...state,
  pageRoles: { ...INITIAL_STATE.pageRoles },
});

export const updatePageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePage: {
      ...INITIAL_STATE.updatePage,
      isPending: true,
    },
  };
};

export const updatePageSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatePage: {
      ...INITIAL_STATE.updatePage,
      data,
      isPending: false,
    },
  };
};

export const updatePageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatePage: {
      ...INITIAL_STATE.updatePage,
      isPending: false,
      error,
    },
  };
};

const addPageOwnersRequest = state => ({
  ...state,
  addPageOwners: {
    ...INITIAL_STATE.addPageOwners,
    isPending: true,
  },
});

const addPageOwnersSuccess = (state, { data }) => ({
  ...state,
  addPageOwners: {
    ...INITIAL_STATE.addPageOwners,
    data,
    isPending: false,
  },
});

const addPageOwnersFailure = (state, { error }) => ({
  ...state,
  addPageOwners: {
    ...INITIAL_STATE.addPageOwners,
    error,
    isPending: false,
  },
});

const removePageOwnersRequest = state => ({
  ...state,
  removePageOwners: {
    ...INITIAL_STATE.removePageOwners,
    isPending: true,
  },
});

const removePageOwnersSuccess = (state, { data }) => ({
  ...state,
  removePageOwners: {
    ...INITIAL_STATE.removePageOwners,
    data,
    isPending: false,
  },
});

const removePageOwnersFailure = (state, { error }) => ({
  ...state,
  removePageOwners: {
    ...INITIAL_STATE.removePageOwners,
    error,
    isPending: false,
  },
});

const exportRolesExcelFailure = (state = INITIAL_STATE, { error = {} }) => ({
  ...state,
  exportRolesExcel: {
    ...state.exportRolesExcel,
    error,
  },
});

export const getPanelDocsByFiltersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPanelDocsByFilters: {
      ...state.getPanelDocsByFilters,
      isPending: true,
    },
  };
};

export const getPanelDocsByFiltersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getPanelDocsByFilters: {
      ...state.getPanelDocsByFilters,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getPanelDocsByFiltersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPanelDocsByFilters: {
      ...state.getPanelDocsByFilters,
      isPending: false,
      isRequested: false,
      error,
    },
  };
};

export const getPanelDocsByFiltersReset = state => ({
  ...state,
  getPanelDocsByFilters: { ...INITIAL_STATE.getPanelDocsByFilters },
});

export const panelDocUpdateActivenessRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: true,
    },
  };
};

export const panelDocUpdateActivenessSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: false,
    },
  };
};

export const panelDocUpdateActivenessFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: false,
      error,
    },
  };
};

export const removePanelDocRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    removePanelDoc: {
      ...INITIAL_STATE.removePanelDoc,
      isPending: true,
    },
  };
};

export const removePanelDocSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    removePanelDoc: {
      ...INITIAL_STATE.removePanelDoc,
      isPending: false,
    },
  };
};

export const removePanelDocFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    removePanelDoc: {
      ...INITIAL_STATE.removePanelDoc,
      isPending: false,
      error,
    },
  };
};

export const createPanelDocRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createPanelDoc: {
      ...INITIAL_STATE.createPanelDoc,
      isPending: true,
    },
  };
};

export const createPanelDocSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createPanelDoc: {
      ...INITIAL_STATE.createPanelDoc,
      isPending: false,
    },
  };
};

export const createPanelDocFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createPanelDoc: {
      ...INITIAL_STATE.createPanelDoc,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PAGE_BY_ID_REQUEST]: getPageByIdRequest,
  [Types.GET_PAGE_BY_ID_SUCCESS]: getPageByIdSuccess,
  [Types.GET_PAGE_BY_ID_FAILURE]: getPageByIdFailure,
  [Types.GET_PAGE_ROLES_REQUEST]: getPageRolesRequest,
  [Types.GET_PAGE_ROLES_SUCCESS]: getPageRolesSuccess,
  [Types.GET_PAGE_ROLES_FAILURE]: getPageRolesFailure,
  [Types.GET_PAGE_ROLES_RESET]: getPageRolesReset,
  [Types.UPDATE_PAGE_REQUEST]: updatePageRequest,
  [Types.UPDATE_PAGE_SUCCESS]: updatePageSuccess,
  [Types.UPDATE_PAGE_FAILURE]: updatePageFailure,
  [Types.ADD_PAGE_OWNERS_REQUEST]: addPageOwnersRequest,
  [Types.ADD_PAGE_OWNERS_SUCCESS]: addPageOwnersSuccess,
  [Types.ADD_PAGE_OWNERS_FAILURE]: addPageOwnersFailure,
  [Types.REMOVE_PAGE_OWNERS_REQUEST]: removePageOwnersRequest,
  [Types.REMOVE_PAGE_OWNERS_SUCCESS]: removePageOwnersSuccess,
  [Types.REMOVE_PAGE_OWNERS_FAILURE]: removePageOwnersFailure,
  [Types.EXPORT_ROLES_EXCEL_FAILURE]: exportRolesExcelFailure,
  [Types.GET_PANEL_DOCS_BY_FILTERS_REQUEST]: getPanelDocsByFiltersRequest,
  [Types.GET_PANEL_DOCS_BY_FILTERS_SUCCESS]: getPanelDocsByFiltersSuccess,
  [Types.GET_PANEL_DOCS_BY_FILTERS_FAILURE]: getPanelDocsByFiltersFailure,
  [Types.GET_PANEL_DOCS_BY_FILTERS_RESET]: getPanelDocsByFiltersReset,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_REQUEST]: panelDocUpdateActivenessRequest,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_SUCCESS]: panelDocUpdateActivenessSuccess,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_FAILURE]: panelDocUpdateActivenessFailure,
  [Types.REMOVE_PANEL_DOC_REQUEST]: removePanelDocRequest,
  [Types.REMOVE_PANEL_DOC_SUCCESS]: removePanelDocSuccess,
  [Types.REMOVE_PANEL_DOC_FAILURE]: removePanelDocFailure,
  [Types.CREATE_PANEL_DOC_REQUEST]: createPanelDocRequest,
  [Types.CREATE_PANEL_DOC_SUCCESS]: createPanelDocSuccess,
  [Types.CREATE_PANEL_DOC_FAILURE]: createPanelDocFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
