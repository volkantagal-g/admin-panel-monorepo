import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMMUNICATION_HISTORY;

export const filtersSelector = { getFilters: state => state?.[reducerKey]?.filters };

export const resultsSelector = {
  getResults: state => state?.[reducerKey]?.results?.data,
  isPending: state => state?.[reducerKey]?.results?.isPending,
};

export const signedUrlSelector = {
  getSignedUrl: state => state?.[reducerKey]?.signedUrl?.data?.signedUrl,
  isPending: state => state?.[reducerKey]?.signedUrl?.isPending,
};

export const signedUrlHtmlSelector = {
  getSignedUrlHtml: state => state?.[reducerKey]?.signedUrlHtml?.data?.body,
  isPending: state => state?.[reducerKey]?.signedUrlHtml?.isPending,
};

export const notificationReportConfigsSelector = {
  getConfigs: state => state?.[reducerKey]?.notificationReportConfigs?.data,
  isPending: state => state?.[reducerKey]?.notificationReportConfigs?.isPending,
};

export const getVisibilitySelector = { getData: state => state?.[reducerKey]?.visibility?.data };
