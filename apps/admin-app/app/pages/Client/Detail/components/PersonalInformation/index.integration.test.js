import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import PersonalInformation from './index';
import { commPrefSelector } from '@app/pages/Client/Detail/redux/selectors';
import { clientDetail } from './index.mock.data';
import permKey from '@shared/shared/permKey.json';

describe('Client Details Market Communication Preferences', () => {
  beforeAll(() => {
    const spy = jest.spyOn(commPrefSelector, 'comPref');
    spy.mockReturnValue({
      data: {
        isEmailAllowed: true,
        isSMSAllowed: true,
        isPhoneCallAllowed: true,
        sendNtf: true,
      },
    });
  });
  afterAll(cleanup);

  it('should render without error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <PersonalInformation client={clientDetail} />
      ),
    });
    addUserPermissions([permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS]);

    const text = screen.getByTestId('personal-information-form');
    expect(text).toBeInTheDocument();
  });

  it('should contain core elements', async () => {
    await screen.findByText('Signup Date');
    await screen.findByText('Name');
    await screen.findByText('E-mail');
    await screen.findByText('GSM');
    await screen.findByText('Contact');
    await screen.findByText('Payment');
    await screen.findByText('Promotion Usage');

    await screen.findByText('SMS Communication');
    await screen.findByText('Email Communication');
    await screen.findByText('Phone Communication');
    await screen.findByText('Notification Communication');
  });
});
