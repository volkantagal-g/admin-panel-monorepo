import '@test/publicUtils/configureWithoutCleanup';
import { within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import { mockedDysCategorySetting } from '@shared/api/dts/index.mock.data';
import PageComponent from '.';

const initialUrl = '/dts/setting/category/list';

describe('In DTS Category Setting List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_CATEGORY_SETTING_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'DTS Category Setting List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Disciplinary Tracking System Category Setting List');
    });
  });
  describe('For page features', () => {
    let categoryTable;
    it('should match mock data informations in category table', async () => {
      [categoryTable] = await waitForAntTableBodies();

      await within(categoryTable).findByText(mockedDysCategorySetting.title.en);
      await within(categoryTable).findByText(mockedDysCategorySetting.description.en);
      await within(categoryTable).findByText('Inactive');
    });
  });
});
