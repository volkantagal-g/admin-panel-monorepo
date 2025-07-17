import '@test/publicUtils/configureWithoutCleanup';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '@app/pages/ABTestV2/List';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

const url = '/abTestingv2/list';

describe('AB Test V2 List #RenderPage', () => {
  it('should render AB Test List page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_AB_TEST_V2_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
