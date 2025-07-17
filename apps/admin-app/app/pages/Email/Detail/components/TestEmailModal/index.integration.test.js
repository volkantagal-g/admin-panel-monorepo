import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';
import TestEmailModal from '@app/pages/Email/Detail/components/TestEmailModal/index';

describe('Test , Send test email modal', () => {
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({ ui: <TestEmailModal isModalVisible onCancel={jest.fn()} emailId="" /> });
    addUserPermissions([permKey.PAGE_EMAIL_DETAIL]);
    await screen.findByText('Test E-Mail');
  });
});
