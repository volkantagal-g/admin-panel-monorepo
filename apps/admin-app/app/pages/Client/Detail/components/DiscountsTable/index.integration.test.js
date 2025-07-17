import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DiscountsTable from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('DiscountsTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <DiscountsTable />
        ),
      });
      await screen.findByText('Discounts');
    });

    it('should contain core elements', async () => {
      await screen.findByText('#');
      await screen.findByText('Title');
      await screen.findByText('Amount');
      await screen.findByText('Actions');
    });
  });
});
