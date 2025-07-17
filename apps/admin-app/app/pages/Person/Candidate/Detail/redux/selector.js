import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.PERSON_CANDIDATE.DETAIL;

export const personCandidateDetailSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidateForm'),
    ({ data }) => data || []
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidateForm'),
    ({ isPending }) => isPending
  ),
  getInitialValues: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidateFormInitialValues'),
    ({ data }) => data
  ),
  getInitialValueIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidateFormInitialValues'),
    ({ isPending }) => isPending
  ),
  getIsBanned: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidate'),
    ({ isBanned }) => isBanned || false
  ),
  getIsBannedPending: createSelector(
    state => getStateObject(state, reducerKey, 'personCandidate'),
    ({ isPending }) => isPending
  ),
};
