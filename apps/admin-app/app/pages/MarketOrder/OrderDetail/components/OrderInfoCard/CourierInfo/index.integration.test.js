import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKeys from '@shared/shared/permKey.json';

import CourierInfo from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('order detail courier card', () => {
  afterEach(cleanup);

  it('should render courier card without error', async () => {
    const { courier } = mockedMarketOrderDetail.courier;
    const { addUserPermissions } = await renderComponent({ ui: <CourierInfo courier={courier} /> });
    const courierInfoCard = screen.getByTestId('courier-info-card');
    expect(courierInfoCard).toBeInTheDocument();
    addUserPermissions([permKeys.PAGE_COURIER_DETAIL]);

    const courierUrlButton = screen.getByTestId('courier-detail-link');
    expect(courierUrlButton).toBeInTheDocument();
    expect(courierUrlButton.innerHTML).toContain(
      `/courier/detail/${courier._id}`,
    );
  });
});
