import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { t } from '@shared/i18n';
import renderComponent from '@test/publicUtils/renderComponent';
import ClientDetailMeta from './index';
import permKey from '@shared/shared/permKey.json';
import { commPrefSelector } from '@app/pages/Client/Detail/redux/selectors';

describe('Client/Detail', () => {
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

  describe('ClientDetailMeta', () => {
    let renderResult;
    it('should render component without error', async () => {
      renderResult = await renderComponent({
        ui: (
          <ClientDetailMeta t={t} client={{ _id: '58f07b6036fbbf000473626f' }} />
        ),
      });
      await screen.findByText('General');
    });

    it('should not show close account without permission', async () => {
      expect(screen.queryByText('Close Account')).not.toBeInTheDocument();
    });

    it('should show close account with sufficient permissions', async () => {
      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_COMPONENT_CUSTOMER_SERVICE_ACCOUNT_ACTIONS]);
      await screen.findByText('Close Account');
    });
  });
});
