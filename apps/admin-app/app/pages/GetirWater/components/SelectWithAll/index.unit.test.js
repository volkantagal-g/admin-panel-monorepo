import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import SelectWithAll from '.';

const items = [
  { value: '1', label: 'Getir Label1' },
  { value: '2', label: 'Getir Label2' },
  { value: '3', label: 'Getir Label3' },

];

describe('SelectWithAll', () => {
  it('should be rendered without error', async () => {
    const { container } = await renderComponent({ ui: <SelectWithAll loading={false} items={items} label="Select With All Label" /> });
    expect(container).toBeInTheDocument();
    const components = screen.getByRole('combobox');
    expect(components).toHaveValue('');
    userEvent.click(components);

    // eslint-disable-next-line testing-library/no-node-access
    const options = document.querySelectorAll('.ant-select-item');

    await waitFor(() => {
      expect(options.length).toBe(4);
    });

    userEvent.click(options[1]);
    userEvent.click(components);

    await waitFor(() => {
      expect(screen.getAllByText('Getir Label1').length).toBe(2);
    });
    userEvent.click(components);
    userEvent.click(options[0]);
    userEvent.click(components);

    await waitFor(() => {
      expect(screen.getAllByText('Getir Label1').length).toBe(2);
    });

    expect(screen.getByText('Select With All Label')).toBeInTheDocument();
  });
});
