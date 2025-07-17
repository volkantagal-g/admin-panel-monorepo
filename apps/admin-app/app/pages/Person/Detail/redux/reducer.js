import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  personDetail: {
    data: {},
    isPending: false,
  },
  updatePerson: {
    isPending: false,
    isSuccess: false,
  },
  personNotes: {
    data: [],
    isPending: false,
  },
  couriers: {
    data: [],
    isPending: false,
    error: null,
  },
  pickers: {
    data: [],
    isPending: false,
    error: null,
  },
  personContract: {
    data: [],
    isPending: false,
    error: null,
  },
  getirUpTrainings: {
    data: [],
    isPending: false,
    error: null,
  },
  franchisesAreas: {
    data: [],
    isPending: false,
  },
};

export const getPersonDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personDetail: {
      ...state.personDetail,
      isPending: true,
    },
  };
};

export const getPersonDetailSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    personDetail: {
      ...state.personDetail,
      data: {
        ...state.personDetail.data,
        ...data,
      },
      isPending: false,
    },
  };
};

export const getPersonDetailFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    personDetail: {
      ...state.personDetail,
      isPending: false,
    },
  };
};

export const getPersonNotesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personNotes: {
      ...state.personNotes,
      isPending: true,
    },
  };
};

export const getPersonNotesSuccess = (state = INITIAL_STATE, { data = [] } = {}) => {
  return {
    ...state,
    personNotes: {
      ...state.personNotes,
      data,
      isPending: false,
    },
  };
};

export const getPersonNotesFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    personNotes: {
      ...state.personNotes,
      isPending: false,
    },
  };
};

export const updatePersonDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePerson: {
      ...state.updatePerson,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updatePersonDetailSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePerson: {
      ...state.updatePerson,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const updatePersonDetailFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePerson: {
      ...state.updatePerson,
      isPending: false,
    },
  };
};

export const getCouriersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      isPending: true,
    },
  };
};

export const getCouriersSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      data,
      isPending: false,
    },
  };
};

export const getCouriersFailure = (state = INITIAL_STATE, { error = {} } = {}) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      isPending: false,
      error,
    },
  };
};

export const getPickersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    pickers: {
      ...state.pickers,
      isPending: true,
    },
  };
};

export const getPickersSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    pickers: {
      ...state.pickers,
      data,
      isPending: false,
    },
  };
};

export const getPickersFailure = (state = INITIAL_STATE, { error = {} } = {}) => {
  return {
    ...state,
    pickers: {
      ...state.pickers,
      isPending: false,
      error,
    },
  };
};

export const getPersonContractRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personContract: {
      ...state.personContract,
      isPending: true,
    },
  };
};

export const getPersonContractSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    personContract: {
      ...state.personContract,
      data,
      isPending: false,
    },
  };
};

export const getPersonContractFailure = (state = INITIAL_STATE, { error = {} } = {}) => {
  return {
    ...state,
    personContract: {
      ...state.personContract,
      isPending: false,
      error,
    },
  };
};

export const getGetirUpTrainingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getirUpTrainings: {
      ...state.getirUpTrainings,
      isPending: true,
    },
  };
};

export const getGetirUpTrainingsSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    getirUpTrainings: {
      ...state.getirUpTrainings,
      data,
      isPending: false,
    },
  };
};

export const getGetirUpTrainingsFailure = (state = INITIAL_STATE, { error = {} } = {}) => {
  return {
    ...state,
    getirUpTrainings: {
      ...state.getirUpTrainings,
      isPending: false,
      error,
    },
  };
};

export const getFranchisesAreasRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      isPending: true,
    },
  };
};

export const getFranchisesAreasSuccess = (state = INITIAL_STATE, { data = {} } = {}) => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      data,
      isPending: false,
    },
  };
};

