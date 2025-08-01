import * as allReducers from '@app/pages/MarketProduct/ListV2/redux/reducer';
import { Types } from '@app/pages/MarketProduct/ListV2/redux/actions';
import { productFilters } from '@shared/shared/constantValues';

const { default: reducer, INITIAL_STATE } = allReducers;

describe('MarketProduct/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MARKET_PRODUCTS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCTS_REQUEST });
      const expectedState = {
        getMarketProducts: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCTS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCTS_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getMarketProducts: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCTS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCTS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProducts: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_ACTIVE_MARKET_PRODUCTS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_ACTIVE_MARKET_PRODUCTS_REQUEST });
      const expectedState = {
        exportActiveMarketProducts: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_ACTIVE_MARKET_PRODUCTS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_ACTIVE_MARKET_PRODUCTS_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        exportActiveMarketProducts: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_ACTIVE_MARKET_PRODUCTS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_ACTIVE_MARKET_PRODUCTS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        exportActiveMarketProducts: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST });
      const expectedState = {
        importMarketProductDomainLimits: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS, data: { success: true } });
      const expectedState = {
        importMarketProductDomainLimits: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        importMarketProductDomainLimits: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST });
      const expectedState = {
        exportMarketProductDomainLimits: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS, data: { success: true } });
      const expectedState = {
        exportMarketProductDomainLimits: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        exportMarketProductDomainLimits: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DETAILS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DETAILS_REQUEST });
      const expectedState = {
        importMarketProductDetails: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DETAILS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DETAILS_SUCCESS, data: { success: true } });
      const expectedState = {
        importMarketProductDetails: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_DETAILS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_DETAILS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        importMarketProductDetails: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DETAILS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DETAILS_REQUEST });
      const expectedState = {
        exportMarketProductDetails: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DETAILS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DETAILS_SUCCESS, data: { success: true } });
      const expectedState = {
        exportMarketProductDetails: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_DETAILS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_DETAILS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        exportMarketProductDetails: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST });
      const expectedState = {
        importMarketProductAdditionalTables: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS, data: { success: true } });
      const expectedState = {
        importMarketProductAdditionalTables: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        importMarketProductAdditionalTables: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST });
      const expectedState = {
        exportMarketProductAdditionalTables: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS, data: { success: true } });
      const expectedState = {
        exportMarketProductAdditionalTables: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        exportMarketProductAdditionalTables: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST });
      const expectedState = {
        importMarketProductCategoryPositions: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS, data: { success: true } });
      const expectedState = {
        importMarketProductCategoryPositions: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        importMarketProductCategoryPositions: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST });
      const expectedState = {
        exportMarketProductCategoryPositions: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS, data: { success: true } });
      const expectedState = {
        exportMarketProductCategoryPositions: {
          isPending: false,
          data: { success: true },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        exportMarketProductCategoryPositions: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_FILTER_OPTIONS', () => {
    it('receivedState should equal to expectedState', () => {
      const selectedOptions = Object.keys(productFilters);
      const receivedState = reducer({}, { type: Types.SET_FILTER_OPTIONS, selectedOptions });
      const expectedState = { filters: { selectedOptions } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_ENTERED_IDS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_ENTERED_IDS, ids: ['123'] });
      const expectedState = { filters: { ids: ['123'] } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
