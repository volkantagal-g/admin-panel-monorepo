import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { SAA_GETIR_10_CODE } from '../../constants';

export const INITIAL_STATE = {
  saaData: {
    data: null,
    isPending: false,
    error: false,
  },
  showWarehouses: false,
  showAutoCreatedSaas: false,
  domainType: SAA_GETIR_10_CODE,
};

const initPage = (state = INITIAL_STATE) => {
  return { ...state };
};

const getSaasRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: true,
    },
  };
};
const getSaasSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      data,
      isPending: false,
    },
  };
};
const getSaasFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    saaData: {
      ...state.saaData,
      isPending: false,
      error,
    },
  };
};

const setDomainType = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    domainType,
  };
};

const toggleShowWarehouses = (state = INITIAL_STATE) => {
  return {
    ...state,
    showWarehouses: !state.showWarehouses,
  };
};

const toggleShowAutoCreatedSaas = (state = INITIAL_STATE) => {
  return {
    ...state,
    showAutoCreatedSaas: !state.showAutoCreatedSaas,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.GET_SAAS_REQUEST]: getSaasRequest,
  [Types.GET_SAAS_SUCCESS]: getSaasSuccess,
  [Types.GET_SAAS_FAILURE]: getSaasFailure,

  [Types.TOGGLE_SHOW_WAREHOUSES]: toggleShowWarehouses,
  [Types.TOGGLE_SHOW_AUTO_CREATED_SAAS]: toggleShowAutoCreatedSaas,
  [Types.SET_DOMAIN_TYPE]: setDomainType,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
