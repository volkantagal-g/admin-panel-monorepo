import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { CHANGE_LOG_TYPE_ENUM } from '../../constants';

export const INITIAL_STATE = {
  getThirdPartyCompanyById: {
    isPending: false,
    data: {},
    error: null,
  },
  getCredentialsByCompanyId: {
    isPending: false,
    data: {},
    error: null,
  },
  allowedRoutes: {
    isPending: false,
    data: [],
    error: null,
  },
  updateThirdPartyCompanyById: {
    isPending: false,
    data: {},
    error: null,
  },
  deleteThirdPartyCompanyById: {
    isPending: false,
    data: {},
    error: null,
  },
  activateThirdPartyCompanyById: {
    isPending: false,
    data: {},
    error: null,
  },
  deactivateThirdPartyCompanyById: {
    isPending: false,
    data: {},
    error: null,
  },
  createCredentialByCompanyId: {
    isPending: false,
    data: {},
    error: null,
  },
  deleteCredentialByCompanyAndCredentialId: {
    isPending: false,
    data: {},
    error: null,
  },
  activateCredentialByCompanyAndCredentialId: {
    isPending: false,
    data: {},
    error: null,
  },
  deactivateCredentialByCompanyAndCredentialId: {
    isPending: false,
    data: {},
    error: null,
  },
  generateCredentialSignatureByCredentialId: {
    isPending: false,
    data: [],
    error: null,
  },
  getCompanyChangeLogs: {
    isPending: false,
    data: [],
    error: false,
  },
  getCompanyCredentialsChangeLogs: {
    isPending: false,
    data: [],
    error: false,
  },
  changeLogTableUI: {
    currentChangeLogType: CHANGE_LOG_TYPE_ENUM.COMPANY,
    [CHANGE_LOG_TYPE_ENUM.COMPANY]: { pagination: { limit: 50, offset: 0 } },
    [CHANGE_LOG_TYPE_ENUM.CREDENTIAL]: {
      pagination: { limit: 50, offset: 0 },
      credentialKey: '',
    },
  },
};

const getThirdPartyCompanyById = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    getThirdPartyCompanyById: {
      ...state.getThirdPartyCompanyById,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    getThirdPartyCompanyById: {
      ...state.getThirdPartyCompanyById,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    getThirdPartyCompanyById: {
      ...state.getThirdPartyCompanyById,
      isPending: false,
      error,
    },
  }),
};

const getCredentialsByCompanyId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    getCredentialsByCompanyId: {
      ...state.getCredentialsByCompanyId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    getCredentialsByCompanyId: {
      ...state.getCredentialsByCompanyId,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    getCredentialsByCompanyId: {
      ...state.getCredentialsByCompanyId,
      isPending: false,
      error,
    },
  }),
};

const getAllowedRoutes = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    allowedRoutes: {
      ...state.allowedRoutes,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { allowedRoutes = [] }) => ({
    ...state,
    allowedRoutes: {
      ...state.allowedRoutes,
      data: allowedRoutes,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    allowedRoutes: {
      ...state.allowedRoutes,
      isPending: false,
      error,
    },
  }),
};

const updateThirdPartyCompanyById = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    updateThirdPartyCompanyById: {
      ...state.updateThirdPartyCompanyById,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    updateThirdPartyCompanyById: {
      ...state.updateThirdPartyCompanyById,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    updateThirdPartyCompanyById: {
      ...state.updateThirdPartyCompanyById,
      isPending: false,
      error,
    },
  }),
};

const deleteThirdPartyCompanyById = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    deleteThirdPartyCompanyById: {
      ...state.deleteThirdPartyCompanyById,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    deleteThirdPartyCompanyById: {
      ...state.deleteThirdPartyCompanyById,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    deleteThirdPartyCompanyById: {
      ...state.deleteThirdPartyCompanyById,
      isPending: false,
      error,
    },
  }),
};

