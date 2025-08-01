import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector, orderNotesSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import OrderNote from '.';

describe('order detail map', () => {
  beforeAll(() => {
    const spyOrderNotes = jest.spyOn(orderNotesSelector, 'getData');
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrders);
    spyOrderNotes.mockReturnValue([]);
  });

  it('should render order detail map without error', async () => {
    await renderComponent({ ui: <OrderNote /> });
    const table = screen.getByTestId('order-note');
    expect(table).toBeInTheDocument();
  });
});
