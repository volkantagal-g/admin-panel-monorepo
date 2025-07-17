import { mockedMarketProductAllPrice } from '@shared/api/marketProductPrice/index.mock.data';

import { REDUX_KEY } from '@shared/shared/constants';

import {
  getMarketProductAllPriceSelector,
  getMarketProductByIdSelector,
  getMarketProductSlugsSelector,
  createMarketProductImageUrlSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.DETAIL;

describe('Market Product/Detail', () => {
  describe('#createMarketProductImageUrlSelector', () => {
    it('#createMarketProductImageUrlSelector.getUploadedImages', () => {
      const uploadedImagesMock = [
        {
          cdnUrl: 'test',
          key: '0',
        },
        {
          cdnUrl: 'test 2',
          key: '1',
        },
      ];

      const fakeStoreState = { [reducerKey]: { createMarketProductImageUrl: { uploadedImages: uploadedImagesMock } } };
      expect(createMarketProductImageUrlSelector.getUploadedImages(fakeStoreState)).toEqual(uploadedImagesMock);
    });

    it('#createMarketProductImageUrlSelector.getUploadedImages should return undefined if state does not exist', () => {
      const fakeStoreState = { [reducerKey]: {} };
      expect(createMarketProductImageUrlSelector.getUploadedImages(fakeStoreState)).toBeUndefined();
    });

    it('#createMarketProductImageUrlSelector.getErroredImages should return correct value if state exists', () => {
      const erroredImagesMock = [
        {
          cdnUrl: 'test',
          key: '0',
        },
        {
          cdnUrl: 'test 2',
          key: '1',
        },
      ];

      const fakeStoreState = { [reducerKey]: { createMarketProductImageUrl: { erroredImages: erroredImagesMock } } };
      expect(createMarketProductImageUrlSelector.getErroredImages(fakeStoreState)).toEqual(erroredImagesMock);
    });

    it('#createMarketProductImageUrlSelector.getErroredImages should return undefined if state does not exist', () => {
      const fakeStoreState = { [reducerKey]: {} };
      expect(createMarketProductImageUrlSelector.getErroredImages(fakeStoreState)).toBeUndefined();
    });
  });

  describe('#getMarketProductAllPriceSelector', () => {
    describe('#getMarketProductAllPriceSelector.getData', () => {
      it('receivedResult should equal to received object (when data is object)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketProductAllPrice: { data: { mockedMarketProductAllPrice } } } };
        const receivedResult = getMarketProductAllPriceSelector.getData(fakeStoreState);
        const expectedResult = { mockedMarketProductAllPrice };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is null)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketProductAllPrice: { data: null } } };
        const receivedResult = getMarketProductAllPriceSelector.getData(fakeStoreState);
        const expectedResult = null;
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#getMarketProductAllPriceSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketProductAllPrice: { isPending: true } } };
        const receivedResult = getMarketProductAllPriceSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is null)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketProductAllPrice: { isPending: null } } };
        const receivedResult = getMarketProductAllPriceSelector.getIsPending(fakeStoreState);
        const expectedResult = null;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });

  describe('#getMarketProductByIdSelector', () => {
    it('should return the correct value of the state tree from getData', () => {
      const mockData = 'TEST';
      const fakeStoreState = { [reducerKey]: { getMarketProductById: { data: { marketProduct: mockData } } } };
      const receivedResult = getMarketProductByIdSelector.getData(fakeStoreState);
      expect(receivedResult).toEqual(mockData);
    });

    it('should return the correct value of the state tree from getPositions', () => {
      const mockPositions = 'TEST';
      const fakeStoreState = { [reducerKey]: { getMarketProductById: { data: { positions: mockPositions } } } };
      const receivedResult = getMarketProductByIdSelector.getPositions(fakeStoreState);
      expect(receivedResult).toEqual(mockPositions);
    });

    it('should return the correct value of the state tree from getIsPending', () => {
      const mockIsPending = true;
      const fakeStoreState = { [reducerKey]: { getMarketProductById: { isPending: mockIsPending } } };
      const receivedResult = getMarketProductByIdSelector.getIsPending(fakeStoreState);
      expect(receivedResult).toEqual(mockIsPending);
    });

    it('should return the correct value of the state tree from getError', () => {
      const mockError = true;
      const fakeStoreState = { [reducerKey]: { getMarketProductById: { error: mockError } } };
      const receivedResult = getMarketProductByIdSelector.getError(fakeStoreState);
      expect(receivedResult).toEqual(mockError);
    });
  });

  describe('#getMarketProductSlugsSelector', () => {
    it('should return the correct value of the state tree from getData', () => {
      const mockData = 'TEST';
      const fakeStoreState = { [reducerKey]: { getMarketProductSlugs: { data: { productSlugs: mockData } } } };
      const receivedResult = getMarketProductSlugsSelector.getData(fakeStoreState);
      expect(receivedResult).toEqual(mockData);
    });

    it('should return the correct value of the state tree from getIsPending', () => {
      const mockIsPending = true;
      const fakeStoreState = { [reducerKey]: { getMarketProductSlugs: { isPending: mockIsPending } } };
      const receivedResult = getMarketProductSlugsSelector.getIsPending(fakeStoreState);
      expect(receivedResult).toEqual(mockIsPending);
    });
  });
});
