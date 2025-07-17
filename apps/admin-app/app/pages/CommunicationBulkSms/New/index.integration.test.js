import '@test/publicUtils/configureWithoutCleanup';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import PageComponent from 'pages/CommunicationBulkSms/New/index';
import { ContentInformationForm, GeneralInformationForm } from '@app/pages/CommunicationBulkSms/New/components';

const initialUrl = '/bulk-sms/new';

describe('In Bulk Sms Create Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_BULK_SMS_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render GeneralInformationForm without an error', async () => {
    await renderComponent({
      ui: (
        <GeneralInformationForm disabled={false} />
      ),
    });
  });

  it('should render ContentInformationForm without an error', async () => {
    await renderComponent({
      ui: (
        <ContentInformationForm disabled={false} />
      ),
    });
  });
});
