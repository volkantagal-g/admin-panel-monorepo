import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SelectMarketProductCategory from './index';

describe('SelectMarketProductCategory', () => {
  afterAll(cleanup);
  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <SelectMarketProductCategory />
      ),
    });
  });
});
