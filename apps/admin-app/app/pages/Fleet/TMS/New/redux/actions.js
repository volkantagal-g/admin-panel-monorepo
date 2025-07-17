import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TMS.NEW}_`;

export const { Types, Creators } = createActions({
  createTmsVehicleRequest: {
    formValues: {
      plate: '',
      vehicleClass: '',
      type: '',
      brand: '',
      modelYear: '',
      active: true,
      volumeCapacity: 0,
      palletCapacity: 0,
      dincerId: '',
      vehicleDocuments: [],
    },
  },
  createTmsVehicleSuccess: { data: {} },
  createTmsVehicleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
