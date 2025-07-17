import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import MarketOrderTable from '.';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('MarketOrderTable', () => {
    it('should render component without error', async () => {
      await renderComponent({ ui: <MarketOrderTable /> });
      expect(
        screen.getByText('New Getir10, GetirMore, GetirWater Order History'),
      ).toBeInTheDocument();
    });

    it('should contain core elements', async () => {
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Courier')).toBeInTheDocument();
      expect(screen.getByText('Checkout Date')).toBeInTheDocument();
      expect(screen.getByText('Total Price')).toBeInTheDocument();
      expect(screen.getByText('Errors')).toBeInTheDocument();
    });
  });
});
