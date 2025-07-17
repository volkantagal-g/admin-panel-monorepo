import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/announcementv2/list';

describe('In NotificationCenter List Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_NOTIFICATION_CENTER_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
