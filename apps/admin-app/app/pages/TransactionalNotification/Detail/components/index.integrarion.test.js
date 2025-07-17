import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { GeneralInformationForm } from '@app/pages/TransactionalNotification/Detail/components';

describe('In Transactional Notif Detail Page:', () => {
  it('should render GeneralInformationForm without an error', async () => {
    await renderComponent({
      ui: (
        <GeneralInformationForm />
      ),
    });
    await screen.findByText('Target Service');
  });
});
