/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Category/Detail/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Category/Detail/redux/actions';

describe('MarketProduct/Category/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST });
      const expectedState = {
        getMarketProductCategoryById: {
          data: {},
          error: null,
          isPending: true,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS, data: { id: '123' } });
      const expectedState = {
        getMarketProductCategoryById: {
          isPending: false,
          data: { id: '123' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductCategoryById: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST });
      const expectedState = {
        updateMarketProductCategory: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: { type: 'Regular' } });
      const expectedState = {
        updateMarketProductCategory: {
          isPending: false,
          data: { type: 'Regular' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        updateMarketProductCategory: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST });
      const expectedState = {
        updateMarketProductCategoryAdditionalInfo: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_SUCCESS, data: { type: 'Regular' } });
      const expectedState = {
        updateMarketProductCategoryAdditionalInfo: {
          isPending: false,
          data: { type: 'Regular' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE, error: new Error('404 Not Found') },
      );
      const expectedState = {
        updateMarketProductCategoryAdditionalInfo: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST });
      const expectedState = {
        activateMarketProductCategory: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS });
      const expectedState = {
        activateMarketProductCategory: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        activateMarketProductCategory: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST });
      const expectedState = {
        deactivateMarketProductCategory: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS });
      const expectedState = {
        deactivateMarketProductCategory: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        deactivateMarketProductCategory: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST });
      const expectedState = {
        getMarketProductCategorySlugs: {
          data: {},
          error: null,
          isPending: true,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS, data: { slug: 'slug' } });
      const expectedState = {
        getMarketProductCategorySlugs: {
          isPending: false,
          error: null,
          data: { slug: 'slug' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductCategorySlugs: {
          isPending: false,
          error: new Error('404 Not Found'),
          data: {},
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST });
      const expectedState = {
        updateMarketProductCategoryImageUrl: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_SUCCESS });
      const expectedState = {
        updateMarketProductCategoryImageUrl: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE, error: new Error('404 Not Found') },
      );
      const expectedState = {
        updateMarketProductCategoryImageUrl: {
          isPending: false,
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
});
