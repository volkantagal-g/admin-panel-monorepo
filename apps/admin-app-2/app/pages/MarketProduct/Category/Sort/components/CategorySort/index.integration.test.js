import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CategorySort from './index';

describe('MarketProduct/Category/Detail', () => {
  afterAll(cleanup);
  describe('CategorySort', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <CategorySort />
        ),
      });
    });
  });
});
