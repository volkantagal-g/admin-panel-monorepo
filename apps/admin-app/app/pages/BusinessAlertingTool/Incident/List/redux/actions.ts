import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.LIST}_`;

export const { Types, Creators } = createActions({
  getAlertConditionsRequest: { },
  getAlertConditionsSuccess: { data: [], total: 0 },
  getAlertConditionsFailure: { error: null },

  filterIncidentsRequest: { filters: {} },
  filterIncidentsSuccess: { data: [], total: 0 },
  filterIncidentsFailure: { error: null },

  setFilterStatuses: { statuses: undefined },
  setFilterPriority: { priority: undefined },
  setFilterAlertCondition: { alertCondition: undefined },
  setFilterCreatedAtRange: { createdAtRange: [] },
  setFilterSortDirection: { sortDirection: undefined },
  resetFilters: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
