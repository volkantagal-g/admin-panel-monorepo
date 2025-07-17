import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.GL_RETURN.DETAIL}_`;

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getSlotDataRequest: { data: null },
  getSlotDataSuccess: { data: [] },
  getSlotDataFailure: { error: null },
  getUpdatedCourierPlanRequest: { warehouseId: null },
  getUpdatedCourierPlanSuccess: { data: [] },
  getUpdatedCourierPlanFailure: { error: null },
  getCourierReassignDataRequest: { id: null, warehouseId: null },
  getCourierReassignDataSuccess: { data: [] },
  getCourierReassignDataFailure: { error: null },
  setVehicleType: { vehicleType: '' },
  setMappedResults: { data: [] },
  setSelectedDate: { startDate: null, endDate: null },
}, { prefix });
