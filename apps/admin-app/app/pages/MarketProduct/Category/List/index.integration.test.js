import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import ProductCategorySearch from '@app/pages/MarketProduct/Category/List/components/CategorySearch';
import { filtersSelector } from '@app/pages/MarketProduct/Category/List/redux/selectors';

describe('MarketProductCategoryList', () => {
  afterAll(cleanup);
  describe('MarketProductCategoryList Page', () => {
    it('should render page without error', async () => {
      const marketProductCategoryListPageUrl = ROUTE.MARKET_PRODUCT_CATEGORY_LIST.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_LIST,
        pageUrl: marketProductCategoryListPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should search without error', async () => {
      await renderComponent({
        ui: (
          <ProductCategorySearch />
        ),
      });
      const filterHeader = screen.getByText('Filter');
      await userEvent.click(filterHeader);
      const input = await screen.findByPlaceholderText('Search');
      await userEvent.type(input, 'test');
      expect(input).toHaveValue('test');
    });

    it('should select without error', async () => {
      const mockOnStatusChange = jest.fn();
      await renderComponent({
        ui: (
          <ProductCategorySearch onStatusChange={mockOnStatusChange} />
        ),
      });
      const spyFiltersSelector = jest.spyOn(filtersSelector, 'getSelectedFilterOptions');
      spyFiltersSelector.mockReturnValue([0, 1]);
      const [select] = screen.getAllByRole('combobox');

      await userEvent.click(select);
      const [selectedItem] = screen.getAllByText('Active');
      expect(selectedItem).toBeInTheDocument();

      await userEvent.click(selectedItem);

      expect(within(select).queryByText('Active')).not.toBeInTheDocument();
    });
  });
});
