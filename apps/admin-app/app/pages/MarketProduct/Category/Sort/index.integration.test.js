import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import { getCategoryPositionsSelector } from '@app/pages/MarketProduct/Category/Sort/redux/selectors';
import { mockedGetCategoryPositions } from '@shared/api/marketProductCategory/index.mock.data';
import { toggleCategoryActivenessSwitchSelector } from '@app/pages/MarketProduct/Sort/redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import MarketProductCategorySortPage from '.';

describe('MarketProductCategorySort', () => {
  afterAll(cleanup);
  describe('MarketProductCategorySort Page', () => {
    it('should render page without error', async () => {
      const marketProductCategorySortPageUrl = ROUTE.MARKET_PRODUCT_CATEGORY_SORT.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_SORT,
        pageUrl: marketProductCategorySortPageUrl,
        pageComponent: MarketProductCategorySortPage,
      });
      await waitPageToRenderSomething();
    });
    it('should save without error', async () => {
      await renderComponent({
        ui: (
          <MarketProductCategorySortPage />
        ),
      });
      const spyGetCategoryPositions = jest.spyOn(getCategoryPositionsSelector, 'getData');
      spyGetCategoryPositions.mockReturnValue(mockedGetCategoryPositions);
      const spyToggleCategoryActivenessSwitch = jest.spyOn(toggleCategoryActivenessSwitchSelector, 'getData');
      spyToggleCategoryActivenessSwitch.mockReturnValue(undefined);

      const editButton = await screen.findByRole('button', { name: /edit/i });
      await userEvent.click(editButton);

      const sortableItems = await screen.findAllByTestId('sortable-item');
      expect(sortableItems.length).toBeGreaterThan(1);

      fireEvent.mouseDown(sortableItems[0]);
      fireEvent.mouseMove(sortableItems[1]);
      fireEvent.mouseUp(sortableItems[1]);

      const saveButton = await screen.findByRole('button', { name: /save/i });
      await userEvent.click(saveButton);

      await userEvent.click(editButton);
      expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
    });
  });
});
