import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from '.';

describe('Profile page - component HEALTH mode - Header:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <Header />
      ),
    });
  });
});
