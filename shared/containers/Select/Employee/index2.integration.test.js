import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectEmployee from '.';
import renderComponent from '@test/publicUtils/renderComponent';

describe('<SelectEmployee /> Component - Unit Tests', () => {
  it('Should render select employee component', async () => {
    await renderComponent({ ui: <SelectEmployee mode="multiple" defaultValue="employee 1" /> });

    expect(await screen.findByRole('combobox')).toBeInTheDocument();
  });

  it('Should trigger the select event and set the value', async () => {
    await renderComponent({ ui: <SelectEmployee /> });

    const select = screen.getByRole('combobox');
    const value = 'Em';
    userEvent.type(select, value);
    expect(select).toHaveValue(value);
  });

  it('Select component should be disabled', async () => {
    await renderComponent({ ui: <SelectEmployee disabled /> });

    const select = screen.getByRole('combobox');

    expect(select).toBeDisabled();
  });

  it('Select component should have a default value', async () => {
    await renderComponent({ ui: <SelectEmployee defaultValue="Employee 1" /> });

    expect(screen.getByText('Employee 1')).toBeInTheDocument();
  });

  it('Select component should not be allowed to clear input values', async () => {
    await renderComponent({ ui: <SelectEmployee allowClear={false} /> });

    expect(screen.queryByLabelText('close-circle')).not.toBeInTheDocument();
  });

  it('Select component should clear input values', async () => {
    await renderComponent({ ui: <SelectEmployee defaultValue="Employee 1" /> });

    const clear = screen.queryByLabelText('close-circle');

    userEvent.click(clear);

    expect(screen.queryByText('Employee 1')).not.toBeInTheDocument();
  });
});
