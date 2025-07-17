import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';

import Footer from '.';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: jest.fn(() => ({ t: jest.fn(key => key) })),
}));

describe('<Footer />', () => {
  const props = {
    isEditable: true,
    setIsEditable: jest.fn(),
    handleSubmit: jest.fn(),
    isPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when isEditable is false', () => {
    render(<Footer
      {...props}
      isEditable={false}
    />);

    const editButton = screen.getByRole('button', { name: 'EDIT' });
    expect(editButton).toBeInTheDocument();
    expect(useTranslation).toHaveBeenCalledWith('button');

    userEvent.click(editButton);
    expect(props.setIsEditable).toHaveBeenCalledWith(true);

    expect(screen.queryByRole('button', { name: 'CANCEL' })).not.toBeInTheDocument();
  });

  it('should render correctly when isEditable is true', async () => {
    render(<Footer {...props} />);

    const cancelButton = screen.getByRole('button', { name: 'CANCEL' });
    expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'SAVE' });
    expect(saveButton).toBeInTheDocument();

    expect(useTranslation).toHaveBeenCalledWith('button');

    userEvent.click(saveButton);

    const confirmButton = screen.getByRole('button', { name: 'OK' });

    userEvent.click(confirmButton);

    expect(props.handleSubmit).toHaveBeenCalled();

    userEvent.click(cancelButton);
    expect(props.setIsEditable).toHaveBeenCalledWith(false);
  });
});
