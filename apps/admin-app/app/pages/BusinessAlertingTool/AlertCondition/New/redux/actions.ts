import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.NEW}_`;

export const { Types, Creators } = createActions({
  createAlertConditionRequest: { alertCondition: {} },
  createAlertConditionSuccess: { data: {} },
  createAlertConditionFailure: { error: null },
  getOperationHoursByDomainTypeRequest: { domainType: null },
  getOperationHoursByDomainTypeSuccess: { data: {} },
  getOperationHoursByDomainTypeFailure: { error: null },
  selectedWorkingHoursType: { data: {} },
  setTempDefinedHours: { data: {} },
  initPage: null,
  destroyPage: null,
}, { prefix });
