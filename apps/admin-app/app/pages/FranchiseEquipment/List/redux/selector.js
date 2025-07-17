import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.FRANCHISE_EQUIPMENT.LIST;

export const franchiseEquipmentListSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'franchiseEquipmentList');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'franchiseEquipmentList');
    return isPending;
  },
};
