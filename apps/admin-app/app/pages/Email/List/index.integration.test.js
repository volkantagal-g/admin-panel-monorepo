import '@test/publicUtils/configureWithoutCleanup';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const url = '/email/list';
describe('In email list page:', () => {
  it('should render email list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_EMAIL_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
