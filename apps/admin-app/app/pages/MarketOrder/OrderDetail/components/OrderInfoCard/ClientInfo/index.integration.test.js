import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKeys from '@shared/shared/permKey.json';

import ClientInfo from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('order detail client card', () => {
  afterEach(cleanup);

  it('should render client card without error', async () => {
    const { client } = mockedMarketOrderDetail.client;
    const { addUserPermissions } = await renderComponent({ ui: <ClientInfo client={client} /> });
    const clientInfoCard = screen.getByTestId('client-info-card');
    expect(clientInfoCard).toBeInTheDocument();
    addUserPermissions([permKeys.PAGE_CLIENT_DETAIL]);

    const clientUrlButton = screen.getByTestId('client-detail-link');
    expect(clientUrlButton).toBeInTheDocument();
    expect(clientUrlButton.innerHTML).toContain(`/client/detail/${client._id}`);
  });
});
