import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getVehicleList: {
    plate: '',
    dincerId: '',
    palletCapacity: 0,
    volumeCapacity: 0,
    activeness: null,
    vehicleType: '',
    vehicleClass: '',
    currentPage: 1,
    rowsPerPage: 10,
  },
  getVehicleListSuccess: { data: [] },
  getVehicleListFailure: { error: null },
  deleteVehicle: { id: '' },
  deleteVehicleSuccess: { data: [] },
  deleteVehicleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TMS.LIST}_` });
