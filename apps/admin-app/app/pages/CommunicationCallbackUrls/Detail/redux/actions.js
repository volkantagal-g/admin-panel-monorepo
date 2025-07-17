import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  communicationCallbackUrlsGetRequest: { communicationCallbackUrlsId: null, serviceType: null },
  communicationCallbackUrlsGetSuccess: { data: {} },
  communicationCallbackUrlsGetFailure: { error: null },

  communicationCallbackUrlsUpdateRequest: { id: null, body: {}, serviceType: null },
  communicationCallbackUrlsUpdateSuccess: { data: [] },
  communicationCallbackUrlsUpdateFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_CALLBACK_URLS.DETAIL}_` });
