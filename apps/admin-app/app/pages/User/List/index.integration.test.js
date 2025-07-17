// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { act, within } from '@testing-library/react';

import { mockedUsers } from '@shared/api/user/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/user/list';

describe('In User List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_USER_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Admin Platform', ['Users']);
    });
  });
  describe('For page features', () => {
    let usersTable;

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Users');
    });

    it('should show user information in users table', async () => {
      // there are multiple tables in ant design table component, for header and body
      const tables = await waitForAntTableBodies();
      // body part is what we want
      [usersTable] = tables;
      await within(usersTable).findByText(mockedUsers.users[0].email);
      await within(usersTable).findByText(mockedUsers.users[0].name);
    });
    it('should show user action buttons in users table', async () => {
      await within(usersTable).findByRole('button', { name: 'Display Roles' });
      await within(usersTable).findByRole('button', { name: 'Display Countries' });
    });
    it('shouldn\'t show user detail button when not permitted', async () => {
      expect(within(usersTable).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
    });
    it('should show user detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_USER_DETAIL]);
      });
      await within(usersTable).findByRole('button', { name: 'Detail' });
    });
  });
});
