import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ServiceFeeBulkUpload from '.';

describe('ServiceFeeBulkUpload component', () => {
  it('should render ServiceFeeBulkUpload component without error', async () => {
    await renderComponent({ ui: <ServiceFeeBulkUpload /> });
    const component = screen.getByTestId('service-fee-bulk-update');
    expect(component).toBeInTheDocument();
  });
});
