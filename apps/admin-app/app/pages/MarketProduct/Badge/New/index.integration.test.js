import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { expectSaga } from 'redux-saga-test-plan';

import { call } from 'redux-saga/effects';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

import { Creators } from './redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createBadge } from '@shared/api/marketProductBadge';
import { createBadgeRequest } from '@app/pages/MarketProduct/Badge/New/redux/saga';

describe('MarketProductBadgeNew', () => {
  afterAll(cleanup);

  describe('MarketProductBadgeNew Page', () => {
    it('should render page without error', async () => {
      const marketProductBadgeNewPageUrl = ROUTE.MARKET_PRODUCT_BADGE_NEW.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_BADGE_NEW,
        pageUrl: marketProductBadgeNewPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('createBadgeRequest Saga', () => {
    it('handles errors', () => {
      const body = { name: 'Test Badge' };
      const error = new Error('Something went wrong');

      return expectSaga(createBadgeRequest, { body })
        .provide([
          [call(createBadge, { body }), Promise.reject(error)],
        ])
        .put(Creators.createBadgeFailure({ error }))
        .put(ToastCreators.error({ error }))
        .run();
    });
  });
});
