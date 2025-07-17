import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { t } from '@shared/i18n';
import renderComponent from '@test/publicUtils/renderComponent';
import AddressesMap from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('AddressesMap', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <AddressesMap t={t} />
        ),
      });
      await screen.findByText('Address');
    });
  });
});
