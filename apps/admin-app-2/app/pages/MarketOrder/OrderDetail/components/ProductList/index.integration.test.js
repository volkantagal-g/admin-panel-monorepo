import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import ProductListTable from '.';

describe('Product list table', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    const spyIsPending = jest.spyOn(orderDetailSelector, 'getIsPending');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
    spyIsPending.mockReturnValue(false);
  });

  it('should render ProductListTable without error', async () => {
    await renderComponent({
      ui: (
        <ProductListTable
          data={mockedMarketOrderDetail.partialRefunds}
        />
      ),
    });

    const table = screen.getByTestId('product-list');
    expect(table).toBeInTheDocument();
  });
});
