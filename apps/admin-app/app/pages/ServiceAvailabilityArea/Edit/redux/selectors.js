import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.EDIT;

export const getSaaData = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.saaData.data?.serviceAvailabilityArea,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.saaData.isPending,
  ),
};
