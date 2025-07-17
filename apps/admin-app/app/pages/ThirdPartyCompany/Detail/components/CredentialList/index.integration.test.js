import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CredentialList from '.';

describe('ThirdPartyCompany/Detail - CredentialList HEALTH mode:', () => {
  it('should render CredentialList with no error', async () => {
    await renderComponent({
      ui: (
        <CredentialList />
      ),
    });
    await screen.findByText('Credentials');
  });
});
