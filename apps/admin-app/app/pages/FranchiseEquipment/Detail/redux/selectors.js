import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_EQUIPMENT.DETAIL;

export const franchiseEquipmentDetailSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'franchiseEquipmentDetail');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'franchiseEquipmentDetail');
    return isPending;
  },
};

export const franchiseEquipmentLogsSelector = {
  getData: state => {
    const { data = [] } = getStateObject(state, reducerKey, 'franchiseEquipmentLogs');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'franchiseEquipmentLogs');
    return isPending;
  },
  getTotal: state => {
    const { totalCount } = getStateObject(state, reducerKey, 'franchiseEquipmentLogs');
    return totalCount;
  },
};
