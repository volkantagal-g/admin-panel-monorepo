import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SelectMarketProductMasterCategory from './index';

describe('SelectMarketProductMasterCategory', () => {
  afterAll(cleanup);
  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <SelectMarketProductMasterCategory />
      ),
    });
  });
});
