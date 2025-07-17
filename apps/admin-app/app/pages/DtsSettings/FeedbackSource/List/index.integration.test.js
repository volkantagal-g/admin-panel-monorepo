import '@test/publicUtils/configureWithoutCleanup';
import { act, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import { mockedDysFeedbackSetting } from '@shared/api/dts/index.mock.data';
import PageComponent from '.';

const initialUrl = '/dts/setting/feedbacksource/list';

describe('In DTS Feedback Source Setting List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_FEEDBACK_SOURCE_SETTING_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'DTS Feedback Source Setting List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Disciplinary Tracking System Feedback Source Setting List');
    });
  });
  describe('For page features', () => {
    let feedbackSourceTable;
    it('should match mock data informations in category table', async () => {
      [feedbackSourceTable] = await waitForAntTableBodies();

      await within(feedbackSourceTable).findByText(mockedDysFeedbackSetting.title.en);
      await within(feedbackSourceTable).findByText(mockedDysFeedbackSetting.description.en);
      await within(feedbackSourceTable).findByText('Inactive');
    });
    it('should show feedback source detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_FEEDBACK_SOURCE_SETTING_DETAIL]);
      });
      await within(feedbackSourceTable).getAllByRole('button', { name: 'Detail' })[0];
    });
  });
});
