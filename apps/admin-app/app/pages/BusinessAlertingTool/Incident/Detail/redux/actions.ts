import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.DETAIL}_`;

export const { Types, Creators } = createActions({
  getIncidentByIdRequest: { incidentId: null },
  getIncidentByIdSuccess: { data: null, total: 0 },
  getIncidentByIdFailure: { error: null },

  getAlertConditionByIdRequest: { conditionId: null },
  getAlertConditionByIdSuccess: { data: null, total: 0 },
  getAlertConditionByIdFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
