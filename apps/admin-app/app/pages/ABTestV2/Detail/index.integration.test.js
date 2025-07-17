import '@test/publicUtils/configureWithoutCleanup';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '@app/pages/ABTestV2/Detail';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

const url = '/abTestingv2/detail/4442629de3d7fba1fbe1302aea337317';

describe('AB Test V2 Detail #RenderPage', () => {
  it('should render AB Test Detail page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_AB_TEST_V2_DETAIL,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
