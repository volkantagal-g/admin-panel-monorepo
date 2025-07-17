import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import OrderDetail from '.';

describe('order detail map', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrders);
  });

  it('should render order detail map without error', async () => {
    await renderComponent({ ui: <OrderDetail data={mockedMarketOrders} /> });
    const mapCard = screen.getByTestId('order-map');
    expect(mapCard).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
  });
});
