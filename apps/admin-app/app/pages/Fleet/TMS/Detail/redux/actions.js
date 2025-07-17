import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TMS.DETAIL}_`;

export const { Types, Creators } = createActions({
  getTmsVehicleRequest: { vehicleId: '' },
  getTmsVehicleSuccess: { data: {} },
  getTmsVehicleFailure: { error: null },
  updateTmsVehicleRequest: { vehicleId: '', formValues: {} },
  updateTmsVehicleSuccess: { data: {} },
  updateTmsVehicleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
