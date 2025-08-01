import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ZoneBasedLayeredDeliveryFee from '.';

describe('ZoneBasedLayeredDeliveryFee component', () => {
  it('should render ZoneBasedLayeredDeliveryFee component without error', async () => {
    await renderComponent({ ui: <ZoneBasedLayeredDeliveryFee /> });
    const component = screen.getByTestId('zone-based-layered-delivery-fee');
    expect(component).toBeInTheDocument();
  });
});
