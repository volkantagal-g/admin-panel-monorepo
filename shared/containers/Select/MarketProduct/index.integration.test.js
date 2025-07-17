import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SelectMarketProduct from './index';

describe('SelectMarketProduct', () => {
  afterAll(cleanup);
  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <SelectMarketProduct />
      ),
    });
  });
});
