import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies,
  waitForItemToBeSelected,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { franchiseEquipmentListMock } from '@shared/api/franchiseEquipment/index.mock.data';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const initialUrl = '/franchiseEquipment/list';

describe('In Franchise Equipment List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_EQUIPMENT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Warehouse & Franchise', 'Franchise Equipment List']);
      await waitForLoading();
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Equipment');
    });
  });
  describe('For page features', () => {
    let table;
    it('should change filter options', async () => {
      const [franchise, warehouse] = screen.getAllByRole('combobox');

      userEvent.click(warehouse);
      const whName = await screen.findByText('Gaziemir');
      userEvent.click(whName);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(franchise);
      const franchiseName = await screen.findByText(/Merve Ayçiçek/i);
      userEvent.click(franchiseName);
      await waitForItemToBeSelected(/Merve Ayçiçek/i);

      const bringButton = await screen.findByText('Bring');
      userEvent.click(bringButton);
    });
    it('should filter and match mock data informations in table', async () => {
      [table] = await waitForAntTableBodies();

      await within(table).findByText(franchiseEquipmentListMock[0].warehouseName);
      await within(table).findByText(franchiseEquipmentListMock[0].franchiseName);
      await within(table).findByText(franchiseEquipmentListMock[0].motoCount);
      await within(table).findByText(franchiseEquipmentListMock[0].carCount);
    });

    it('should go another page', async () => {
      const newEquipmentAgreement = await screen.findByText('New Equipment Agreement');
      userEvent.click(newEquipmentAgreement);

      await waitForLoading();

      await waitFor(() => {
        expect(screen.queryByText('Franchise Equipment')).not.toBeInTheDocument();
      });
    });
  });
});
