import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { StatisticModal } from '@app/pages/Sms/Detail/components';
import permKey from '@shared/shared/permKey.json';

describe('Test , statistic modal', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({ ui: <StatisticModal isModalVisible onCancel={jest.fn()} smsId="" /> });
    addUserPermissions([permKey.PAGE_SMS_DETAIL]);
    await screen.findByText('Statistics');
  });
});
