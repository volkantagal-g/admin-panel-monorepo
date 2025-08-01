import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import TableSummary from '.';

describe('TableSummary', () => {
  it('should render TableSummary without an error', async () => {
    await renderComponent({
      ui: <TableSummary
        data={[{ date: new Date() }]}
      />,
    });
  });
});
