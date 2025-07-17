import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.LIST}_`;

export const { Types, Creators } = createActions({
  filterAlertConditionsRequest: { filters: {} },
  filterAlertConditionsSuccess: { data: [], total: 0 },
  filterAlertConditionsFailure: { error: null },

  setFilterStatuses: { statuses: undefined },
  setFilterCreatedBy: { createdBy: null },
  setFilterPermittedRoles: { permittedRoles: [] },
  setFilterNotificationChannels: { notificationChannels: [] },
  setFilterCreatedAtRange: { createdAtRange: [] },
  setFilterSearchTerm: { searchTerm: null },
  resetFilters: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
