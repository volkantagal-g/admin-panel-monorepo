import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { ROLE_LIST_TAB_PANE_KEY } from '@shared/shared/constants';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '../../index';

describe('RoleRequests:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ROLE_LIST,
      pageUrl: ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.ROLE_REQUESTS),
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
