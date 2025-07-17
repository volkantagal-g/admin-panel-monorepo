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
import { mockedDtsViolationList } from '@shared/api/dts/index.mock.data';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { DtsDecisionCodes, DtsStatusCodes } from '../constant';
import { getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const initialUrl = '/dts/list';

describe('In DTS List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'DTS List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Disciplinary Tracking System List');
    });
  });
  describe('For page features', () => {
    let table;
    it('should filter and match mock data informations in table', async () => {
      [table] = await waitForAntTableBodies();

      const [reporter, warehouse, ruleNumber, status, decision] = await screen.findAllByRole('combobox');

      userEvent.click(reporter);
      const selectedReporterItem = await screen.findByText('Berk Ozturk');
      userEvent.click(selectedReporterItem);
      await waitForItemToBeSelected('Berk Ozturk');

      userEvent.click(warehouse);
      const selectedWarehouseItem = await screen.findByText('Gaziemir');
      userEvent.click(selectedWarehouseItem);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(ruleNumber);
      const selectedRuleItem = await screen.findByText('500');
      userEvent.click(selectedRuleItem);
      await waitForItemToBeSelected('500');

      userEvent.click(status);
      const selectedStatusItem = await screen.findByText('Waiting for apology');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Waiting for apology');

      userEvent.click(decision);
      const selectedDecisionItem = await screen.findByText('Warn');
      userEvent.click(selectedDecisionItem);
      await waitForItemToBeSelected('Warn');

      const submitButton = screen.getByText('Bring');
      userEvent.click(submitButton);

      await waitForLoading();

      await within(table).findByText(mockedDtsViolationList.records[0].reporter.email);
      await within(table).findByText(mockedDtsViolationList.records[0].warehouseName);
      await within(table).findByText(mockedDtsViolationList.records[0].rule.ruleNumber);
      await within(table).findByText(mockedDtsViolationList.records[0].description);
      await within(table).findByText(DtsStatusCodes[mockedDtsViolationList.records[0].status].en);
      await within(table).findByText(DtsDecisionCodes[mockedDtsViolationList.records[0].decision.status].en);
      await within(table).findByText(mockedDtsViolationList.records[0].decision.point);
      await within(table).findByText('Inactive');
    });

    it('should show user detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_DETAIL]);
      });
      await within(table).findByRole('button', { name: 'Detail' });
    });

    it('should pagination work', async () => {
      const [,,,,, limit] = await screen.findAllByRole('combobox');
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
        expect(screen.queryByText('Disciplinary Tracking System List')).not.toBeInTheDocument();
      });
    });
  });
});
