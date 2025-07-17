import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import PartialRefundsTable from '.';

describe('Partial refund list', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
  });

  it('should render PartialRefundsTable without error', async () => {
    await renderComponent({
      ui: (
        <PartialRefundsTable
          data={mockedMarketOrderDetail.partialRefunds}
        />
      ),
    });

    const table = screen.getByTestId('partial-refund-list');
    expect(table).toBeInTheDocument();
  });

  it('should render total refund amount correctly', () => {
    const totalRefundAmount = screen.getByTestId('refund-amount-1');
    expect(totalRefundAmount).toBeInTheDocument();
  });
});
