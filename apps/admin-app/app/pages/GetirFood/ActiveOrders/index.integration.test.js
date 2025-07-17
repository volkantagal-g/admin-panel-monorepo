import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, expectTableToHaveColumnNames } from '@test/publicUtils/assertions';

import PageComponent from '.';

const initialUrl = '/foodOrder/active';

describe('In Active Orders Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_FOOD_ORDER_ACTIVE,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText('GetirFood Active Orders');
  });

  it('Should have proper columns for Order List', () => {
    const table = screen.getByTestId('food-active-orders-list');
    expectTableToHaveColumnNames(table, ['Restaurant', 'City', 'Date', 'Customer', 'Door', 'Courier', 'P', 'Status', 'L. Act', 'Sum', 'Action']);
  });
});
