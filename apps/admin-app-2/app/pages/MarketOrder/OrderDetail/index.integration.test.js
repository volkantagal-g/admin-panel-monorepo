import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector, fraudOrderDetailSelector } from './redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import OrderDetail from '.';

describe('order detail page', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    const spyFraudOrderDetail = jest.spyOn(fraudOrderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrders);
    spyFraudOrderDetail.mockReturnValue({});
  });
  it('should render order detail page without error', async () => {
    await renderComponent({ ui: <OrderDetail data={mockedMarketOrders} /> });
    const table = screen.getByTestId('order-detail');
    expect(table).toBeInTheDocument();
  });
});
