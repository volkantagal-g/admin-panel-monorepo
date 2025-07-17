import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectEmployee from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

const getEmployeesForSelectComponentErrorMockOptions = {
  url: '/employee/getEmployeesForSelectComponent',
  errorData: { message: 'Cannot be found' },
};
describe('<SelectEmployee /> Component - Integration Tests', () => {
  it('Should make the API call when user clicks on select', async () => {
    await renderComponent({ ui: <SelectEmployee /> });

    const select = screen.getByRole('combobox');

    userEvent.click(select);

    await screen.findByText('Employee 1');
  });

  it('Should handle API call failure', async () => {
    mockApiOnce(getEmployeesForSelectComponentErrorMockOptions);

    await renderComponent({ ui: <SelectEmployee /> });

    const select = screen.getByRole('combobox');

    userEvent.click(select);

    await screen.findByText('No Data');
  });

  it('Should make the API call when user enter at least 3 chars', async () => {
    await renderComponent({ ui: <SelectEmployee /> });

    const select = screen.getByRole('combobox');

    userEvent.click(select);
    userEvent.type(select, 'Empl');

    await screen.findByText('Employee 1');
  });
});
