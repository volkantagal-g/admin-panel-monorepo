import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT_MODULES.EQUIPMENT_INFORMATION}_`;

export const { Types, Creators } = createActions({
  filterEquipmentInformationRequest: { assetIds: null },
  filterEquipmentInformationSuccess: { data: null },
  filterEquipmentInformationFailure: { error: null },

  editEquipmentInformationRequest: { equipmentInformationId: null, updateData: null, onSuccess: null },
  editEquipmentInformationSuccess: {},
  editEquipmentInformationFailure: { error: null },

  createEquipmentInformationRequest: { assetId: null, data: null, onSuccess: null },
  createEquipmentInformationSuccess: {},
  createEquipmentInformationFailure: { error: null },

  initContainer: null,
  destroyContainer: null,
}, { prefix });
