import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  uploadDocumentUrl: {
    isPending: false,
    data: null,
  },
};

const getUploadDocumentURLRequest = state => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: true,
  },
});

const getUploadDocumentURLSuccess = (state, { data }) => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: false,
    data,
  },
});

const getUploadDocumentURLFailure = state => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: false,
  },
});

const initPage = state => ({
  ...state,
  isPageInitialized: true,
});
const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_UPLOAD_DOCUMENT_URL_REQUEST]: getUploadDocumentURLRequest,
  [Types.GET_UPLOAD_DOCUMENT_URL_SUCCESS]: getUploadDocumentURLSuccess,
  [Types.GET_UPLOAD_DOCUMENT_URL_FAILURE]: getUploadDocumentURLFailure,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
