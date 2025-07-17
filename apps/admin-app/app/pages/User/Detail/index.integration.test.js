// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { mockedUser, mockedUserRoles } from '@shared/api/user/index.mock.data';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectTableToHaveColumnNames, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const userCountries = mockedUser.countries;
const userCountryNames = userCountries.map(countryId => {
  const countryObj = mockedCountries.find(c => c._id === countryId);
  return countryObj.name.en;
});

const userTestId = 'test_id';
const initialUrl = `/user/detail/${userTestId}`;

describe('In User Detail Page:', () => {
  let pageContent;
  let renderResult;
  describe('For user details', () => { // successfu
    it('should render successfully ', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_USER_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('User Detail');
      pageContent = screen.getByRole('main');
    });
    it('should show name, email', async () => {
      await screen.findByDisplayValue(mockedUser.name);
      await screen.findByDisplayValue(mockedUser.email);
    });

    it.each(userCountryNames)('User country "%s" should be visible', async countryName => {
      await within(pageContent).findByText(countryName);
    });

    it('should have role table', async () => {
      await screen.findByText("User's Roles");
    });
    let userRoletable;

    it('should have role table with correct headers', async () => {
      userRoletable = screen.getByTestId('user-role-table');
      const { addUserPermissions } = renderResult;
      const commonHeaders = ['Name', 'Membership Type', 'Join Date'];
      expectTableToHaveColumnNames(userRoletable, commonHeaders);
      // Action is behind permission
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
      act(() => {
        addUserPermissions([permKey.PAGE_USER_DETAIL_EDIT_ROLE_MEMBERSHIP]);
      });

      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should have fill the role table after clicking "Bring" button', async () => {
      const getRolesButton = screen.getAllByText('Bring Roles')[0];
      userEvent.click(getRolesButton);
      await screen.findByText(mockedUserRoles[0].name);
      const standardRoleMemberships = await screen.findAllByText('Standard');
      expect(standardRoleMemberships.length).toBeGreaterThan(0);

      expect(screen.getAllByText('Bring Roles').length).toBe(1);
    });

    it('should not have page permission table by default', async () => {
      expect(screen.queryByText('Page Permission Information')).not.toBeInTheDocument();
    });

    it('should have page permission table with correct headers after permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_USER_DETAIL_VIEW_TOTAL_PERMISSIONS]);
      });

      await screen.findByText('Page Permission Information');

      const table = screen.getByTestId('user-page-permission-table');
      const headers = ['Name', 'Responsibility', 'Countries'];

      expectTableToHaveColumnNames(table, headers);
    });
  });
});
