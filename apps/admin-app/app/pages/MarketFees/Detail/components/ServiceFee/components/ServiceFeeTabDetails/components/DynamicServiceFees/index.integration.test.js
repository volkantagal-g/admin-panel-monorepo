import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DynamicServiceFee from '.';

describe('DynamicServiceFee component', () => {
  it('should render DynamicServiceFee component without error', async () => {
    await renderComponent({ ui: <DynamicServiceFee /> });
    const component = screen.getByTestId('dynamic-service-fee');
    expect(component).toBeInTheDocument();
  });
});
