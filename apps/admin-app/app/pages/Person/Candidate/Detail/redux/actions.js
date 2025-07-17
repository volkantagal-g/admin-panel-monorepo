import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSON_CANDIDATE.DETAIL}_`;

export const { Types, Creators } = createActions({
  getPersonCandidateFormRequest: { formType: null, formName: null },
  getPersonCandidateFormSuccess: { data: null },
  getPersonCandidateFormFailure: { error: null },
  getPersonCandidateFormInitialValueRequest: { id: null },
  getPersonCandidateFormInitialValueSuccess: { data: null },
  getPersonCandidateFormInitialValueFailure: { error: null },
  enablePersonCandidateManualOperation: {},
  submitPersonCandidateFormRequest: { id: null, data: null, formType: null, formName: null },
  submitPersonCandidateFormSuccess: { data: null },
  submitPersonCandidateFormFailure: { error: null },
  getPersonCandidateIsBannedRequest: { uniqueIdentifier: null },
  getPersonCandidateIsBannedSuccess: { isBanned: null },
  getPersonCandidateIsBannedFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
