import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createFranchiseEquipmentRequest: {
    franchiseId: undefined,
    warehouseId: undefined,
    carCount: undefined,
    motoCount: undefined,
    openDate: undefined,
  },
  createFranchiseEquipmentSuccess: null,
  createFranchiseEquipmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_EQUIPMENT.NEW}_` });
