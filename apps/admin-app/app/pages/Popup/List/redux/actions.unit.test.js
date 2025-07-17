import { camelCase } from 'lodash';

import { samplePopupListFilter, samplePopupResults, sampleGlobalRuleset } from '@app/pages/Popup/index.mock.data';

import { Creators, Types } from '@app/pages/Popup/List/redux/actions';

export const popupGlobalRulesetTestConfig = [
  {
    name: 'Getir',
    storeKey: 'globalRuleset',
    getReduxKey: 'GET_GLOBAL_RULESET_REQUEST',
    successReduxKey: 'GET_GLOBAL_RULESET_SUCCESS',
    failReduxKey: 'GET_GLOBAL_RULESET_FAILURE',
    setReduxKey: 'SET_GLOBAL_RULESET_REQUEST',
    setSuccessReduxKey: 'SET_GLOBAL_RULESET_SUCCESS',
    setFailReduxKey: 'SET_GLOBAL_RULESET_FAILURE',
  },
];

describe('Popup/List', () => {
  describe('action-creator #setTableFilters', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setTableFilters();
      const expectedAction = { type: Types.SET_TABLE_FILTERS, filters: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setTableFilters({ filters: samplePopupListFilter });
      const expectedAction = { type: Types.SET_TABLE_FILTERS, filters: samplePopupListFilter };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.setTableFilters({
        filters: samplePopupListFilter,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.SET_TABLE_FILTERS, filters: samplePopupListFilter };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getResults', () => {
    describe('#getResultsRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getResultsRequest();
        const expectedAction = { type: Types.GET_RESULTS_REQUEST };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#getResultsSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getResultsSuccess();
        const expectedAction = { type: Types.GET_RESULTS_SUCCESS, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getResultsSuccess({ data: samplePopupResults });
        const expectedAction = { type: Types.GET_RESULTS_SUCCESS, data: samplePopupResults };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.getResultsSuccess({ data: samplePopupResults, wrongArg: '1' });
        const expectedAction = { type: Types.GET_RESULTS_SUCCESS, data: samplePopupResults };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#getResultsFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getResultsFailure();
        const expectedAction = { type: Types.GET_RESULTS_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getResultsFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.GET_RESULTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.getResultsFailure({ error: new Error('404 Not Found'), wrongArg: '2' });
        const expectedAction = { type: Types.GET_RESULTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  // Gorillas Global Ruleset / Global Ruleset

  describe('action-creator #getGlobalRuleset', () => {
    popupGlobalRulesetTestConfig.forEach(config => {
      describe(`#get${config.name}GlobalRulesetRequest`, () => {
        it('receivedAction should equal to expectedAction (without args)', () => {
          const receivedAction = Creators[camelCase(config.getReduxKey)]();
          const expectedAction = { type: Types[config.getReduxKey], data: {} };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('receivedAction should equal to expectedAction (with args)', () => {
          const receivedAction = Creators[camelCase(config.getReduxKey)]({ data: sampleGlobalRuleset });
          const expectedAction = { type: Types[config.getReduxKey], data: sampleGlobalRuleset };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('should ignore extra args', () => {
          const receivedAction = Creators[camelCase(config.getReduxKey)]({ data: sampleGlobalRuleset, wrongArg: '4' });
          const expectedAction = { type: Types[config.getReduxKey], data: sampleGlobalRuleset };
          expect(receivedAction).toEqual(expectedAction);
        });
      });

      describe(`#get${config.name}GlobalRulesetSuccess`, () => {
        it('receivedAction should equal to expectedAction (without args)', () => {
          const receivedAction = Creators[camelCase(config.successReduxKey)]();
          const expectedAction = { type: Types[config.successReduxKey], data: {} };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('receivedAction should equal to expectedAction (with args)', () => {
          const receivedAction = Creators[camelCase(config.successReduxKey)]({ data: sampleGlobalRuleset });
          const expectedAction = { type: Types[config.successReduxKey], data: sampleGlobalRuleset };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('should ignore extra args', () => {
          const receivedAction = Creators[camelCase(config.successReduxKey)]({ data: sampleGlobalRuleset, wrongArg: '1' });
          const expectedAction = { type: Types[config.successReduxKey], data: sampleGlobalRuleset };
          expect(receivedAction).toEqual(expectedAction);
        });
      });

      describe(`#get${config.name}GlobalRulesetFailure`, () => {
        it('receivedAction should equal to expectedAction (without args)', () => {
          const receivedAction = Creators[camelCase(config.failReduxKey)]();
          const expectedAction = { type: Types[config.failReduxKey], error: null };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('receivedAction should equal to expectedAction (with args)', () => {
          const receivedAction = Creators[camelCase(config.failReduxKey)]({ error: new Error('404 Not Found') });
          const expectedAction = { type: Types[config.failReduxKey], error: new Error('404 Not Found') };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('should ignore extra args', () => {
          const receivedAction = Creators[camelCase(config.failReduxKey)]({ error: new Error('404 Not Found'), wrongArg: '2' });
          const expectedAction = { type: Types[config.failReduxKey], error: new Error('404 Not Found') };
          expect(receivedAction).toEqual(expectedAction);
        });
      });

      describe(`action-creator #set${config.name}GlobalRuleset`, () => {
        describe('#setGlobalRulesetRequest', () => {
          it('receivedAction should equal to expectedAction (without args)', () => {
            const receivedAction = Creators[camelCase(config.setReduxKey)]();
            const expectedAction = { type: Types[config.setReduxKey], data: {} };
            expect(receivedAction).toEqual(expectedAction);
          });

          it('receivedAction should equal to expectedAction (with args)', () => {
            const receivedAction = Creators[camelCase(config.setReduxKey)]({ data: sampleGlobalRuleset });
            const expectedAction = { type: Types[config.setReduxKey], data: sampleGlobalRuleset };
            expect(receivedAction).toEqual(expectedAction);
          });

          it('should ignore extra args', () => {
            const receivedAction = Creators[camelCase(config.setReduxKey)]({ data: sampleGlobalRuleset, wrongArg: '1' });
            const expectedAction = { type: Types[config.setReduxKey], data: sampleGlobalRuleset };
            expect(receivedAction).toEqual(expectedAction);
          });
        });

        describe(`#set${config.name}GlobalRulesetSuccess`, () => {
          it('receivedAction should equal to expectedAction (without args)', () => {
            const receivedAction = Creators[camelCase(config.setSuccessReduxKey)]();
            const expectedAction = { type: Types[config.setSuccessReduxKey], data: {} };
            expect(receivedAction).toEqual(expectedAction);
          });

          it('should ignore any args', () => {
            const receivedAction = Creators[camelCase(config.setSuccessReduxKey)]({ wrongArg: '1' });
            const expectedAction = { type: Types[config.setSuccessReduxKey], data: {} };
            expect(receivedAction).toEqual(expectedAction);
          });
        });
      });

      describe(`#set${config.name}GlobalRulesetFailure`, () => {
        it('receivedAction should equal to expectedAction (without args)', () => {
          const receivedAction = Creators[camelCase(config.setFailReduxKey)]();
          const expectedAction = { type: Types[config.setFailReduxKey], error: null };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('receivedAction should equal to expectedAction (with args)', () => {
          const receivedAction = Creators[camelCase(config.setFailReduxKey)]({ error: new Error('404 Not Found') });
          const expectedAction = { type: Types[config.setFailReduxKey], error: new Error('404 Not Found') };
          expect(receivedAction).toEqual(expectedAction);
        });

        it('should ignore extra args', () => {
          const receivedAction = Creators[camelCase(config.setFailReduxKey)]({ error: new Error('404 Not Found'), wrongArg: '1' });
          const expectedAction = { type: Types[config.setFailReduxKey], error: new Error('404 Not Found') };
          expect(receivedAction).toEqual(expectedAction);
        });
      });
    });
  });
});
