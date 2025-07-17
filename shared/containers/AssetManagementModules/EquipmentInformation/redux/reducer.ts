import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  isFirstLoadDone: boolean;
  equipmentInformation: {
    data: VehicleEquipmentInformation[];
    loading: boolean;
    error: any;
  }
}

export const INITIAL_STATE: State = {
  isFirstLoadDone: false,
  equipmentInformation: {
    data: [],
    loading: false,
    error: null,
  },
};

export const filterEquipmentInformationRequest = (state: State) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: true,
    error: null,
  },
});

export const filterEquipmentInformationSuccess = (state: State, { data }: { data: VehicleEquipmentInformation[] }) => ({
  ...state,
  isFirstLoadDone: true,
  equipmentInformation: {
    data,
    loading: false,
    error: null,
  },
});

export const filterEquipmentInformationFailure = (state: State, { error }: { error: any }) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: false,
    error,
  },
});

export const editEquipmentInformationRequest = (state: State) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: true,
    error: null,
  },
});

export const editEquipmentInformationSuccess = (state: State) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: false,
    error: null,
  },
});

export const editEquipmentInformationFailure = (state: State, { error }: { error: any }) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: false,
    error,
  },
});

export const createEquipmentInformationRequest = (state: State) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: true,
    error: null,
  },
});

export const createEquipmentInformationSuccess = (state: State) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: false,
    error: null,
  },
});

export const createEquipmentInformationFailure = (state: State, { error }: { error: any }) => ({
  ...state,
  equipmentInformation: {
    ...state.equipmentInformation,
    loading: false,
    error,
  },
});

export const destroyContainer = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_EQUIPMENT_INFORMATION_REQUEST]: filterEquipmentInformationRequest,
  [Types.FILTER_EQUIPMENT_INFORMATION_SUCCESS]: filterEquipmentInformationSuccess,
  [Types.FILTER_EQUIPMENT_INFORMATION_FAILURE]: filterEquipmentInformationFailure,

  [Types.EDIT_EQUIPMENT_INFORMATION_REQUEST]: editEquipmentInformationRequest,
  [Types.EDIT_EQUIPMENT_INFORMATION_SUCCESS]: editEquipmentInformationSuccess,
  [Types.EDIT_EQUIPMENT_INFORMATION_FAILURE]: editEquipmentInformationFailure,

  [Types.CREATE_EQUIPMENT_INFORMATION_REQUEST]: createEquipmentInformationRequest,
  [Types.CREATE_EQUIPMENT_INFORMATION_SUCCESS]: createEquipmentInformationSuccess,
  [Types.CREATE_EQUIPMENT_INFORMATION_FAILURE]: createEquipmentInformationFailure,

  [Types.DESTROY_CONTAINER]: destroyContainer,
};

export default createReducer(INITIAL_STATE, HANDLERS);
