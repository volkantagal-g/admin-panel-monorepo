import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import LayeredDeliveryFee from '.';

describe('LayeredDeliveryFee component', () => {
  it('should render LayeredDeliveryFee component without error', async () => {
    await renderComponent({ ui: <LayeredDeliveryFee /> });
    const component = screen.getByTestId('layered-delivery-fee');
    expect(component).toBeInTheDocument();
  });
});
