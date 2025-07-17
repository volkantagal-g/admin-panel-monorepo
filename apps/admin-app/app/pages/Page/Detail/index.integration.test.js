/* eslint-disable testing-library/no-unnecessary-act */
// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockedPage, mockedPageRoles } from '@shared/api/page/index.mock.data';
import { mockedRole } from '@shared/api/role/index.mock.data';
import { mockedFilteredUsersWithRestrictedData } from '@shared/api/user/index.mock.data';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import {
  expectSelectItemAndWaitForToBeSelected,
  expectToHavePageHeaderText,
  waitForItemToBeSelected,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

import permKey from '@shared/shared/permKey.json';

const pageCountries = mockedPage.countries;
const pageCountryNames = pageCountries.map(countryId => {
  const countryObj = mockedCountries.find(c => c._id === countryId);
  return countryObj.name.en;
});
const pageOwnerNames = mockedPage.pageOwners.map(owner => owner.name);

const initialUrl = '/page/detail/test_id';

describe('In Page Detail Page:', () => {
  let renderResult;
  let pageContent;
  describe('For page details', () => {
    it('should render successfully', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PAGE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      pageContent = screen.getByRole('main');
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Page Detail');
    });
    it('should show name, description, permKey', async () => {
      await screen.findByDisplayValue(mockedPage.name.tr);
      await screen.findByDisplayValue(mockedPage.name.en);
      await screen.findByDisplayValue(mockedPage.description.tr);
      await screen.findByDisplayValue(mockedPage.description.en);
      await screen.findByDisplayValue(mockedPage.permKey);
    });
    it.each(pageCountryNames)('Page country "%s" should be visible', async countryName => {
      await within(pageContent).findByText(countryName);
    });

    it('should have page components table', async () => {
      await waitFor(() => expect(screen.getAllByText('Page Components').length).toBe(2));
    });

    it('should have page owners table', async () => {
      const pageOwnersTab = screen.getByText('Page Owners Info');
      userEvent.click(pageOwnersTab);

      await waitFor(() => expect(screen.getAllByText('Page Owners Info').length).toBe(2));
      pageOwnerNames.map(async ownerName => {
        await screen.findByText(ownerName);
      });
    });

    it('should have roles table', async () => {
      const rolesGrantedTab = screen.getByText('Roles That Are Granted Access');
      userEvent.click(rolesGrantedTab);

      await waitFor(() => expect(screen.getAllByText('Roles That Are Granted Access').length).toBe(2));
    });

    it('should bring roles after button click', async () => {
      const bringRolesButton = screen.getAllByText('Bring Roles')[0];
      userEvent.click(bringRolesButton);
      await screen.findByText(mockedPageRoles[0].name);

      expect(screen.getAllByText('Bring Roles').length).toBe(1);
    });
  });
  describe('For permission specific actions', () => {
    it('should be editable', async () => {
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();

      const { addUserPermissions } = renderResult;
      addUserPermissions([permKey.PAGE_PAGE_DETAIL_EDIT_PAGE_INFO]);

      const editButton = await screen.findByText('Edit');
      userEvent.click(editButton);

      const pageNameInput = await screen.findByDisplayValue(mockedPage.name.en);
      userEvent.type(pageNameInput, 'new page name');

      const saveButton = await screen.findByText('Save');
      userEvent.click(saveButton);
    });

    it('should show and be able to use page owner addition button/modal when permitted', async () => {
      userEvent.click(screen.getAllByText('Page Owners Info')[0], null, { skipPointerEventsCheck: true });

      const { addUserPermissions } = renderResult;

      addUserPermissions([permKey.PAGE_PAGE_DETAIL_COMPONENT_EDIT_PAGE_OWNERS]);
      const addOwnerButton = await screen.findByText('Add Owner');
      userEvent.click(addOwnerButton);

      await screen.findByRole('document');

      const search = screen.getAllByRole('combobox')[1];
      await expectSelectItemAndWaitForToBeSelected(search, mockedFilteredUsersWithRestrictedData.users[0].name);

      userEvent.click(screen.getByText('Add'));
      await waitFor(() => expect(screen.queryByRole('document')).not.toBeInTheDocument());
    });

    it('should be able to remove page owners', async () => {
      userEvent.click(screen.getAllByText('Page Owners Info')[0], null, { skipPointerEventsCheck: true });

      const removeOwnerButton = (await screen.findAllByText('Remove'))[0];
      userEvent.click(removeOwnerButton);

      userEvent.click(screen.getByText('OK'));
    });

    it('should show and be able to use role addition button/modal when permitted', async () => {
      userEvent.click(screen.getAllByText('Roles That Are Granted Access')[0], null, { skipPointerEventsCheck: true });
      const { addUserPermissions } = renderResult;

      addUserPermissions([permKey.PAGE_PAGE_DETAIL_EDIT_ROLES]);
      const addRolesButton = await screen.findByText('Add Role');
      userEvent.click(addRolesButton);

      let modalScreen = await screen.findByRole('document');

      const [roleSelect, countrySelect] = within(modalScreen).getAllByRole('combobox');

      await expectSelectItemAndWaitForToBeSelected(roleSelect, mockedRole.name);
      await expectSelectItemAndWaitForToBeSelected(countrySelect, 'Turkey', /🇹🇷 - Turkey/);

      userEvent.click(countrySelect);
      await waitFor(() => expect(screen.getAllByText('Global Access').length).toBe(2));
      userEvent.click(screen.getAllByText('Global Access')[1]);
      await waitForItemToBeSelected('🌐 - Global Access');

      await act(async () => userEvent.click(await within(modalScreen).findByText('Add Components')));
      await act(async () => userEvent.click(await within(modalScreen).findByText('Remove')));
      await act(async () => userEvent.click(await within(modalScreen).findByText('Add Components')));

      await waitFor(() => expect(within(modalScreen).getAllByRole('combobox').length).toBe(4));
      const [/* roleSelect */, /* countrySelect */, componentSelect, componentCountrySelect] = within(modalScreen).getAllByRole('combobox');

      await expectSelectItemAndWaitForToBeSelected(componentCountrySelect, 'Turkey', /🇹🇷 - Turkey/);
      /*
       * this entire block could be replaced by a single call to `expectSelectItemAndWaitForToBeSelected`
       * except it inexplicably breaks in this case. it also breaks the country selection, so this has to happen after the line above
       * I have no idea why these restrictions apply as it works exactly as expected for the role select
       */
      {
        const componentName = mockedPage.components[0].name.en;
        userEvent.type(componentSelect, componentName);
        await waitFor(() => expect(screen.getAllByText(componentName).length).toBe(2));
        userEvent.click(screen.getAllByText(componentName)[1]);
        await waitForItemToBeSelected(componentName);
      }

      userEvent.click(within(modalScreen).getByText('Save'));

      // adding another component should be possible after saving the first
      userEvent.click(await within(modalScreen).findByText('Add Components'));
      userEvent.click(within(modalScreen).getAllByText('Remove')[1]);

      const approveButton = within(modalScreen).getByText('Approve');
      userEvent.click(approveButton);
      userEvent.click(await screen.findByText('Ok'));
      await waitFor(() => expect(screen.queryByRole('document')).not.toBeInTheDocument());

      userEvent.click(addRolesButton);
      modalScreen = await screen.findByRole('document');
      userEvent.click(await within(modalScreen).findByText('Cancel'));
      await waitFor(() => expect(screen.queryByRole('document')).not.toBeInTheDocument());
    });

    it('should show and be able to use page documentation addition button/modal when permitted', async () => {
      userEvent.click(screen.getAllByText('Documentation Info')[0], null, { skipPointerEventsCheck: true });
      const addDocumentButton = await screen.findByText('Add Document');
      userEvent.click(addDocumentButton);

      await screen.findByRole('document');

      const [,,,,, nameTr, nameEn] = screen.getAllByRole('textbox');
      userEvent.type(nameTr, 'documentation name');
      userEvent.type(nameEn, 'documentation name');

      userEvent.click(screen.getByText('Save'));
      await waitFor(() => expect(screen.queryByRole('document')).not.toBeInTheDocument());
    });
  });
});
