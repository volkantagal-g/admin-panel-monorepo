import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  businessPartners: {
    data: [],
    isPending: false,
  },
};

export const getBusinessPartnersRequest = state => {
  return {
    ...state,
    businessPartners: {
      ...state.businessPartners,
      isPending: true,
    },
  };
};

export const getBusinessPartnersSuccess = (state, { data }) => {
  return {
    ...state,
    businessPartners: {
      ...state.businessPartners,
      data,
      isPending: false,
    },
  };
};

export const getBusinessPartnersFailure = state => {
  return {
    ...state,
    businessPartners: {
      ...state.businessPartners,
      data: [],
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BUSINESS_PARTNERS_REQUEST]: getBusinessPartnersRequest,
  [Types.GET_BUSINESS_PARTNERS_SUCCESS]: getBusinessPartnersSuccess,
  [Types.GET_BUSINESS_PARTNERS_FAILURE]: getBusinessPartnersFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
