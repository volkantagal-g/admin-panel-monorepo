import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getVehicleConstraintListRequest: {
    statuses: undefined,
    types: undefined,
    limit: 10,
    offset: 0,
  },
  getVehicleConstraintListSuccess: {
    data: {
      vehicleConstraints: [],
      totalCount: 0,
    },
  },
  getVehicleConstraintListFailure: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.VEHICLE_CONSTRAINT.LIST}_` });
