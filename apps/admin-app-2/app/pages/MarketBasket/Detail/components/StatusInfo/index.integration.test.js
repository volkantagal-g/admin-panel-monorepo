import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import StatusInfo from '.';
import { mockedMarketBasket } from '@shared/api/marketAdminPanel/index.mock.data';

describe('StatusInfo Component', () => {
  it('should render StatusInfo Component without error', async () => {
    await renderComponent({ ui: <StatusInfo basketInfo={mockedMarketBasket} /> });
    const component = screen.getByTestId('basket-status-info');
    expect(component).toBeInTheDocument();
  });
});
