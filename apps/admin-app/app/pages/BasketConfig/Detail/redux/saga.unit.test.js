import { testSaga } from 'redux-saga-test-plan';

import { getBasketAmounts, bulkUpdateBasketAmounts } from '@shared/api/basketConfig';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getDiscountedBasketAmountsRequest,
  updateDiscountedBasketAmountsRequest,
  watchGetDiscountedBasketAmountsRequest,
  watchUpdateDiscountedBasketAmountsRequest,
} from './saga';

const warehouseId = '123';
describe('saga #getDiscountedBasketAmountsRequest', () => {
  const response = {
    basketAmounts: {
      warehouseId: '123',
      domainSpecificDetails: [
        {
          domainType: 1,
          minDiscountedAmount: 19.99,
          maxDiscountedAmount: 399,
        },
      ],
    },
  };
  it('should get basket amounts details successfully', () => {
    testSaga(getDiscountedBasketAmountsRequest, { warehouseId })
      .next()
      .call(getBasketAmounts, { warehouseId })
      .next(response)
      .put(Creators.getDiscountedBasketAmountsSuccess({ data: response }))
      .next()
      .isDone();
  });
  it('should throw an error when occurred', () => {
    const fakeError = new Error('cannot fetch details at this time');
    testSaga(getDiscountedBasketAmountsRequest, { warehouseId })
      .next()
      .call(getBasketAmounts, { warehouseId })
      .next(response)
      .throw(fakeError)
      .put(Creators.getDiscountedBasketAmountsFailure({ error: fakeError }))
      .next()
      .put(ToastCreators.error({ error: fakeError }))
      .next()
      .isDone();
  });
});

describe('saga #updateDiscountedBasketAmountsRequest', () => {
  const updateResponse = { success: true };
  const domainType = 1;
  const minDiscountedAmount = 10;
  const maxDiscountedAmount = 10;
  const basketAmountSource = 10;
  const zoneBasedBasketAmounts = 10;

  it('should update basket amounts successfully', () => {
    testSaga(updateDiscountedBasketAmountsRequest, {
      warehouseId,
      domainType,
      minDiscountedAmount,
      maxDiscountedAmount,
      basketAmountSource,
      zoneBasedBasketAmounts,
      onSuccess: null,
    })
      .next()
      .call(bulkUpdateBasketAmounts, {
        basketAmounts: [{
          warehouseId,
          domainType,
          minDiscountedAmount,
          maxDiscountedAmount,
          basketAmountSource,
          zoneBasedBasketAmounts,
        }],
      })
      .next(updateResponse)
      .put(
        Creators.updateDiscountedBasketAmountsSuccess({ data: updateResponse }),
      )
      .next()
      .put(ToastCreators.success())
      .next()
      .isDone();
  });
  it('should throw an error when occurred', () => {
    const fakeError = new Error('cannot fetch details at this time');
    testSaga(updateDiscountedBasketAmountsRequest, {
      warehouseId,
      domainType,
      minDiscountedAmount,
      maxDiscountedAmount,
      basketAmountSource,
      zoneBasedBasketAmounts,
      onSuccess: null,
    })
      .next()
      .call(bulkUpdateBasketAmounts, {
        basketAmounts: [{
          warehouseId,
          domainType,
          minDiscountedAmount,
          maxDiscountedAmount,
          basketAmountSource,
          zoneBasedBasketAmounts,
        }],
      })
      .next(updateResponse)
      .throw(fakeError)
      .put(Creators.updateDiscountedBasketAmountsFailure({ error: fakeError }))
      .next()
      .put(ToastCreators.error({ error: fakeError }))
      .next()
      .isDone();
  });
});
describe('saga #watchGetDiscountedBasketAmountsRequest', () => {
  it('should call the watchGetDiscountedBasketAmountsRequest', () => {
    testSaga(watchGetDiscountedBasketAmountsRequest)
      .next()
      .takeLatest(
        Types.GET_DISCOUNTED_BASKET_AMOUNTS_REQUEST,
        getDiscountedBasketAmountsRequest,
      )
      .next()
      .isDone();
  });
});

describe('saga #watchUpdateDiscountedBasketAmountsRequest', () => {
  it('should call the watchUpdateDiscountedBasketAmountsRequest', () => {
    testSaga(watchUpdateDiscountedBasketAmountsRequest)
      .next()
      .takeLatest(
        Types.UPDATE_DISCOUNTED_BASKET_AMOUNTS_REQUEST,
        updateDiscountedBasketAmountsRequest,
      )
      .next()
      .isDone();
  });
});
