import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SummaryInfo from './index';

describe('Market Product/Detail/Summary Info', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <SummaryInfo /> });
  });
});
