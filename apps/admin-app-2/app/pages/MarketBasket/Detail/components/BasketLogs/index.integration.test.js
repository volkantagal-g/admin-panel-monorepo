import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import BasketLogs from '.';
import { mockedMarketBasket } from '@shared/api/marketAdminPanel/index.mock.data';

describe('BasketLogs Component', () => {
  it('should render BasketLogs Component without error', async () => {
    await renderComponent({ ui: <BasketLogs actions={mockedMarketBasket.actions} /> });
    const component = screen.getByTestId('basket-logs-table');
    expect(component).toBeInTheDocument();
  });
});
