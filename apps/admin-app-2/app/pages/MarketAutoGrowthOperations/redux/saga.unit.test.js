import { testSaga } from 'redux-saga-test-plan';

import { getHourTypes, getDayTypes, getChangeReasons, getPromocode } from '@shared/api/marketAutoGrowthOperations';
import { getAggListSaga, getChangeReasonsSaga, getDayTypesSaga, getHourTypesSaga } from '@app/pages/MarketAutoGrowthOperations/redux/saga';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

const FAKE_DOMAIN_TYPE = { domainType: 1 };
const FAKE_AGG_REQUEST = {
  domainType: 1,
  warehouseType: 'Rest',
  promoObjectiveType: 'ACQ',
};

describe('saga #getHourTypesSaga', () => {
  it('should call the getHourTypesSaga (success)', () => {
    testSaga(getHourTypesSaga, FAKE_DOMAIN_TYPE)
      .next()
      .call(getHourTypes, FAKE_DOMAIN_TYPE)
      .next()
      .put(Creators.getHourTypesSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #getDayTypesSaga', () => {
  it('should call the getDayTypesSaga (success)', () => {
    testSaga(getDayTypesSaga, FAKE_DOMAIN_TYPE)
      .next()
      .call(getDayTypes, FAKE_DOMAIN_TYPE)
      .next()
      .put(Creators.getDayTypesSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #getChangeReasonsSaga', () => {
  it('should call the getChangeReasonsSaga (success)', () => {
    testSaga(getChangeReasonsSaga)
      .next()
      .call(getChangeReasons)
      .next()
      .put(Creators.getChangeReasonsSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #getAggListSaga', () => {
  it('should call the getAggListSaga (success)', () => {
    testSaga(getAggListSaga, FAKE_AGG_REQUEST)
      .next()
      .call(getPromocode, FAKE_AGG_REQUEST)
      .next()
      .put(Creators.getAggListSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});
