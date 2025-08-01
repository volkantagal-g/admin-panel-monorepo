import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DeliveryFeeTabDetails from '.';

describe('<DeliveryFeeTabDetails /> Component', () => {
  beforeAll(async () => {
    const props = {
      feeDetails: {},
      domainType: 1,
      warehouseId: '123',
    };
    await renderComponent({ ui: (<DeliveryFeeTabDetails {...props} />) });
  });
  it('should render successfully', async () => {
    const card = screen.getByTestId('delivery-fee-details');
    expect(card).toBeInTheDocument();
  });
});
