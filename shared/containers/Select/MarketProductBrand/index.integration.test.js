import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SelectMarketProductBrand from './index';

describe('SelectMarketProductBrand', () => {
  afterAll(cleanup);
  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <SelectMarketProductBrand />
      ),
    });
  });
});
