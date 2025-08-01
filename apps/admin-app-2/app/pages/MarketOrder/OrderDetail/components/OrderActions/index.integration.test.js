import { screen } from '@testing-library/react';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import OrderActions from '.';
import { orderDetailSelector, getOrderByIdSelector } from '../../redux/selectors';

describe('<OrderActions /> Component', () => {
  beforeAll(async () => {
    jest.spyOn(orderDetailSelector, 'getData').mockReturnValue(mockedMarketOrderDetail);
    jest.spyOn(orderDetailSelector, 'getIsPending').mockReturnValue(false);

    jest.spyOn(getOrderByIdSelector, 'getData').mockReturnValue({
      actions: [{
        type: 'OrderCheckoutSuccess',
        timestamp: '2025-03-07T13:10:11.447Z',
        typeText: 'Checkout is completed.',
      }],
    });
    jest.spyOn(getOrderByIdSelector, 'getIsPending').mockReturnValue(false);

    await renderComponent({ ui: (<OrderActions />) });
  });

  it('should render successfully', () => {
    const table = screen.getByTestId('order-order-actions');
    expect(table).toBeInTheDocument();
  });
});
