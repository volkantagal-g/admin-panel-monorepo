import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import { BaseBundlePrice } from './index';

describe('Market Product/Detail/Pricing Info/BundleRules', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render without errors', async () => {
    await renderComponent({ ui: <BaseBundlePrice /> });
  });
});
