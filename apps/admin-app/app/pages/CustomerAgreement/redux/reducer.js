import { createReducer } from 'reduxsauce';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import {
  agreementFileMaker,
  initAgreementFiles,
  getUploadDocLanguage,
} from '@app/pages/CustomerAgreement/utils';
import { Types } from './actions';

const countryLanguages = getSelectedCountryLanguages();
const selectedDocumentTypeByDefault = 0;

export const INITIAL_STATE = {
  documentTypes: {
    data: [],
    selected: selectedDocumentTypeByDefault,
    isPending: false,
    error: null,
  },
  agreementForced: {
    isPending: false,
    success: false,
    error: null,
  },
  uploadAgreements: {
    data: {},
    files: [...initAgreementFiles(countryLanguages)],
    isPending: false,
    error: null,
  },
  saveAgreement: {
    isPending: false,
    success: false,
    error: null,
  },
  previousAgreements: {
    data: [],
    pagination: {},
    isPending: false,
    error: null,
  },
};

const getDocumentTypes = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    documentTypes: {
      ...state.documentTypes,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { documentTypes = [] }) => ({
    ...state,
    documentTypes: {
      ...state.documentTypes,
      data: documentTypes,
      selected: selectedDocumentTypeByDefault,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    documentTypes: {
      ...state.documentTypes,
      isPending: false,
      error,
    },
  }),
};

const setDocumentTypeSelected = {
  request: (state = INITIAL_STATE, { documentType = 0 }) => ({
    ...state,
    documentTypes: {
      ...state.documentTypes,
      selected: documentType,
    },
  }),
  clear: (state = INITIAL_STATE) => ({
    ...state,
    documentTypes: {
      ...state.documentTypes,
      selected: selectedDocumentTypeByDefault,
    },
  }),
};

const setAgreementForced = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    agreementForced: {
      ...state.agreementForced,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { success }) => ({
    ...state,
    agreementForced: {
      ...state.agreementForced,
      isPending: false,
      success,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    agreementForced: {
      ...state.agreementForced,
      isPending: false,
      error,
    },
  }),
};

const setUploadUrls = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    uploadAgreements: {
      ...state.uploadAgreements,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { data, doc }) => ({
    ...state,
    uploadAgreements: {
      ...state.uploadAgreements,
      data,
      files: state.uploadAgreements.files.map(stateFile => {
        const { fileLanguage: lang } = stateFile;
        const signedFile = data.files.find(file => file.language === lang);
        const signedUrl = data.preSignedUrls.find(url => url.language === lang);
        const docLang = getUploadDocLanguage(doc);
        if (signedFile && signedUrl && docLang === lang) {
          return agreementFileMaker(lang)({
            name: signedFile.name,
            preSignedUrl: signedUrl.preSignedUrl,
            content: doc[lang],
          });
        }

        return stateFile;
      }),
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    uploadAgreements: {
      ...state.uploadAgreements,
      isPending: false,
      error,
    },
  }),
  clear: (state = INITIAL_STATE) => ({
    ...state,
    uploadAgreements: INITIAL_STATE.uploadAgreements,
  }),
};

const getPreviousAgreements = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    previousAgreements: {
      ...state.previousAgreements,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { previousAgreements = [], pagination = {} }) => ({
    ...state,
    previousAgreements: {
      ...state.previousAgreements,
      data: previousAgreements,
      pagination,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    previousAgreements: {
      ...state.previousAgreements,
      isPending: false,
      error,
    },
  }),
  clear: (state = INITIAL_STATE) => ({
    ...state,
    previousAgreements: INITIAL_STATE.previousAgreements,
  }),
};

const saveAgreement = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    saveAgreement: {
      ...state.saveAgreement,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { success }) => ({
    ...state,
    saveAgreement: {
      ...state.saveAgreement,
      isPending: false,
      success,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    saveAgreement: {
      ...state.saveAgreement,
      isPending: false,
      error,
    },
  }),
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DOCUMENT_TYPES_REQUEST]: getDocumentTypes.request,
  [Types.GET_DOCUMENT_TYPES_SUCCESS]: getDocumentTypes.success,
  [Types.GET_DOCUMENT_TYPES_FAILURE]: getDocumentTypes.failure,
  [Types.SET_DOCUMENT_TYPE_SELECTED_REQUEST]: setDocumentTypeSelected.request,
  [Types.SET_DOCUMENT_TYPE_SELECTED_CLEAR]: setDocumentTypeSelected.clear,
  [Types.SET_AGREEMENT_FORCED_REQUEST]: setAgreementForced.request,
  [Types.SET_AGREEMENT_FORCED_SUCCESS]: setAgreementForced.success,
  [Types.SET_AGREEMENT_FORCED_FAILURE]: setAgreementForced.failure,
  [Types.SET_UPLOAD_URLS_REQUEST]: setUploadUrls.request,
  [Types.SET_UPLOAD_URLS_SUCCESS]: setUploadUrls.success,
  [Types.SET_UPLOAD_URLS_FAILURE]: setUploadUrls.failure,
  [Types.SET_UPLOAD_URLS_CLEAR]: setUploadUrls.clear,
  [Types.GET_PREVIOUS_AGREEMENTS_REQUEST]: getPreviousAgreements.request,
  [Types.GET_PREVIOUS_AGREEMENTS_SUCCESS]: getPreviousAgreements.success,
  [Types.GET_PREVIOUS_AGREEMENTS_FAILURE]: getPreviousAgreements.failure,
  [Types.GET_PREVIOUS_AGREEMENTS_CLEAR]: getPreviousAgreements.clear,
  [Types.SAVE_AGREEMENT_REQUEST]: saveAgreement.request,
  [Types.SAVE_AGREEMENT_SUCCESS]: saveAgreement.success,
  [Types.SAVE_AGREEMENT_FAILURE]: saveAgreement.failure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
