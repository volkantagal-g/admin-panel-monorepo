import { screen } from '@testing-library/react';

import List from '.';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';

const pageUrl = '/getirWater/announcement/list';

describe('Announcements', () => {
  it('should be rendered without error', async () => {
    const { container } = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_ANNOUNCEMENTS_LIST,
      pageComponent: List,
      pageUrl,
    });
    const pageTitle = screen.getByText('Getir Water Announcements');
    expect(pageTitle).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const vendorInformationTableContainer = container.querySelector('.ant-table-container');
    expectTableToHaveColumnNames(vendorInformationTableContainer, [
      'Title',
      'Valid From',
      'Valid Until',
      'Status',
      'Action',
    ]);
  });
});
