import '@test/publicUtils/configureWithoutCleanup';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { mockedPage as mockPage } from '@shared/api/page/index.mock.data';
import PageComponent from '.';

describe('Market Product Category Visibility Detail Page', () => {
  const initialUrl = `/marketProduct/category/visibility/detail/${mockPage._id}`;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page feature', () => {
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Category Visibility');
    });
  });
});
