import '@test/publicUtils/configureWithoutCleanup';
import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import PageComponent from 'pages/CommunicationBulkSms/List/index';

const initialUrl = '/bulk-sms/list';

describe('In Bulk Sms List Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_BULK_SMS_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
