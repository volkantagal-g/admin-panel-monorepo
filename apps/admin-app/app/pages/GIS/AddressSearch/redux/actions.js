import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  addressSearchRequest: { body: null },
  addressSearchSuccess: { data: [] },
  addressSearchFailure: { error: null },
}, { prefix: `${REDUX_KEY.GIS.ADDRESS_SEARCH}_` });
