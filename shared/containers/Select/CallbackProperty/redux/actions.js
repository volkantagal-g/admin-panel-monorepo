import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCallbackPropertiesRequest: { callbackType: null, serviceType: null, filters: null },
  getCallbackPropertiesSuccess: { data: {}, callbackType: null },
  getCallbackPropertiesFailure: { error: null, callbackType: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.CALLBACK_PROPERTY}_` });
