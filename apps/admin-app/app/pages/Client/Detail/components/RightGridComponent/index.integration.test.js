import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import RightGrid from './index';
import permKey from '@shared/shared/permKey.json';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('RightGrid', () => {
    let renderResult;
    it('should render component without error', async () => {
      renderResult = await renderComponent({
        ui: (
          <RightGrid />
        ),
      });
      await screen.findByText('Select Country');
      await screen.findByText('Promos');
      await screen.findByText('Devices');
    });

    it('hides invoices by default', async () => {
      expect(screen.queryByText('Invoices')).not.toBeInTheDocument();
    });
    it('shows invoices when the user has sufficient permissions', async () => {
      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_INVOICES]);
      expect(screen.getByText('Invoices')).toBeInTheDocument();
    });
  });
});
