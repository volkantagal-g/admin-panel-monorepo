import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  pickerList: {
    isPending: false,
    data: [],
  },
};

const getPickerListRequest = (state = INITIAL_STATE) => ({
  ...state,
  pickerList: {
    ...state.pickerList,
    isPending: true,
    data: [],
  },
});

const getPickerListSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  pickerList: {
    ...state.pickerList,
    isPending: false,
    data,
  },
});

const getPickerListFailure = (state = INITIAL_STATE) => ({
  ...state,
  pickerList: {
    ...state.pickerList,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PICKER_LIST_REQUEST]: getPickerListRequest,
  [Types.GET_PICKER_LIST_SUCCESS]: getPickerListSuccess,
  [Types.GET_PICKER_LIST_FAILURE]: getPickerListFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
