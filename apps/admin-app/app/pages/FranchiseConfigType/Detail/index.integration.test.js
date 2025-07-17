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
import waitForLoading from '@test/utils/waitForLoading';
import { getCongfigTypeDetailMockUpdated } from '@shared/api/franchiseDynamicConfig/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const configTypeId = '645261788bd4d63f9306d40e';
const initialUrl = `/franchiseConfigType/detail/${configTypeId}`;

describe('In Franchise Config Type Detail Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('first field')).toBeInTheDocument();
      expect(screen.getByText('Add New Field')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Azizol Berk')).toBeInTheDocument();
      expect(screen.getByDisplayValue('desc en')).toBeInTheDocument();
      expect(screen.getByDisplayValue('desc tr')).toBeInTheDocument();
      expect(screen.getByText('start_date')).toBeInTheDocument();
      expect(screen.getByText('end_date')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should edit description inputs', async () => {
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

    // TODO: skipped, investigate the error by running: npm run test -- "app/pages/FranchiseConfigType/Detail/index.integration.test.js"
    it.skip('should add new field', async () => {
      const addNewFieldButton = await screen.findByText('Add New Field');
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
      const selectedPermissionItem = await screen.findByTitle('BIZ_PERM_KEY');
      userEvent.click(selectedPermissionItem);

      await waitForItemToBeSelected('BIZ_PERM_KEY');

      userEvent.click(permissions);
      const selectedPermissionItem2 = await screen.findByTitle('DATA_PERM_KEY');
      userEvent.click(selectedPermissionItem2);

      await waitForItemToBeSelected('DATA_PERM_KEY');

      //  deleting BIZ_PERM_KEY item
      const [closeButton] = screen.getAllByLabelText('close');
      userEvent.click(closeButton);

      const option = screen.queryByRole('option', { name: /BIZ_PERM_KEY/i });
      expect(option).toHaveAttribute('aria-selected', 'false');

      const confirmButton = screen.getByText('Confirm Changes');
      userEvent.click(confirmButton);

      expect(await screen.findByText('new field name')).toBeInTheDocument();
    });

    it('should delete and update', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL_COMPONENT_DELETE]);
      });

      const [deleteButton] = await screen.findAllByText('Mark for Deletion');
      expect(deleteButton).toBeEnabled();

      userEvent.click(deleteButton);
      expect(screen.getByText('Unmark for Deletion')).toBeInTheDocument();

      const saveButton = await screen.findByText('Save');
      userEvent.click(saveButton);

      await waitForLoading();
      mockApiPerTestCase(getCongfigTypeDetailMockUpdated);
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      await waitFor(() => {
        expect(screen.getAllByText('Franchise Config Type Detail')[0]).toBeInTheDocument();
      });

      expect(screen.getByText('new field name')).toBeInTheDocument();
    });
  });
});