export const getFranchisesAreasFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    franchisesAreas: {
      ...state.franchisesAreas,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PERSON_DETAIL_REQUEST]: getPersonDetailRequest,
  [Types.GET_PERSON_DETAIL_SUCCESS]: getPersonDetailSuccess,
  [Types.GET_PERSON_DETAIL_FAILURE]: getPersonDetailFailure,
  [Types.GET_PERSON_NOTES_REQUEST]: getPersonNotesRequest,
  [Types.GET_PERSON_NOTES_SUCCESS]: getPersonNotesSuccess,
  [Types.GET_PERSON_NOTES_FAILURE]: getPersonNotesFailure,
  [Types.UPDATE_PERSON_DETAIL_REQUEST]: updatePersonDetailRequest,
  [Types.UPDATE_PERSON_DETAIL_SUCCESS]: updatePersonDetailSuccess,
  [Types.UPDATE_PERSON_DETAIL_FAILURE]: updatePersonDetailFailure,
  [Types.UPDATE_PERSONAL_DETAIL_REQUEST]: updatePersonDetailRequest,
  [Types.UPDATE_PERSONAL_DETAIL_SUCCESS]: updatePersonDetailSuccess,
  [Types.UPDATE_PERSONAL_DETAIL_FAILURE]: updatePersonDetailFailure,
  [Types.ADD_PERSON_TRAINING_REQUEST]: updatePersonDetailRequest,
  [Types.ADD_PERSON_TRAINING_SUCCESS]: updatePersonDetailSuccess,
  [Types.ADD_PERSON_TRAINING_FAILURE]: updatePersonDetailFailure,
  [Types.DISABLE_LOGIN_OF_COURIERS_REQUEST]: updatePersonDetailRequest,
  [Types.DISABLE_LOGIN_OF_COURIERS_SUCCESS]: updatePersonDetailSuccess,
  [Types.DISABLE_LOGIN_OF_COURIERS_FAILURE]: updatePersonDetailFailure,
  [Types.UPDATE_PERSON_NOTE_REQUEST]: updatePersonDetailRequest,
  [Types.UPDATE_PERSON_NOTE_SUCCESS]: updatePersonDetailSuccess,
  [Types.UPDATE_PERSON_NOTE_FAILURE]: updatePersonDetailFailure,
  [Types.CREATE_PERSON_NOTE_REQUEST]: updatePersonDetailRequest,
  [Types.CREATE_PERSON_NOTE_SUCCESS]: updatePersonDetailSuccess,
  [Types.CREATE_PERSON_NOTE_FAILURE]: updatePersonDetailFailure,
  [Types.ADD_MARKET_EMPLOYER_REQUEST]: updatePersonDetailRequest,
  [Types.ADD_MARKET_EMPLOYER_SUCCESS]: updatePersonDetailSuccess,
  [Types.ADD_MARKET_EMPLOYER_FAILURE]: updatePersonDetailFailure,
  [Types.EDIT_MARKET_EMPLOYER_REQUEST]: updatePersonDetailRequest,
  [Types.EDIT_MARKET_EMPLOYER_SUCCESS]: updatePersonDetailSuccess,
  [Types.EDIT_MARKET_EMPLOYER_FAILURE]: updatePersonDetailFailure,
  [Types.REMOVE_MARKET_EMPLOYER_REQUEST]: updatePersonDetailRequest,
  [Types.REMOVE_MARKET_EMPLOYER_SUCCESS]: updatePersonDetailSuccess,
  [Types.REMOVE_MARKET_EMPLOYER_FAILURE]: updatePersonDetailFailure,
  [Types.CHANGE_PASSWORD_REQUEST]: updatePersonDetailRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: updatePersonDetailSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: updatePersonDetailFailure,
  [Types.GET_COURIERS_REQUEST]: getCouriersRequest,
  [Types.GET_COURIERS_SUCCESS]: getCouriersSuccess,
  [Types.GET_COURIERS_FAILURE]: getCouriersFailure,
  [Types.GET_PICKERS_REQUEST]: getPickersRequest,
  [Types.GET_PICKERS_SUCCESS]: getPickersSuccess,
  [Types.GET_PICKERS_FAILURE]: getPickersFailure,
  [Types.CREATE_COURIER_FOR_PERSON_REQUEST]: updatePersonDetailRequest,
  [Types.CREATE_COURIER_FOR_PERSON_SUCCESS]: updatePersonDetailSuccess,
  [Types.CREATE_COURIER_FOR_PERSON_FAILURE]: updatePersonDetailFailure,
  [Types.CHANGE_AVATAR_REQUEST]: updatePersonDetailRequest,
  [Types.CHANGE_AVATAR_SUCCESS]: updatePersonDetailSuccess,
  [Types.CHANGE_AVATAR_FAILURE]: updatePersonDetailFailure,
  [Types.ACTIVATE_PERSON_REQUEST]: updatePersonDetailRequest,
  [Types.ACTIVATE_PERSON_SUCCESS]: updatePersonDetailSuccess,
  [Types.ACTIVATE_PERSON_FAILURE]: updatePersonDetailFailure,
  [Types.DEACTIVATE_PERSON_REQUEST]: updatePersonDetailRequest,
  [Types.DEACTIVATE_PERSON_SUCCESS]: updatePersonDetailSuccess,
  [Types.DEACTIVATE_PERSON_FAILURE]: updatePersonDetailFailure,
  [Types.ADD_EMPLOYEE_DISCOUNT_REQUEST]: updatePersonDetailRequest,
  [Types.ADD_EMPLOYEE_DISCOUNT_SUCCESS]: updatePersonDetailSuccess,
  [Types.ADD_EMPLOYEE_DISCOUNT_FAILURE]: updatePersonDetailFailure,
  [Types.GET_PERSON_CONTRACT_REQUEST]: getPersonContractRequest,
  [Types.GET_PERSON_CONTRACT_SUCCESS]: getPersonContractSuccess,
  [Types.GET_PERSON_CONTRACT_FAILURE]: getPersonContractFailure,
  [Types.GET_GETIR_UP_TRAININGS_REQUEST]: getGetirUpTrainingsRequest,
  [Types.GET_GETIR_UP_TRAININGS_SUCCESS]: getGetirUpTrainingsSuccess,
  [Types.GET_GETIR_UP_TRAININGS_FAILURE]: getGetirUpTrainingsFailure,
  [Types.GET_FRANCHISES_AREAS_REQUEST]: getFranchisesAreasRequest,
  [Types.GET_FRANCHISES_AREAS_SUCCESS]: getFranchisesAreasSuccess,
  [Types.GET_FRANCHISES_AREAS_FAILURE]: getFranchisesAreasFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
