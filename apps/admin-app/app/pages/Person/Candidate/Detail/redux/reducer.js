import { createReducer } from 'reduxsauce';

import { PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  personCandidateForm: {
    data: [],
    isPending: false,
  },
  personCandidateFormInitialValues: {
    data: {},
    isPending: false,
  },
  personCandidate: {
    isBanned: false,
    isPending: false,
  },
};

export const getPersonCandidateFormRequest = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateForm: {
    ...state.personCandidateForm,
    isPending: true,
  },
});

export const getPersonCandidateFormSuccess = (state = INITIAL_STATE, { data = [] }) => ({
  ...state,
  personCandidateForm: {
    ...state.personCandidateForm,
    data,
    isPending: false,
  },
});

export const getPersonCandidateFormFailure = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateForm: {
    data: [],
    isPending: false,
  },
});

export const getPersonCandidateFormInitialValueRequest = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateFormInitialValues: {
    ...state.personCandidateFormInitialValues,
    isPending: true,
  },
});

export const getPersonCandidateFormInitialValueSuccess = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  personCandidateFormInitialValues: {
    ...state.personCandidateFormInitialValues,
    data,
    isPending: false,
  },
});

export const getPersonCandidateFormInitialValueFailure = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateFormInitialValues: {
    data: {},
    isPending: false,
  },
});

export const enablePersonCandidateManualOperation = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateFormInitialValues: {
    ...state.personCandidateFormInitialValues,
    data: {
      ...state.personCandidateFormInitialValues.data,
      status: PERSON_CANDIDATE_FORM_STATUSES.MANUAL_OPERATION,
    },
  },
});

export const submitPersonCandidateFormRequest = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateForm: {
    ...state.personCandidateForm,
    isPending: true,
  },
});

export const submitPersonCandidateFormFailure = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateForm: {
    data: {},
    isPending: false,
  },
});

export const getPersonCandidateIsBannedRequest = (state = INITIAL_STATE) => ({
  ...state,
  personCandidate: {
    ...state.personCandidate,
    isPending: true,
  },
});

export const getPersonCandidateIsBannedSuccess = (state = INITIAL_STATE, { isBanned }) => ({
  ...state,
  personCandidate: {
    ...state.personCandidate,
    isBanned,
    isPending: false,
  },
});

export const getPersonCandidateIsBannedFailure = (state = INITIAL_STATE) => ({
  ...state,
  personCandidateForm: {
    isBanned: false,
    isPending: false,
  },
});

export const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PERSON_CANDIDATE_FORM_REQUEST]: getPersonCandidateFormRequest,
  [Types.GET_PERSON_CANDIDATE_FORM_SUCCESS]: getPersonCandidateFormSuccess,
  [Types.GET_PERSON_CANDIDATE_FORM_FAILURE]: getPersonCandidateFormFailure,
  [Types.GET_PERSON_CANDIDATE_FORM_INITIAL_VALUE_REQUEST]: getPersonCandidateFormInitialValueRequest,
  [Types.GET_PERSON_CANDIDATE_FORM_INITIAL_VALUE_SUCCESS]: getPersonCandidateFormInitialValueSuccess,
  [Types.GET_PERSON_CANDIDATE_FORM_INITIAL_VALUE_FAILURE]: getPersonCandidateFormInitialValueFailure,
  [Types.ENABLE_PERSON_CANDIDATE_MANUAL_OPERATION]: enablePersonCandidateManualOperation,
  [Types.SUBMIT_PERSON_CANDIDATE_FORM_REQUEST]: submitPersonCandidateFormRequest,
  [Types.SUBMIT_PERSON_CANDIDATE_FORM_FAILURE]: submitPersonCandidateFormFailure,
  [Types.GET_PERSON_CANDIDATE_IS_BANNED_REQUEST]: getPersonCandidateIsBannedRequest,
  [Types.GET_PERSON_CANDIDATE_IS_BANNED_SUCCESS]: getPersonCandidateIsBannedSuccess,
  [Types.GET_PERSON_CANDIDATE_IS_BANNED_FAILURE]: getPersonCandidateIsBannedFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
