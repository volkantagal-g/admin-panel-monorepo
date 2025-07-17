import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Invoices from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Invoices', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Invoices />
        ),
      });
      await screen.findByText('Invoices');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Fetch');
    });
  });
});
