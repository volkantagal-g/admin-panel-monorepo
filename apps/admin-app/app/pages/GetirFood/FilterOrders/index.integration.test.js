import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, expectTableToHaveColumnNames } from '@test/publicUtils/assertions';

import PageComponent from '.';

const initialUrl = '/foodOrder/filter';

describe('In Filter Orders Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_FOOD_ORDER_FILTER,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText('GetirFood Order Filters');
  });

  it('Should have proper columns for Filtered Order List', () => {
    const table = screen.getByTestId('food-filter-orders-list');
    expectTableToHaveColumnNames(
      table,
      ['Price', 'Client', 'Restaurant', 'Platform', 'City', 'Courier', 'Checkout Date', 'Status', 'Cancel Reason', 'Actions'],
    );
  });
});
