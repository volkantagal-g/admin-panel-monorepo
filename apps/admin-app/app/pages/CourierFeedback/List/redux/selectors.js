import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_FEEDBACK.LIST;

export const courierFeedbackSelector = {
  getIsPending: state => state[reduxKey]?.filterCourierFeedback?.isPending,
  getData: state => state[reduxKey]?.filterCourierFeedback?.data,
};

export const courierFeedbackOptionsSelector = {
  getIsPending: state => state[reduxKey]?.feedbackOptions?.isPending,
  getData: state => state[reduxKey]?.feedbackOptions?.data,
};

export const courierFeedbackChartDataSelector = {
  getIsPending: state => state[reduxKey]?.feedbackChartData?.isPending,
  getData: state => state[reduxKey]?.feedbackChartData?.data,
};
