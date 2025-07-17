import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseEquipmentDetailRequest: { id: null },
  getFranchiseEquipmentDetailSuccess: { data: {} },
  getFranchiseEquipmentDetailFailure: { error: null },
  updateFranchiseEquipmentRequest: {
    id: undefined,
    data: undefined,
    openDate: undefined,
  },
  updateFranchiseEquipmentFailure: { error: null },
  getFranchiseEquipmentLogsRequest: { id: null, limit: null, offset: null },
  getFranchiseEquipmentLogsSuccess: { data: [], totalCount: 0 },
  getFranchiseEquipmentLogsFailure: { error: null },
  updateFranchiseEquipmentVehicleCountRequest: {
    id: undefined,
    data: undefined,
  },
  updateFranchiseEquipmentVehicleCountFailure: { error: null },
  archiveFranchiseEquipmentRequest: { id: null },
  archiveFranchiseEquipmentSuccess: {},
  archiveFranchiseEquipmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_EQUIPMENT.DETAIL}_` });
