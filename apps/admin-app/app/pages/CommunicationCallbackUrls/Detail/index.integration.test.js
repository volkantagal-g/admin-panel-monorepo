import '@test/publicUtils/configureWithoutCleanup';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import { NotificationInformations } from '@app/pages/CommunicationCallbackUrls/Detail/components/NotificationForm';
import { EmailInformations } from '@app/pages/CommunicationCallbackUrls/Detail/components/EmailForm';
import { SmsInformations } from '@app/pages/CommunicationCallbackUrls/Detail/components/SmsForm';
import { GeneralForm } from '@app/pages/CommunicationCallbackUrls/Detail/components';
import PageComponent from 'pages/CommunicationCallbackUrls/Detail/index';

const initialUrl = '/callback-urls/detail/id/serviceType';

describe('In Callback Urls Detail Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_CALLBACK_URLS_DETAIL,
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
        <EmailInformations serviceType={1} isFormEditable={false} />
      ),
    });
  });

  it('should render SmsInformations without an error', async () => {
    await renderComponent({
      ui: (
        <SmsInformations serviceType={1} isFormEditable={false} />
      ),
    });
  });

  it('should render NotificationInformations without an error', async () => {
    await renderComponent({
      ui: (
        <NotificationInformations serviceType={1} isFormEditable={false} />
      ),
    });
  });
});
