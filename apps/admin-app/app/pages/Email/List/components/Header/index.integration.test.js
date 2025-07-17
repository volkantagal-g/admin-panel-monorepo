import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';
import Header from './index';

describe('Test ,Email List Header', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({ ui: <Header /> });
    addUserPermissions([permKey.PAGE_EMAIL_DETAIL]);
    await screen.findByText('E-Mail List');
  });
});
