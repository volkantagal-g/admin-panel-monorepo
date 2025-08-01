import { testSaga } from 'redux-saga-test-plan';

import {
  getDynamicLevels,
  getFeeDetails,
} from '@shared/api/fee';
import {
  getFeeDetailsRequest,
  watchGetFeeDetailsRequest,
  fetchDynamicLevels,
  watchGetDynamicLevelsRequest,
  getDynamicLevelsRequest,
} from './saga';
import { Types, Creators } from './actions';

describe('Fee Details', () => {
  const warehouseId = '123';
  describe('saga #getFeeDetailsRequest', () => {
    const response = {
      warehouseId: '559831e0b1dc700c006a71b0',
      domainType: 1,
      deliveryFee: {
        deliveryFeeSource: 'LayeredDeliveryFee',
        layeredDeliveryFee: {
          regular: [{ min: 120, fee: 90 }],
          peak: [{ min: 200, fee: 20 }],
        },
      },
    };

    it('should get fees details successfully', () => {
      testSaga(getFeeDetailsRequest, { warehouseId })
        .next()
        .call(getFeeDetails, { warehouseId })
        .next(response)
        .put(Creators.getFeeDetailsSuccess({ data: response }))
        .next()
        .isDone();
    });
    it('should throw an error when occurred', () => {
      const fakeError = new Error('cannot fetch details at this time');
      testSaga(getFeeDetailsRequest, { warehouseId })
        .next()
        .call(getFeeDetails, { warehouseId })
        .next(response)
        .throw(fakeError)
        .put(Creators.getFeeDetailsFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #fetchDynamicLevels', () => {
    const response = [{ 1: '3' }];

    it('should fetch dynamic levels successfully', () => {
      testSaga(fetchDynamicLevels, { warehouseId })
        .next()
        .call(getDynamicLevels, { warehouseId })
        .next(response)
        .put(Creators.getDynamicLevelsSuccess({ data: response }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetFeeDetailsRequest', () => {
    it('should call the watchGetFeeDetailsRequest', () => {
      testSaga(watchGetFeeDetailsRequest)
        .next()
        .takeLatest(Types.GET_FEE_DETAILS_REQUEST, getFeeDetailsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetDynamicLevelsRequest', () => {
    it('should call the watchGetDynamicLevelsRequest', () => {
      testSaga(watchGetDynamicLevelsRequest)
        .next()
        .takeLatest(Types.GET_DYNAMIC_LEVELS_REQUEST, getDynamicLevelsRequest)
        .next()
        .isDone();
    });
  });
});
