import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AudienceStatisticModal from '@app/pages/Email/Detail/components/AudienceStatisticModal';
import permKey from '@shared/shared/permKey.json';

describe('Test ,audience statistic modal', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: <AudienceStatisticModal
        isModalVisible
        onCancel={jest.fn()}
        emailId=""
        form={{ getFieldValue: () => 1 }}
        getAudienceStatistics={jest.fn()}
      />,
    });
    addUserPermissions([permKey.PAGE_EMAIL_DETAIL]);
    await screen.findByText('Sending / User Information');
  });
});
