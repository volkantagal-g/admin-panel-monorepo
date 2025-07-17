import '@test/publicUtils/configureWithoutCleanup';
import { within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, waitForAntTableBodies } from '@test/publicUtils/assertions';
import { mockedWarehouses } from '@shared/api/warehouse/index.mock.data';
import PageComponent from '.';

const initialUrl = '/warehouse/list';

describe('In warehouse List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WAREHOUSE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Warehouse & Franchise']);
    });
  });
  describe('For page features', () => {
    let warehouseTable;

    it('should show user information in warehouse table', async () => {
      // there are multiple tables in ant design table component, for header and body
      const tables = await waitForAntTableBodies();
      // body part is what we want
      [warehouseTable] = tables;
      await within(warehouseTable).findByText(mockedWarehouses[0].name);
    });
    it('should show detail action buttons in warehouse table', async () => {
      await within(warehouseTable).findAllByRole('button', { name: 'Detail' });
    });
  });
});
