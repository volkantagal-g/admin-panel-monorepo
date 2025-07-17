import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import FoodTable from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('FoodTable', () => {
    it('should render component without error', async () => {
      await renderComponent({ ui: <FoodTable /> });
      await screen.findByText('Food Orders');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Restaurant');
      await screen.findByText('Courier');
      await screen.findByText('Checkout Date');
      await screen.findByText('Total Price');
      await screen.findByText('Status');
      await screen.findByText('Actions');

      await screen.findByText('Refresh');
    });
  });
});
