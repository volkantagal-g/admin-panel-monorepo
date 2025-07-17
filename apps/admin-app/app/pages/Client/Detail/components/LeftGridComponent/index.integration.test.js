import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import LeftGridComponent from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('LeftGridComponent', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <LeftGridComponent />
        ),
      });
      await expect(screen.findByTestId('client-detail-left-grid-component')).resolves.toBeInTheDocument();
    });
  });
});
