import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  panelDocsByFilter: {
    isPending: false,
    data: [],
  },
  adminGuides: {
    isPending: false,
    data: [],
  },
  highlightedDocuments: {
    isPending: false,
    data: [],
  },
  resultShown: false,
};

const panelDocsByFilterRequest = (state = INITIAL_STATE) => ({
  ...state,
  panelDocsByFilter: {
    ...state.panelDocsByFilter,
    isPending: true,
    data: [],
  },
});

const panelDocsByFilterSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  panelDocsByFilter: {
    ...state.panelDocsByFilter,
    isPending: false,
    data,
  },
});

const panelDocsByFilterFailure = (state = INITIAL_STATE) => ({
  ...state,
  panelDocsByFilter: {
    ...state.panelDocsByFilter,
    isPending: false,
  },
});

const adminGuidesRequest = (state = INITIAL_STATE) => ({
  ...state,
  adminGuides: {
    ...state.adminGuides,
    isPending: true,
    data: [],
  },
});

const adminGuidesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  adminGuides: {
    ...state.adminGuides,
    isPending: false,
    data,
  },
});

const adminGuidesFailure = (state = INITIAL_STATE) => ({
  ...state,
  adminGuides: {
    ...state.adminGuides,
    isPending: false,
  },
});

const highlightedDocumentsRequest = (state = INITIAL_STATE) => ({
  ...state,
  highlightedDocuments: {
    ...state.highlightedDocuments,
    isPending: true,
    data: [],
  },
});

const highlightedDocumentsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  highlightedDocuments: {
    ...state.highlightedDocuments,
    isPending: false,
    data,
  },
});

const highlightedDocumentsFailure = (state = INITIAL_STATE) => ({
  ...state,
  highlightedDocuments: {
    ...state.highlightedDocuments,
    isPending: false,
  },
});

const setResultShown = (state = INITIAL_STATE, { isResultShown }) => ({
  ...state,
  resultShown: isResultShown,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PANEL_DOCS_BY_FILTER_REQUEST]: panelDocsByFilterRequest,
  [Types.GET_PANEL_DOCS_BY_FILTER_SUCCESS]: panelDocsByFilterSuccess,
  [Types.GET_PANEL_DOCS_BY_FILTER_FAILURE]: panelDocsByFilterFailure,
  [Types.GET_ADMIN_GUIDES_REQUEST]: adminGuidesRequest,
  [Types.GET_ADMIN_GUIDES_SUCCESS]: adminGuidesSuccess,
  [Types.GET_ADMIN_GUIDES_FAILURE]: adminGuidesFailure,
  [Types.GET_HIGHLIGHTED_DOCUMENTS_REQUEST]: highlightedDocumentsRequest,
  [Types.GET_HIGHLIGHTED_DOCUMENTS_SUCCESS]: highlightedDocumentsSuccess,
  [Types.GET_HIGHLIGHTED_DOCUMENTS_FAILURE]: highlightedDocumentsFailure,
  [Types.SET_RESULT_SHOWN]: setResultShown,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
