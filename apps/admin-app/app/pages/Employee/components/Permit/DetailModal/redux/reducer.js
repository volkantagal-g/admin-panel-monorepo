import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  permitDetail: {
    permit: {},
    history: [],
    isSupervisor: false,
    hasPermission: false,
    isPending: false,
  },
};

export const getPermitDetailRequest = state => {
  return {
    ...state,
    permitDetail: {
      ...INITIAL_STATE.permitDetail,
      isPending: true,
    },
  };
};

export const getPermitDetailSuccess = (state, { permit, history, isSupervisor, hasPermission }) => {
  return {
    ...state,
    permitDetail: {
      ...state.permitDetail,
      permit,
      history,
      isSupervisor,
      hasPermission,
      isPending: false,
    },
  };
};

export const getPermitDetailFailure = state => {
  return {
    ...state,
    permitDetail: {
      ...state.permitDetail,
      isPending: false,
    },
  };
};

const initPage = state => ({
  ...state,
  isPageInitialized: true,
});

export const destroyPage = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PERMIT_DETAIL_REQUEST]: getPermitDetailRequest,
  [Types.GET_PERMIT_DETAIL_SUCCESS]: getPermitDetailSuccess,
  [Types.GET_PERMIT_DETAIL_FAILURE]: getPermitDetailFailure,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
