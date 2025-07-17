import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import NotificationStats from './index';

jest.mock('@shared/i18n', () => ({
  ...jest.requireActual('@shared/i18n'),
  getLangKey: () => 'en',
}));

describe('Notification Stats test case', () => {
  describe('Blank canvas', () => {
    afterAll(cleanup);
    it('load the notification stats modal', async () => {
      await renderComponent({
        ui: <NotificationStats
          show
          close={() => {
            return false;
          }}
        />,
      });
      await screen.findByText('Notification Statistics');
    });
  });
});
