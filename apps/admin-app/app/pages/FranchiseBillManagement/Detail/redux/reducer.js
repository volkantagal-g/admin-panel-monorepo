import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseBillDetail: {
    data: {},
    isPending: false,
  },
};

export const getFranchiseBillDetailRequest = state => {
  return {
    ...state,
    franchiseBillDetail: {
      ...state.franchiseBillDetail,
      isPending: true,
    },
  };
};

export const getFranchiseBillDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseBillDetail: {
      ...state.franchiseBillDetail,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseBillDetailFailure = state => {
  return {
    ...state,
    franchiseBillDetail: {
      ...state.franchiseBillDetail,
      data: {},
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_BILL_DETAIL_REQUEST]: getFranchiseBillDetailRequest,
  [Types.GET_FRANCHISE_BILL_DETAIL_SUCCESS]: getFranchiseBillDetailSuccess,
  [Types.GET_FRANCHISE_BILL_DETAIL_FAILURE]: getFranchiseBillDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
