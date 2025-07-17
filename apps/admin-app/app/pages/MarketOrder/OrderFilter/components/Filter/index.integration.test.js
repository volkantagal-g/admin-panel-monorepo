import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import { getFilteredOrdersSelector, filtersSelector, getFilteredWarehousesSelector } from '../../redux/selectors';
import { defaultDates, defaultDomainType } from '../../redux/actions';
import Filter from '.';

describe('Filter Component', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(getFilteredOrdersSelector, 'getData');
    const spyIsPending = jest.spyOn(getFilteredOrdersSelector, 'getIsPending');
    const spyFilters = jest.spyOn(filtersSelector, 'getData');
    const spyWarehouses = jest.spyOn(getFilteredWarehousesSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrders);
    spyIsPending.mockReturnValue(false);
    spyWarehouses.mockReturnValue([]);
    spyFilters.mockReturnValue({
      domainType: defaultDomainType,
      city: null,
      status: 'success',
      errorcode: null,
      platforms: [],
      warehouse: [],
      pagination: { currentPage: 1, rowsPerPage: 10 },
      selectedDateRange: defaultDates,

    });
  });

  it('should render Filter Component without error', async () => {
    await renderComponent({ ui: <Filter /> });
    const component = screen.getByTestId('filter-component');
    expect(component).toBeInTheDocument();
  });
});
