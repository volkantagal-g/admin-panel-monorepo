import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_FEEDBACK.LIST}_`;

export const { Types, Creators } = createActions({
  filterCourierFeedbackRequest: { filterOptions: {}, language: null, pageNumber: null, limit: null },
  filterCourierFeedbackSuccess: { data: {} },
  filterCourierFeedbackFailure: { error: null },
  getFeedbackOptionsRequest: { feedbackType: null },
  getFeedbackOptionsSuccess: { data: {} },
  getFeedbackOptionsFailure: { error: null },
  getFeedbackChartDataRequest: { filterOptions: {}, language: null },
  getFeedbackChartDataSuccess: { data: [] },
  getFeedbackChartDataFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
