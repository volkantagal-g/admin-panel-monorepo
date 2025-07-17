import '@test/publicUtils/configureWithoutCleanup';
import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/communication-history';

describe('In Communication History List Page:', () => {
  it('should render with perm key without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_HISTORY,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
