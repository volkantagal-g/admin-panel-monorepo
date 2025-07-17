import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIVEAWAY_EVENT.LIST;

export const getGiveawayEventsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGiveawayEvents');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGiveawayEvents');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
export const deliverGiveawayEventRequest = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deliverGiveawayEvent');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
export const getDrawDiscountCodeSuccess = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getDrawDiscountCode');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
