import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import AddUserModal from './index';

describe('Role/Detail/AddUserModal', () => {
  const onChangeVisibility = jest.fn();
  const onConfirm = jest.fn();

  it('should render AddUserModal without an error', async () => {
    await renderComponent({
      ui: (
        <AddUserModal modalVisibility onChangeVisibility={onChangeVisibility} onConfirm={onConfirm} />
      ),
    });
    await screen.findByText('Add User');
  });

  it('should hide itself on cancel', async () => {
    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);
    expect(onChangeVisibility).toHaveBeenCalledWith(false);
  });

  it('approve button should be disabled when no users are selected', async () => {
    const approveButton = await screen.findByRole('button', { name: 'Approve' });
    expect(approveButton).toBeDisabled();
  });
});
