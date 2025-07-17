import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_EQUIPMENT.LIST}_`;

export const { Types, Creators } = createActions({
  getFranchiseEquipmentListRequest: {
    selectedWarehouses: undefined,
    selectedFranchises: undefined,
    isArchived: undefined,
  },
  getFranchiseEquipmentListSuccess: { data: null },
  getFranchiseEquipmentListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
