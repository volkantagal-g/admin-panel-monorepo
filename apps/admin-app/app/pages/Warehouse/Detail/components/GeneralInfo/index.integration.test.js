import { act, cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInfo from './index';

describe('<GeneralInfo /> Component - Integration Tests', () => {
  afterAll(cleanup);

  it('should component render successfully', async () => {
    await renderComponent({ ui: (<GeneralInfo />) });
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should not render edit button without permission', async () => {
    const { removeUserPermissions } = await renderComponent({ ui: (<GeneralInfo />) });

    act(() => {
      removeUserPermissions([permKey.PAGE_WAREHOUSE_DETAIL_EDIT_GENERAL_INFO]);
    });

    expect(screen.queryByTestId('warehouse-edit-button-wrapper')).not.toBeInTheDocument();
  });

  it('should render edit button with permission', async () => {
    const { addUserPermissions } = await renderComponent({ ui: (<GeneralInfo />) });

    act(() => {
      addUserPermissions([permKey.PAGE_WAREHOUSE_DETAIL_EDIT_GENERAL_INFO]);
    });

    expect(screen.getByTestId('warehouse-edit-button-wrapper')).toBeInTheDocument();
  });

  it('should enable name input with edit button', async () => {
    const { addUserPermissions } = await renderComponent({ ui: (<GeneralInfo />) });

    const nameInput = screen.getByTestId('warehouse-name-input');

    expect(nameInput).toBeDisabled();

    act(() => {
      addUserPermissions([permKey.PAGE_WAREHOUSE_DETAIL_EDIT_GENERAL_INFO]);
    });

    const editButton = screen.getByTestId('warehouse-edit-button');
    userEvent.click(editButton);

    expect(nameInput).toBeEnabled();
  });

  it('should enable short name input with edit button', async () => {
    const { addUserPermissions } = await renderComponent({ ui: (<GeneralInfo />) });

    const shortNameInput = screen.getByTestId('warehouse-short-name-input');

    expect(shortNameInput).toBeDisabled();

    act(() => {
      addUserPermissions([permKey.PAGE_WAREHOUSE_DETAIL_EDIT_GENERAL_INFO]);
    });

    const editButton = screen.getByTestId('warehouse-edit-button');
    userEvent.click(editButton);

    expect(shortNameInput).toBeEnabled();
  });
});
