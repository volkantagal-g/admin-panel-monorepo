import '@test/publicUtils/configureWithoutCleanup';
import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import PageComponent from 'pages/CommunicationCallbackUrls/List/index';

const initialUrl = '/callback-urls/list';

describe('In Callback Urls List Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_CALLBACK_URLS_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
