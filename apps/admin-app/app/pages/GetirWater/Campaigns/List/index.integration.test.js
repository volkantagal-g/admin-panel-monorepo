import { screen } from '@testing-library/react';

import List from '.';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';

const pageUrl = '/getirWater/campaign/list';

describe('Campaigns', () => {
  let renderResult;
  it('should be rendered without error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_CAMPAIGNS_LIST,
      pageComponent: List,
      pageUrl,
    });
    const pageTitle = screen.getByText('Getir Water Campaigns');
    expect(pageTitle).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const vendorInformationTableContainer = renderResult.container.querySelector('.ant-table-container');

    expectTableToHaveColumnNames(vendorInformationTableContainer, [
      'Title',
      'Promotion Code',
      'Priority',
      'Status',
      'Total Usage Count',
      'Priority',
      'Valid From',
      'Valid Until',
      'Action',
    ]);
  });
});
