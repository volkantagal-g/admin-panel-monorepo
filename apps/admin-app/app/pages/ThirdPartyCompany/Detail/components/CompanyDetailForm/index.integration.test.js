import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import CompanyDetailForm from '.';

describe('ThirdPartyCompany/Detail - component HEALTH mode - CompanyDetailForm:', () => {
  it('should render CompanyDetailForm with no error', async () => {
    await renderComponent({
      ui: (
        <CompanyDetailForm />
      ),
    });
  });
});
