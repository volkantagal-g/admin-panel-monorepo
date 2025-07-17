import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT_MODULES.DAMAGE_RECORD}_`;

export const { Types, Creators } = createActions({
  filterVehicleDamageRequest: { assetId: null },
  filterVehicleDamageSuccess: { vehicleDamage: null },
  filterVehicleDamageFailure: { error: null },

  createVehicleDamageRequest: { vehicleDamageRecord: null, onSuccess: null },
  createVehicleDamageSuccess: { vehicleDamageRecord: null },
  createVehicleDamageFailure: { error: null },

  updateVehicleDamageRequest: { vehicleDamageRecordId: null, updateData: null, onSuccess: null },
  updateVehicleDamageSuccess: { vehicleDamageRecord: null },
  updateVehicleDamageFailure: { error: null },

  deleteVehicleDamageRequest: { vehicleDamageRecordId: null, onSuccess: null },
  deleteVehicleDamageSuccess: { vehicleDamageRecord: null },
  deleteVehicleDamageFailure: { error: null },

  initContainer: null,
  destroyContainer: null,
}, { prefix });
