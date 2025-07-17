import '@test/publicUtils/configureWithoutCleanup';
import { within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import { mockedDysPrioritySetting } from '@shared/api/dts/index.mock.data';
import PageComponent from '.';

const initialUrl = '/dts/setting/priority/list';

describe('In DTS Priority Setting List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_PRIORITY_SETTING_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'DTS Priority Setting List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Disciplinary Tracking System Priority Setting List');
    });
  });
  describe('For page features', () => {
    let priorityTable;
    it('should show priority information in table', async () => {
      [priorityTable] = await waitForAntTableBodies();

      await within(priorityTable).findByText(mockedDysPrioritySetting.title.en);
      await within(priorityTable).findByText(mockedDysPrioritySetting.description.en);
      await within(priorityTable).findByText(mockedDysPrioritySetting.rejectionPoint);
      await within(priorityTable).findByText(mockedDysPrioritySetting.warningPoint);
      await within(priorityTable).findByText('Inactive');
    });
  });
});
