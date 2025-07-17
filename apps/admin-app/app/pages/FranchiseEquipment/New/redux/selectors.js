import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_EQUIPMENT.NEW;

export const createFranchiseEquipmentSelector = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'createFranchiseEquipment');
    return isPending;
  },
};