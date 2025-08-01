import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ImageInfo from './index';

describe('MarketProduct/Category/Detail', () => {
  afterAll(cleanup);
  describe('ImageInfo', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ImageInfo />
        ),
      });
    });
  });
});
