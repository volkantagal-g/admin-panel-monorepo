import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  people: {
    data: [],
    isPending: false,
    total: 0,
  },
  excel: { isPending: false },
};

export const getPersonListRequest = state => {
  return {
    ...state,
    people: {
      ...state.people,
      isPending: true,
    },
  };
};

export const getPersonListSuccess = (state, { people = [], total = 0 } = {}) => {
  return {
    ...state,
    people: {
      ...state.people,
      data: people,
      isPending: false,
      total,
    },
  };
};

export const getPersonListFailure = state => {
  return {
    ...state,
    people: {
      ...state.people,
      isPending: false,
    },
  };
};

export const getPersonListExcelRequest = state => {
  return {
    ...state,
    excel: {
      ...state.excel,
      isPending: true,

    },
  };
};

export const getPersonListExcelSuccess = state => {
  return {
    ...state,
    excel: {
      ...state.excel,
      isPending: false,

    },
  };
};

export const getPersonListExcelFailure = state => {
  return {
    ...state,
    excel: {
      ...state.excel,
      isPending: false,

    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PERSON_LIST_REQUEST]: getPersonListRequest,
  [Types.GET_PERSON_LIST_SUCCESS]: getPersonListSuccess,
  [Types.GET_PERSON_LIST_FAILURE]: getPersonListFailure,
  [Types.GET_PERSON_LIST_EXCEL_REQUEST]: getPersonListExcelRequest,
  [Types.GET_PERSON_LIST_EXCEL_SUCCESS]: getPersonListExcelSuccess,
  [Types.GET_PERSON_LIST_EXCEL_FAILURE]: getPersonListExcelFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
