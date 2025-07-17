import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { vehicleConstraintsFormatter } from '../../utils';

const reducerKey = REDUX_KEY.VEHICLE_CONSTRAINT.NEW;

export const createVehicleConstraintSelector = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'createVehicleConstraint');
    return isPending;
  },
};

export const getVehicleConstraintsSelector = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'getVehicleConstraints');
    return isPending;
  },
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'getVehicleConstraints');
    return vehicleConstraintsFormatter({ data });
  },
};
