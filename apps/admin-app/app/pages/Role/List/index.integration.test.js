import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies,
} from '@test/publicUtils/assertions';
import { mockedRoles } from '@shared/api/role/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/role/list/allRoles';

describe('In Role List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_ROLE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Admin Platform', ['Roles']);
    });
  });

  describe('For page features', () => {
    let rolesTable;

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Roles');
    });

    it('should show role information in roles table', async () => {
      // there are multiple tables in ant design table component, for header and body
      const tables = await waitForAntTableBodies();
      // body part is what we want
      [rolesTable] = tables;
      await within(rolesTable).findByText(mockedRoles[0].name);
      await within(rolesTable).findByText(mockedRoles[0].description.en);
    });

    it('shouldn\'t show role detail button when not permitted', async () => {
      expect(within(rolesTable).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
    });

    it('should show role detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_ROLE_DETAIL]);
      });
      await within(rolesTable).findAllByRole('button', { name: 'Detail' });
    });

    it('shouldn\'t see new role button if not permitted', async () => {
      expect(screen.queryByText('New Role')).not.toBeInTheDocument();
    });

    it('should see edit role info if permitted', async () => {
      const { addUserPermissions } = renderResult;
      addUserPermissions([permKey.PAGE_ROLE_NEW]);

      expect(screen.getByText('New Role')).toBeInTheDocument();
    });

    it('should see role hierarchy button if permitted', async () => {
      expect(screen.queryByText('Role Hierarchy')).not.toBeInTheDocument();
      const { addUserPermissions } = renderResult;
      addUserPermissions([permKey.PAGE_ROLE_HIERARCHY]);

      expect(screen.getByText('Role Hierarchy')).toBeInTheDocument();
    });

    it('should see export roles button', async () => {
      expect(screen.getByText('Export Roles')).toBeInTheDocument();
    });

    it('should display search box', async () => {
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    let tabs;
    it('should contain all the tables', async () => {
      // once on the tab and once as the title of the card
      tabs = await screen.findAllByRole('tab');
      expect(tabs.length).toBe(4);
    });

    it('should contain roles table', async () => {
      userEvent.click(tabs[0]);
      await screen.findByText(mockedRoles[0].name);
      await screen.findByText(mockedRoles[0].description.en);
    });

    it('should contain my roles table', async () => {
      userEvent.click(tabs[1]);
      await screen.findByText(mockedRoles[0].name);
      await screen.findByText(mockedRoles[0].description.en);
    });
  });
});
