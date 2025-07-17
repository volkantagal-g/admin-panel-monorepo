import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SubCategoryTable from './index';

describe('MarketProduct/Category/Detail/SubCategoryTable', () => {
  afterAll(cleanup);
  describe('SubCategoryTable', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SubCategoryTable />
        ),
      });
    });
  });
});
