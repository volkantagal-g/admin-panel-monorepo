import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText,
  expectSidebarMenuToHaveV2,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/config/list';

describe('In Config List Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_CONFIG_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Tech', ['Configurations']);
    });
    it('should have the correct page header', () => {
      expectToHavePageHeaderText('Configs');
    });
  });
  describe('For page level features', () => {
    it('should render headers without an error', async () => {
      await screen.findAllByText('Configs');
    });
  });
});
