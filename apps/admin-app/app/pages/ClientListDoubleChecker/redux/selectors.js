import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CLIENT_LIST_DOUBLE_CHECKER;

export const uploadSelector = {
  uploadIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'response');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const fieldSelectors = {
  getCsvData: createSelector(
    state => state[reducerKey],
    pageState => pageState.csvData,
  ),
  getCsvFileName: createSelector(
    state => state[reducerKey],
    pageState => pageState.csvFileName,
  ),
  getClientListName: createSelector(
    state => state[reducerKey],
    pageState => pageState.clientListName,
  ),
  getIsEmailAllowed: createSelector(
    state => state[reducerKey],
    pageState => pageState.isEmailAllowed,
  ),
  getIsSMSAllowed: createSelector(
    state => state[reducerKey],
    pageState => pageState.isSMSAllowed,
  ),
  getIsNotifAllowed: createSelector(
    state => state[reducerKey],
    pageState => pageState.isNotifAllowed,
  ),
};
