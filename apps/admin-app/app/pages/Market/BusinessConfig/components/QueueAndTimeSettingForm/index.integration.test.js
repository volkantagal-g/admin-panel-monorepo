import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import QueueAndTimeSettingForm from '.';

describe('Market Business Config - component HEALTH mode - QueueAndTimeSettingForm:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <QueueAndTimeSettingForm />
      ),
    });
  });
});
