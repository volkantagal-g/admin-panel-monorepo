import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.ANNOUNCEMENTS;

export const getAnnouncementsByTextSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getAnnouncementsByText');
    },
    ({ data }) => data?.announcementBySearchText || [],
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getAnnouncementsByText');
    },
    ({ isPending }) => isPending,
  ),
};
