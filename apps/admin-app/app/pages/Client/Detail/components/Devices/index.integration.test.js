import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Devices from './index';
import permKey from '@shared/shared/permKey.json';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Devices', () => {
    let renderResult;
    it('should render component without error', async () => {
      renderResult = await renderComponent({
        ui: (
          <Devices />
        ),
      });
      await screen.findByText('Devices');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Model');
      await screen.findByText('Status');
      await screen.findByText('Users');

      expect(screen.queryByText('Logout All')).not.toBeInTheDocument();
    });

    it('contains logout all button with sufficient permissions', async () => {
      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_BACK_OFFICE_ACTIONS]);
      await screen.findByText('Logout All');
    });
  });
});
