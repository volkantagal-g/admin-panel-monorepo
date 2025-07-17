import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { BagConstraint } from '../types';

export const INITIAL_STATE = {
  getBagConstraints: {
    isPending: false,
    data: [],
    error: null,
  },
  getBagExclusions: {
    isPending: false,
    data: [],
    error: null,
  },
  getMasterCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getBagConstraint: { data: {} },
  createBagConstraint: {
    data: {},
    error: null,
    isPending: false,
  },
  updateBagConstraint: {
    data: {},
    error: null,
    isPending: false,
  },
};

export const getBagConstraintsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getBagConstraints: {
      ...INITIAL_STATE.getBagConstraints,
      isPending: true,
    },
  };
};
export const getBagConstraintsSuccess = (state = INITIAL_STATE, { data }: any) => {
  return {
    ...state,
    getBagConstraints: {
      ...INITIAL_STATE.getBagConstraints,
      data,
    },
  };
};
export const getBagConstraintsFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    getBagConstraints: {
      ...INITIAL_STATE.getBagConstraints,
      error,
    },
  };
};
export const createBagConstraintRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createBagConstraint: {
      ...INITIAL_STATE.createBagConstraint,
      isPending: true,
    },
  };
};
export const createBagConstraintSuccess = (state = INITIAL_STATE, { data }: any) => {
  return {
    ...state,
    createBagConstraint: {
      ...INITIAL_STATE.createBagConstraint,
      data,
    },
  };
};
export const createBagConstraintFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    createBagConstraint: {
      ...INITIAL_STATE.createBagConstraint,
      error,
    },
  };
};
export const updateBagConstraintRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBagConstraint: {
      ...INITIAL_STATE.updateBagConstraint,
      isPending: true,
    },
  };
};
export const updateBagConstraintSuccess = (state = INITIAL_STATE, { data }: any) => {
  const { left, right, match, isActive, description, _id, version } = data;
  const { getBagConstraints: { data: constraints } } = state;
  const allConstraints = constraints.map((constraint: BagConstraint) => {
    if (constraint?._id === _id) {
      return { ...constraint, description, isActive, left, right, match, version };
    }
    return constraint;
  });
  return {
    ...state,
    getBagConstraints: {
      ...INITIAL_STATE.getBagConstraints,
      data: allConstraints,
    },
    updateBagConstraint: {
      ...INITIAL_STATE.updateBagConstraint,
      isPending: false,
    },
  };
};
export const updateBagConstraintFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    updateBagConstraint: {
      ...INITIAL_STATE.updateBagConstraint,
      error,
    },
  };
};

export const getBagExclusionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getBagExclusions: {
      ...INITIAL_STATE.getBagExclusions,
      isPending: true,
    },
  };
};
export const getBagExclusionsSuccess = (state = INITIAL_STATE, { data }: any) => {
  return {
    ...state,
    getBagExclusions: {
      ...INITIAL_STATE.getBagExclusions,
      data,
    },
  };
};
export const getBagExclusionsFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    getBagExclusions: {
      ...INITIAL_STATE.getBagExclusions,
      error,
    },
  };
};
export const getMasterCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      isPending: true,
    },
  };
};

export const getMasterCategoriesSuccess = (state = INITIAL_STATE, { data }: any) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      data,
      isPending: false,
    },
  };
};

export const getMasterCategoriesFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      isPending: false,
      error,
    },
  };
};

const setSelectedBagConstraint = (state = INITIAL_STATE, { bagConstraint }: {bagConstraint: BagConstraint}) => {
  return {
    ...state,
    getBagConstraint: {
      ...INITIAL_STATE.getBagConstraint,
      data: bagConstraint,
    },
  };
};

export const initPage = () => {
  return { ...INITIAL_STATE };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BAG_CONSTRAINTS_REQUEST]: getBagConstraintsRequest,
  [Types.GET_BAG_CONSTRAINTS_SUCCESS]: getBagConstraintsSuccess,
  [Types.GET_BAG_CONSTRAINTS_FAILURE]: getBagConstraintsFailure,
  [Types.UPDATE_BAG_CONSTRAINT_REQUEST]: updateBagConstraintRequest,
  [Types.UPDATE_BAG_CONSTRAINT_SUCCESS]: updateBagConstraintSuccess,
  [Types.UPDATE_BAG_CONSTRAINT_FAILURE]: updateBagConstraintFailure,
  [Types.CREATE_BAG_CONSTRAINT_REQUEST]: createBagConstraintRequest,
  [Types.CREATE_BAG_CONSTRAINT_SUCCESS]: createBagConstraintSuccess,
  [Types.CREATE_BAG_CONSTRAINT_FAILURE]: createBagConstraintFailure,
  [Types.GET_BAG_EXCLUSIONS_REQUEST]: getBagExclusionsRequest,
  [Types.GET_BAG_EXCLUSIONS_SUCCESS]: getBagExclusionsSuccess,
  [Types.GET_BAG_EXCLUSIONS_FAILURE]: getBagExclusionsFailure,
  [Types.GET_MASTER_CATEGORIES_REQUEST]: getMasterCategoriesRequest,
  [Types.GET_MASTER_CATEGORIES_SUCCESS]: getMasterCategoriesSuccess,
  [Types.GET_MASTER_CATEGORIES_FAILURE]: getMasterCategoriesFailure,
  [Types.SET_SELECTED_BAG_CONSTRAINT]: setSelectedBagConstraint,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,

};

export default createReducer(INITIAL_STATE, HANDLERS);
