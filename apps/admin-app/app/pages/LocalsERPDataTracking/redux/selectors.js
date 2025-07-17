import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_ERP_DATA_TRACKING;

export const getActiveTab = state => state?.[reducerKey]?.activeTab;

export const LocalsERPDataTrackingSummarySelector = {
  getData: state => state?.[reducerKey]?.LocalsERPDataTrackingSummary?.data,
  getIsPending: state => state?.[reducerKey]?.LocalsERPDataTrackingSummary.isPending,
};

export const LocalsERPDataTrackingSummaryExcelExportSelector =
{ getIsPending: state => state?.[reducerKey]?.LocalsERPDataTrackingSummaryExcelExport.isPending };

export const LocalsERPDataTrackingFailedSelector = {
  getData: state => {
    return {
      sapDashboardFailedItems: state?.[reducerKey]?.LocalsERPDataTrackingFailed?.data?.sapDashboardFailedItems || [],
      total: state?.[reducerKey]?.LocalsERPDataTrackingFailed?.data?.total || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.LocalsERPDataTrackingFailed.isPending,
  getFailedFilters: state => state?.[reducerKey]?.failedFilters,
};

export const LocalsERPDataTrackingSuccessSelector = {
  getData: state => {
    return {
      sapDashboardSuccessItems: state?.[reducerKey]?.LocalsERPDataTrackingSuccess?.data?.sapDashboardSuccessItem || [],
      total: state?.[reducerKey]?.LocalsERPDataTrackingSuccess?.data?.total || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.LocalsERPDataTrackingSuccess.isPending,
  getSuccessFilters: state => state?.[reducerKey]?.successFilters,
};
