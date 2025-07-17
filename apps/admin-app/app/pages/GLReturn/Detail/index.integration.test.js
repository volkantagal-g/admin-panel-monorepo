import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const warehouseId = '602fa06d94f5a2adb186b98f';
const initialUrl = `/return/detail/${warehouseId}`;

describe('In GL Return Alert Detail Page:', () => {
  describe('For alert page detail', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GL_RETURN_ALERT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
  });
});
