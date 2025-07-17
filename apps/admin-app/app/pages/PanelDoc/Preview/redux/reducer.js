import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  panelDocById: {
    isPending: false,
    data: null,
  },
};

const panelDocByIdRequest = (state = INITIAL_STATE) => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: true,
  },
});

const panelDocByIdSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: false,
    data,
  },
});

const panelDocByIdFailure = (state = INITIAL_STATE) => ({
  ...state,
  panelDocById: {
    ...state.panelDocById,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PANEL_DOC_BY_ID_REQUEST]: panelDocByIdRequest,
  [Types.GET_PANEL_DOC_BY_ID_SUCCESS]: panelDocByIdSuccess,
  [Types.GET_PANEL_DOC_BY_ID_FAILURE]: panelDocByIdFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
