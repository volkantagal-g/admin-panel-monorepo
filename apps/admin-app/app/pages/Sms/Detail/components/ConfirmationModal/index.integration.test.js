import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { ConfirmationModal } from '@app/pages/Sms/Detail/components';
import permKey from '@shared/shared/permKey.json';

describe('Test , Confirmation modal', () => {
  const initialRouteOptions = { path: '/sms/detail:id', url: '/sms/detail/test_id' };
  it('should render without an error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: <ConfirmationModal isModalVisible onCancel={jest.fn()} onOk={jest.fn()} form={{ getFieldValue: () => 1 }} />,
      initialRouteOptions,
    });
    addUserPermissions([permKey.PAGE_SMS_DETAIL]);
    await screen.findByText('Publish Campaign');
  });
});
