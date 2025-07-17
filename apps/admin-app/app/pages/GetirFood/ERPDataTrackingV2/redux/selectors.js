import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.ERP_DATA_TRACKING_V2;

export const getActiveTab = state => state?.[reducerKey]?.activeTab;

export const ERPDataTrackingSummarySelector = {
  getData: state => state?.[reducerKey]?.ERPDataTrackingSummary?.data,
  getIsPending: state => state?.[reducerKey]?.ERPDataTrackingSummary.isPending,
};

export const ERPDataTrackingSummaryExcelExportSelector = { getIsPending: state => state?.[reducerKey]?.ERPDataTrackingSummaryExcelExport.isPending };

export const ERPDataTrackingFailedSelector = {
  getData: state => {
    return {
      sapDashboardFailedItems: state?.[reducerKey]?.ERPDataTrackingFailed?.data?.sapDashboardFailedItems || [],
      total: state?.[reducerKey]?.ERPDataTrackingFailed?.data?.total || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.ERPDataTrackingFailed.isPending,
  getFailedFilters: state => state?.[reducerKey]?.failedFilters,
};

export const ERPDataTrackingSuccessfulSelector = {
  getData: state => {
    return {
      sapDashboardSuccessItems: state?.[reducerKey]?.ERPDataTrackingSuccessful?.data?.sapDashboardSuccessItem || [],
      total: state?.[reducerKey]?.ERPDataTrackingSuccessful?.data?.total || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.ERPDataTrackingSuccessful.isPending,
  getSuccessfulFilters: state => state?.[reducerKey]?.successfulFilters,
};
