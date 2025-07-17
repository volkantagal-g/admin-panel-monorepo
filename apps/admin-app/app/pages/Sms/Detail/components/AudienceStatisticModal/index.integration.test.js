import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AudienceStatisticModal from '@app/pages/Sms/Detail/components/AudienceStatisticModal';
import permKey from '@shared/shared/permKey.json';

describe('Test ,audience statistic modal', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: <AudienceStatisticModal
        isModalVisible
        onCancel={jest.fn()}
        smsId=""
        form={{ getFieldValue: () => 1 }}
        getAudienceStatistics={jest.fn()}
      />,
    });
    addUserPermissions([permKey.PAGE_SMS_DETAIL]);
    await screen.findByText('Sending / User Information');
  });
});
