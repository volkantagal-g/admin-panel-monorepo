import { Types, Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

describe('Market Product Detail', () => {
  describe('Get Market Product All Prices', () => {
    describe('action-creator #getMarketProductAllPriceRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getMarketProductAllPriceRequest({ id: '123456', warehouseId: undefined });
        const expectedAction = {
          type: Types.GET_MARKET_PRODUCT_ALL_PRICE_REQUEST,
          countryId: undefined,
          productId: undefined,
          price: undefined,
          struckPrice: undefined,
          vat: undefined,
          currencyId: undefined,
          listPrice: undefined,
          wholesalePrice: undefined,
          wholesaleVat: undefined,
          unitPriceProperties: undefined,
          wholesaleFinancials: undefined,
          struckPriceFinancial: undefined,
          ecoContributionPrice: undefined,
          depositPrice: undefined,
          isBundled: undefined,
          bundleProducts: undefined,
          domainPrices: undefined,
          domainPricings: undefined,
          bundlePricing: undefined,
          wastePricing: undefined,
          warehousePricing: undefined,
          id: '123456',
          warehouseId: undefined,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getMarketProductAllPriceSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getMarketProductAllPriceSuccess({ });
        const expectedAction = {
          type: Types.GET_MARKET_PRODUCT_ALL_PRICE_SUCCESS,
          data: [],
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getMarketProductAllPriceFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getMarketProductAllPriceFailure({});
        const expectedAction = {
          type: Types.GET_MARKET_PRODUCT_ALL_PRICE_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Update Market Product Pricing', () => {
    describe('action-creator #updateMarketProductPricingRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateMarketProductPricingRequest({});
        const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST, body: null, id: undefined, errors: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.updateMarketProductPricingRequest({ id: '123456', body: { depositPrice: 5 }, errors: [] });
        const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST, id: '123456', body: { depositPrice: 5 }, errors: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #updateMarketProductPricingSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateMarketProductPricingSuccess();
        const expectedAction = {
          type: Types.UPDATE_MARKET_PRODUCT_PRICING_SUCCESS,
          data: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.updateMarketProductPricingSuccess({ wrongArg: "I'am not a arg. of this func" });
        const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_PRICING_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #updateMarketProductPricingFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateMarketProductPricingFailure({});
        const expectedAction = {
          type: Types.UPDATE_MARKET_PRODUCT_PRICING_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Create Supply And Logistic Info ', () => {
    describe('action-creator #createSupplyLogisticInfoRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createSupplyLogisticInfoRequest({});
        const expectedAction = { type: Types.CREATE_SUPPLY_LOGISTIC_INFO_REQUEST, body: null };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.createSupplyLogisticInfoRequest({
          body: {
            maxStock: 10,
            maxStockDay: 10,
          },
        });
        const expectedAction = {
          type: Types.CREATE_SUPPLY_LOGISTIC_INFO_REQUEST,
          body: {
            maxStock: 10,
            maxStockDay: 10,
          },
        };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #createSupplyLogisticInfoSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createSupplyLogisticInfoSuccess();
        const expectedAction = {
          type: Types.CREATE_SUPPLY_LOGISTIC_INFO_SUCCESS,
          data: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.createSupplyLogisticInfoSuccess({ wrongArg: "I'am not a arg. of this func" });
        const expectedAction = { type: Types.CREATE_SUPPLY_LOGISTIC_INFO_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator  #createSupplyLogisticInfoFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createSupplyLogisticInfoFailure({});
        const expectedAction = {
          type: Types.CREATE_SUPPLY_LOGISTIC_INFO_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Update Supply And Logistic Info ', () => {
    describe('action-creator #updateSupplyLogisticInfoRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateSupplyLogisticInfoRequest({});
        const expectedAction = { type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST, body: null, id: undefined, errors: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.updateSupplyLogisticInfoRequest({
          id: '123456',
          body: {
            maxStock: 10,
            maxStockDay: 10,
          },
          errors: [],
        });
        const expectedAction = {
          type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST,
          id: '123456',
          body: {
            maxStock: 10,
            maxStockDay: 10,
          },
          errors: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #updateSupplyLogisticInfoSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateSupplyLogisticInfoSuccess();
        const expectedAction = {
          type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_SUCCESS,
          data: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.updateSupplyLogisticInfoSuccess({ wrongArg: "I'am not a arg. of this func" });
        const expectedAction = { type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator  #updateSupplyLogisticInfoFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.updateSupplyLogisticInfoFailure({});
        const expectedAction = {
          type: Types.UPDATE_SUPPLY_LOGISTIC_INFO_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Get Supply And Logistic Info', () => {
    describe('action-creator #getMarketProductAllPriceRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getSupplyLogisticInfoRequest({ });
        const expectedAction = { type: Types.GET_SUPPLY_LOGISTIC_INFO_REQUEST };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getSupplyLogisticInfoSuccess', () => {
      it('receivedAction should equal to expectedAction', () => {
        const receivedAction = Creators.getSupplyLogisticInfoSuccess({
          data: [{
            criticalStockStore: 5,
            maxStock: 10,
            maxStockDay: 10,
            minStock: 4,
            minStockDay: 10,
            isCriticalStockWarningEnabled: false,
            isIncludedToGeneralInventoryCheck: false,
            inventoryCheckPeriod: 34,
            isConsumable: false,
            id: '123456',
            warehouseId: undefined,
          }],
        });
        const expectedAction = {
          type: Types.GET_SUPPLY_LOGISTIC_INFO_SUCCESS,
          data: [{
            criticalStockStore: 5,
            maxStock: 10,
            maxStockDay: 10,
            minStock: 4,
            minStockDay: 10,
            isCriticalStockWarningEnabled: false,
            isIncludedToGeneralInventoryCheck: false,
            inventoryCheckPeriod: 34,
            isConsumable: false,
            id: '123456',
            warehouseId: undefined,
          }],
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getSupplyLogisticInfoFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getSupplyLogisticInfoFailure({});
        const expectedAction = {
          type: Types.GET_SUPPLY_LOGISTIC_INFO_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Get Master Category V2', () => {
    describe('action-creator #getMasterCategoriesV2Request', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getMasterCategoriesV2Request({ });
        const expectedAction = {
          type: Types.GET_MASTER_CATEGORIES_V2_REQUEST,
          queryText: undefined,
          level: undefined,
          limit: undefined,
          offset: undefined,
          fields: [],
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getMasterCategoriesV2Success', () => {
      it('receivedAction should equal to expectedAction', () => {
        const receivedAction = Creators.getMasterCategoriesV2Success({});
        const expectedAction = {
          type: Types.GET_MASTER_CATEGORIES_V2_SUCCESS,
          data: [],
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getMasterCategoriesV2Failure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getMasterCategoriesV2Failure({});
        const expectedAction = {
          type: Types.GET_MASTER_CATEGORIES_V2_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('Get Supply Brands', () => {
    describe('action-creator #getSupplyBrandsRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getSupplyBrandsRequest({ });
        const expectedAction = { type: Types.GET_SUPPLY_BRANDS_REQUEST, name: undefined, limit: undefined, offset: 0 };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getSupplyBrandsSuccess', () => {
      it('receivedAction should equal to expectedAction', () => {
        const receivedAction = Creators.getSupplyBrandsSuccess({});
        const expectedAction = {
          type: Types.GET_SUPPLY_BRANDS_SUCCESS,
          data: [],
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('action-creator #getSupplyBrandsFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getSupplyBrandsFailure({});
        const expectedAction = {
          type: Types.GET_SUPPLY_BRANDS_FAILURE,
          error: null,
        };

        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
