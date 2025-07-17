import { testSaga } from 'redux-saga-test-plan';

import {
  sampleGlobalRuleset,
  samplePopupListFilter,
  samplePopupResults,
} from '@app/pages/Popup/index.mock.data';

import { Creators } from '@app/pages/Popup/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getGlobalRuleSet, getResults, setGlobalRuleSet } from '@shared/api/popup';
import { getGlobalRulesetRequest, getResultsRequest, setGlobalRulesetRequest } from '@app/pages/Popup/List/redux/saga';
import { filtersSelector } from '@app/pages/Popup/List/redux/selectors';

describe('Popup/List ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #getResultsRequest', () => {
    it('should call the getResults (success)', () => {
      testSaga(getResultsRequest)
        .next()
        .select(filtersSelector.getFilters)
        .next(samplePopupListFilter)
        .call(getResults, samplePopupListFilter)
        .next()
        .put(Creators.getResultsSuccess({ samplePopupResults }))
        .next()
        .isDone();
    });

    it('should call the getResults (failure)', () => {
      testSaga(getResultsRequest)
        .next()
        .select(filtersSelector.getFilters)
        .next(samplePopupListFilter)
        .call(getResults, samplePopupListFilter)
        .throw(fakeError)
        .put(Creators.getResultsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getGlobalRulesetRequest', () => {
    it('should call the getGlobalRuleset (success)', () => {
      testSaga(getGlobalRulesetRequest)
        .next()
        .call(getGlobalRuleSet)
        .next()
        .put(Creators.getGlobalRulesetSuccess({ samplePopupResults }))
        .next()
        .isDone();
    });

    it('should call the getGlobalRuleset (failure)', () => {
      testSaga(getGlobalRulesetRequest)
        .next()
        .call(getGlobalRuleSet)
        .throw(fakeError)
        .put(Creators.getGlobalRulesetFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #setGlobalRulesetRequest', () => {
    it('should call the setGlobalRuleset (success)', () => {
      testSaga(setGlobalRulesetRequest, { data: sampleGlobalRuleset })
        .next(sampleGlobalRuleset)
        .call(setGlobalRuleSet, sampleGlobalRuleset)
        .next()
        .put(Creators.setGlobalRulesetSuccess({ sampleGlobalRuleset }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the setGlobalRuleset (failure)', () => {
      testSaga(setGlobalRulesetRequest, { data: sampleGlobalRuleset })
        .next()
        .call(setGlobalRuleSet, sampleGlobalRuleset)
        .throw(fakeError)
        .put(Creators.setGlobalRulesetFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