const activateThirdPartyCompanyById = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    activateThirdPartyCompanyById: {
      ...state.activateThirdPartyCompanyById,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    activateThirdPartyCompanyById: {
      ...state.activateThirdPartyCompanyById,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    activateThirdPartyCompanyById: {
      ...state.activateThirdPartyCompanyById,
      isPending: false,
      error,
    },
  }),
};

const deactivateThirdPartyCompanyById = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    deactivateThirdPartyCompanyById: {
      ...state.deactivateThirdPartyCompanyById,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    deactivateThirdPartyCompanyById: {
      ...state.deactivateThirdPartyCompanyById,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    deactivateThirdPartyCompanyById: {
      ...state.deactivateThirdPartyCompanyById,
      isPending: false,
      error,
    },
  }),
};

const createCredentialByCompanyId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    createCredentialByCompanyId: {
      ...state.createCredentialByCompanyId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    createCredentialByCompanyId: {
      ...state.createCredentialByCompanyId,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    createCredentialByCompanyId: {
      ...state.createCredentialByCompanyId,
      isPending: false,
      error,
    },
  }),
};

const deleteCredentialByCompanyAndCredentialId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    deleteCredentialByCompanyAndCredentialId: {
      ...state.deleteCredentialByCompanyAndCredentialId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    deleteCredentialByCompanyAndCredentialId: {
      ...state.deleteCredentialByCompanyAndCredentialId,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    deleteCredentialByCompanyAndCredentialId: {
      ...state.deleteCredentialByCompanyAndCredentialId,
      isPending: false,
      error,
    },
  }),
};

const activateCredentialByCompanyAndCredentialId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    activateCredentialByCompanyAndCredentialId: {
      ...state.activateCredentialByCompanyAndCredentialId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    activateCredentialByCompanyAndCredentialId: {
      ...state.activateCredentialByCompanyAndCredentialId,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    activateCredentialByCompanyAndCredentialId: {
      ...state.activateCredentialByCompanyAndCredentialId,
      isPending: false,
      error,
    },
  }),
};

const deactivateCredentialByCompanyAndCredentialId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    deactivateCredentialByCompanyAndCredentialId: {
      ...state.deactivateCredentialByCompanyAndCredentialId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data = {} }) => ({
    ...state,
    deactivateCredentialByCompanyAndCredentialId: {
      ...state.deactivateCredentialByCompanyAndCredentialId,
      data,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    deactivateCredentialByCompanyAndCredentialId: {
      ...state.deactivateCredentialByCompanyAndCredentialId,
      isPending: false,
      error,
    },
  }),
};

const generateCredentialSignatureByCredentialId = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    generateCredentialSignatureByCredentialId: {
      ...state.generateCredentialSignatureByCredentialId,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { signature, credentialId }) => ({
    ...state,
    generateCredentialSignatureByCredentialId: {
      ...state.generateCredentialSignatureByCredentialId,
      data: state.generateCredentialSignatureByCredentialId.data.concat([{ credentialId, signature }]),
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    generateCredentialSignatureByCredentialId: {
      ...state.generateCredentialSignatureByCredentialId,
      isPending: false,
      error,
    },
  }),
  clear: (state = INITIAL_STATE, { credentialId }) => ({
    ...state,
    generateCredentialSignatureByCredentialId: {
      ...state.generateCredentialSignatureByCredentialId,
      data: state.generateCredentialSignatureByCredentialId.data.filter(s => s.credentialId !== credentialId),
      isPending: false,
    },
  }),
};

const getCompanyChangeLogs = {
  request: state => ({
    ...state,
    getCompanyChangeLogs: {
      ...state.getCompanyChangeLogs,
      isPending: true,
    },
  }),
  success: (state, { changeLogs }) => ({
    ...state,
    getCompanyChangeLogs: {
      ...state.getCompanyChangeLogs,
      data: changeLogs,
      isPending: false,
    },
  }),
  failure: (state, { error }) => ({
    ...state,
    getCompanyChangeLogs: {
      ...state.getCompanyChangeLogs,
      isPending: false,
      error,
    },
  }),
};

