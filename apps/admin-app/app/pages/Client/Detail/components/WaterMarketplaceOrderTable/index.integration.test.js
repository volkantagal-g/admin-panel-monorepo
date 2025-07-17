import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import WaterMarketplaceOrdersTable from './index';
import { waterMarketPlaceSelector } from '@app/pages/Client/Detail/redux/selectors';

describe('Client/Detail', () => {
  beforeAll(() => {
    jest.spyOn(waterMarketPlaceSelector, 'getGetirWaterMarketplacePagination').mockReturnValue({ totalRecordCount: 0 });
  });
  afterAll(cleanup);

  describe('WaterMarketplaceOrdersTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <WaterMarketplaceOrdersTable />
        ),
      });
      await screen.findByText('GetirWater Marketplace');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Water Franchise');
      await screen.findByText('Checkout Date');
      await screen.findByText('Price');
      await screen.findByText('Status');
      await screen.findByText('Actions');
    });
  });
});
