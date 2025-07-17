import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GetirBiTaksiTable from './index';
import { getirBiTaksiOrdersSelector } from '@app/pages/Client/Detail/redux/selectors';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('GetirBiTaksiTable', () => {
    it('should render component without error', async () => {
      jest.spyOn(getirBiTaksiOrdersSelector, 'getGetirBiTaksiOrders').mockReturnValue({ data: [], pagination: { totalRecordCount: 0 } });

      await renderComponent({
        ui: (
          <GetirBiTaksiTable />
        ),
      });
      await screen.findByText('BiTaksi Orders');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Trip Date');
      await screen.findByText('Price');
      await screen.findByText('Status');

      await screen.findByText('Refresh');
    });
  });
});