const getCompanyCredentialsChangeLogs = {
  request: state => ({
    ...state,
    getCompanyCredentialsChangeLogs: {
      ...state.getCompanyCredentialsChangeLogs,
      isPending: true,
    },
  }),
  success: (state, { changeLogs }) => ({
    ...state,
    getCompanyCredentialsChangeLogs: {
      ...state.getCompanyCredentialsChangeLogs,
      data: changeLogs,
      isPending: false,
    },
  }),
  failure: (state, { error }) => ({
    ...state,
    getCompanyCredentialsChangeLogs: {
      ...state.getCompanyCredentialsChangeLogs,
      isPending: false,
      error,
    },
  }),
};

const companyGeneralChangeLogClicked = state => ({
  ...state,
  changeLogTableUI: {
    ...state.changeLogTableUI,
    currentChangeLogType: CHANGE_LOG_TYPE_ENUM.COMPANY,
  },
});

const companyCredentialChangeLogClicked = (state, { credentialKey }) => ({
  ...state,
  changeLogTableUI: {
    ...state.changeLogTableUI,
    currentChangeLogType: CHANGE_LOG_TYPE_ENUM.CREDENTIAL,
    [CHANGE_LOG_TYPE_ENUM.CREDENTIAL]: {
      ...state.changeLogTableUI[CHANGE_LOG_TYPE_ENUM.CREDENTIAL],
      credentialKey,
    },
  },
});

