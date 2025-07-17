import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createVehicleConstraintRequest: {
    name: undefined,
    vehicleType: undefined,
    constraints: undefined,
  },
  createVehicleConstraintSuccess: {},
  createVehicleConstraintFailure: {},
  getVehicleConstraintsRequest: {},
  getVehicleConstraintsSuccess: { data: [] },
  getVehicleConstraintsFailure: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.VEHICLE_CONSTRAINT.NEW}_` });
