import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.LIST;

export const getSaaData = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.saaData.data?.serviceAvailabilityAreas || [],
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.saaData.isPending,
  ),
};

export const getShowWarehouses = createSelector(
  state => state[reducerKey],
  state => state.showWarehouses,
);

export const domainTypeSelector = createSelector(
  state => state[reducerKey],
  state => state.domainType,
);

export const getShowAutoCreatedSaas = createSelector(
  state => state[reducerKey],
  state => state.showAutoCreatedSaas,
);
