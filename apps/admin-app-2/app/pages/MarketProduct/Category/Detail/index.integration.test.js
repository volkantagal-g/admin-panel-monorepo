import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import MarketProductCategoryDetailPage from '.';
import { getMarketProductCategoryByIdSelector, getMarketProductCategorySlugsSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';
import {
  mockedGetMarketProductCategorySlugs,
  mockedMarketProductCategory,
} from '@shared/api/marketProductCategory/index.mock.data';
import store from '@shared/redux/store';
import { Creators } from '@app/pages/MarketProduct/Category/Detail/redux/actions';

describe('MarketProductCategoryDetail', () => {
  afterAll(cleanup);
  describe('MarketProductCategoryDetail Page', () => {
    it('should render page without error', async () => {
      const marketProductCategoryDetailPageUrl = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_DETAIL,
        pageUrl: marketProductCategoryDetailPageUrl,
        pageComponent: MarketProductCategoryDetailPage,
      });
      await waitPageToRenderSomething();
    });
    it('should click buttons correctly', async () => {
      store.dispatch(Creators.getMarketProductCategorySlugsRequest({ id: '572788505d4d14030034343b' }));
      const spyGetMarketProductCategoryById = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      spyGetMarketProductCategoryById.mockReturnValue(mockedMarketProductCategory);
      const spyGetMarketProductCategorySlugs = jest.spyOn(getMarketProductCategorySlugsSelector, 'getData');
      spyGetMarketProductCategorySlugs.mockReturnValue(mockedGetMarketProductCategorySlugs);

      const showSlugsButton = await screen.findByText('Show slugs');
      await userEvent.click(showSlugsButton);

      const slugsModal = await screen.findByText('Category Slugs');
      expect(slugsModal).toBeInTheDocument();

      const isActiveButton = await screen.findByRole('switch');
      await userEvent.click(isActiveButton);
      const confirmationModal = await screen.findByText('Are you sure to ACTIVATE this category?');
      expect(confirmationModal).toBeInTheDocument();
    });
  });
});
