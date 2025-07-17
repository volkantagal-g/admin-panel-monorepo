import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getVehicleConstraintRequest: { vehicleConstraintId: undefined },
  getVehicleConstraintSuccess: { data: {} },
  getVehicleConstraintFailure: {},
  updateVehicleConstraintRequest: {
    name: undefined,
    vehicleType: undefined,
    constraints: undefined,
    vehicleConstraintId: undefined,
  },
  updateVehicleConstraintSuccess: null,
  updateVehicleConstraintFailure: {},
  changeVehicleConstraintActivenessRequest: { id: null, newActivenessStatus: null },
  changeVehicleConstraintActivenessSuccess: {},
  changeVehicleConstraintActivenessFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.VEHICLE_CONSTRAINT.DETAIL}_` });
