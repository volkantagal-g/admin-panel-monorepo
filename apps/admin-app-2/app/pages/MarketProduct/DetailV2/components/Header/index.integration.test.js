import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from './index';

describe('Market Product/Detail/Header', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <Header /> });
  });
});
