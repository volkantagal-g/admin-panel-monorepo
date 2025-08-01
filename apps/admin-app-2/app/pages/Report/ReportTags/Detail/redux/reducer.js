import { createReducer } from 'reduxsauce';

import { REPORT_TAG_FORM_MODE } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  formMode: REPORT_TAG_FORM_MODE.READONLY,
  reportTag: {
    data: null,
    isPending: false,
    error: null,
  },
  updateReportTag: {
    data: null,
    isPending: false,
    error: null,
  },
  addRoles: {
    data: null,
    isPending: false,
    error: null,
  },
  removeRole: {
    data: null,
    isPending: false,
    error: null,
  },
  reportTagRoleIds: {
    data: null,
    isPending: false,
    error: null,
  },
  reportTagRoles: {
    data: null,
    isPending: false,
    error: null,
  },
  reportTypes: {
    data: {
      reportTypes: [],
      totalCount: 0,
    },
    isPending: false,
    error: null,
  },
};

const setFormMode = (state = INITIAL_STATE, { formMode }) => {
  return {
    ...state,
    formMode,
  };
};

const getReportTagByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTag: {
      ...state.reportTag,
      isPending: true,
    },
  };
};

const getReportTagByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTag: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTagByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTag: {
      ...state.reportTag,
      error,
      isPending: false,
    },
  };
};

const updateReportTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateReportTag: {
      ...state.updateReportTag,
      isPending: true,
    },
  };
};

const updateReportTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateReportTag: {
      data,
      isPending: false,
      error: null,
    },
    // also update report tag data
    reportTag: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const updateReportTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateReportTag: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const addRolesToReportTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addRoles: {
      ...state.addRoles,
      isPending: true,
    },
  };
};

const addRolesToReportTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addRoles: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const addRolesToReportTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addRoles: {
      ...state.addRoles,
      error,
      isPending: false,
    },
  };
};

const getRolesByReportTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTagRoleIds: {
      ...state.reportTagRoleIds,
      isPending: true,
    },
  };
};

const getRolesByReportTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTagRoleIds: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getRolesByReportTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTagRoleIds: {
      ...state.reportTagRoleIds,
      error,
      isPending: false,
    },
  };
};

const getRolesDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTagRoles: {
      ...state.reportTagRoles,
      isPending: true,
    },
  };
};

const getRolesDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTagRoles: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getRolesDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTagRoles: {
      ...state.reportTagRoles,
      error,
      isPending: false,
    },
  };
};

const removeRoleFromReportTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    removeRole: {
      ...state.removeRole,
      isPending: true,
    },
  };
};

const removeRoleFromReportTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    removeRole: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const removeRoleFromReportTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    removeRole: {
      ...state.removeRole,
      error,
      isPending: false,
    },
  };
};

const getReportTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTypes: {
      ...state.reportTypes,
      isPending: true,
    },
  };
};

const getReportTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTypes: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTypes: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_FORM_MODE]: setFormMode,
  [Types.GET_REPORT_TAG_BY_ID_REQUEST]: getReportTagByIdRequest,
  [Types.GET_REPORT_TAG_BY_ID_SUCCESS]: getReportTagByIdSuccess,
  [Types.GET_REPORT_TAG_BY_ID_FAILURE]: getReportTagByIdFailure,
  [Types.UPDATE_REPORT_TAG_REQUEST]: updateReportTagRequest,
  [Types.UPDATE_REPORT_TAG_SUCCESS]: updateReportTagSuccess,
  [Types.UPDATE_REPORT_TAG_FAILURE]: updateReportTagFailure,
  [Types.ADD_ROLES_TO_REPORT_TAG_REQUEST]: addRolesToReportTagRequest,
  [Types.ADD_ROLES_TO_REPORT_TAG_SUCCESS]: addRolesToReportTagSuccess,
  [Types.ADD_ROLES_TO_REPORT_TAG_FAILURE]: addRolesToReportTagFailure,
  [Types.GET_ROLES_BY_REPORT_TAGS_REQUEST]: getRolesByReportTagsRequest,
  [Types.GET_ROLES_BY_REPORT_TAGS_SUCCESS]: getRolesByReportTagsSuccess,
  [Types.GET_ROLES_BY_REPORT_TAGS_FAILURE]: getRolesByReportTagsFailure,
  [Types.GET_ROLES_DETAILS_REQUEST]: getRolesDetailsRequest,
  [Types.GET_ROLES_DETAILS_SUCCESS]: getRolesDetailsSuccess,
  [Types.GET_ROLES_DETAILS_FAILURE]: getRolesDetailsFailure,
  [Types.REMOVE_ROLE_FROM_REPORT_TAG_REQUEST]: removeRoleFromReportTagRequest,
  [Types.REMOVE_ROLE_FROM_REPORT_TAG_SUCCESS]: removeRoleFromReportTagSuccess,
  [Types.REMOVE_ROLE_FROM_REPORT_TAG_FAILURE]: removeRoleFromReportTagFailure,
  [Types.GET_REPORT_TYPES_REQUEST]: getReportTypesRequest,
  [Types.GET_REPORT_TYPES_SUCCESS]: getReportTypesSuccess,
  [Types.GET_REPORT_TYPES_FAILURE]: getReportTypesFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
