import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/employee/asset/detail/5accb5259f9fc3285feda2a6';

describe('In Employee Asset Detail Page:', () => {
  afterAll(cleanup);
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_EMPLOYEE_ASSET_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
});
