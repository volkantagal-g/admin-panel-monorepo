import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, act, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { courierListMock } from '@shared/api/courierHandler/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2, expectToHavePageHeaderText, getAntTableBodies, getAntTableHeaderTables, waitForItemToBeSelected,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/courier/list';

describe('In Courier List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_COURIER_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Courier List']);
    });
  });
  describe('For page features', () => {
    let couriersTable;
    let headerTable;

    it('should have table header and body', async () => {
      await waitFor(() => {
        [headerTable] = getAntTableHeaderTables();
        expect(headerTable).toBeInTheDocument();
      });
      await waitFor(() => {
        [couriersTable] = getAntTableBodies();
        expect(couriersTable).toBeInTheDocument();
      });
    });

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Courier List');
    });

    it('should fill filter options', async () => {
      const nameInput = await screen.findByPlaceholderText('Name');

      fireEvent.change(nameInput, { target: { value: 'Berk' } });
      await waitFor(() => {
        expect(nameInput).toHaveValue('Berk');
      });

      const [
        status,
        activeness,
        loggedIn,
      ] = screen.getAllByRole('combobox');

      userEvent.click(status);
      const selectedStatus = await screen.findByText('Reserved');
      userEvent.click(selectedStatus);
      await waitForItemToBeSelected('Reserved');

      userEvent.click(activeness);
      const selectedActivenessItem = await screen.findByText(/Inactive/i);
      userEvent.click(selectedActivenessItem);
      await waitForItemToBeSelected(/Inactive/i);

      userEvent.click(loggedIn);
      const selectedLoggedInItem = await screen.findByText(/Yes/i);
      userEvent.click(selectedLoggedInItem);
      await waitForItemToBeSelected(/Yes/i);
    });

    it('should show true column names in couriers table', async () => {
      await within(headerTable).findByText('Name');
      await within(headerTable).findByText('Gsm');
      await within(headerTable).findByText('Activeness');
      await within(headerTable).findByText('Status');
      await within(headerTable).findByText('Logged in?');
      await within(headerTable).findByText('Action');
    });

    it('should show courier information in couriers table', async () => {
      await within(couriersTable).findByText(courierListMock.couriers[0].name);
      await within(couriersTable).findByText(courierListMock.couriers[0].gsm);
    });

    it('should pagination work', async () => {
      const comboboxes = await screen.findAllByRole('combobox');
      userEvent.click(comboboxes[3]);
      const [, selectedLimitNumber] = screen.getAllByText('10');
      userEvent.click(selectedLimitNumber);
      await waitForItemToBeSelected('10');
    });
    it('shouldn\'t show courier detail button when not permitted', async () => {
      expect(within(couriersTable).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
    });
    it('should show courier detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL]);
      });
      await within(couriersTable).findAllByRole('button', { name: 'Detail' });
    });
  });
});
