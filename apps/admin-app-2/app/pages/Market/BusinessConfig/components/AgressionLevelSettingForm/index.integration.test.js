import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import AgressionLevelSettingForm from '.';

describe('Market Business Config - component HEALTH mode - AgressionLevelSettingForm:', () => {
  it('should render Header with no error', async () => {
    await renderComponent({
      ui: (
        <AgressionLevelSettingForm />
      ),
    });
  });
});
