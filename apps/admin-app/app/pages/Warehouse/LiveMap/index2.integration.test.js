import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitForToastElementToAppear } from '@test/publicUtils/assertions';
import mockApiOnce from '@test/publicUtils/mockApiOnce';
import { getWarehouseInfoForWarehouseBasedLiveMapErrorMockData } from '@shared/api/warehouse/index.mock.handler';
import PageComponent from './index';
import { getLangKey } from '@shared/i18n';

const warehouseId = '5db9759777a0c71180d7694c';
const initialUrl = `/warehouse/liveMap/${warehouseId}`;

describe('Warehouse Based Live Map Page Not Loading Test Case', () => {
  afterAll(cleanup);

  it('should render without an error', async () => {
    mockApiOnce(getWarehouseInfoForWarehouseBasedLiveMapErrorMockData);
    await renderPage({
      pagePermKey: permKey.PAGE_WAREHOUSE_LIVE_MAP,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitForToastElementToAppear();
    expect(screen.getByText(getWarehouseInfoForWarehouseBasedLiveMapErrorMockData.errorData[getLangKey()])).toBeInTheDocument();
  });
});
