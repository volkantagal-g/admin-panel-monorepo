import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createThirdPartyCompany: {
    isPending: false,
    data: [],
    error: null,
  },
};

const createThirdPartyCompany = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    createThirdPartyCompany: {
      ...state.createThirdPartyCompany,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { thirdPartyCompany = {} }) => ({
    ...state,
    createThirdPartyCompany: {
      ...state.createThirdPartyCompany,
      data: thirdPartyCompany,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    createThirdPartyCompany: {
      ...state.createThirdPartyCompany,
      isPending: false,
      error,
    },
  }),
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_THIRD_PARTY_COMPANY_REQUEST]: createThirdPartyCompany.request,
  [Types.CREATE_THIRD_PARTY_COMPANY_SUCCESS]: createThirdPartyCompany.success,
  [Types.CREATE_THIRD_PARTY_COMPANY_FAILURE]: createThirdPartyCompany.failure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
