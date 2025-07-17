import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseProposal: {
    data: {},
    isPending: false,
  },
  updateWarehouseProposalStatus: { isPending: false },
  updateWarehouseProposal: { isPending: false },
};

const getWarehouseProposal = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      warehouseProposal: {
        ...state.warehouseProposal,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE, { warehouseProposal = {} }) => {
    return {
      ...state,
      warehouseProposal: {
        ...state.warehouseProposal,
        data: warehouseProposal,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      warehouseProposal: {
        ...state.warehouseProposal,
        isPending: false,
        error,
      },
    };
  },
};

const updateWarehouseProposal = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      updateWarehouseProposal: {
        ...state.updateWarehouseProposal,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE) => {
    return {
      ...state,
      updateWarehouseProposal: {
        ...state.updateWarehouseProposal,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      updateWarehouseProposal: {
        ...state.updateWarehouseProposal,
        isPending: false,
        error,
      },
    };
  },
};

const updateWarehouseProposalStatus = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      updateWarehouseProposalStatus: {
        ...state.updateWarehouseProposalStatus,
        isPending: true,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      updateWarehouseProposalStatus: {
        ...state.updateWarehouseProposalStatus,
        isPending: false,
        error,
      },
    };
  },
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_PROPOSAL_REQUEST]: getWarehouseProposal.request,
  [Types.GET_WAREHOUSE_PROPOSAL_SUCCESS]: getWarehouseProposal.success,
  [Types.GET_WAREHOUSE_PROPOSAL_FAILURE]: getWarehouseProposal.failure,
  [Types.UPDATE_WAREHOUSE_PROPOSAL_REQUEST]: updateWarehouseProposal.request,
  [Types.UPDATE_WAREHOUSE_PROPOSAL_SUCCESS]: updateWarehouseProposal.success,
  [Types.UPDATE_WAREHOUSE_PROPOSAL_FAILURE]: updateWarehouseProposal.failure,
  [Types.UPDATE_WAREHOUSE_PROPOSAL_STATUS_REQUEST]: updateWarehouseProposalStatus.request,
  [Types.UPDATE_WAREHOUSE_PROPOSAL_STATUS_FAILURE]: updateWarehouseProposalStatus.failure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
