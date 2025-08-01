import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';

import OrderCardInfo from '.';

describe('order detail card section', () => {
  afterEach(cleanup);

  it('should render card sections without error for normal client', async () => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrders);

    const spyOrderDetailIsPending = jest.spyOn(
      orderDetailSelector,
      'getIsPending',
    );
    spyOrderDetailIsPending.mockReturnValue(false);
    await renderComponent({ ui: <OrderCardInfo /> });
    const cardSectionContainer = screen.getByTestId('card-section-container');
    expect(cardSectionContainer).toBeInTheDocument();
  });
});
