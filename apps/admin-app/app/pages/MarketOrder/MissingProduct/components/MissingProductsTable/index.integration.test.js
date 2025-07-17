import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { filtersSelector, getMarketOrderSelector, getMissingProductOrdersSelector, getOrderCancelReasonsSelector } from '../../redux/selectors';
import MissingProducts from '.';
import { defaultCurrentPage, defaultDomainType, defaultRowsPerPage } from '../../redux/actions';
import { mockedMarketOrderDetail, mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';

describe('Missing Products Table Component', () => {
  beforeAll(() => {
    const spyMissingProducts = jest.spyOn(getMissingProductOrdersSelector, 'getData');
    const spyCancelReasons = jest.spyOn(getOrderCancelReasonsSelector, 'getData');
    const spyIsPending = jest.spyOn(getMissingProductOrdersSelector, 'getIsPending');
    const spyIsCount = jest.spyOn(getMissingProductOrdersSelector, 'getCount');
    const spyFilters = jest.spyOn(filtersSelector, 'getData');
    const spyMarketOrder = jest.spyOn(getMarketOrderSelector, 'getData');
    spyMissingProducts.mockReturnValue(mockedMissingProductOrders);
    spyCancelReasons.mockReturnValue([]);
    spyIsPending.mockReturnValue(false);
    spyIsCount.mockReturnValue(10);
    spyFilters.mockReturnValue({
      domainType: defaultDomainType,
      city: null,
      country: null,
      pagination: { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage },

    });
    spyMarketOrder.mockReturnValue(mockedMarketOrderDetail);
  });

  it('should render Missing Products Table Component without error', async () => {
    await renderComponent({ ui: <MissingProducts /> });
    const component = screen.getByTestId('missing-products-table');
    expect(component).toBeInTheDocument();
  });
});
