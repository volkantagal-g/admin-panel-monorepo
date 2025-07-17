import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import Form from '.';

describe('Tobb Gib Request page - Form:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <Form />
      ),
    });
  });
});
