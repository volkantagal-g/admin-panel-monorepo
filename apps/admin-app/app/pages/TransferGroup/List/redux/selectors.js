import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { ACTIVE_TRANSFER_GROUP_STATUS, REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSFER_GROUP.LIST;

export const transferGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transferGroups');
    },
    ({ data }) => {
      return data;
    }
  ),
  getActiveGroups: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transferGroups');
    },
    ({ data = [] }) => {
      return data.filter(item => {
        return item.status === ACTIVE_TRANSFER_GROUP_STATUS;
      });
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transferGroups');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transferGroups');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
