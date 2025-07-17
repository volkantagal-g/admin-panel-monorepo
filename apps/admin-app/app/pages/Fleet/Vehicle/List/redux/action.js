import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getVehicleList: {
    warehouseIds: [],
    franchiseIds: [],
    cities: [],
    tag: '',
    statuses: null,
    plate: '',
    vehicleConstraintId: '',
    currentPage: 1,
    rowsPerPage: 10,
    withTotalCount: undefined,
  },
  getVehicleListSuccess: { data: [] },
  getVehicleListFailure: { error: null },
  getVehicleTypeList: {
    statuses: undefined,
    types: undefined,
  },
  getVehicleTypeListSuccess: { data: [] },
  getVehicleTypeListFailure: { error: null },
  bulkVehicleUpdateCreateRequest: { callType: null, vehicles: [] },
  bulkVehicleUpdateCreateSuccess: { data: [] },
  bulkVehicleUpdateCreateFailure: { error: null },
  updateCsvWarningModalVisibility: { showCsvWarningModal: false },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.VEHICLE.LIST}_` });
