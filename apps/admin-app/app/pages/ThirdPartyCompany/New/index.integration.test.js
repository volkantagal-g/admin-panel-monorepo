import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/thirdPartyCompany/new';

describe('In 3rd Party Company New Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_THIRD_PARTY_COMPANY_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have the correct page header', () => {
      expectToHavePageHeaderText('New 3rd Party Company');
    });
  });
});
