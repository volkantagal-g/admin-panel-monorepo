import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import SelectDepartment from '.';
import renderComponent from '@test/publicUtils/renderComponent';

describe('<SelectDepartment /> Component - Unit Tests', () => {
  it('Should render select department select component', async () => {
    await renderComponent({ ui: <SelectDepartment /> });

    expect(await screen.findByRole('combobox')).toBeInTheDocument();
  });

  it('Select component should be disabled', async () => {
    await renderComponent({ ui: <SelectDepartment disabled /> });

    const select = screen.getByRole('combobox');

    expect(select).toBeDisabled();
  });

  it('Select component should not be allowed to clear input values', async () => {
    await renderComponent({ ui: <SelectDepartment allowClear={false} /> });

    expect(screen.queryByLabelText('close-circle')).not.toBeInTheDocument();
  });

  it('Should trigger the select event and set the value', async () => {
    await renderComponent({ ui: <SelectDepartment /> });

    const select = screen.getByRole('combobox');
    const value = 'Getir';
    userEvent.type(select, value);
    expect(select).toHaveValue(value);
  });
});
