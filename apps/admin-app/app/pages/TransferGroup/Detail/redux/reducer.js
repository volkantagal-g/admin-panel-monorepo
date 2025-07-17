import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getTransferGroupById: {
    isPending: false,
    data: {},
    error: null,
  },
  inactivateTransferGroup: {
    isPending: false,
    data: {},
    error: null,
  },
  productTransferGroups: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  exportProductTransferGroups: {
    isPending: false,
    error: null,
  },
  warehouseTransferGroups: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  exportWarehouseTransferGroups: {
    isPending: false,
    error: null,
  },
  updateTransferGroup: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getTransferGroupByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getTransferGroupById: {
      ...INITIAL_STATE.getTransferGroupById,
      isPending: true,
    },
  };
};

export const getTransferGroupByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getTransferGroupById: {
      ...INITIAL_STATE.getTransferGroupById,
      data,
      isPending: false,
    },
  };
};

export const getTransferGroupByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getTransferGroupById: {
      ...INITIAL_STATE.getTransferGroupById,
      isPending: false,
      error,
    },
  };
};

export const updateTransferGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateTransferGroup: {
      ...INITIAL_STATE.updateTransferGroup,
      isPending: true,
    },
  };
};

export const updateTransferGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateTransferGroup: {
      ...INITIAL_STATE.updateTransferGroup,
      data,
      isPending: false,
    },
  };
};

export const updateTransferGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateTransferGroup: {
      ...INITIAL_STATE.updateTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const inactivateTransferGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    inactivateTransferGroup: {
      ...INITIAL_STATE.inactivateTransferGroup,
      isPending: true,
    },
  };
};

export const inactivateTransferGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    inactivateTransferGroup: {
      ...INITIAL_STATE.inactivateTransferGroup,
      data,
      isPending: false,
    },
  };
};

export const inactivateTransferGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    inactivateTransferGroup: {
      ...INITIAL_STATE.inactivateTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const getProductTransferGroupsByFilterRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    productTransferGroups: {
      ...INITIAL_STATE.productTransferGroups,
      isPending: true,
    },
  };
};

export const getProductTransferGroupsByFilterSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    productTransferGroups: {
      ...INITIAL_STATE.productTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const getProductTransferGroupsByFilterFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    productTransferGroups: {
      ...INITIAL_STATE.productTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const exportProductTransferGroupsByFilterRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportProductTransferGroups: {
      ...INITIAL_STATE.exportProductTransferGroups,
      isPending: true,
    },
  };
};

export const exportProductTransferGroupsByFilterSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportProductTransferGroups: {
      ...INITIAL_STATE.exportProductTransferGroups,
      isPending: false,
    },
  };
};

export const exportProductTransferGroupsByFilterFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportProductTransferGroups: {
      ...INITIAL_STATE.exportProductTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const updateTransferGroupOfProductsBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    productTransferGroups: {
      ...state.productTransferGroups,
      isPending: true,
    },
  };
};

export const updateTransferGroupOfProductsBulkSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    productTransferGroups: {
      ...state.productTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const updateTransferGroupOfProductsBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    productTransferGroups: {
      ...state.productTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseTransferGroupsByFilterRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...INITIAL_STATE.warehouseTransferGroups,
      isPending: true,
    },
  };
};

export const getWarehouseTransferGroupsByFilterSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...INITIAL_STATE.warehouseTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseTransferGroupsByFilterFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...INITIAL_STATE.warehouseTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const updateTransferGroupOfWarehousesBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...state.warehouseTransferGroups,
      isPending: true,
    },
  };
};

export const updateTransferGroupOfWarehousesBulkSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...state.warehouseTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const updateTransferGroupOfWarehousesBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouseTransferGroups: {
      ...state.warehouseTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const exportWarehouseTransferGroupsByFilterRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportWarehouseTransferGroups: {
      ...INITIAL_STATE.exportWarehouseTransferGroups,
      isPending: true,
    },
  };
};

export const exportWarehouseTransferGroupsByFilterSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportWarehouseTransferGroups: {
      ...INITIAL_STATE.exportWarehouseTransferGroups,
      isPending: false,
    },
  };
};

export const exportWarehouseTransferGroupsByFilterFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportWarehouseTransferGroups: {
      ...INITIAL_STATE.exportWarehouseTransferGroups,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_TRANSFER_GROUP_BY_ID_REQUEST]: getTransferGroupByIdRequest,
  [Types.GET_TRANSFER_GROUP_BY_ID_SUCCESS]: getTransferGroupByIdSuccess,
  [Types.GET_TRANSFER_GROUP_BY_ID_FAILURE]: getTransferGroupByIdFailure,
  [Types.INACTIVATE_TRANSFER_GROUP_REQUEST]: inactivateTransferGroupRequest,
  [Types.INACTIVATE_TRANSFER_GROUP_SUCCESS]: inactivateTransferGroupSuccess,
  [Types.INACTIVATE_TRANSFER_GROUP_FAILURE]: inactivateTransferGroupFailure,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_FILTER_REQUEST]: getProductTransferGroupsByFilterRequest,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_FILTER_SUCCESS]: getProductTransferGroupsByFilterSuccess,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_FILTER_FAILURE]: getProductTransferGroupsByFilterFailure,
  [Types.EXPORT_PRODUCT_TRANSFER_GROUPS_BY_FILTER_REQUEST]: exportProductTransferGroupsByFilterRequest,
  [Types.EXPORT_PRODUCT_TRANSFER_GROUPS_BY_FILTER_SUCCESS]: exportProductTransferGroupsByFilterSuccess,
  [Types.EXPORT_PRODUCT_TRANSFER_GROUPS_BY_FILTER_FAILURE]: exportProductTransferGroupsByFilterFailure,
  [Types.UPDATE_TRANSFER_GROUP_OF_PRODUCTS_BULK_REQUEST]: updateTransferGroupOfProductsBulkRequest,
  [Types.UPDATE_TRANSFER_GROUP_OF_PRODUCTS_BULK_SUCCESS]: updateTransferGroupOfProductsBulkSuccess,
  [Types.UPDATE_TRANSFER_GROUP_OF_PRODUCTS_BULK_FAILURE]: updateTransferGroupOfProductsBulkFailure,
  [Types.GET_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_REQUEST]: getWarehouseTransferGroupsByFilterRequest,
  [Types.GET_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_SUCCESS]: getWarehouseTransferGroupsByFilterSuccess,
  [Types.GET_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_FAILURE]: getWarehouseTransferGroupsByFilterFailure,
  [Types.EXPORT_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_REQUEST]: exportWarehouseTransferGroupsByFilterRequest,
  [Types.EXPORT_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_SUCCESS]: exportWarehouseTransferGroupsByFilterSuccess,
  [Types.EXPORT_WAREHOUSE_TRANSFER_GROUPS_BY_FILTER_FAILURE]: exportWarehouseTransferGroupsByFilterFailure,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSES_BULK_REQUEST]: updateTransferGroupOfWarehousesBulkRequest,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSES_BULK_SUCCESS]: updateTransferGroupOfWarehousesBulkSuccess,
  [Types.UPDATE_TRANSFER_GROUP_OF_WAREHOUSES_BULK_FAILURE]: updateTransferGroupOfWarehousesBulkFailure,
  [Types.UPDATE_TRANSFER_GROUP_REQUEST]: updateTransferGroupRequest,
  [Types.UPDATE_TRANSFER_GROUP_SUCCESS]: updateTransferGroupSuccess,
  [Types.UPDATE_TRANSFER_GROUP_FAILURE]: updateTransferGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
