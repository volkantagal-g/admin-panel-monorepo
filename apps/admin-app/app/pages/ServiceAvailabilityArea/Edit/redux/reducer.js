import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  saaData: {
    data: null,
    isPending: false,
    error: false,
  },
  editFirstPartData: {
    data: null,
    isPending: false,
    error: false,
  },
  editGeoData: {
    data: null,
    isPending: false,
    error: false,
  },
};

const getSaaByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: true,
    },
  };
};
const getSaaByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      data,
      isPending: false,
    },
  };
};
const getSaaByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      error: true,
      isPending: false,
    },
  };
};

const editFirstPartRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    editFirstPartData: {
      ...state.editFirstPartData,
      isPending: true,
    },
  };
};

const editFirstPartSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    editFirstPartData: {
      ...state.editFirstPartData,
      data,
      isPending: false,
      error: false,
    },
  };
};
const editFirstPartFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    editFirstPartData: {
      ...state.editFirstPartData,
      error,
      isPending: false,
    },
  };
};

const editGeoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    editGeoData: {
      ...state.editGeoData,
      isPending: true,
    },
  };
};
const editGeoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    editGeoData: {
      ...state.editGeoData,
      data,
      error: false,
      isPending: false,
    },
  };
};
const editGeoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    editGeoData: {
      ...state.editGeoData,
      error,
      isPending: false,
    },
  };
};

const initPage = (state = INITIAL_STATE) => {
  return { ...state };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.GET_SAA_BY_ID_REQUEST]: getSaaByIdRequest,
  [Types.GET_SAA_BY_ID_SUCCESS]: getSaaByIdSuccess,
  [Types.GET_SAA_BY_ID_FAILURE]: getSaaByIdFailure,

  [Types.EDIT_FIRST_PART_REQUEST]: editFirstPartRequest,
  [Types.EDIT_FIRST_PART_SUCCESS]: editFirstPartSuccess,
  [Types.EDIT_FIRST_PART_FAILURE]: editFirstPartFailure,

  [Types.EDIT_GEO_REQUEST]: editGeoRequest,
  [Types.EDIT_GEO_SUCCESS]: editGeoSuccess,
  [Types.EDIT_GEO_FAILURE]: editGeoFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
