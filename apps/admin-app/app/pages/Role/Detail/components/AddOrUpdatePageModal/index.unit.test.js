import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import AddOrUpdatePageModal from '.';
import { waitForItemToBeSelected } from '@test/publicUtils/assertions';

describe('Role/Detail/AddOrUpdatePageModal', () => {
  const modalTitle = 'Add Page Permission';
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  it('should render AddOrUpdatePageModal without an error', async () => {
    await renderComponent({
      ui: (
        <AddOrUpdatePageModal modalTitle={modalTitle} onCancel={mockOnCancel} onConfirm={mockOnConfirm} />
      ),
    });
    await screen.findByText(modalTitle);
  });

  it('should hide itself on cancel', async () => {
    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);
    expect(mockOnCancel).toBeCalledTimes(1);
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('approve button should be disabled when no users are selected', async () => {
    const approveButton = await screen.findByRole('button', { name: 'Approve' });
    expect(approveButton).toBeDisabled();
  });

  it('should enable and call the confirm button when a page is selected and the global access checkbox is checked', async () => {
    const [pageSelect, countrySelect] = await screen.findAllByRole('combobox');
    userEvent.click(pageSelect);

    const pageOption = await screen.findByText(/Transfer Group List/i);
    userEvent.click(pageOption);

    await waitForItemToBeSelected(/Transfer Group List/i);

    const pageCheckbox = screen.getByLabelText('Global Access');
    userEvent.click(pageCheckbox);

    expect(countrySelect).toBeDisabled();

    const approveButton = screen.getByText('Approve');
    expect(approveButton).toBeEnabled();
    userEvent.click(approveButton);
    const okButton = screen.getByText('Ok');
    expect(okButton).toBeEnabled();
    userEvent.click(okButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
