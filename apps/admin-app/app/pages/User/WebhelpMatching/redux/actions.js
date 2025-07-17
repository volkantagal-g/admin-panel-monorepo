import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getUsersRequest: {
    searchTerm: null,
    webhelpId: null,
    limit: 10,
    offset: 0,
  },
  getUsersSuccess: { data: [] },
  getUsersFailure: { error: null },
  updateUsersWebhelpIdRequest: { updateData: [] },
  updateUsersWebhelpIdSuccess: {},
  updateUsersWebhelpIdFailure: { error: null },
  removeWebhelpIdFromUserRequest: { id: null },
  removeWebhelpIdFromUserSuccess: {},
  removeWebhelpIdFromUserFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.USER.WEBHELP_MATCHING}_` });
