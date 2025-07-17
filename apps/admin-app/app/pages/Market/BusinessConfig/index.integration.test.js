import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/market/businessConfig';

describe('In Market Business Config Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_BUSINESS_CONFIG,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have the correct page header', () => {
      expectToHavePageHeaderText('Business Config');
    });
  });
});
