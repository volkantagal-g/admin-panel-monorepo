import '@test/publicUtils/configureWithoutCleanup';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText,
  expectSelectItemAndWaitForToBeSelected,
} from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import { mockedRole } from '@shared/api/role/index.mock.data';
import PageComponent from '.';

const initialUrl = '/role/new';

describe('In Role New Page:', () => {
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_ROLE_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should contain core elements', async () => {
    expectToHavePageHeaderText('New Role');
    const createButton = screen.getByText('Create');
    expect(createButton).toBeInTheDocument();

    const nameInput = screen.getByTitle(/Name/i);
    const descriptionTRInput = screen.getByTitle(/(TR)/i);
    const descriptionENInput = screen.getByTitle(/(EN)/i);
    const parentRoleSelect = screen.getByRole('combobox');

    expect(nameInput).not.toHaveValue();
    expect(descriptionTRInput).not.toHaveValue();
    expect(descriptionENInput).not.toHaveValue();
    expect(parentRoleSelect).not.toHaveValue();
  });

  it('should show validation errors when required fields are not filled', async () => {
    const createButton = screen.getByText('Create');
    userEvent.click(createButton);
    const errorMessages = await screen.findAllByRole('alert');

    expect(errorMessages).toHaveLength(3);
  });

  it('should remove validation errors when name and description is filled', async () => {
    const nameInput = screen.getByLabelText('Name');
    const descriptionTRInput = screen.getByLabelText('Description (TR)');
    const descriptionENInput = screen.getByLabelText('Description (EN)');

    await userEvent.type(nameInput, mockedRole.name, { delay: 10 });
    await userEvent.type(descriptionTRInput, mockedRole.description.tr, { delay: 10 });
    await userEvent.type(descriptionENInput, mockedRole.description.en, { delay: 10 });

    fireEvent.blur(descriptionENInput);
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('should be able to select parent role', async () => {
    const parentRoleSelect = screen.getByRole('combobox');
    expect(parentRoleSelect).toBeEnabled();

    await expectSelectItemAndWaitForToBeSelected(parentRoleSelect, mockedRole.name);
  });

  it('should be able to create role', async () => {
    const { addUserPermissions } = renderResult;
    // after creating a user we navigate to detail page, prepare permission first
    act(() => {
      addUserPermissions([permKey.PAGE_ROLE_NEW]);
    });
    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    // we should land on the role detail page, so no New Role header
    await waitFor(() => {
      expect(screen.queryByText('New Role')).not.toBeInTheDocument();
    });
  });
});
