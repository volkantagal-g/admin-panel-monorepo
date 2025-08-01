import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ServiceFeeConfig from '.';

describe('ServiceFeeConfig component', () => {
  it('should render ServiceFeeConfig component with no error', async () => {
    await renderComponent({ ui: <ServiceFeeConfig /> });
    const component = screen.getByTestId('service-fee-config');
    expect(component).toBeInTheDocument();
  });
});
