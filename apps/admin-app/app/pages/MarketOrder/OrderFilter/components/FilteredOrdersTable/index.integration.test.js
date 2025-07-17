import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { getFilteredOrdersSelector, filtersSelector } from '../../redux/selectors';
import * as allSelectors from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import FilteredOrdersTable from '.';
import { defaultDates, defaultDomainType } from '../../redux/actions';

describe('Filtered orders table', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(getFilteredOrdersSelector, 'getData');
    const spyIsPending = jest.spyOn(getFilteredOrdersSelector, 'getIsPending');
    const spyFilters = jest.spyOn(filtersSelector, 'getData');
    jest.spyOn(allSelectors, 'lastUsedFiltersSelector').mockReturnValue({ statuses: undefined, initialStatusForSuccessDuration: undefined });
    spyOrderDetail.mockReturnValue(mockedMarketOrders);
    spyIsPending.mockReturnValue(false);
    spyFilters.mockReturnValue({
      domainType: defaultDomainType,
      city: null,
      status: 'success',
      errorcode: null,
      platforms: [],
      warehouse: null,
      pagination: { currentPage: 1, rowsPerPage: 10 },
      selectedDateRange: defaultDates,
      initialStatusForSuccessDuration: null,
      minDuration: null,
      maxDuration: null,

    });
  });

  it('should render FilteredOrdersTable without error', async () => {
    await renderComponent({ ui: <FilteredOrdersTable data={mockedMarketOrders} /> });
    const table = screen.getByTestId('filtered-orders');
    expect(table).toBeInTheDocument();
  });
});
