import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText,
  waitForItemToBeSelected,
  waitForAntTableBodies,
  waitForAntTableHeaderTables,
} from '@test/publicUtils/assertions';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getWarehouseListConfigMock, getFranchiseListConfigMock } from '@shared/api/franchiseBillManagement/index.mock.handler';
import { billListMock } from '@shared/api/franchiseBillManagement/index.mock.data';

const initialUrl = '/franchiseBillManagement/list';
describe('In Franchise Bill Management List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getFranchiseListConfigMock);
      mockApiPerTestCase(getWarehouseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Bill List');
    });
  });

  describe('For page features', () => {
    let billTableHeader;
    let billTableBody;

    it('should have correct filter component content', () => {
      expect(screen.getAllByText('Filter').length).toBe(3);
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getAllByText('Franchise').length).toBe(2);
      expect(screen.getAllByText('Warehouse').length).toBe(2);
      expect(screen.getByText('Domain Type')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Bring' })).toBeInTheDocument();
    });

    it('should have correct table component content', async () => {
      [billTableHeader] = await waitForAntTableHeaderTables();
      within(billTableHeader).getByText('Franchise');
      within(billTableHeader).getByText('Warehouse');
      within(billTableHeader).getByText('Last Read Date');
      within(billTableHeader).getByText('Day Difference');
      within(billTableHeader).getByText('Number of Days');
      within(billTableHeader).getByText('Total Consumption');
      within(billTableHeader).getByText('Total Amount');
    });

    it('should filter and get mock data', async () => {
      const [franchiseSelectInput] = await screen.findAllByRole('combobox');
      userEvent.click(franchiseSelectInput);
      let selectedFranchise;
      await waitFor(() => {
        selectedFranchise = screen.getByText('Getir');
        expect(selectedFranchise);
      });
      userEvent.click(selectedFranchise);
      await waitForItemToBeSelected('Getir');

      const bringButton = screen.getByRole('button', { name: 'Bring' });
      userEvent.click(bringButton);

      [billTableBody] = await waitForAntTableBodies();
      await waitFor(() => {
        within(billTableBody).getAllByText(billListMock.data[0].warehouse);
      });
      within(billTableBody).getAllByText(billListMock.data[0].franchise);
    });

    it('should show bill detail button', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_DETAIL]);
      });

      [billTableBody] = await waitForAntTableBodies();
      await waitFor(() => {
        within(billTableBody).getAllByRole('button', { name: 'Detail' });
      });
    });

    it('should be able to work correctly export franchise bills button', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_LIST_EXCEL_EXPORT]);
      });

      const exportButton = screen.getByTestId('EXPORT_FRANCHISE_BILL_LIST_BUTTON');
      userEvent.click(exportButton);

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });
});
