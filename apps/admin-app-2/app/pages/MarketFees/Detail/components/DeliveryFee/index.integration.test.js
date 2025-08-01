import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DeliveryFeeConfig from '.';
import { feeDetailsSelector } from '../../redux/selectors';
import { mockedFeeDetails } from '@shared/api/fee/index.mock.data';

describe('DeliveryFeeConfig component', () => {
  beforeAll(async () => {
    const spyFeeDetails = jest.spyOn(feeDetailsSelector, 'getData');
    spyFeeDetails.mockReturnValue(mockedFeeDetails);
  });
  it('should render DeliveryFeeConfig component with no error', async () => {
    await renderComponent({ ui: <DeliveryFeeConfig /> });
    const component = screen.getByTestId('delivery-fee-config');
    expect(component).toBeInTheDocument();
  });
});
