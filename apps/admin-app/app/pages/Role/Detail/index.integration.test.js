// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { get } from 'lodash';

import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import { mockedRole, mockedRoleUsers, mockedRoleHierarchy } from '@shared/api/role/index.mock.data';
import { mockedPageAndComponentPermissionsByRole } from '@shared/api/permission/index.mock.data';
import { mockedPages } from '@shared/api/page/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

import permKey from '@shared/shared/permKey.json';
import { mockedReportTagsByRoles } from '@shared/api/report/index.mock.data';

const roleTestId = 'test_id';
const initialUrl = `/role/detail/${roleTestId}`;

const nonPermittedPage = mockedPages[1];
const nonPermittedPageCountryNames = nonPermittedPage.countries.map(countryId => {
  const countryObj = mockedCountries.find(c => c._id === countryId);
  return countryObj.name.en;
});

describe('In Role Detail Page:', () => {
  let renderResult;
  describe('For role details', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_ROLE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Role Detail');
    });
    it('should show name, description', async () => {
      await screen.findByDisplayValue(mockedRole.name);
      await screen.findByDisplayValue(mockedRole.description.tr);
      await screen.findByDisplayValue(mockedRole.description.en);
    });

    it('should display parent info and parent role button', async () => {
      expect(screen.getByText(mockedRole.parent.name)).toBeInTheDocument();
      await screen.findByRole('button', { name: /parent role/i });
    });

    it('should be able to in activate the role', async () => {
      const activeSwitch = screen.getByRole('switch', { name: /Active/i });
      expect(activeSwitch).toBeInTheDocument();
      userEvent.click(activeSwitch);
      expect(activeSwitch).toBeInTheDocument('Inactive');
    });

    it('shouldn\'t see edit role info if not permitted', async () => {
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });

    it('should see edit role info if permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_ROLE_DETAIL_EDIT]);
      });
      screen.queryByText('Edit');
    });

    it('should have users table', () => {
      // once on the tab and once as the title of the card
      expect(screen.getAllByText('Role Owners and Members').length).toBe(2);
    });
    it('should bring users after button click', async () => {
      const bringUsersButton = screen.getAllByText('Bring Users')[0];
      userEvent.click(bringUsersButton);
      await screen.findByText(mockedRoleUsers(roleTestId)[0].email);
      expect(screen.getAllByText('Bring Users').length).toBe(1);
    });

    it('should have pages table', async () => {
      const acccessGrantedTab = screen.getByText('Access Granted Pages');
      userEvent.click(acccessGrantedTab);

      await waitFor(() => expect(screen.getAllByText('Access Granted Pages').length).toBe(2));
    });
    it('should bring pages after button click', async () => {
      const bringPagesButton = screen.getAllByText('Bring Pages')[0];
      userEvent.click(bringPagesButton);
      await screen.findByText(mockedPageAndComponentPermissionsByRole(roleTestId)[0].name.en);
      expect(screen.getAllByText('Bring Pages').length).toBe(1);
    });
    it('should not show pages not permitted', async () => {
      const notPermittedPage = screen.queryByText(nonPermittedPage.name.en);
      expect(notPermittedPage).not.toBeInTheDocument();
    });
    it('shouldn\'t show "Add Permission" button when not permitted', async () => {
      expect(screen.queryByText('Add Permission')).not.toBeInTheDocument();
    });

    let modalScreen;
    it('should show "Add Permission" button to open page addition modal when permitted', async () => {
      const { addUserPermissions } = renderResult;

      addUserPermissions([permKey.PAGE_ROLE_DETAIL_EDIT_ROLE_PERMISSIONS]);

      const addRolesButton = await screen.findByText('Add Permission');
      userEvent.click(addRolesButton);

      modalScreen = screen.getByRole('document');
      await within(modalScreen).findByRole('button', { name: 'Approve' });
    });
    it('should be able to search pages in modal', async () => {
      const [pagesSelect] = within(modalScreen).getAllByRole('combobox');

      // page selection
      userEvent.type(pagesSelect, 'SOME_PAGE_WHICH_DOESNT_EXIST');
      await waitFor(() => {
        // antd puts the dropdown outside the modal, so we need to find it in screen :face_with_rolling_eyes:
        const [pageListBox] = screen.getAllByRole('listbox');
        within(pageListBox).queryByText('No Data');
      });

      userEvent.clear(pagesSelect);
      userEvent.type(pagesSelect, nonPermittedPage.name.en.substring(0, 5));
      await waitFor(() => {
        const [pageListBox] = screen.getAllByRole('listbox');
        within(pageListBox).getByLabelText(nonPermittedPage.name.en);
      });
    });
    it('should be able search countries in the modal', async () => {
      const [, countriesSelect] = within(modalScreen).getAllByRole('combobox');
      const aPageCountryName = nonPermittedPageCountryNames[0];

      // page selection
      userEvent.type(countriesSelect, 'SOME_COUNTRY_WHICH_DOESNT_EXIST');
      await waitFor(() => {
        // antd puts the dropdown outside the modal, so we need to find it in screen :face_with_rolling_eyes:
        const [, countryListBox] = screen.getAllByRole('listbox');
        within(countryListBox).queryByText('No Data');
      });

      userEvent.clear(countriesSelect);
      userEvent.type(countriesSelect, aPageCountryName.substring(0, 3));
      await waitFor(() => {
        const [, countryListBox] = screen.getAllByRole('listbox');
        within(countryListBox).getByLabelText(aPageCountryName);
      });
    });
    it('should close the modal when cancel button is clicked', async () => {
      // screen.debug(modalScreen);
      const cancelButton = await within(modalScreen).findByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);
      // await waitFor(() => screen.queryByRole('document') === null);
    });

    let joinModalScreen;
    it('should show "Join" button to open modal to send join request', async () => {
      const joinButton = await screen.findByText('Join');
      userEvent.click(joinButton);

      await waitFor(async () => {
        joinModalScreen = screen.getByRole('document');
        await within(joinModalScreen).findByRole('button', { name: /Send Request/i });
      });
    });

    it('should contain join modal inputs', async () => {
      const permanentlyButton = within(joinModalScreen).getByLabelText(/Permanently/i);
      const temporarilyButton = within(joinModalScreen).getByLabelText(/Temporarily/i);
      const textarea = within(joinModalScreen).getByRole('textbox');
      expect(permanentlyButton).toBeInTheDocument();
      expect(temporarilyButton).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();

      userEvent.click(temporarilyButton);
      const durationButton = within(joinModalScreen).getByLabelText(/Duration/i);
      const dateButton = within(joinModalScreen).getByLabelText(/Until a Date/i);
      const noOfDaysInput = within(joinModalScreen).getByRole('spinbutton');
      expect(durationButton).toBeInTheDocument();
      expect(dateButton).toBeInTheDocument();
      expect(noOfDaysInput).toBeInTheDocument();
    });

    it('should close the join modal when cancel icon is clicked', async () => {
      const cancelButton = await within(modalScreen).findByRole('img');
      userEvent.click(cancelButton);
      await waitFor(() => screen.queryByRole('document') === null);
    });

    it('should have report tags table', async () => {
      const reportTagsTab = screen.getByText('Report Tags');
      userEvent.click(reportTagsTab);

      await waitFor(() => expect(screen.getAllByText('Report Tags').length).toBe(2));
    });

    it('should bring Report Tags after button click', async () => {
      const bringReportTagsButton = screen.getAllByText('Bring Report Tags')[0];
      userEvent.click(bringReportTagsButton);
      await screen.findByText(mockedReportTagsByRoles[0].name.en);
      expect(screen.getAllByText('Bring Report Tags').length).toBe(1);
    });

    it('should have role hierarchy table', async () => {
      const roleHierarchyTab = screen.getByText('Role Hierarchy');
      userEvent.click(roleHierarchyTab);

      await waitFor(() => {
        expect(screen.getByText(mockedRoleHierarchy.name)).toBeInTheDocument();
      });
      expect(screen.getAllByText(get(mockedRoleHierarchy, ['children', '0', 'name'])).length).toBeGreaterThan(1);
    });
  });
});
