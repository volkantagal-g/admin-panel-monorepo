import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.DETAIL}_`;

export const { Types, Creators } = createActions({
  getServiceByIdRequest: { teamId: null, serviceId: null },
  getServiceByIdSuccess: { data: null },
  getServiceByIdFailure: { error: null },
  updateServiceRequest: { service: null },
  updateServiceSuccess: { data: null },
  updateServiceFailure: { error: null },
  deleteServiceRequest: { teamId: null, serviceId: null, onSuccess: null },
  deleteServiceSuccess: { data: null },
  deleteServiceFailure: { error: null },
  getSlackConfigurationsRequest: { teamId: null, serviceId: null },
  getSlackConfigurationsSuccess: { data: null },
  getSlackConfigurationsFailure: { error: null },
  updateSlackConfigurationsRequest: { teamId: null, serviceId: null, workspaceChannelNamePairs: null, workspaceDMConfigPairs: null, successCallback: null },
  updateSlackConfigurationsSuccess: { data: null },
  updateSlackConfigurationsFailure: { error: null },
  generateSlackTokenRequest: { teamId: null, serviceId: null, failureCallback: null },
  generateSlackTokenSuccess: { data: null },
  generateSlackTokenFailure: { error: null },
  testSlackMessage: { teamId: null, serviceId: null, workspaceName: null, channelName: null, dm: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
