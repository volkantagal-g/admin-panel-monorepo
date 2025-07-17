import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSFER_GROUP.DETAIL;

export const getTransferGroupByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroupById');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroupById');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const updateTransferGroupSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateTransferGroup');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateTransferGroup');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const inactivateTransferGroupSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'inactivateTransferGroup');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'inactivateTransferGroup');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const productTransferGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'productTransferGroups');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'productTransferGroups');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const warehouseTransferGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseTransferGroups');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseTransferGroups');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
