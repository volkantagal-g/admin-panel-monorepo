import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import CredentialCard from '.';

describe('ThirdPartyCompany/Detail - CredentialCard component HEALTH mode:', () => {
  it('should render CredentialCard with no error', async () => {
    await renderComponent({
      ui: (
        <CredentialCard />
      ),
    });
  });
});
