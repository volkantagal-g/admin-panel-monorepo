import { act, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import {
  clickByNames,
  clickByNamesWithin,
  clickByTitles,
  renderPromoDetailPage,
} from '@app/pages/Promo/Detail/test/utils';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getPromoByIdMockSingleBuyXAndGetYFree } from '@shared/api/promo/index.mock.handler';

describe('In Promo Detail Page, General Information section', () => {
  it('should display the general information of the promo', async () => {
    mockApiPerTestCase(getPromoByIdMockSingleBuyXAndGetYFree);
    const { addUserPermissions } = await renderPromoDetailPage();

    // Verify initial state
    expect(screen.queryByText('Promo Target')).not.toBeInTheDocument();

    // Open the "General Information" section
    await act(async () => {
      await clickByNames('General Information');
    });

    expect(screen.getByText('Promo Target')).toBeInTheDocument();

    const form = await screen.findByRole('form', { name: 'General Information Form' });

    const Inputs = {
      TargetComboBox: within(form).getByRole('combobox', { name: 'Promo Target' }),
      DomainComboBox: within(form).getByRole('combobox', { name: 'Promo Domain' }),
      CodeTextBox: within(form).getByRole('textbox', { name: 'Promo Code' }),
      PlatformComboBox: within(form).getByRole('combobox', { name: 'Platform' }),
      PriorityTextBox: within(form).getByRole('textbox', { name: 'Priority' }),
      CitiesComboBox: within(form).getByRole('combobox', { name: 'Cities' }),
      WarehousesComboBox: within(form).getByRole('combobox', { name: 'Warehouses' }),
      StartDateTextBox: within(form).getByPlaceholderText('Start date'),
      EndDateTextBox: within(form).getByPlaceholderText('End date'),
    };

    // Verify inputs are disabled
    Object.values(Inputs).forEach(input => expect(input).toBeDisabled());
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();

    // Update permissions to enable edit mode
    await act(async () => {
      addUserPermissions([permKey.PAGE_PROMO_DETAIL_EDIT]);
    });

    // Enable editing
    await act(async () => {
      await clickByNamesWithin(form, 'Edit');
    });

    // Verify inputs are enabled
    Object.values(Inputs).forEach(input => expect(input).toBeEnabled());
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();

    // Cancel editing
    await act(async () => {
      await clickByNamesWithin(form, 'Cancel');
    });

    // Verify inputs are disabled again
    Object.values(Inputs).forEach(input => expect(input).toBeDisabled());

    // Enable editing again
    await act(async () => {
      await clickByNamesWithin(form, 'Edit');
    });

    userEvent.click(Inputs.DomainComboBox);

    // Select options
    await act(async () => {
      await clickByTitles('Getir10', 'GetirMore', 'GetirWater', 'Gorillas');
    });

    // Save changes
    await act(async () => {
      await clickByNamesWithin(form, 'Save');
    });
  });
});
