import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  communicationCallbackUrlsSaveRequest: { body: {}, serviceType: null },
  communicationCallbackUrlsSaveSuccess: { data: [] },
  communicationCallbackUrlsSaveFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_CALLBACK_URLS.NEW}_` });
