import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import PageComponent from '.';

const pageUrl = '/getirWater/activeOrders';

describe('Active Order Page', () => {
  it('should render page without error', async () => {
    const { container } = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_ACTIVE_ORDERS,
      pageUrl,
      pageComponent: PageComponent,
    });
    const pageTitle = screen.getByText('GetirWater Active Orders');
    expect(pageTitle).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const vendorInformationTableContainer = container.querySelector('.ant-table-container');
    expectTableToHaveColumnNames(vendorInformationTableContainer, [
      'Brand',
      'Vendor',
      'Cart Date',
      'Order Date',
      'Customer',
      'Door',
      'Payment Method',
      'Status',
      'Action',
      'Total Time',
      'Last Act.',
    ]);
  });
});
