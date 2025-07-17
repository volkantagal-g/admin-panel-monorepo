import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { FAILED_INITIAL_FILTERS, SUCCESS_INITIAL_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.GL_ERP_DATA_TRACKING}_`;

export const { Types, Creators } = createActions({
  setActiveTab: { activeTab: null },
  failedFilters: {},
  setFailedFilters: {
    ...FAILED_INITIAL_FILTERS,
    orderTypes: [],
    traceId: undefined,
    orderId: undefined,
  },
  setSuccessFilters: {
    ...SUCCESS_INITIAL_FILTERS,
    orderTypes: [],
    traceId: undefined,
    orderId: undefined,
  },
  getLocalsERPDataTrackingSummaryRequest: {
    startDate: null,
    endDate: null,
  },
  getLocalsERPDataTrackingSummarySuccess: { data: {} },
  getLocalsERPDataTrackingSummaryFailure: { error: null },
  getLocalsERPDataTrackingSummaryExcelExportRequest: {
    startDate: null,
    endDate: null,
  },
  getLocalsERPDataTrackingSummaryExcelExportSuccess: { data: {} },
  getLocalsERPDataTrackingSummaryExcelExportFailure: { error: null },
  getLocalsERPDataTrackingFailedRequest: {
    startDate: null,
    endDate: null,
    orderTypes: [],
    traceId: null,
    orderId: null,
    skip: null,
    limit: null,
  },
  getLocalsERPDataTrackingFailedSuccess: { data: {} },
  getLocalsERPDataTrackingFailedFailure: { error: null },
  getLocalsERPDataTrackingSuccessRequest: {
    startDate: null,
    endDate: null,
    orderTypes: [],
    traceId: null,
    orderId: null,
    skip: null,
    limit: null,
  },
  getLocalsERPDataTrackingSuccessSuccess: { data: {} },
  getLocalsERPDataTrackingSuccessFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
