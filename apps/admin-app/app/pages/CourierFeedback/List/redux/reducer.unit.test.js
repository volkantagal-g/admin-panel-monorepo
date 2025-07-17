import reducer, { INITIAL_STATE } from '@app/pages/CourierFeedback/List/redux/reducer';
import { Types } from '@app/pages/CourierFeedback/List/redux/actions';
import { courierFeedbacksMockChartData } from '@shared/api/courier/index.mock.data';

describe('CourierFeedback/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_FEEDBACK_OPTIONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_OPTIONS_REQUEST },
      );
      const expectedState = { feedbackOptions: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_FEEDBACK_OPTIONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const response = {
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
      };
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_OPTIONS_SUCCESS, data: response },
      );
      const expectedState = { feedbackOptions: { isPending: false, data: response } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_FEEDBACK_OPTIONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_OPTIONS_FAILURE, error },
      );
      const expectedState = { feedbackOptions: { isPending: false, error } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_FEEDBACK_CHART_DATA_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_CHART_DATA_REQUEST },
      );
      const expectedState = { feedbackChartData: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_FEEDBACK_CHART_DATA_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_CHART_DATA_SUCCESS, data: courierFeedbacksMockChartData },
      );
      const expectedState = { feedbackChartData: { isPending: false, data: courierFeedbacksMockChartData } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_FEEDBACK_CHART_DATA_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.GET_FEEDBACK_CHART_DATA_FAILURE, error },
      );
      const expectedState = { feedbackChartData: { isPending: false, error } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_COURIER_FEEDBACK_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_FEEDBACK_REQUEST },
      );
      const expectedState = { filterCourierFeedback: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_COURIER_FEEDBACK_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeData = {
        result: [
          {
            id: '63bd53f25c42cdf91cb887c5',
            courier: {
              id: '610bede77f24416d73b81865',
              name: 'Esra Artisan',
            },
            warehouse: {
              id: '60929965b29e3a5453ea6b9b',
              name: 'rabia çarşı',
            },
            domainType: '',
            feedbackType: 'Common',
            answers: [
              {
                option: 'Application',
                comment: 'blablabla',
              },
            ],
          },
        ],
        totalCount: 1,
      };
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_FEEDBACK_SUCCESS, data: fakeData },
      );
      const expectedState = { filterCourierFeedback: { isPending: false, data: fakeData } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_COURIER_FEEDBACK_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeError = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_FEEDBACK_FAILURE, error: fakeError },
      );
      const expectedState = { filterCourierFeedback: { isPending: false, error: fakeError } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
