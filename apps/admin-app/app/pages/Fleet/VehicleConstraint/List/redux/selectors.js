import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.VEHICLE_CONSTRAINT.LIST;

export const vehicleConstraintListSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'vehicleConstraintList');
    return data?.vehicleConstraints;
  },
  getTotalCount: state => {
    const { data } = getStateObject(state, reducerKey, 'vehicleConstraintList');
    return data?.totalCount;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'vehicleConstraintList');
    return isPending;
  },
};
