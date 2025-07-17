import { sampleGlobalRuleset, samplePopupResults } from '@app/pages/Popup/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Popup/List/redux/reducer';
import { Types } from '@app/pages/Popup/List/redux/actions';
import { popupGlobalRulesetTestConfig } from '@app/pages/Popup/List/redux/actions.unit.test';

describe('Popup/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer SET_TABLE_FILTERS', () => {
    describe('#SET_TABLE_FILTERS', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.SET_TABLE_FILTERS });
        const expectedState = {
          filters: {},
          results: {
            isPending: true,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer GET_RESULTS', () => {
    describe('#GET_RESULTS_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.GET_RESULTS_REQUEST });
        const expectedState = {
          results: {
            isPending: true,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#GET_RESULTS_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_RESULTS_SUCCESS, data: samplePopupResults });
        const expectedState = {
          results: {
            isPending: false,
            data: samplePopupResults,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#GET_RESULTS_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_RESULTS_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          results: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('Gorillas & Getir Global Ruleset', () => {
    popupGlobalRulesetTestConfig.forEach(config => {
      describe(`reducer ${config.setReduxKey}`, () => {
        describe(`#${config.setReduxKey}`, () => {
          it('receivedState should equal to expectedState (without args)', () => {
            const receivedState = reducer({}, { type: Types[config.setReduxKey] });
            const expectedState = {
              [config.storeKey]: {
                isPending: true,
                error: null,
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });

        describe(`#${config.setSuccessReduxKey}`, () => {
          it('receivedState should equal to expectedState', () => {
            const receivedState = reducer({}, { type: Types[config.setSuccessReduxKey], data: sampleGlobalRuleset });
            const expectedState = {
              [config.storeKey]: {
                isPending: false,
                data: sampleGlobalRuleset,
                error: null,
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });

        describe(`#${config.setFailReduxKey}`, () => {
          it('receivedState should equal to expectedState', () => {
            const receivedState = reducer({}, { type: Types[config.setFailReduxKey], error: new Error('404 Not Found') });
            const expectedState = {
              [config.storeKey]: {
                isPending: false,
                error: new Error('404 Not Found'),
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });
      });

      describe(`reducer ${config.getReduxKey}`, () => {
        describe(`#${config.getReduxKey}`, () => {
          it('receivedState should equal to expectedState (without args)', () => {
            const receivedState = reducer({}, { type: Types[config.getReduxKey] });
            const expectedState = {
              [config.storeKey]: {
                isPending: true,
                error: null,
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });

        describe(`#${config.successReduxKey}`, () => {
          it('receivedState should equal to expectedState', () => {
            const receivedState = reducer({}, { type: Types[config.successReduxKey], data: sampleGlobalRuleset });
            const expectedState = {
              [config.storeKey]: {
                isPending: false,
                data: sampleGlobalRuleset,
                error: null,
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });

        describe(`#${config.failReduxKey}`, () => {
          it('receivedState should equal to expectedState', () => {
            const receivedState = reducer({}, { type: Types[config.failReduxKey], error: new Error('404 Not Found') });
            const expectedState = {
              [config.storeKey]: {
                isPending: false,
                error: new Error('404 Not Found'),
              },
            };
            expect(receivedState).toEqual(expectedState);
          });
        });
      });
    });
  //  End of config loop
  });
});
