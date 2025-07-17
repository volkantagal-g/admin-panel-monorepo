import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CountryBasedPermissions from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('CountryBasedPermissions', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <CountryBasedPermissions />
        ),
      });
      await screen.findByText('Select Country');
    });
  });
});
