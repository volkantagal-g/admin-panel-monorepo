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
import { mockedDtsRuleList } from '@shared/api/dts/index.mock.data';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/dts/rule/list';

describe('In DTS Rule List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_RULE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'DTS Rule List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Disciplinary Tracking System Rule List');
    });
  });
  describe('For page features', () => {
    let table;
    it('should match mock data informations in table', async () => {
      [table] = await waitForAntTableBodies();

      await within(table).findByText(mockedDtsRuleList.records[0].ruleNumber);
      await within(table).findByText(mockedDtsRuleList.records[0].title.en);
      await within(table).findByText(mockedDtsRuleList.records[0].category.title.en);
      await within(table).findByText(mockedDtsRuleList.records[0].priority.title.en);
      await within(table).findByText('Warning');
      await within(table).findByText('Active');
    });

    it('should show user detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_RULE_DETAIL]);
      });
      await within(table).findByRole('button', { name: 'Detail' });
    });

    it('should pagination work', async () => {
      const limit = await screen.findByRole('combobox');
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
        expect(screen.queryByText('Disciplinary Tracking System Rule List')).not.toBeInTheDocument();
      });
    });
  });
});
