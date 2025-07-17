import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { notificationMockHandler } from '@shared/api/CourierCommunication/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/courier/communication/notification/list';

window.open = () => ({ focus: () => {} });

describe('In Notification List Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_COURIER_COMMUNICATION_NOTIFICATION_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Notification List');
    });

    describe('For Notification Table', () => {
      let notificationTable;

      it('should show notification information in Notification table', async () => {
        [notificationTable] = await waitForAntTableBodies();

        await within(notificationTable).findByText(notificationMockHandler.notificationTasks[0].updatedAt);
      });

      it('should filter notification on change limit', async () => {
        const [,,,, selectLimit] = screen.getAllByRole('combobox');
        userEvent.type(selectLimit, '20');
      });
    });
  });
});
