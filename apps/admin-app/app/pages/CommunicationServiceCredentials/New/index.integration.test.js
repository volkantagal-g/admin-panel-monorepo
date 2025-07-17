import '@test/publicUtils/configureWithoutCleanup';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import { NotificationInformations, TitleInformation } from '@app/pages/CommunicationServiceCredentials/New/components/NotificationForm';
import { EmailInformations } from '@app/pages/CommunicationServiceCredentials/New/components/EmailForm';
import { SmsInformations } from '@app/pages/CommunicationServiceCredentials/New/components/SmsForm';
import { GeneralForm } from '@app/pages/CommunicationServiceCredentials/New/components';
import { manipulateValuesBeforeSubmit } from '@app/pages/CommunicationServiceCredentials/New/formHelpers';
import PageComponent from 'pages/CommunicationServiceCredentials/New/index';

const initialUrl = '/communication-service-credentials/new';

describe('In Communication Service Credentials Create Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMMUNICATION_SERVICE_CREDENTIALS_NEW,
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

  it('should render TitleInformation without an error', async () => {
    await renderComponent({
      ui: (
        <TitleInformation />
      ),
    });
  });
});

describe('test manipulateValuesBeforeSubmit', () => {
  it('receivedValue should equal to expectedValue', () => {
    const value =
      {
        serviceType: 1,
        isActive: 1,
        name: 'getir',
        teamName: 'getir',
        tribeName: 'getir',
        permissions: ['PANEL_WRITE_PERM'],
        purpose: 'getir',
        phoneLanguages: ['de'],
        titleList: { de: { text: '2' } },
      };
    const receivedValue = manipulateValuesBeforeSubmit(value, 1);
    const expectedValue =
      {
        isActive: true,
        name: 'getir',
        teamName: 'getir',
        tribeName: 'getir',
        permissions: ['PANEL_WRITE_PERM'],
        purpose: 'getir',
        titleList: [{ language: 'de', text: '2' }],
      };
    expect(receivedValue).toMatchObject(expectedValue);
  });
});
