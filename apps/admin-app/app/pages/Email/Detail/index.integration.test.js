import '@test/publicUtils/configureWithoutCleanup';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/email/detail/id';

describe('In Email Detail Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_EMAIL_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
