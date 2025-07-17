import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getNotificationCenterMock } from '@app/pages/NotificationCenter/index.mock.handler';
import { SAMPLE_NOTIFICATION_CENTER_ID } from '../index.mock.data';

const initialUrl = `/announcementv2/detail/${SAMPLE_NOTIFICATION_CENTER_ID}`;

describe('In NotificationCenter Detail Page:', () => {
  mockApiPerTestCase(getNotificationCenterMock);

  it.skip('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_NOTIFICATION_CENTER_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
