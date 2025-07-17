import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  panelDocById: {
    isPending: false,
    data: {},
    error: null,
  },
  panelDocUpdateActiveness: {
    isPending: false,
    data: {},
    error: null,
  },
  panelDocUpdateHighlight: {
    isPending: false,
    data: {},
    error: null,
  },
  panelDocUpdate: {
    isPending: false,
    error: null,
  },
};

const getPanelDocByIdRequest = state => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: true,
    data: [],
  },
});

const getPanelDocByIdSuccess = (state, { data }) => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: false,
    data,
  },
});

const getPanelDocByIdFailure = state => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: false,
  },
});

export const panelDocUpdateActivenessRequest = state => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: true,
    },
  };
};

const panelDocUpdateActivenessSuccess = state => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: false,
    },
  };
};

const panelDocUpdateActivenessFailure = (state, { error }) => {
  return {
    ...state,
    panelDocUpdateActiveness: {
      ...INITIAL_STATE.panelDocUpdateActiveness,
      isPending: false,
      error,
    },
  };
};

export const panelDocUpdateHighlightRequest = state => {
  return {
    ...state,
    panelDocUpdateHighlight: {
      ...INITIAL_STATE.panelDocUpdateHighlight,
      isPending: true,
    },
  };
};

const panelDocUpdateHighlightSuccess = state => {
  return {
    ...state,
    panelDocUpdateHighlight: {
      ...INITIAL_STATE.panelDocUpdateHighlight,
      isPending: false,
    },
  };
};

const panelDocUpdateHighlightFailure = (state, { error }) => {
  return {
    ...state,
    panelDocUpdateHighlight: {
      ...INITIAL_STATE.panelDocUpdateHighlight,
      isPending: false,
      error,
    },
  };
};

const panelDocUpdateRequest = state => {
  return {
    ...state,
    panelDocUpdate: {
      ...INITIAL_STATE.panelDocUpdate,
      isPending: true,
    },
  };
};

const panelDocUpdateSuccess = state => {
  return {
    ...state,
    panelDocUpdate: {
      ...INITIAL_STATE.panelDocUpdate,
      isPending: false,
    },
  };
};

const panelDocUpdateFailure = (state, { error }) => {
  return {
    ...state,
    panelDocUpdate: {
      ...INITIAL_STATE.panelDocUpdate,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PANEL_DOC_BY_ID_REQUEST]: getPanelDocByIdRequest,
  [Types.GET_PANEL_DOC_BY_ID_SUCCESS]: getPanelDocByIdSuccess,
  [Types.GET_PANEL_DOC_BY_ID_FAILURE]: getPanelDocByIdFailure,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_REQUEST]: panelDocUpdateActivenessRequest,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_SUCCESS]: panelDocUpdateActivenessSuccess,
  [Types.PANEL_DOC_UPDATE_ACTIVENESS_FAILURE]: panelDocUpdateActivenessFailure,
  [Types.PANEL_DOC_UPDATE_HIGHLIGHT_REQUEST]: panelDocUpdateHighlightRequest,
  [Types.PANEL_DOC_UPDATE_HIGHLIGHT_SUCCESS]: panelDocUpdateHighlightSuccess,
  [Types.PANEL_DOC_UPDATE_HIGHLIGHT_FAILURE]: panelDocUpdateHighlightFailure,
  [Types.PANEL_DOC_UPDATE_REQUEST]: panelDocUpdateRequest,
  [Types.PANEL_DOC_UPDATE_FAILURE]: panelDocUpdateFailure,
  [Types.PANEL_DOC_UPDATE_SUCCESS]: panelDocUpdateSuccess,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
