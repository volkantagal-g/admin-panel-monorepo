import '@test/publicUtils/configureWithoutCleanup';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/courier/gamificationTask/list';

describe('In the Courier GMFC List Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_COURIER_GAMIFICATION_TASK_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
