import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, waitFor, within } from '@testing-library/react';

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
import { mockedDdsObjectionList } from '@shared/api/dds/index.mock.data';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { ddsObjectionStatuses } from '@shared/shared/constantValues';

const initialUrl = '/dds/objection/list';

describe('In SES Objection List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DDS_OBJECTION_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'SES Objection List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Store Efficiency System Objection List');
    });
  });
  describe('For page features', () => {
    let table;
    it('should filter and match mock data informations in table', async () => {
      [table] = await waitForAntTableBodies();

      const [franchise, warehouse, status, criteria] = await screen.findAllByRole('combobox');

      userEvent.click(franchise);
      const franchiseName = await screen.findByText(/Merve Ayçiçek/i);
      userEvent.click(franchiseName);
      await waitForItemToBeSelected(/Merve Ayçiçek/i);

      userEvent.click(warehouse);
      const [selectedWarehouseItem] = await screen.findAllByText('Gaziemir');
      userEvent.click(selectedWarehouseItem);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(criteria);
      const selectedRuleItem = await screen.findByText('Waybills');
      userEvent.click(selectedRuleItem);
      await waitForItemToBeSelected('Waybills');

      userEvent.click(status);
      const selectedStatusItem = await screen.findByText('Accepted');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Accepted');

      const submitButton = screen.getByText('Bring');
      userEvent.click(submitButton);

      await waitForLoading();

      await within(table).findByText(mockedDdsObjectionList.ddsObjections[0].warehouse.name);
      await within(table).findByText(mockedDdsObjectionList.ddsObjections[0].franchise.name);
      await within(table).findByText(mockedDdsObjectionList.ddsObjections[0].criteria.name.en);
      await within(table).findByText('2023/04/12 03:00 AM');
      await within(table).findByText(ddsObjectionStatuses[mockedDdsObjectionList.ddsObjections[0].status].en);
    });

    it('should show user detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DDS_OBJECTION_DETAIL]);
      });
      await within(table).findByRole('button', { name: 'Detail' });
    });

    it('should pagination work', async () => {
      const [,,,, limit] = await screen.findAllByRole('combobox');
      userEvent.click(limit);

      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });

    it('should detail button click', async () => {
      const detailButton = screen.getByText('Detail');
      userEvent.click(detailButton);

      await waitForLoading();

      await waitFor(() => {
        expect(screen.queryByText('Store Efficiency System Objection List')).not.toBeInTheDocument();
      });
    });
  });
});
