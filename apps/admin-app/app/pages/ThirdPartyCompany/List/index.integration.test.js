import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/thirdPartyCompany/list';

describe('In 3rd Party Company Lıst Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_THIRD_PARTY_COMPANY_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Tech', ['3rd Party Company Int.']);
    });
    it('should have the correct page header', () => {
      expectToHavePageHeaderText('3rd Party Companies');
    });
  });
});
