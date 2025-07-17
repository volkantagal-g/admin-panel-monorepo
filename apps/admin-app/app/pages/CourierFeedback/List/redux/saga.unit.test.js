import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getFeedbackOptions,
  watchGetFeedbackOptionsRequest,
  getFeedbackChartData,
  watchGetFeedbackChartDataRequest,
  filterCourierFeedback,
  watchFilterCourierFeedbackRequest,
} from '@app/pages/CourierFeedback/List/redux/saga';
import {
  getFeedbackOptions as getFeedbackOptionsApi,
  getFeedbackChartData as getFeedbackChartDataApi,
  filterFeedbacks as filterFeedbacksApi,
} from '@shared/api/courier';
import { Creators, Types } from '@app/pages/CourierFeedback/List/redux/actions';
import { courierFeedbacksMockChartData, courierFeedbacksMockTableData } from '@shared/api/courier/index.mock.data';

describe('CourierFeedback/List', () => {
  describe('saga #getFeedbackOptions', () => {
    const params = { feedbackType: 1 };
    const response = {
      feedbackOptions: [
        {
          name: {
            tr: 'Depo ile ilgilli sorun yaşıyorum',
            en: "I'm having problems at the warehouse",
            es: 'Estoy teniendo problemas con el almacén',
            pt: 'Estou a ter problemas com o armazém',
            it: 'Sto riscontrando problemi nel magazzino',
            nl: 'Ik ondervind problemen in het magazijn',
            fr: 'J’ai des problèmes à l’entrepôt',
            de: 'Ich habe Probleme im Lager',
            'en-US': "I'm having problems at the warehouse",
          },
          domainTypes: [],
          countries: [],
          position: 0,
          _id: '6385fc0534db260476d5bf4b',
          feedbackType: 1,
        },
      ],
    };
    it('should call the getFeedbackOptionsApi (success)', () => {
      testSaga(getFeedbackOptions, params)
        .next()
        .call(getFeedbackOptionsApi, params)
        .next(response)
        .put(Creators.getFeedbackOptionsSuccess({ data: response.feedbackOptions }))
        .next()
        .isDone();
    });

    it('should call the getFeedbackOptionsApi (failure)', () => {
      const fakeError = new Error('fake error');
      testSaga(getFeedbackOptions, params)
        .next()
        .call(getFeedbackOptionsApi, params)
        .next(response)
        .throw(fakeError)
        .put(Creators.getFeedbackOptionsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getFeedbackChartData', () => {
    const params = { filterOptions: {}, language: 'en' };
    it('should call the getFeedbackChartDataApi (success)', () => {
      testSaga(getFeedbackChartData, params)
        .next()
        .call(getFeedbackChartDataApi, params)
        .next(courierFeedbacksMockChartData)
        .put(Creators.getFeedbackChartDataSuccess({ data: courierFeedbacksMockChartData.feedbackOptions }))
        .next()
        .isDone();
    });

    it('should call the getFeedbackChartDataApi (failure)', () => {
      const fakeError = new Error('fake error');
      testSaga(getFeedbackChartData, params)
        .next()
        .call(getFeedbackChartDataApi, params)
        .next(courierFeedbacksMockChartData)
        .throw(fakeError)
        .put(Creators.getFeedbackChartDataFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #filterCourierFeedback', () => {
    const params = { filterOptions: {}, language: 'en', pageNumber: 1, limit: 10 };
    it('should call the filterCourierFeedbackApi (success)', () => {
      testSaga(filterCourierFeedback, params)
        .next()
        .call(filterFeedbacksApi, params)
        .next(courierFeedbacksMockTableData)
        .put(Creators.filterCourierFeedbackSuccess({ data: courierFeedbacksMockTableData }))
        .next()
        .isDone();
    });

    it('should call the filterCourierFeedbackApi (failure)', () => {
      const fakeError = new Error('fake error');
      testSaga(filterCourierFeedback, params)
        .next()
        .call(filterFeedbacksApi, params)
        .next(courierFeedbacksMockTableData)
        .throw(fakeError)
        .put(Creators.filterCourierFeedbackFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetFeedbackOptionsRequest', () => {
    it('should call the getFeedbackOptions', () => {
      testSaga(watchGetFeedbackOptionsRequest)
        .next()
        .takeLatest(Types.GET_FEEDBACK_OPTIONS_REQUEST, getFeedbackOptions)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetFeedbackChartDataRequest', () => {
    it('should call the getFeedbackChartData', () => {
      testSaga(watchGetFeedbackChartDataRequest)
        .next()
        .takeLatest(Types.GET_FEEDBACK_CHART_DATA_REQUEST, getFeedbackChartData)
        .next()
        .isDone();
    });
  });

  describe('saga #watchFilterCourierFeedbackRequest', () => {
    it('should call the filterCourierFeedback', () => {
      testSaga(watchFilterCourierFeedbackRequest)
        .next()
        .takeLatest(Types.FILTER_COURIER_FEEDBACK_REQUEST, filterCourierFeedback)
        .next()
        .isDone();
    });
  });
});
