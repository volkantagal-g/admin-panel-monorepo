import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2 } from '@test/publicUtils/assertions';
import PageComponent from './index';

const initialUrl = '/count/orderCounter';

describe('In Order Counter Page:', () => {
  afterAll(cleanup);

  // let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      /* renderResult = */
      await renderPage({
        pagePermKey: permKey.PAGE_ORDER_COUNTER,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct document title', async () => {
      await waitFor(() => {
        expect(document.title).toContain('Order Counter - Getir');
      });
    });

    it('should appear in the relevant menu group', () => {
      expectSidebarMenuToHaveV2('Management', ['Order Counter']);
    });
  });

  describe('<Filters /> Component', () => {
    it('should render filter items with default values', async () => {
      const countryRadioButton = screen.getByRole('radio', { name: /country/i });
      expect(countryRadioButton).toBeChecked();
    });

    it('should change selected radio button', async () => {
      const globalRadioButton = screen.getByRole('radio', { name: /global/i });
      fireEvent.click(globalRadioButton);
      expect(globalRadioButton).toBeChecked();
    });
  });

  describe('<Odometer /> Component', () => {
    it('should render odometer', async () => {
      const odometer = screen.getByTestId('odometer');
      expect(odometer).toBeInTheDocument();
    });
  });
});
