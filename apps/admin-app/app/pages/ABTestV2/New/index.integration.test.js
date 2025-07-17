import '@test/publicUtils/configureWithoutCleanup';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '@app/pages/ABTestV2/New';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

const url = '/abTestingv2/new';

describe('AB Test V2 New #RenderPage', () => {
  it('should render AB Test New page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_AB_TEST_V2_NEW,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
