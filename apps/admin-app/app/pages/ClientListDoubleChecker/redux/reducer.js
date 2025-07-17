import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  response: {
    isPending: false,
    error: null,
  },
  csvData: null,
  csvFileName: '',
  clientListName: '',
  isEmailAllowed: true,
  isSMSAllowed: true,
  isNotifAllowed: true,
};

const uploadClientListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: true,
    },
  };
};

const uploadClientListSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
    },
  };
};

const uploadClientListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
      error,
    },
  };
};

const setCsvData = (state = INITIAL_STATE, { csvData }) => {
  return {
    ...state,
    csvData,
  };
};

const setCsvFileName = (state = INITIAL_STATE, { csvFileName }) => {
  return {
    ...state,
    csvFileName,
  };
};

const setClientListName = (state = INITIAL_STATE, { clientListName }) => {
  return {
    ...state,
    clientListName,
  };
};

const togglePermission = (state = INITIAL_STATE, { permissionKey }) => {
  return {
    ...state,
    [permissionKey]: !state[permissionKey],
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

const HANDLERS = {
  [Types.UPLOAD_CLIENT_LIST_REQUEST]: uploadClientListRequest,
  [Types.UPLOAD_CLIENT_LIST_SUCCESS]: uploadClientListSuccess,
  [Types.UPLOAD_CLIENT_LIST_FAILURE]: uploadClientListFailure,
  [Types.SET_CSV_FILE_NAME]: setCsvFileName,
  [Types.SET_CSV_DATA]: setCsvData,
  [Types.SET_CLIENT_LIST_NAME]: setClientListName,
  [Types.TOGGLE_PERMISSION]: togglePermission,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
