import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen, waitFor, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { mockEmployeeAssignedAssets } from '@shared/api/employee/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, getAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/employee/detail/62cedb9f89119055ad77aa91/asset/list';

describe('In Employee Detail Asset List Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    let table;

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Employee Assets');
    });

    it('shouldn\'t show Add New Asset button in the page', async () => {
      expect(screen.queryByRole('button', { name: 'Add New Asset' })).not.toBeInTheDocument();
    });
    it('should show Add New Asset button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST_COMPONENT_MANAGE_ASSETS]);
      });
      await screen.findByText('Add New Asset');
    });

    it('should show employee assets information in table', async () => {
      await waitFor(() => {
        const tables = getAntTableBodies();
        expect(tables.length).toBeGreaterThan(0);
        [table] = tables;
      });

      await within(table).findByText(mockEmployeeAssignedAssets[0].name);
    });
    it('shouldn\'t show detail action button in table', async () => {
      expect(within(table).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
    });
    it('should show Return Asset button when it\'s not returned yet', async () => {
    //   expect(within(table).getByRole('button', { name: 'Return Asset' })).toBeInTheDocument();
      await within(table).findAllByRole('button', { name: 'Return Asset' });
    });
    it('should show detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_EMPLOYEE_ASSET_DETAIL]);
      });
      await within(table).findAllByRole('button', { name: 'Detail' });
    });
  });
});
