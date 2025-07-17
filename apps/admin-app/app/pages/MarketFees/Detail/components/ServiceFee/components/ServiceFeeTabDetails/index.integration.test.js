import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ServiceFeeTabDetails from '.';
import { feeDetailsSelector } from '@app/pages/MarketFees/Detail/redux/selectors';

describe('<ServiceFeeTabDetails /> Component', () => {
  beforeAll(async () => {
    const deliveryFeeLevelsSpy = jest.spyOn(feeDetailsSelector, 'getDynamicLevels');

    deliveryFeeLevelsSpy.mockReturnValue({
      dynamicServiceFeeLevel:
      [{ 1: '2' }],
    });
    const props = {
      feeDetails: {},
      domainType: 1,
      warehouseId: '123',
    };
    await renderComponent({ ui: (<ServiceFeeTabDetails {...props} />) });
  });
  it('should render successfully', async () => {
    const card = screen.getByTestId('service-fee-details');
    expect(card).toBeInTheDocument();
  });
});
