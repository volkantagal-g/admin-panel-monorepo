import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { dtsLogsUpdate: { isPending: false } };

export const uploadDTSLogsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsLogsUpdate: {
      ...state.dtsLogsUpdate,
      isPending: true,
    },
  };
};

export const uploadDTSLogsSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsLogsUpdate: {
      ...state.dtsLogsUpdate,
      isPending: false,
    },
  };
};

export const uploadDTSLogsFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsLogsUpdate: {
      ...state.dtsLogsUpdate,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPLOAD_DTS_LOGS_REQUEST]: uploadDTSLogsRequest,
  [Types.UPLOAD_DTS_LOGS_SUCCESS]: uploadDTSLogsSuccess,
  [Types.UPLOAD_DTS_LOGS_FAILURE]: uploadDTSLogsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
