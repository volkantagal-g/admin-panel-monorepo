import '@test/publicUtils/configureWithoutCleanup';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const url = '/pushNotification/list';
describe('In push notification list page:', () => {
  it('should render push notification list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_PUSH_NOTIFICATION_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
