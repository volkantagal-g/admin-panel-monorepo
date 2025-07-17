import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/announcement/list';

describe('In Announcement List Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ANNOUNCEMENT_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
