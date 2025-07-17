import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectTableToHaveColumnNames, expectTableToHaveValues } from '@test/publicUtils/assertions';
import PageComponent from '.';

const pageUrl = '/getirWater/vendorFilter';

describe('Vendor Filter Page', () => {
  it('should render page without error', async () => {
    const { container } = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_VENDOR_FILTER,
      pageUrl,
      pageComponent: PageComponent,
    });
    const pageTitle = screen.getByText('Getir Water Vendor Filter');
    expect(pageTitle).toBeInTheDocument();
    await waitPageToRenderSomething();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const [filterSummaryTableContainer, vendorInformationTableContainer] = container.querySelectorAll('.ant-table-container');
    expect(filterSummaryTableContainer).toBeInTheDocument();
    expect(vendorInformationTableContainer).toBeInTheDocument();
    expectTableToHaveColumnNames(filterSummaryTableContainer, [
      '# of Vendors',
      '# of Vendors those status are OpenForSale',
      '# of Vendors those isOpen is TRUE',
      '# of Vendors those isOpen is FALSE',
    ]);
    expectTableToHaveValues(filterSummaryTableContainer, [
      102,
      27,
      14,
      72,
    ].map(String));
    expectTableToHaveColumnNames(vendorInformationTableContainer, [
      'Status',
      'IsOpen',
      'Name',
      'ID',
      'Firm',
      'Brand',
      'City',
      'Action',
    ]);
  });
});
