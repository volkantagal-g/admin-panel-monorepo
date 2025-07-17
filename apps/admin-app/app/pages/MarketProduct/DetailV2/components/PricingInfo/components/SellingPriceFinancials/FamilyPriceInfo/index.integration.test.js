import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { FamilyPriceInfo } from './index';

describe('Market Product/Detail/Pricing Info/SellingPriceFinancials', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render without errors', async () => {
    await renderComponent({ ui: <FamilyPriceInfo /> });
  });
});
