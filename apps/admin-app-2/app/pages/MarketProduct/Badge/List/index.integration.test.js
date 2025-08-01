import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { expectSaga, testSaga } from 'redux-saga-test-plan';

import { call } from 'redux-saga/effects';

import { getBadgesSelector, getMarketProductBadgesSelector, selectedBadgeSelector, updateMarketProductBadgesBulkSelector } from './redux/selectors';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

import { getBadges, getMarketProductBadges, updateMarketProductBadgesBulk } from '@shared/api/marketProductBadge';
import { Types, Creators } from './redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getBadgesRequest,
  getMarketProductBadgesRequest,
  updateMarketProductBadgesBulkRequest,
  watchGetBadgesRequest,
  watchGetMarketProductBadgesRequest,
  watchUpdateMarketProductBadgesBulkRequest,
} from './redux/saga';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { createBadgeImageUrlMock, getBadgeMock, getBadgesMock, getMarketProductBadgesMock } from '@shared/api/marketProductBadge/index.mock.handler';

describe('MarketProductBadgeList', () => {
  afterAll(cleanup);

  describe('MarketProductBadgeList Page', () => {
    describe('API tests', () => {
      it('should fetch market product badges', async () => {
        mockApiPerTestCase(getBadgeMock);
        mockApiPerTestCase(getMarketProductBadgesMock);
        mockApiPerTestCase(getBadgesMock);
      });
      it('should create Badge Image URL', async () => {
        mockApiPerTestCase(createBadgeImageUrlMock);
      });
    });

    it('should render page without error', async () => {
      const marketProductBadgeListPageUrl = ROUTE.MARKET_PRODUCT_BADGE_LIST.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_BADGE_LIST,
        pageUrl: marketProductBadgeListPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('Selectors', () => {
    const state = {
      MARKET_PRODUCT: {
        BADGE: {
          LIST: {
            getBadges: {
              data: [{ id: 1, name: 'Badge 1' }],
              isPending: true,
            },
            getMarketProductBadges: {
              data: [{ id: 1, product: 'Product 1' }],
              isPending: false,
            },
            selectedBadge: { data: { id: 1, name: 'Selected Badge' } },
            updateMarketProductBadgesBulk: { isPending: true },
          },
        },
      },
    };

    describe('getBadgesSelector', () => {
      it('should return data', () => {
        const result = getBadgesSelector.getData(state);
        expect(result).toEqual([]);
      });

      it('should return isPending', () => {
        const result = getBadgesSelector.getIsPending(state);
        expect(result).toBe(false);
      });
    });

    describe('getMarketProductBadgesSelector', () => {
      it('should return data', () => {
        const result = getMarketProductBadgesSelector.getData(state);
        expect(result).toEqual([]);
      });

      it('should return isPending', () => {
        const result = getMarketProductBadgesSelector.getIsPending(state);
        expect(result).toBe(false);
      });
    });

    describe('selectedBadgeSelector', () => {
      it('should return selectedBadge data', () => {
        const result = selectedBadgeSelector.getData(state);
        expect(result).toEqual({});
      });
    });

    describe('updateMarketProductBadgesBulkSelector', () => {
      it('should return isPending', () => {
        const result = updateMarketProductBadgesBulkSelector.getIsPending(state);
        expect(result).toBe(false);
      });
    });
  });

  describe('Market Product Badge List Saga Tests', () => {
    describe('getBadgesRequest', () => {
      it('handles success', () => {
        const limit = 10;
        const offset = 0;
        const data = [{ id: '1', name: 'Badge 1' }];

        return expectSaga(getBadgesRequest, { limit, offset })
          .provide([
            [call(getBadges, { limit, offset }), data],
          ])
          .put(Creators.getBadgesSuccess({ data }))
          .put(Creators.setSelectedBadge({ badge: data[0] }))
          .run();
      });

      it('handles failure', () => {
        const limit = 10;
        const offset = 0;
        const error = new Error('Failed to fetch badges');

        return expectSaga(getBadgesRequest, { limit, offset })
          .provide([
            [call(getBadges, { limit, offset }), Promise.reject(error)],
          ])
          .put(Creators.getBadgesFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('getMarketProductBadgesRequest', () => {
      it('handles success', () => {
        const badgeId = '1';
        const data = [{ id: '1', productName: 'Product 1' }];

        return expectSaga(getMarketProductBadgesRequest, { badgeId })
          .provide([
            [call(getMarketProductBadges, { badgeId }), data],
          ])
          .put(Creators.getMarketProductBadgesSuccess({ data }))
          .run();
      });

      it('handles failure', () => {
        const badgeId = '1';
        const error = new Error('Failed to fetch market product badges');

        return expectSaga(getMarketProductBadgesRequest, { badgeId })
          .provide([
            [call(getMarketProductBadges, { badgeId }), Promise.reject(error)],
          ])
          .put(Creators.getMarketProductBadgesFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('updateMarketProductBadgesBulkRequest', () => {
      it('handles success', () => {
        const badgeId = '1';
        const productIds = ['p1', 'p2'];
        const data = [{ id: '1', productName: 'Product 1' }];

        return expectSaga(updateMarketProductBadgesBulkRequest, { badgeId, productIds })
          .provide([
            [call(updateMarketProductBadgesBulk, { badgeId, productIds }), data],
          ])
          .put(Creators.updateMarketProductBadgesBulkSuccess({ data }))
          .put(Creators.getMarketProductBadgesRequest({ badgeId }))
          .run();
      });

      it('handles failure', () => {
        const badgeId = '1';
        const productIds = ['p1', 'p2'];
        const error = new Error('Failed to update market product badges');

        return expectSaga(updateMarketProductBadgesBulkRequest, { badgeId, productIds })
          .provide([
            [call(updateMarketProductBadgesBulk, { badgeId, productIds }), Promise.reject(error)],
          ])
          .put(Creators.updateMarketProductBadgesBulkFailure({ error }))
          .put(ToastCreators.error({ error }))
          .run();
      });
    });

    describe('watchGetBadgesRequest', () => {
      it('watches for GET_BADGES_REQUEST action', () => {
        testSaga(watchGetBadgesRequest)
          .next()
          .takeLatest(Types.GET_BADGES_REQUEST, getBadgesRequest)
          .next()
          .isDone();
      });
    });

    describe('watchGetMarketProductBadgesRequest', () => {
      it('watches for GET_MARKET_PRODUCT_BADGES_REQUEST action', () => {
        testSaga(watchGetMarketProductBadgesRequest)
          .next()
          .takeLatest(Types.GET_MARKET_PRODUCT_BADGES_REQUEST, getMarketProductBadgesRequest)
          .next()
          .isDone();
      });
    });

    describe('watchUpdateMarketProductBadgesBulkRequest', () => {
      it('watches for UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST action', () => {
        testSaga(watchUpdateMarketProductBadgesBulkRequest)
          .next()
          .takeLatest(Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, updateMarketProductBadgesBulkRequest)
          .next()
          .isDone();
      });
    });
  });
});
