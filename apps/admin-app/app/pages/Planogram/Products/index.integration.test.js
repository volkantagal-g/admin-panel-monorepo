import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

import PageComponent from '@app/pages/Planogram/Products/index';
import Filters from '@app/pages/Planogram/Products/components/Filters';

const setFormValues = jest.fn();

describe('Products List Page', () => {
  const initialUrl = '/planogram/products';
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_PRODUCTS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    beforeEach(() => {
      setFormValues.mockReset();
    });

    it('should have correct filter form content', async () => {
      await renderComponent({ ui: <Filters setFormValues={setFormValues} /> });
      expect(screen.getByText('Product Name')).toBeInTheDocument();
      expect(screen.getByText('Product Id')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Apply')).toBeInTheDocument();
    });
    it('should have domain types', async () => {
      expect(screen.queryByText('Getir10')).not.toBeInTheDocument();
      const domainSelect = screen.getByLabelText('Domain');
      userEvent.click(domainSelect);
      expect(screen.getByText('G10')).toBeInTheDocument();
      const selectedType = screen.getByText('G10');
      userEvent.click(selectedType);
      expect(screen.queryByPlaceholderText('Domain')).not.toBeInTheDocument();
    });
  });
});
