import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  notifSoundType: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getNotifSoundTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notifSoundType: {
      ...state.notifSoundTypes,
      isPending: true,
    },
  };
};

export const getNotifSoundTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    notifSoundType: {
      ...state.notifSoundType,
      data,
      isPending: false,
    },
  };
};

export const getNotifSoundTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notifSoundType: {
      ...state.notifSoundType,
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_NOTIF_SOUND_TYPES_REQUEST]: getNotifSoundTypesRequest,
  [Types.GET_NOTIF_SOUND_TYPES_SUCCESS]: getNotifSoundTypesSuccess,
  [Types.GET_NOTIF_SOUND_TYPES_FAILURE]: getNotifSoundTypesFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
