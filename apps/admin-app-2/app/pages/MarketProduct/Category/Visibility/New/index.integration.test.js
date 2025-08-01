import '@test/publicUtils/configureWithoutCleanup';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

describe('Market Product Category Visibility New Page', () => {
  const initialUrl = '/marketProduct/category/visibility/new';

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_VISIBILITY_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page feature', () => {
    it('should have correct page header', () => {
      expectToHavePageHeaderText('New Category Visibility');
    });
  });
});
