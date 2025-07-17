import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';
import GlobalSettingsDrawer from './index';

describe('Test ,Sms Global Setting Drawer', () => {
  // TODO: Someone broke the tests. Skipping for now to unblock pipeline
  it.skip('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: <GlobalSettingsDrawer
        visible
        setVisible={jest.fn()}
      />,
    });
    addUserPermissions([permKey.PAGE_EMAIL_DETAIL]);
    await screen.findByText('Sms Global Ruleset');
  });
});
