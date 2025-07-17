import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Header', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Header />
        ),
      });

      const pageHeader = screen.getByTestId('client-detail-page-header');
      expect(pageHeader).toBeInTheDocument();
    });
  });
});
