import { testSaga } from 'redux-saga-test-plan';

import {
  getCompetitorListPriceReco,
  getSimulateIndex,
  getPricingRulesData,
} from '@shared/api/marketIntelligencePriceRecommendation';
import { getSimulateIndexSaga, getPricingRulesDataSaga, getCompetitorListSaga } from '@app/pages/MarketIntelligencePriceRecommendation/redux/saga';
import { Creators } from '@app/pages/MarketIntelligencePriceRecommendation/redux/actions';
import { stateSelector } from './selectors';

const FAKE_SIMULATE_REQUEST = {
  productList: undefined,
  domainType: undefined,
  competitorList: undefined,
  baseCompetitor: undefined,
  indexType: undefined,
  priorityList: undefined,
  integrationType: 'getir',
};

const FAKE_DOMAIN_TYPE = { domainType: 1 };

const FAKE_SIMULATE_RESPONSE = { result: [] };

describe('saga #getCompetitorListRequest', () => {
  it('should call the getCompetitorListSaga (success)', () => {
    testSaga(getCompetitorListSaga, FAKE_DOMAIN_TYPE)
      .next()
      .call(getCompetitorListPriceReco, FAKE_DOMAIN_TYPE)
      .next(FAKE_SIMULATE_RESPONSE)
      .put(Creators.getCompetitorListSuccess(FAKE_SIMULATE_RESPONSE))
      .next()
      .isDone();
  });
});

describe('saga #getPricingRulesDataRequest', () => {
  it('should call the getPricingRulesDataSaga (success)', () => {
    testSaga(getPricingRulesDataSaga, FAKE_DOMAIN_TYPE)
      .next()
      .call(getPricingRulesData, FAKE_DOMAIN_TYPE)
      .next()
      .put(Creators.getPricingRulesDataSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #getSimulateIndexRequest', () => {
  it('should call the getSimulateIndexSaga (success)', () => {
    testSaga(getSimulateIndexSaga, FAKE_SIMULATE_REQUEST)
      .next()
      .select(stateSelector.integrationType)
      .next('getir')
      .call(getSimulateIndex, FAKE_SIMULATE_REQUEST)
      .next()
      .put(Creators.getSimulateIndexSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});
