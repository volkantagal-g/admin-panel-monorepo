import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';
import { mapActionHistoryLogs } from '../utils';

const reducerKey = REDUX_KEY.PERSON_CANDIDATE.LIST;

export const personCandidateListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateList');
    },
    ({ data }) => {
      return data;
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateList');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateList');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const updateAssigneeSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateAssignee');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const personCandidateActionHistorySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateActionHistory');
    },
    ({ data, candidate }) => {
      return mapActionHistoryLogs({ logs: data, candidate });
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateActionHistory');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'personCandidateActionHistory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};