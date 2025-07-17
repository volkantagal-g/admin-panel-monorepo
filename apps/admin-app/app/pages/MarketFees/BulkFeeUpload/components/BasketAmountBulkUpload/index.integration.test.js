import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DeliveryFeeBulkUpload from '.';

describe('DeliveryFeeBulkUpload component', () => {
  it('should render DeliveryFeeBulkUpload component without error', async () => {
    await renderComponent({ ui: <DeliveryFeeBulkUpload /> });
    const component = screen.getByTestId('basket-amount-bulk-update');
    expect(component).toBeInTheDocument();
  });
});
