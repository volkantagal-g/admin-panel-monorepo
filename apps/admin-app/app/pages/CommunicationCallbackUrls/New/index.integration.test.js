import '@test/publicUtils/configureWithoutCleanup';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import { NotificationInformations } from '@app/pages/CommunicationCallbackUrls/New/components/NotificationForm';
import { EmailInformations } from '@app/pages/CommunicationCallbackUrls/New/components/EmailForm';
import { SmsInformations } from '@app/pages/CommunicationCallbackUrls/New/components/SmsForm';
import { GeneralForm } from '@app/pages/CommunicationCallbackUrls/New/components';
import PageComponent from 'pages/CommunicationCallbackUrls/New/index';

const initialUrl = '/callback-urls/new';

describe('In Callback Urls Create Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_CALLBACK_URLS_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render GeneralForm without an error', async () => {
    await renderComponent({
      ui: (
        <GeneralForm serviceType={1} disabled={false} />
      ),
    });
  });

  it('should render EmailInformations without an error', async () => {
    await renderComponent({
      ui: (
        <EmailInformations serviceType={1} disabled={false} />
      ),
    });
  });

  it('should render SmsInformations without an error', async () => {
    await renderComponent({
      ui: (
        <SmsInformations serviceType={1} disabled={false} />
      ),
    });
  });

  it('should render NotificationInformations without an error', async () => {
    await renderComponent({
      ui: (
        <NotificationInformations serviceType={1} disabled={false} />
      ),
    });
  });
});
