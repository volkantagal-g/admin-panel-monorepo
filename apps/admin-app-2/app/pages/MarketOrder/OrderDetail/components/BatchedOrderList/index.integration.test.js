import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import BatchedOrderTable from '.';

describe('Batched Order list', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
  });

  it('should render BatchedOrderTable without error', async () => {
    await renderComponent({
      ui: (
        <BatchedOrderTable
          data={mockedMarketOrderDetail.partialRefunds}
        />
      ),
    });

    const table = screen.getByTestId('batched-order-list');
    expect(table).toBeInTheDocument();
  });
});
