import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  waitForItemToBeSelected,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/franchiseConfigType/new';

describe('In Franchise Config Type Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_TYPE_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Create New Franchise Config Type')).toBeInTheDocument();
      expect(screen.getByText('New Config Type')).toBeInTheDocument();
      expect(screen.getByText('Config Type Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Add New Field')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);
      const requiredErrorMessages = await screen.findAllByText('Required.');
      const configNameRequiredError = await screen.findByText('Config Name is required');

      expect(requiredErrorMessages).toHaveLength(2);
      expect(configNameRequiredError).toBeInTheDocument();
    });

    it('should fill general information fields', async () => {
      const configName = await screen.findByPlaceholderText('Config Type Name');

      fireEvent.change(configName, { target: { value: 'new config name' } });
      await waitFor(() => {
        expect(configName).toHaveValue('new config name');
      });

      const descriptionTrInput = screen.getByTestId('description-tr');
      const descriptionEngInput = screen.getByTestId('description-en');

      fireEvent.change(descriptionTrInput, { target: { value: 'test desc tr' } });
      await waitFor(() => {
        expect(descriptionTrInput).toHaveValue('test desc tr');
      });

      fireEvent.change(descriptionEngInput, { target: { value: 'test desc eng' } });
      await waitFor(() => {
        expect(descriptionEngInput).toHaveValue('test desc eng');
      });
    });

    it('should show validation errors when required fields are not filled on feilds part', async () => {
      const [addNewFieldButton] = await screen.findAllByText('Add New Field');
      userEvent.click(addNewFieldButton);

      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      const requiredErrorMessages = await screen.findAllByText('Required.');
      const fieldNameRequiredError = await screen.findByText('Key / Field Name is required');

      expect(requiredErrorMessages).toHaveLength(2);
      expect(fieldNameRequiredError).toBeInTheDocument();

      const cancelButton = await screen.findByText('Cancel');
      userEvent.click(cancelButton);
      expect(screen.getByText('No Field')).toBeInTheDocument();
    });

    it('should delete button work', async () => {
      const [addNewFieldButton] = await screen.findAllByText('Add New Field');
      userEvent.click(addNewFieldButton);

      const deleteButton = await screen.findByText('Delete');
      userEvent.click(deleteButton);
      expect(screen.getByText('No Field')).toBeInTheDocument();
    });

    it('should fill field information', async () => {
      const [addNewFieldButton] = await screen.findAllByText('Add New Field');
      userEvent.click(addNewFieldButton);

      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm Changes')).toBeInTheDocument();

      const fieldName = await screen.findByPlaceholderText('Key (Field Name)');

      fireEvent.change(fieldName, { target: { value: 'new field name' } });
      await waitFor(() => {
        expect(fieldName).toHaveValue('new field name');
      });

      const labelTrInput = screen.getByTestId('label-tr');
      const labelEngInput = screen.getByTestId('label-en');

      fireEvent.change(labelTrInput, { target: { value: 'test label tr' } });
      await waitFor(() => {
        expect(labelTrInput).toHaveValue('test label tr');
      });

      fireEvent.change(labelEngInput, { target: { value: 'test label eng' } });
      await waitFor(() => {
        expect(labelEngInput).toHaveValue('test label eng');
      });

      const [
        type,
        permissions,
      ] = screen.getAllByRole('combobox');

      userEvent.click(type);
      const selectedTypeItem = screen.getByText('Integer');
      userEvent.click(selectedTypeItem);
      await waitForItemToBeSelected('Integer');

      userEvent.click(permissions);
      const [, selectedPermissionItem] = await screen.findAllByText('BIZ_PERM_KEY');
      userEvent.click(selectedPermissionItem);
      await waitForItemToBeSelected('BIZ_PERM_KEY');

      const isRequiredCheckbox = screen.getByLabelText('Is Required');
      userEvent.click(isRequiredCheckbox);

      await waitFor(() => {
        expect(isRequiredCheckbox).toBeChecked();
      });

      const isSelectableCheckbox = screen.getByLabelText('Is Selectable');
      userEvent.click(isSelectableCheckbox);

      await waitFor(() => {
        expect(isSelectableCheckbox).toBeChecked();
      });

      const isSortableCheckbox = screen.getByLabelText('Is Sortable');
      userEvent.click(isSortableCheckbox);

      await waitFor(() => {
        expect(isSortableCheckbox).toBeChecked();
      });

      const isHiddenFromListingCheckbox = screen.getByLabelText('Is Hidden From Listing');
      userEvent.click(isHiddenFromListingCheckbox);

      await waitFor(() => {
        expect(isHiddenFromListingCheckbox).toBeChecked();
      });

      const confirmButton = await screen.findByText('Confirm Changes');
      userEvent.click(confirmButton);

      expect(await screen.findByText('new field name')).toBeInTheDocument();
    });

    it('should add another field and get conflict with same name', async () => {
      const [addNewFieldButton] = await screen.findAllByText('Add New Field');
      userEvent.click(addNewFieldButton);

      const fieldName = await screen.findByPlaceholderText('Key (Field Name)');
      // to put same name for getting error.
      fireEvent.change(fieldName, { target: { value: 'new field name' } });
      await waitFor(() => {
        expect(fieldName).toHaveValue('new field name');
      });

      const labelTrInput = screen.getByTestId('label-tr');
      const labelEngInput = screen.getByTestId('label-en');

      fireEvent.change(labelTrInput, { target: { value: 'test label tr' } });
      await waitFor(() => {
        expect(labelTrInput).toHaveValue('test label tr');
      });

      fireEvent.change(labelEngInput, { target: { value: 'test label eng' } });
      await waitFor(() => {
        expect(labelEngInput).toHaveValue('test label eng');
      });

      const [
        type,
        permissions,
      ] = screen.getAllByRole('combobox');

      userEvent.click(type);
      const selectedTypeItem = screen.getByText('Warehouse Domain');
      userEvent.click(selectedTypeItem);
      await waitForItemToBeSelected('Warehouse Domain');

      userEvent.click(permissions);
      const [, selectedPermissionItem] = await screen.findAllByText('DATA_PERM_KEY');
      userEvent.click(selectedPermissionItem);
      await waitForItemToBeSelected('DATA_PERM_KEY');

      const confirmButton = await screen.findByText('Confirm Changes');
      userEvent.click(confirmButton);

      expect(await screen.findByText('Key / Field Name must be unique')).toBeInTheDocument();

      fireEvent.change(fieldName, { target: { value: 'unique name' } });
      await waitFor(() => {
        expect(fieldName).toHaveValue('unique name');
      });

      userEvent.click(confirmButton);
      expect(await screen.findByText('Key / Field Name must be unique')).not.toBeInTheDocument();
      expect(await screen.findByText('unique name')).toBeInTheDocument();
    });

    it('should field delete button work', async () => {
      const [deleteButton] = await screen.findAllByText('Delete');
      userEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText('new field name')).not.toBeInTheDocument();
      });
    });

    it('should field edit button work, changes should be saved', async () => {
      const editButton = await screen.findByText('Edit Field');
      userEvent.click(editButton);

      const fieldName = await screen.findByPlaceholderText('Key (Field Name)');
      // to put same name for getting error.
      fireEvent.change(fieldName, { target: { value: 'edited field name' } });
      await waitFor(() => {
        expect(fieldName).toHaveValue('edited field name');
      });

      const confirmButton = await screen.findByText('Confirm Changes');
      userEvent.click(confirmButton);

      expect(await screen.findByText('edited field name')).toBeInTheDocument();
    });

    it('should create new config type and redirect to listing page', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_CONFIG_TYPE_LIST]);
      });
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Create New Franchise Config Type')).not.toBeInTheDocument();
      });
    });
  });
});
