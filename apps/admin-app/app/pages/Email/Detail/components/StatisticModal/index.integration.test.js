import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';
import StatisticModal from '@app/pages/Email/Detail/components/StatisticModal/index';

describe('Test , statistic modal', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({ ui: <StatisticModal isModalVisible onCancel={jest.fn()} emailId="" /> });
    addUserPermissions([permKey.PAGE_EMAIL_DETAIL]);
    await screen.findByText('Statistics');
  });
});
