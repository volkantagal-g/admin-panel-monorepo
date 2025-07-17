import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GetirFinanceTable from './index';
import { financeOrdersSelector } from '@app/pages/Client/Detail/redux/selectors';
import permKey from '@shared/shared/permKey.json';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('GetirFinanceTable', () => {
    let renderResult;

    it('should not render component and core elements if no permission', async () => {
      renderResult = await renderComponent({
        ui: (
          <GetirFinanceTable />
        ),
      });
      expect(screen.queryByText('Finance Orders')).not.toBeInTheDocument();
      expect(screen.queryByText('Checkout Date')).not.toBeInTheDocument();
      expect(screen.queryByText('Vendor')).not.toBeInTheDocument();
      expect(screen.queryByText('Status')).not.toBeInTheDocument();
      expect(screen.queryByText('Refresh')).not.toBeInTheDocument();
      expect(screen.queryByText('Actions')).not.toBeInTheDocument();
    });

    it('should render components and core elements correctly if has permission', async () => {
      jest.spyOn(financeOrdersSelector, 'getOrders').mockReturnValue([]);
      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_COMPONENT_FINANCE_ORDERS]);

      await screen.findByText('Finance Orders');
      await screen.findByText('Checkout Date');
      await screen.findByText('Vendor');
      await screen.findByText('Status');
      await screen.findByText('Refresh');
      await screen.findByText('Actions');
    });
  });
});
