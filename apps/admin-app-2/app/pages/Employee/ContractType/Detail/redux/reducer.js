import { createReducer } from 'reduxsauce';

import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';
import { Types } from './actions';
import { createContractGroupKey } from '../components/helpers';

export const INITIAL_STATE = {
  contractForm: {
    data: {},
    isPending: false,
    error: null,
  },
  contract: {
    data: {},
    isPending: false,
    isSuccess: false,
    error: null,
  },
};

export const getContractFormRequest = state => {
  return {
    ...state,
    contractForm: {
      ...state.contractForm,
      isPending: true,
    },
  };
};

export const getContractFormSuccess = (state, { data }) => {
  return {
    ...state,
    contractForm: {
      ...state.contractForm,
      data,
      isPending: false,
    },
  };
};

export const getContractFormFailure = (state, { error }) => {
  return {
    ...state,
    contractForm: {
      ...state.contractForm,
      isPending: false,
      error,
    },
  };
};

export const getContractRequest = state => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: true,
    },
  };
};

export const getContractSuccess = (state, { data }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      data,
      isPending: false,
    },
  };
};

export const getContractFailure = (state, { error }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: false,
      error,
    },
  };
};

export const saveContractRequest = state => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const saveContractSuccess = (state, { data }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      data,
      isPending: false,
      isSuccess: true,
      error: null,
    },
  };
};

export const saveContractFailure = (state, { error }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const updateContractGroupRequest = groupId => {
  const groupKey = createContractGroupKey(groupId);
  return state => {
    return {
      ...state,
      [groupKey]: {
        data: null,
        error: null,
        isPending: true,
        isSuccess: false,
      },
    };
  };
};

export const updateContractGroupSuccess = groupId => {
  const groupKey = createContractGroupKey(groupId);
  return (state, { data }) => {
    return {
      ...state,
      contract: {
        ...state.contract,
        data,
      },
      [groupKey]: {
        ...state[groupKey],
        data,
        isPending: false,
        isSuccess: true,
        error: null,
      },
    };
  };
};

export const updateContractGroupFailure = groupId => {
  const groupKey = createContractGroupKey(groupId);
  return (state, { error }) => {
    return {
      ...state,
      [groupKey]: {
        ...state[groupKey],
        data: null,
        isPending: false,
        isSuccess: false,
        error,
      },
    };
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CONTRACT_FORM_REQUEST]: getContractFormRequest,
  [Types.GET_CONTRACT_FORM_SUCCESS]: getContractFormSuccess,
  [Types.GET_CONTRACT_FORM_FAILURE]: getContractFormFailure,

  [Types.GET_CONTRACT_REQUEST]: getContractRequest,
  [Types.GET_CONTRACT_SUCCESS]: getContractSuccess,
  [Types.GET_CONTRACT_FAILURE]: getContractFailure,

  [Types.SAVE_CONTRACT_REQUEST]: saveContractRequest,
  [Types.SAVE_CONTRACT_SUCCESS]: saveContractSuccess,
  [Types.SAVE_CONTRACT_FAILURE]: saveContractFailure,

  [Types.UPDATE_CONTRACT_REQUEST]: updateContractGroupRequest(contractGroupId.genInfo),
  [Types.UPDATE_CONTRACT_SUCCESS]: updateContractGroupSuccess(contractGroupId.genInfo),
  [Types.UPDATE_CONTRACT_FAILURE]: updateContractGroupFailure(contractGroupId.genInfo),

  [Types.UPDATE_CONTRACT_BREAK_REQUEST]: updateContractGroupRequest(contractGroupId.break),
  [Types.UPDATE_CONTRACT_BREAK_SUCCESS]: updateContractGroupSuccess(contractGroupId.break),
  [Types.UPDATE_CONTRACT_BREAK_FAILURE]: updateContractGroupFailure(contractGroupId.break),

  [Types.UPDATE_CONTRACT_LEAVE_REQUEST]: updateContractGroupRequest(contractGroupId.leave),
  [Types.UPDATE_CONTRACT_LEAVE_SUCCESS]: updateContractGroupSuccess(contractGroupId.leave),
  [Types.UPDATE_CONTRACT_LEAVE_FAILURE]: updateContractGroupFailure(contractGroupId.leave),

  [Types.UPDATE_CONTRACT_COMP_REQUEST]: updateContractGroupRequest(contractGroupId.compConfig),
  [Types.UPDATE_CONTRACT_COMP_SUCCESS]: updateContractGroupSuccess(contractGroupId.compConfig),
  [Types.UPDATE_CONTRACT_COMP_FAILURE]: updateContractGroupFailure(contractGroupId.compConfig),

  [Types.UPDATE_CONTRACT_SCHD_CONFIG_REQUEST]: updateContractGroupRequest(contractGroupId.schdConfig),
  [Types.UPDATE_CONTRACT_SCHD_CONFIG_SUCCESS]: updateContractGroupSuccess(contractGroupId.schdConfig),
  [Types.UPDATE_CONTRACT_SCHD_CONFIG_FAILURE]: updateContractGroupFailure(contractGroupId.schdConfig),

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
