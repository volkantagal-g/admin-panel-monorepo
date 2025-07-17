import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DeliverySlotModal from '.';
import { getSlottedDeliveryOptionsSelector } from '../../redux/selectors';

describe('<DeliverySlotModal /> Component', () => {
  beforeAll(async () => {
    const slottedDeliveryDetail = jest.spyOn(
      getSlottedDeliveryOptionsSelector,
      'getData',
    );
    const slottedDeliveryDetailIsPending = jest.spyOn(
      getSlottedDeliveryOptionsSelector,
      'getIsPending',
    );
    const slottedDeliveryDetailIsModalVisible = jest.spyOn(
      getSlottedDeliveryOptionsSelector,
      'isSlotModalVisible',
    );
    slottedDeliveryDetail.mockReturnValue({});
    slottedDeliveryDetailIsPending.mockReturnValue(false);
    slottedDeliveryDetailIsModalVisible.mockReturnValue(true);
    await renderComponent({ ui: <DeliverySlotModal /> });
  });
  it('should render successfully', async () => {
    const table = screen.getByTestId('delivery-slot-card');
    expect(table).toBeInTheDocument();
  });
});
