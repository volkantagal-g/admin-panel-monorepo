import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import {
  getMarketProductGroupRequest,
  deleteMarketProductGroupRequest,
  copyMarketProductGroupRequest,
  updateMarketProductGroupRequest,
  getProductsOfProductGroupRequest,
} from './saga';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  copyMarketProductGroup,
  deleteMarketProductGroup,
  getMarketProductGroup,
  getProductsOfProductGroup,
  updateMarketProductGroup,
} from '@shared/api/marketProductGroup';
import { mockedAlgorithmProductGroup, mockedManuelProductGroup } from '@shared/api/marketProductGroup/index.mock.data';

const fakeRequestData = { id: '64b95d937188203e61d6f2c8' };
const fakeUpdateData = {
  id: '66aa23890b8f584ea973e79f',
  body: {
    productsToUpdate: [
      {
        product: '65c64041e2224d0bd23abc5c',
        order: 25,
      },
    ],
    productsToRemove: [
      { product: '5cec3a7497d1fb0001fdbc3e' },
    ],
  },
};
describe('Market Product Group Detail Saga', () => {
  describe('saga #getMarketProductGroupRequest', () => {
    it('should call the getMarketProductGroupRequest (success)', () => {
      testSaga(getMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(getMarketProductGroup, fakeRequestData)
        .next(mockedAlgorithmProductGroup)
        .put(
          Creators.getMarketProductGroupSuccess({ data: mockedAlgorithmProductGroup }),
        )
        .next()
        .isDone();
    });

    it('should call the getMarketProductGroupRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(getMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(getMarketProductGroup, fakeRequestData)
        .next(mockedManuelProductGroup)
        .throw(fakeError)
        .put(Creators.getMarketProductGroupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #deleteMarketProductGroupRequest', () => {
    it('should call the deleteMarketProductGroupRequest (success)', () => {
      testSaga(deleteMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(deleteMarketProductGroup, fakeRequestData)
        .next(mockedAlgorithmProductGroup)
        .put(
          Creators.deleteMarketProductGroupSuccess(),
        )
        .next();
    });

    it('should call the deleteMarketProductGroupRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(deleteMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(deleteMarketProductGroup, fakeRequestData)
        .next(mockedManuelProductGroup)
        .throw(fakeError)
        .put(Creators.deleteMarketProductGroupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #copyMarketProductGroupRequest', () => {
    it('should call the copyMarketProductGroupRequest (success)', () => {
      testSaga(copyMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(copyMarketProductGroup, fakeRequestData)
        .next(mockedAlgorithmProductGroup)
        .put(ToastCreators.success())
        .next()
        .put(
          Creators.getMarketProductGroupRequest({ id: mockedAlgorithmProductGroup?.productGrouping?._id }),
        )
        .next()
        .put(
          Creators.copyMarketProductGroupSuccess({ data: mockedAlgorithmProductGroup }),
        )
        .next()
        .isDone();
    });

    it('should call the copyMarketProductGroupRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(copyMarketProductGroupRequest, fakeRequestData)
        .next()
        .call(copyMarketProductGroup, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.copyMarketProductGroupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #updateMarketProductGroupRequest', () => {
    it('should call the updateMarketProductGroupRequest (success)', () => {
      testSaga(updateMarketProductGroupRequest, fakeUpdateData)
        .next()
        .call(updateMarketProductGroup, fakeUpdateData)
        .next(mockedManuelProductGroup)
        .put(
          Creators.updateMarketProductGroupSuccess({ data: mockedManuelProductGroup }),
        )
        .next()
        .put(
          Creators.getMarketProductGroupRequest({ id: fakeUpdateData.id }),
        )
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
  });
  describe('saga #getProductsOfProductGroupRequest', () => {
    it('should call the getProductsOfProductGroupRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(getProductsOfProductGroupRequest, fakeRequestData)
        .next()
        .call(getProductsOfProductGroup, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.getProductsOfProductGroupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
