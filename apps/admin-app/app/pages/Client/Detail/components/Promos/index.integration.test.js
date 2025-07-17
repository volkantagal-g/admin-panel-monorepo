import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Promos from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Promos', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Promos />
        ),
      });
      await screen.findByText('Promos');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Used Promos:');
      await screen.findByText('Eligible Promos:');
      await screen.findByText('Shown Promos (Last 3 days):');

      await screen.findByText('Load');
    });
  });
});
