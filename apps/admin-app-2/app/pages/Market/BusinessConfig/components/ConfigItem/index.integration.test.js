import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import ConfigItem from '.';

describe('Market Business Config - component HEALTH mode - ConfigItem:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <ConfigItem />
      ),
    });
  });
});
