import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.GL_RETURN.ALERT}_`;

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getAlertDataRequest: { data: null },
  getAlertDataSuccess: { data: [] },
  getAlertDataFailure: { error: null },
  getAlertResolveDataRequest: { id: null },
  getAlertResolveDataSuccess: { data: [] },
  getAlertResolveDataFailure: { error: null },
  setCity: { city: '' },
  setAlertType: { alertMessage: '' },
  setWarehouse: { warehouse: '' },
  setMappedResults: { data: [] },
  setSelectedDate: { startDate: null, endDate: null },
}, { prefix });
