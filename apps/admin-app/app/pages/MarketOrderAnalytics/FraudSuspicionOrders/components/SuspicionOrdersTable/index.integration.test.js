import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import SuspicionOrdersTable from '.';
import { filtersSelector, getFraudSuspicionOrdersSelector } from '../../redux/selectors';

describe('SuspicionOrdersTable', () => {
  beforeAll(() => {
    const spyOrders = jest.spyOn(getFraudSuspicionOrdersSelector, 'getData');
    const spyIsPending = jest.spyOn(getFraudSuspicionOrdersSelector, 'getIsPending');
    const spyOrderCount = jest.spyOn(getFraudSuspicionOrdersSelector, 'getCount');
    const spyDomainType = jest.spyOn(filtersSelector, 'getSelectedDomainType');
    const spyPagination = jest.spyOn(filtersSelector, 'getPagination');
    spyOrders.mockReturnValue([mockedMarketOrderDetail]);
    spyIsPending.mockReturnValue(false);
    spyOrderCount.mockReturnValue(10);
    spyDomainType.mockReturnValue(1);
    spyPagination.mockReturnValue({ currentPage: 0, rowsPerPage: 10 });
  });

  it('should render SuspicionOrdersTable without error', async () => {
    await renderComponent({
      ui: (
        <SuspicionOrdersTable />
      ),
    });

    const table = screen.getByTestId('fraud-orders');
    expect(table).toBeInTheDocument();
  });
});
