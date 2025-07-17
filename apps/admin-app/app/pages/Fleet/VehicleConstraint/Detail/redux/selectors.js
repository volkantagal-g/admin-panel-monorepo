import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.VEHICLE_CONSTRAINT.DETAIL;

export const getVehicleConstraintSelector = {
  getIsPending: state => state[reduxKey]?.getVehicleConstraint?.isPending,
  getData: state => state[reduxKey]?.getVehicleConstraint?.data,
};

export const updateVehicleConstraintSelector = { getIsPending: state => state[reduxKey]?.updateVehicleConstraint?.isPending };

export const changeVehicleConstraintActivenessSelector = { getIsPending: state => state[reduxKey]?.changeVehicleConstraintActiveness?.isPending };
