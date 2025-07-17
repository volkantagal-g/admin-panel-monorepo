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
import PageComponent from '.';
import { mockedQuestionList } from '@shared/api/kds/question/index.mock.data';

const initialUrl = '/kds/question/list';

describe('In Question List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_KDS_QUESTION_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Store Audit', 'Question List']);
    });
    it('should have correct page content', async () => {
      expectToHavePageHeaderText('Question List');
      expect(screen.getByText('Question Name')).toBeInTheDocument();
      expect(screen.getByText('Question Group Name')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    let questionListTable;
    it('should match mock data informations in question table', async () => {
      [questionListTable] = await waitForAntTableBodies();

      await within(questionListTable).findByText(mockedQuestionList.data[0].questionName.en);
      await within(questionListTable).findByText(mockedQuestionList.data[0].questionGroupName.en);
    });

    it('should pagination work', async () => {
      const limit = await screen.findByRole('combobox');
      userEvent.click(limit);

      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });
  });
});
