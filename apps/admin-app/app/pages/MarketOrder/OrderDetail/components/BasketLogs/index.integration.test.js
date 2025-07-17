import { screen } from '@testing-library/react';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

import renderComponent from '@test/publicUtils/renderComponent';
import BasketLogs from '.';
import { orderDetailSelector } from '../../redux/selectors';

describe('<BasketLogs /> Component', () => {
  beforeAll(async () => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    const spyOrderDetailIsPending = jest.spyOn(orderDetailSelector, 'getIsPending');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
    spyOrderDetailIsPending.mockReturnValue(false);
    await renderComponent({ ui: (<BasketLogs />) });
  });
  it('should render successfully', async () => {
    const table = screen.getByTestId('order-basket-logs');
    expect(table).toBeInTheDocument();
  });
});
