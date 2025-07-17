import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import MessageForm from '.';

describe('Market Business Config - component HEALTH mode - MessageForm:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <MessageForm />
      ),
    });
  });
});
