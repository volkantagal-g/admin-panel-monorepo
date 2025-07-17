import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { Types } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { mockedMarketProductAllPrice, mockedUpdatingMarketProductPrice } from '@shared/api/marketProductPrice/index.mock.data';
import {
  mockedCreateSupplyLogisticInfo,
  mockedGetSupplyLogisticInfo,
  mockedUpdateSupplyLogisticInfo, mockedMasterCategoryV2, mockedSupplyBrands,
} from '@shared/api/supplyLogistic/index.mock.data';

describe('Market Product/Detail', () => {
  describe('Get All Prices', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer GET_MARKET_PRODUCT_ALL_PRICE_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MARKET_PRODUCT_ALL_PRICE_REQUEST },
        );
        const expectedState = { getMarketProductAllPrice: { isPending: true } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_MARKET_PRODUCT_ALL_PRICE_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MARKET_PRODUCT_ALL_PRICE_SUCCESS, data: mockedMarketProductAllPrice },
        );
        const expectedState = {
          getMarketProductAllPrice: {
            isPending: false,
            data: mockedMarketProductAllPrice,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_MARKET_PRODUCT_ALL_PRICE_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MARKET_PRODUCT_ALL_PRICE_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          getMarketProductAllPrice: {
            data: {},
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Updating Market Product Pricing', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer UPDATE_MARKET_PRODUCT_PRICING_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST },
        );
        const expectedState = {
          updateMarketProductPricing: {
            isPending: true,
            data: {},
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer UPDATE_MARKET_PRODUCT_PRICING_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_MARKET_PRODUCT_PRICING_SUCCESS, data: mockedUpdatingMarketProductPrice },
        );
        const expectedState = {
          updateMarketProductPricing: {
            isPending: false,
            data: mockedUpdatingMarketProductPrice,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer UPDATE_MARKET_PRODUCT_PRICING_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_MARKET_PRODUCT_PRICING_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          updateMarketProductPricing: {
            data: {},
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Get Supply And Logistic Info Prices', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer GET_SUPPLY_LOGISTIC_INFO_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_LOGISTIC_INFO_REQUEST },
        );
        const expectedState = { getSupplyLogisticInfo: { isPending: true } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_SUPPLY_LOGISTIC_INFO_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_LOGISTIC_INFO_SUCCESS, data: mockedGetSupplyLogisticInfo },
        );
        const expectedState = {
          getSupplyLogisticInfo: {
            isPending: false,
            data: mockedGetSupplyLogisticInfo,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_SUPPLY_LOGISTIC_INFO_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_LOGISTIC_INFO_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          getSupplyLogisticInfo: {
            data: {},
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Create Supply And Logistic Info Prices', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer CREATE_SUPPLY_LOGISTIC_INFO_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.CREATE_SUPPLY_LOGISTIC_INFO_REQUEST },
        );
        const expectedState = { createSupplyLogisticInfo: { isPending: true, data: {}, error: null } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer CREATE_SUPPLY_LOGISTIC_INFO_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.CREATE_SUPPLY_LOGISTIC_INFO_SUCCESS, data: mockedCreateSupplyLogisticInfo },
        );
        const expectedState = {
          createSupplyLogisticInfo: {
            isPending: false,
            data: mockedCreateSupplyLogisticInfo,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer CREATE_SUPPLY_LOGISTIC_INFO_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.CREATE_SUPPLY_LOGISTIC_INFO_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          createSupplyLogisticInfo: {
            data: {},
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Update Supply And Logistic Info Prices', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST },
        );
        const expectedState = { updateSupplyLogisticInfo: { isPending: true, data: {}, error: null } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer UPDATE_SUPPLY_LOGISTIC_INFO_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_SUCCESS, data: mockedUpdateSupplyLogisticInfo },
        );
        const expectedState = {
          updateSupplyLogisticInfo: {
            isPending: false,
            data: mockedUpdateSupplyLogisticInfo,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer UPDATE_SUPPLY_LOGISTIC_INFO_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          updateSupplyLogisticInfo: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Get Master Category V2', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer GET_MASTER_CATEGORIES_V2_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MASTER_CATEGORIES_V2_REQUEST },
        );
        const expectedState = { getMasterCategoriesV2: { isPending: true } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_MASTER_CATEGORIES_V2_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MASTER_CATEGORIES_V2_SUCCESS, data: mockedMasterCategoryV2 },
        );
        const expectedState = {
          getMasterCategoriesV2: {
            isPending: false,
            data: mockedMasterCategoryV2,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_MASTER_CATEGORIES_V2_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_MASTER_CATEGORIES_V2_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          getMasterCategoriesV2: {
            data: [],
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
  describe('Get Supply Brands', () => {
    it('should equal to initial state without args', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
    describe('reducer GETSUPPLY_BRANDS_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_BRANDS_REQUEST },
        );
        const expectedState = { getSupplyBrands: { isPending: true } };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_SUPPLY_BRANDS_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_BRANDS_SUCCESS, data: mockedSupplyBrands },
        );
        const expectedState = {
          getSupplyBrands: {
            isPending: false,
            data: mockedSupplyBrands,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_SUPPLY_BRANDS_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_SUPPLY_BRANDS_FAILURE, error: new Error('404 Not Found') },
        );
        const expectedState = {
          getSupplyBrands: {
            data: [],
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer CREATE_MARKET_PRODUCT_IMAGE_URL_REQUEST', () => {
    it('should set isPending to true', () => {
      const receivedState = reducer(
        {
          createMarketProductImageUrl: {
            uploadedImages: [],
            isPending: false,
            erroredImages: [],
          },
        },
        { type: Types.CREATE_MARKET_PRODUCT_IMAGE_URL_REQUEST },
      );

      const expectedState = {
        createMarketProductImageUrl: {
          uploadedImages: [],
          isPending: true,
          erroredImages: [],
        },
      };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_MARKET_PRODUCT_IMAGE_URL_SUCCESS', () => {
    it('should add the new uploaded image to uploadedImages array', () => {
      const mockCurrentUploadedImage = {
        key: '0',
        signedUrl: 'test',
        cdnUrl: 'test',
      };

      const mockNewUploadedImage = {
        key: '1',
        signedUrl: 'test',
        cdnUrl: 'test',
      };

      const receivedState = reducer(
        {
          createMarketProductImageUrl: {
            uploadedImages: [mockCurrentUploadedImage],
            isPending: true,
            erroredImages: [],
          },
        },
        { type: Types.CREATE_MARKET_PRODUCT_IMAGE_URL_SUCCESS, data: mockNewUploadedImage },
      );

      const expectedState = {
        createMarketProductImageUrl: {
          uploadedImages: [
            mockCurrentUploadedImage,
            mockNewUploadedImage,
          ],
          isPending: false,
          erroredImages: [],
        },
      };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_MARKET_PRODUCT_IMAGE_URL_FAILURE', () => {
    it('should add the new errored image to erroredImages array', () => {
      const mockCurrentErroredImage = {
        key: '0',
        error: new Error('current'),
      };

      const mockNewErroredImage = {
        key: '1',
        error: new Error('new'),
      };

      const receivedState = reducer(
        {
          createMarketProductImageUrl: {
            uploadedImages: [mockCurrentErroredImage],
            isPending: true,
            erroredImages: [],
          },
        },
        { type: Types.CREATE_MARKET_PRODUCT_IMAGE_URL_SUCCESS, data: mockNewErroredImage },
      );

      const expectedState = {
        createMarketProductImageUrl: {
          uploadedImages: [
            mockCurrentErroredImage,
            mockNewErroredImage,
          ],
          isPending: false,
          erroredImages: [],
        },
      };

      expect(receivedState).toEqual(expectedState);
    });
  });
});