const companyChangeLogTablePaginationChanged = (state, { limit, offset }) => ({
  ...state,
  changeLogTableUI: {
    ...state.changeLogTableUI,
    [state.changeLogTableUI.currentChangeLogType]: {
      ...state.changeLogTableUI[state.changeLogTableUI.currentChangeLogType],
      pagination: { limit, offset },
    },
  },
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_THIRD_PARTY_COMPANY_BY_ID_REQUEST]: getThirdPartyCompanyById.request,
  [Types.GET_THIRD_PARTY_COMPANY_BY_ID_SUCCESS]: getThirdPartyCompanyById.success,
  [Types.GET_THIRD_PARTY_COMPANY_BY_ID_FAILURE]: getThirdPartyCompanyById.failure,
  [Types.GET_CREDENTIALS_BY_COMPANY_ID_REQUEST]: getCredentialsByCompanyId.request,
  [Types.GET_CREDENTIALS_BY_COMPANY_ID_SUCCESS]: getCredentialsByCompanyId.success,
  [Types.GET_CREDENTIALS_BY_COMPANY_ID_FAILURE]: getCredentialsByCompanyId.failure,
  [Types.GET_ALLOWED_ROUTES_REQUEST]: getAllowedRoutes.request,
  [Types.GET_ALLOWED_ROUTES_SUCCESS]: getAllowedRoutes.success,
  [Types.GET_ALLOWED_ROUTES_FAILURE]: getAllowedRoutes.failure,
  [Types.UPDATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST]: updateThirdPartyCompanyById.request,
  [Types.UPDATE_THIRD_PARTY_COMPANY_BY_ID_SUCCESS]: updateThirdPartyCompanyById.success,
  [Types.UPDATE_THIRD_PARTY_COMPANY_BY_ID_FAILURE]: updateThirdPartyCompanyById.failure,
  [Types.DELETE_THIRD_PARTY_COMPANY_BY_ID_REQUEST]: deleteThirdPartyCompanyById.request,
  [Types.DELETE_THIRD_PARTY_COMPANY_BY_ID_SUCCESS]: deleteThirdPartyCompanyById.success,
  [Types.DELETE_THIRD_PARTY_COMPANY_BY_ID_FAILURE]: deleteThirdPartyCompanyById.failure,
  [Types.ACTIVATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST]: activateThirdPartyCompanyById.request,
  [Types.ACTIVATE_THIRD_PARTY_COMPANY_BY_ID_SUCCESS]: activateThirdPartyCompanyById.success,
  [Types.ACTIVATE_THIRD_PARTY_COMPANY_BY_ID_FAILURE]: activateThirdPartyCompanyById.failure,
  [Types.DEACTIVATE_THIRD_PARTY_COMPANY_BY_ID_REQUEST]: deactivateThirdPartyCompanyById.request,
  [Types.DEACTIVATE_THIRD_PARTY_COMPANY_BY_ID_SUCCESS]: deactivateThirdPartyCompanyById.success,
  [Types.DEACTIVATE_THIRD_PARTY_COMPANY_BY_ID_FAILURE]: deactivateThirdPartyCompanyById.failure,
  [Types.CREATE_CREDENTIAL_BY_COMPANY_ID_REQUEST]: createCredentialByCompanyId.request,
  [Types.CREATE_CREDENTIAL_BY_COMPANY_ID_SUCCESS]: createCredentialByCompanyId.success,
  [Types.CREATE_CREDENTIAL_BY_COMPANY_ID_FAILURE]: createCredentialByCompanyId.failure,
  [Types.DELETE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST]: deleteCredentialByCompanyAndCredentialId.request,
  [Types.DELETE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_SUCCESS]: deleteCredentialByCompanyAndCredentialId.success,
  [Types.DELETE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_FAILURE]: deleteCredentialByCompanyAndCredentialId.failure,
  [Types.ACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST]: activateCredentialByCompanyAndCredentialId.request,
  [Types.ACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_SUCCESS]: activateCredentialByCompanyAndCredentialId.success,
  [Types.ACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_FAILURE]: activateCredentialByCompanyAndCredentialId.failure,
  [Types.DEACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_REQUEST]: deactivateCredentialByCompanyAndCredentialId.request,
  [Types.DEACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_SUCCESS]: deactivateCredentialByCompanyAndCredentialId.success,
  [Types.DEACTIVATE_CREDENTIAL_BY_COMPANY_AND_CREDENTIAL_ID_FAILURE]: deactivateCredentialByCompanyAndCredentialId.failure,
  [Types.GENERATE_CREDENTIAL_SIGNATURE_BY_CREDENTIAL_ID_REQUEST]: generateCredentialSignatureByCredentialId.request,
  [Types.GENERATE_CREDENTIAL_SIGNATURE_BY_CREDENTIAL_ID_SUCCESS]: generateCredentialSignatureByCredentialId.success,
  [Types.GENERATE_CREDENTIAL_SIGNATURE_BY_CREDENTIAL_ID_FAILURE]: generateCredentialSignatureByCredentialId.failure,
  [Types.GENERATE_CREDENTIAL_SIGNATURE_BY_CREDENTIAL_ID_CLEAR]: generateCredentialSignatureByCredentialId.clear,
  [Types.GET_COMPANY_CHANGE_LOGS_REQUEST]: getCompanyChangeLogs.request,
  [Types.GET_COMPANY_CHANGE_LOGS_SUCCESS]: getCompanyChangeLogs.success,
  [Types.GET_COMPANY_CHANGE_LOGS_FAILURE]: getCompanyChangeLogs.failure,
  [Types.GET_COMPANY_CREDENTIALS_CHANGE_LOGS_REQUEST]: getCompanyCredentialsChangeLogs.request,
  [Types.GET_COMPANY_CREDENTIALS_CHANGE_LOGS_SUCCESS]: getCompanyCredentialsChangeLogs.success,
  [Types.GET_COMPANY_CREDENTIALS_CHANGE_LOGS_FAILURE]: getCompanyCredentialsChangeLogs.failure,
  [Types.COMPANY_CREDENTIAL_CHANGE_LOG_CLICKED]: companyCredentialChangeLogClicked,
  [Types.COMPANY_GENERAL_CHANGE_LOG_CLICKED]: companyGeneralChangeLogClicked,
  [Types.COMPANY_CHANGE_LOG_TABLE_PAGINATION_CHANGED]: companyChangeLogTablePaginationChanged,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
