import React from 'react';

import { fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import Filter from '.';

describe('<Filter />', () => {
  const props = {
    filters: {
      statuses: [],
      isActivated: null,
      isLoggedIn: null,
      name: null,
    },
    isPending: false,
    handleSubmit: jest.fn(),
  };

  const setup = async (node: React.ReactElement) => {
    return renderComponent({
      ui: node,
      rtlOptions: {},
    });
  };

  it('should render correctly', async () => {
    await setup(<Filter {...props} />);

    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Driver Name')).toBeInTheDocument();
    expect(screen.getByText('Activeness')).toBeInTheDocument();
    expect(screen.getByText('Logged in?')).toBeInTheDocument();
  });

  it('handles filter changes without any errors', async () => {
    await setup(<Filter {...props} />);

    const nameInput = screen.getByRole('textbox');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    const [
      statusSelect,
      activenessSelect,
      loggedInSelect,
    ] = screen.getAllByRole('combobox');

    userEvent.click(statusSelect);
    userEvent.click(screen.getByText('Free'));
    userEvent.click(activenessSelect);
    userEvent.click(screen.getByText('ACTIVE'));
    userEvent.click(loggedInSelect);
    userEvent.click(screen.getByText('YES'));

    const filterButton = screen.getByText(/BRING/i);
    fireEvent.click(filterButton);

    expect(props.handleSubmit).toHaveBeenCalledWith({
      isActivated: true,
      isLoggedIn: true,
      name: 'John Doe',
      statuses: ['100'],
    });
  });
});
