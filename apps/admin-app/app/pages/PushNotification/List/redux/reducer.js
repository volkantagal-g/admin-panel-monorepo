import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/PushNotification/List/redux/actions';
import { getLangKey } from '@shared/i18n';

export const INITIAL_STATE = {
  globalRuleset: {
    data: {},
    isPending: false,
    statusIsPending: false,
    error: null,
  },
  results: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    page: 0,
    size: 10,
    clientLanguage: getLangKey(),
  },
  cities: [],
  paymentMethods: [],
  filteredResults: { data: [] },
  downloadListModal: { visible: false, data: {} },
  iconManagement: {
    isPending: false,
    error: null,
    defaultIconUrl: '',
    list: {
      data: [],
      isPending: false,
      error: null,
    },
  },
};

export const getGlobalRulesetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: true,
    },
  };
};

export const getGlobalRulesetSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      data,
      isPending: false,
    },
  };
};

export const getGlobalRulesetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    globalRuleset: {
      ...state.globalRuleset,
      isPending: false,
      error,
    },
  };
};

export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: false,
      error,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filters: { ...data },
  };
};

export const setPaymentMethods = (state = INITIAL_STATE, { paymentMethods }) => {
  return {
    ...state,
    paymentMethods,
  };
};

export const setCities = (state = INITIAL_STATE, { cities }) => {
  return {
    ...state,
    cities,
  };
};

export const openDownloadListModal = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    downloadListModal: { visible: true, ...data },
  };
};

export const closeDownloadListModal = (state = INITIAL_STATE) => {
  return {
    ...state,
    downloadListModal: { visible: false },
  };
};

// Icon Management Crud

export const getIconsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      list: {
        ...state.iconManagement.list,
        isPending: true,
      },
    },
  };
};

export const getIconsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      list: {
        ...state.iconManagement.list,
        data,
        isPending: false,
      },
    },
  };
};

export const getIconsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      list: {
        ...state.iconManagement.list,
        isPending: false,
        error,
      },
    },
  };
};

export const createIconRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: true,
    },
  };
};

export const createIconSuccess = (state = INITIAL_STATE, { icon }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      list: {
        ...state.iconManagement.list,
        data: [
          ...state.iconManagement.list.data,
          icon,
        ],
      },
    },
  };
};

export const createIconFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      error,
    },
  };
};

export const updateIconRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: true,
    },
  };
};

export const updateIconSuccess = (state = INITIAL_STATE, { icon }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      list: {
        ...state.iconManagement,
        isPending: false,
        data: state.iconManagement.list.data.map(listIcon => (listIcon.id === icon.id ? icon : listIcon)),
      },
    },
  };
};

export const updateIconFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      error,
    },
  };
};

export const deleteIconRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: true,
    },
  };
};

export const deleteIconSuccess = (state = INITIAL_STATE, { iconId }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      list: {
        ...state.iconManagement,
        isPending: false,
        data: state.iconManagement.list.data.filter(icon => icon.id !== iconId),
      },
    },
  };
};

export const deleteIconFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      error,
    },
  };
};

export const uploadIconImageToS3Request = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: true,
    },
  };
};

export const uploadIconImageToS3Success = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
    },
  };
};

export const uploadIconImageToS3Failure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      err: error,
    },
  };
};

export const getDefaultIconUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: true,
    },
  };
};

export const getDefaultIconUrlSuccess = (state = INITIAL_STATE, { url }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      defaultIconUrl: url,
      isPending: false,
    },
  };
};

export const getDefaultIconUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      isPending: false,
      error,
    },
  };
};

export const setDefaultIconUrl = (state = INITIAL_STATE, { url }) => {
  return {
    ...state,
    iconManagement: {
      ...state.iconManagement,
      defaultIconUrl: url,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  [Types.GET_GLOBAL_RULESET_REQUEST]: getGlobalRulesetRequest,
  [Types.GET_GLOBAL_RULESET_SUCCESS]: getGlobalRulesetSuccess,
  [Types.GET_GLOBAL_RULESET_FAILURE]: getGlobalRulesetFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.SET_PAYMENT_METHODS]: setPaymentMethods,
  [Types.SET_CITIES]: setCities,
  [Types.OPEN_DOWNLOAD_LIST_MODAL]: openDownloadListModal,
  [Types.CLOSE_DOWNLOAD_LIST_MODAL]: closeDownloadListModal,
  [Types.DESTROY_PAGE]: destroy,

  // Icon Management
  [Types.GET_ICONS_REQUEST]: getIconsRequest,
  [Types.GET_ICONS_SUCCESS]: getIconsSuccess,
  [Types.GET_ICONS_FAILURE]: getIconsFailure,

  [Types.CREATE_ICON_REQUEST]: createIconRequest,
  [Types.CREATE_ICON_SUCCESS]: createIconSuccess,
  [Types.CREATE_ICON_FAILURE]: createIconFailure,

  [Types.UPDATE_ICON_REQUEST]: updateIconRequest,
  [Types.UPDATE_ICON_SUCCESS]: updateIconSuccess,
  [Types.UPDATE_ICON_FAILURE]: updateIconFailure,

  [Types.DELETE_ICON_REQUEST]: deleteIconRequest,
  [Types.DELETE_ICON_SUCCESS]: deleteIconSuccess,
  [Types.DELETE_ICON_FAILURE]: deleteIconFailure,

  [Types.GET_DEFAULT_ICON_URL_REQUEST]: getDefaultIconUrlRequest,
  [Types.GET_DEFAULT_ICON_URL_SUCCESS]: getDefaultIconUrlSuccess,
  [Types.GET_DEFAULT_ICON_URL_FAILURE]: getDefaultIconUrlFailure,

  [Types.SET_DEFAULT_ICON_URL]: setDefaultIconUrl,

  [Types.UPLOAD_ICON_IMAGE_TO_S3_REQUEST]: uploadIconImageToS3Request,
  [Types.UPLOAD_ICON_IMAGE_TO_S3_SUCCESS]: uploadIconImageToS3Success,
  [Types.UPLOAD_ICON_IMAGE_TO_S3_FAILURE]: uploadIconImageToS3Failure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
