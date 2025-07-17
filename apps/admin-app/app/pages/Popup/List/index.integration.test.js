import '@test/publicUtils/configureWithoutCleanup';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const url = '/popup/list';
describe('In popup list page:', () => {
  it('should render popup list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_POPUP_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
