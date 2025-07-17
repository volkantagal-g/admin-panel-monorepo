import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DynamicDeliveryFee from '.';

describe('DynamicDeliveryFee component', () => {
  it('should render DynamicDeliveryFee component without error', async () => {
    await renderComponent({ ui: <DynamicDeliveryFee /> });
    const component = screen.getByTestId('dynamic-delivery-fee');
    expect(component).toBeInTheDocument();
  });
});
