import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CancelMarketOrderModal from '.';
import { cancelOrderSelector } from '../../redux/selectors';

describe('Cancel Order Modal', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(
      cancelOrderSelector,
      'isCancelOrderModalVisible',
    );
    spyOrderDetail.mockReturnValue(true);
  });
  it('should render CancelMarketOrder component', async () => {
    await renderComponent({ ui: <CancelMarketOrderModal /> });
    const modal = screen.getByTestId('cancel-shop-order-modal');
    expect(modal).toBeInTheDocument();
    const modalSelectInput = screen.getByTestId(
      'cancel-shop-order-modal-select',
    );
    expect(modalSelectInput).toBeInTheDocument();
    const modalInput = screen.getByTestId(
      'cancel-shop-order-modal-note-input',
    );
    expect(modalInput).toBeInTheDocument();
  });
});
