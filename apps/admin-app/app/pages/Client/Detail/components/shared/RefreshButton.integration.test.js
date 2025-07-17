import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import RefreshButton from './RefreshButton';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('RefreshButton', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <RefreshButton />
        ),
      });
      await screen.findByText('Refresh');
    });
  });
});
