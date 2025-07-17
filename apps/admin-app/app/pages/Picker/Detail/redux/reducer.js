import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  pickerDetail: {
    isPending: false,
    data: [],
  },
  permissions: {
    isPending: false,
    data: [],
  },
  pickerJob: {
    isPending: false,
    data: {},
  },
  releaseWarehouse: {
    isPending: false,
    data: [],
  },
};

const pickerDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: true,
    data: [],
  },
});

const pickerDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: false,
    data,
  },
});

const pickerDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: false,
  },
});

export const updatePickerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: true,
    },
  };
};

export const updatePickerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      data,
      isPending: false,
    },
  };
};

export const updatePickerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: false,
      error,
    },
  };
};

export const releasePickerFromWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: true,
    },
    releaseWarehouse: {
      ...state.releaseWarehouse,
      isPending: true,
    },
  };
};

export const releasePickerFromWarehouseSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      data,
      isPending: false,
    },
    releaseWarehouse: {
      ...state.releaseWarehouse,
      data,
      isPending: false,
    },
  };
};

export const releasePickerFromWarehouseFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: false,
      error,
    },
    releaseWarehouse: {
      ...state.releaseWarehouse,
      isPending: false,
      error,
    },
  };
};
export const updateWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: true,
    },
  };
};

export const updateWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      data: { ...state.pickerDetail.data, warehouse: data.warehouse },
      isPending: false,
    },
  };
};

export const updateWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: false,
      error,
    },
  };
};
const activatePickerRequest = (state = INITIAL_STATE) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: true,
  },
});

const activatePickerSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: false,
    data,
  },
});

const activatePickerFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  pickerDetail: {
    ...state.pickerDetail,
    isPending: false,
    error,
  },
});

export const getPickerJobRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      isPending: true,
    },
  };
};

export const getPickerJobSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      data,
      isPending: false,
    },
  };
};

export const getPickerJobFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      isPending: false,
      error,
    },
  };
};

export const releasePickerJobRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      isPending: true,
    },
  };
};

export const releasePickerJobSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      data,
      isPending: false,
    },
  };
};

export const releasePickerJobFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pickerJob: {
      ...state.pickerJob,
      isPending: false,
      error,
    },
  };
};
export const deactivatePickerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: true,
    },
  };
};

export const deactivatePickerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      data,
      isPending: false,
    },
  };
};

export const deactivatePickerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    pickerDetail: {
      ...state.pickerDetail,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PICKER_DETAIL_REQUEST]: pickerDetailRequest,
  [Types.GET_PICKER_DETAIL_SUCCESS]: pickerDetailSuccess,
  [Types.GET_PICKER_DETAIL_FAILURE]: pickerDetailFailure,
  [Types.UPDATE_PICKER_REQUEST]: updatePickerRequest,
  [Types.UPDATE_PICKER_SUCCESS]: updatePickerSuccess,
  [Types.UPDATE_PICKER_FAILURE]: updatePickerFailure,

  [Types.RELEASE_PICKER_FROM_WAREHOUSE_REQUEST]:
    releasePickerFromWarehouseRequest,
  [Types.RELEASE_PICKER_FROM_WAREHOUSE_SUCCESS]:
    releasePickerFromWarehouseSuccess,
  [Types.RELEASE_PICKER_FROM_WAREHOUSE_FAILURE]:
    releasePickerFromWarehouseFailure,
  [Types.UPDATE_WAREHOUSE_REQUEST]: updateWarehouseRequest,
  [Types.UPDATE_WAREHOUSE_SUCCESS]: updateWarehouseSuccess,
  [Types.UPDATE_WAREHOUSE_FAILURE]: updateWarehouseFailure,

  [Types.ACTIVATE_PICKER_REQUEST]: activatePickerRequest,
  [Types.ACTIVATE_PICKER_SUCCESS]: activatePickerSuccess,
  [Types.ACTIVATE_PICKER_FAILURE]: activatePickerFailure,

  [Types.GET_PICKER_JOB_REQUEST]: getPickerJobRequest,
  [Types.GET_PICKER_JOB_SUCCESS]: getPickerJobSuccess,
  [Types.GET_PICKER_JOB_FAILURE]: getPickerJobFailure,

  [Types.RELEASE_PICKER_JOB_REQUEST]: releasePickerJobRequest,
  [Types.RELEASE_PICKER_JOB_SUCCESS]: releasePickerJobSuccess,
  [Types.RELEASE_PICKER_JOB_FAILURE]: releasePickerJobFailure,
  [Types.DEACTIVATE_PICKER_REQUEST]: deactivatePickerRequest,
  [Types.DEACTIVATE_PICKER_SUCCESS]: deactivatePickerSuccess,
  [Types.DEACTIVATE_PICKER_FAILURE]: deactivatePickerFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
