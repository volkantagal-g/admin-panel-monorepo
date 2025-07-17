import '@test/publicUtils/configureWithoutCleanup';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const url = '/sms/list';
describe('In sms list page:', () => {
  it('should render sms list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_SMS_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
