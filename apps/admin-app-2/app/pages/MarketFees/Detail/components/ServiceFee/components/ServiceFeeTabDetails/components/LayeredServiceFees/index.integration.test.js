import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import LayeredServiceFee from '.';

describe('LayeredServiceFee component', () => {
  it('should render LayeredServiceFee component without error', async () => {
    await renderComponent({ ui: <LayeredServiceFee /> });
    const component = screen.getByTestId('layered-service-fee');
    expect(component).toBeInTheDocument();
  });
});
