import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKeys from '@shared/shared/permKey.json';

import WarehouseInfo from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('order detail warehouse card', () => {
  afterEach(cleanup);

  it('should render warehouse card without error', async () => {
    const { warehouse } = mockedMarketOrderDetail.warehouse;
    const { addUserPermissions } = await renderComponent({ ui: <WarehouseInfo warehouse={warehouse} /> });
    const warehouseInfoCard = screen.getByTestId('warehouse-info-card');
    expect(warehouseInfoCard).toBeInTheDocument();
    addUserPermissions([permKeys.PAGE_WAREHOUSE_DETAIL]);

    const warehouseUrlButton = screen.getByTestId('warehouse-detail-link');
    expect(warehouseUrlButton).toBeInTheDocument();
    expect(warehouseUrlButton.innerHTML).toContain(
      `/warehouse/detail/${warehouse._id}`,
    );
  });
});
