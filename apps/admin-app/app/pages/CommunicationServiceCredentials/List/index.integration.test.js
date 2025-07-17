import '@test/publicUtils/configureWithoutCleanup';
import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import PageComponent from 'pages/CommunicationServiceCredentials/List/index';

const initialUrl = '/communication-service-credentials/list';

describe('In Communication Service Credentials List Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_SERVICE_CREDENTIALS_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
