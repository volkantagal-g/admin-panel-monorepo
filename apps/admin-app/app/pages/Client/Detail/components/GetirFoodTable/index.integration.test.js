import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GetirFoodTable from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('GetirFoodTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <GetirFoodTable />
        ),
      });
      await screen.findByText('GetirFood Table');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Restaurant');
      await screen.findByText('Discount Code');
      await screen.findByText('Discount Rate');
      await screen.findByText('Date');
      await screen.findByText('Time');
      await screen.findByText('Status');
    });
  });
});
