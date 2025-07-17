import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { FAILED_INITIAL_FILTERS, SUCCESSFUL_INITIAL_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.FOOD.ERP_DATA_TRACKING_V2}_`;

export const { Types, Creators } = createActions({
  setActiveTab: { activeTab: null },
  failedFilters: {},
  setFailedFilters: {
    ...FAILED_INITIAL_FILTERS,
    orderTypes: [],
    traceId: undefined,
    orderId: undefined,
  },
  setSuccessfulFilters: {
    ...SUCCESSFUL_INITIAL_FILTERS,
    orderTypes: [],
    traceId: undefined,
    orderId: undefined,
  },
  getERPDataTrackingSummaryRequest: {
    startDate: null,
    endDate: null,
  },
  getERPDataTrackingSummarySuccess: { data: {} },
  getERPDataTrackingSummaryFailure: { error: null },
  getERPDataTrackingSummaryExcelExportRequest: {
    startDate: null,
    endDate: null,
  },
  getERPDataTrackingSummaryExcelExportSuccess: { data: {} },
  getERPDataTrackingSummaryExcelExportFailure: { error: null },
  getERPDataTrackingFailedRequest: {
    startDate: null,
    endDate: null,
    orderTypes: [],
    traceId: null,
    orderId: null,
    skip: null,
    limit: null,
  },
  getERPDataTrackingFailedSuccess: { data: {} },
  getERPDataTrackingFailedFailure: { error: null },
  getERPDataTrackingSuccessfulRequest: {
    startDate: null,
    endDate: null,
    orderTypes: [],
    traceId: null,
    orderId: null,
    skip: null,
    limit: null,
  },
  getERPDataTrackingSuccessfulSuccess: { data: {} },
  getERPDataTrackingSuccessfulFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
