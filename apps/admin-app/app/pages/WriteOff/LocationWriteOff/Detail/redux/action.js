import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getLocationWriteOffRequest: { locationWriteOffId: null },
  getLocationWriteOffSuccess: { data: {} },
  getLocationWriteOffFailure: { error: null },
  approveLocationWriteOffRequest: { locationWriteOffId: null },
  cancelLocationWriteOffRequest: { locationWriteOffId: null },

}, { prefix: `${REDUX_KEY.LOCATION_WRITE_OFF.DETAIL}_` });
