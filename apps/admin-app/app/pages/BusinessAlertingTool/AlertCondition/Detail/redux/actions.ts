import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.DETAIL}_`;

export const { Types, Creators } = createActions({
  getAlertConditionDetailRequest: { conditionId: null },
  getAlertConditionDetailSuccess: { data: {} },
  getAlertConditionDetailFailure: { error: null },

  activateAlertConditionRequest: { conditionId: null },
  activateAlertConditionSuccess: { success: null },
  activateAlertConditionFailure: { error: null },

  deactivateAlertConditionRequest: { conditionId: null },
  deactivateAlertConditionSuccess: { success: null },
  deactivateAlertConditionFailure: { error: null },

  updateAlertConditionMetadataRequest: { conditionId: null, name: {}, description: {} },
  updateAlertConditionMetadataSuccess: {},
  updateAlertConditionMetadataFailure: {},

  updateAlertConditionPermittedRolesRequest: { conditionId: null, permittedRoles: null },
  updateAlertConditionPermittedRolesSuccess: {},
  updateAlertConditionPermittedRolesFailure: {},

  updateAlertConditionNotificationPreferencesRequest: { conditionId: null, notificationPreferences: null },
  updateAlertConditionNotificationPreferencesSuccess: {},
  updateAlertConditionNotificationPreferencesFailure: {},

  updateAlertConditionQueryRequest: { conditionId: null, queryInfo: null, conditions: null },
  updateAlertConditionQuerySuccess: {},
  updateAlertConditionQueryFailure: {},

  getOperationHoursByDomainTypeRequest: { domainType: null },
  getOperationHoursByDomainTypeSuccess: { data: {} },
  getOperationHoursByDomainTypeFailure: { error: null },
  selectedWorkingHoursType: { data: {} },
  setTempDefinedHours: { data: {} },

  initPage: null,
  destroyPage: null,
}, { prefix });
