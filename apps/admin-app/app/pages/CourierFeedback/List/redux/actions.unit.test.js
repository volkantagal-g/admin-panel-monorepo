import { Creators, Types } from '@app/pages/CourierFeedback/List/redux/actions';

describe('CourierFeedback/List', () => {
  describe('action-creator #getFeedbackOptionsRequest', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackOptionsRequest({});
      const expectedAction = { type: Types.GET_FEEDBACK_OPTIONS_REQUEST, feedbackType: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFeedbackOptionsSuccess', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackOptionsSuccess({});
      const expectedAction = { type: Types.GET_FEEDBACK_OPTIONS_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFeedbackOptionsFailure', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackOptionsFailure({});
      const expectedAction = { type: Types.GET_FEEDBACK_OPTIONS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFeedbackChartDataRequest', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackChartDataRequest({});
      const expectedAction = { type: Types.GET_FEEDBACK_CHART_DATA_REQUEST, filterOptions: {}, language: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFeedbackChartDataSuccess', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackChartDataSuccess({});
      const expectedAction = { type: Types.GET_FEEDBACK_CHART_DATA_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFeedbackChartDataFailure', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.getFeedbackChartDataFailure({});
      const expectedAction = { type: Types.GET_FEEDBACK_CHART_DATA_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterCourierFeedbackRequest', () => {
    it('receivedAction should equal to expectedAction (withoutArgss)', () => {
      const receivedAction = Creators.filterCourierFeedbackRequest({});
      const expectedAction = {
        type: Types.FILTER_COURIER_FEEDBACK_REQUEST,
        filterOptions: {},
        language: null,
        pageNumber: null,
        limit: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterCourierFeedbackSuccess', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.filterCourierFeedbackSuccess({});
      const expectedAction = { type: Types.FILTER_COURIER_FEEDBACK_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterCourierFeedbackFailure', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.filterCourierFeedbackFailure({});
      const expectedAction = { type: Types.FILTER_COURIER_FEEDBACK_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
