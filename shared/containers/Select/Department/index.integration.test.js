import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectDepartment from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

const getDepartmentsErrorMockOptions = {
  url: '/employee/getDepartmentsPure',
  errorData: { message: 'Cannot be found' },
};

describe('<SelectDepartment /> Component - Integration Tests', () => {
  it('Should make the API call when user opens select', async () => {
    await renderComponent({ ui: <SelectDepartment /> });

    const select = screen.getByRole('combobox');

    userEvent.click(select);

    await screen.findByText('Sales');
  });

  it('Should handle API call failure', async () => {
    mockApiOnce(getDepartmentsErrorMockOptions);

    await renderComponent({ ui: <SelectDepartment /> });

    const select = screen.getByRole('combobox');

    userEvent.click(select);

    await screen.findByText('No Data');
    await screen.findByText(getDepartmentsErrorMockOptions.errorData.message);
  });
});
