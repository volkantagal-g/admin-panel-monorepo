import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PUSH_NOTIFICATION.LIST;

// TODO: Remove getStateObject and use getState directly
export const resultsSelector = {
  getResults: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'results');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'results');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const filtersSelector = {
  getFilters: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    filters => {
      return filters;
    },
  ),
};

export const globalRulesetSelector = {
  getFilters: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'globalRuleset');
    },
    filters => {
      return filters;
    },
  ),
};

export const PushNotificationRootSelector = {
  getCities: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'cities');
    },
    cities => {
      return cities;
    },
  ),
  getPaymentMethods: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'paymentMethods');
    },
    paymentMethods => {
      return paymentMethods;
    },
  ),
};

export const downloadListModalSelector = {
  getModal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'downloadListModal');
    },
    downloadListModal => {
      return downloadListModal;
    },
  ),
};

export const notificationIconSelector = {
  getIconManagementPending: state => state?.[reducerKey]?.iconManagement?.isPending,
  getIconList: state => state?.[reducerKey]?.iconManagement?.list?.data,
  getDefaultIconUrl: state => state?.[reducerKey]?.iconManagement?.defaultIconUrl,
  getIsIconListPending: state => state?.[reducerKey]?.iconManagement?.list?.isPending,
  getIsIconManagementPending: state => state?.[reducerKey]?.iconManagement?.isPending,
};
