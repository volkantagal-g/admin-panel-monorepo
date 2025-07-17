import '@test/publicUtils/configureWithoutCleanup';
import { screen, within } from '@testing-library/react';

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
import { storeAuditListMock } from '@shared/api/kds/auditForm/index.mock.data';
import PageComponent from '.';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/kds/storeAudit/list';

describe('In Store Audit List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_STORE_AUDIT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Store Audit', 'Store Audit List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Store Audit List');
    });
  });
  describe('For page features', () => {
    let categoryTable;
    it('should match mock data informations in category table', async () => {
      [categoryTable] = await waitForAntTableBodies();

      await within(categoryTable).findByText(storeAuditListMock.data[0].warehouse.name);
      await within(categoryTable).findByText(storeAuditListMock.data[0].franchise.name);
      await within(categoryTable).findByText(storeAuditListMock.data[0].auditFormType[0].name.en);
      await within(categoryTable).findByText(storeAuditListMock.data[0].auditor.name);
      await within(categoryTable).findByText('Sent To Franchise');
    });

    it('should filtering component work', async () => {
      const [
        auditor,
        franchise,
        warehouse,
        warehouseType,
        domainType,
        status,
        city,
        auditType,
      ] = screen.getAllByRole('combobox');

      userEvent.click(auditor);
      const auditorName = await screen.findByText('Real Cenk Batman');
      userEvent.click(auditorName);
      await waitForItemToBeSelected('Real Cenk Batman');

      userEvent.click(warehouse);
      const whName = await screen.findByText('Gaziemir');
      userEvent.click(whName);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(franchise);
      const franchiseName = await screen.findByText(/Merve Ayçiçek/i);
      userEvent.click(franchiseName);
      await waitForItemToBeSelected(/Merve Ayçiçek/i);

      userEvent.click(warehouseType);
      const whType = await screen.findByText('Main Warehouse');
      userEvent.click(whType);
      await waitForItemToBeSelected('Main Warehouse');

      userEvent.click(domainType);
      const selectedDomain = await screen.findByText('Getir10');
      userEvent.click(selectedDomain);
      await waitForItemToBeSelected('Getir10');

      userEvent.click(status);
      const selectedStatus = await screen.findByText('Completed');
      userEvent.click(selectedStatus);
      await waitForItemToBeSelected('Completed');

      userEvent.click(city);
      const selectedCity = await screen.findByText('Istanbul');
      userEvent.click(selectedCity);
      await waitForItemToBeSelected('Istanbul');

      userEvent.click(auditType);
      const auditTypeName = await screen.findByText('Long Audit_edited');
      userEvent.click(auditTypeName);
      await waitForItemToBeSelected('Long Audit_edited');

      const bringButton = await screen.findByText('Bring');
      userEvent.click(bringButton);

      await waitForLoading();

      [categoryTable] = await waitForAntTableBodies();

      await within(categoryTable).findByText(storeAuditListMock.data[0].warehouse.name);
    });

    it('should pagination work', async () => {
      const [,,,,,,,, limit] = await screen.findAllByRole('combobox');
      userEvent.click(limit);
      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);
      await waitForItemToBeSelected('25');
    });
  });
});
