import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ParentCategoryTable from './index';

describe('MarketProduct/Category/Detail/ParentCategoryTable', () => {
  afterAll(cleanup);
  describe('ParentCategoryTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ParentCategoryTable />
        ),
      });
    });
  });
});
