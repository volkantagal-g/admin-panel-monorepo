import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.FRANCHISE_REQUEST.LIST;

export const franchiseRequestListSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'franchiseRequestList');
    return data;
  },
  getTotal: state => {
    const { total } = getStateObject(state, reducerKey, 'franchiseRequestList');
    return total;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'franchiseRequestList');
    return isPending;
  },
};

export const franchiseRequestListColumnsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchiseRequestListColumns');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchiseRequestListColumns');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const franchiseRequestEnumsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchiseRequestEnums');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchiseRequestEnums');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
