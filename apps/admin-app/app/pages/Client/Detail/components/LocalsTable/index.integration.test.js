import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import LocalsTable from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('LocalsTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <LocalsTable />
        ),
      });
      await screen.findByText('Locals Orders');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Store');
      await screen.findByText('Courier');
      await screen.findByText('Checkout Date');
      await screen.findByText('Total Price');
      await screen.findByText('Status');
      await screen.findByText('Actions');

      await screen.findByText('Refresh');
    });
  });
});
