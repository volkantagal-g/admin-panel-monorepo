import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const priorityTestId = '5f7ac6e64912884c71929dab';
const initialUrl = `/dts/setting/priority/${priorityTestId}`;

describe('In Dts Priority Setting Detail Page:', () => {
  describe('For page features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_PRIORITY_SETTING_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Priority Detail')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Rejection Point')).toBeInTheDocument();
      expect(screen.getByText('Warning Point')).toBeInTheDocument();
    });
    it('should all inputs must be disabled initially', async () => {
      const titleTrInput = screen.getByTestId('title-tr');
      const titleEngInput = screen.getByTestId('title-en');
      const descriptionTrInput = screen.getByTestId('description-tr');
      const descriptionEngInput = screen.getByTestId('description-en');
      const statusInput = screen.getByRole('combobox');
      const [rejectionPointInput, warningPointInput] = screen.getAllByRole('spinbutton');

      expect(titleTrInput).toBeDisabled();
      expect(titleEngInput).toBeDisabled();
      expect(descriptionTrInput).toBeDisabled();
      expect(descriptionEngInput).toBeDisabled();
      expect(statusInput).toBeDisabled();
      expect(rejectionPointInput).toBeDisabled();
      expect(warningPointInput).toBeDisabled();
    });
    it('should be able to save every field', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const statusInput = screen.getByRole('combobox');
      userEvent.click(statusInput);
      const titleTrInput = screen.getByTestId('title-tr');
      const titleEngInput = screen.getByTestId('title-en');
      const descriptionTrInput = screen.getByTestId('description-tr');
      const descriptionEngInput = screen.getByTestId('description-en');
      const [rejectionPointInput, warningPointInput] = screen.getAllByRole('spinbutton');

      fireEvent.change(titleTrInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(titleTrInput).toHaveValue('test title tr');
      });

      fireEvent.change(titleEngInput, { target: { value: 'test title eng' } });
      await waitFor(() => {
        expect(titleEngInput).toHaveValue('test title eng');
      });

      fireEvent.change(descriptionTrInput, { target: { value: 'test desc tr' } });
      await waitFor(() => {
        expect(descriptionTrInput).toHaveValue('test desc tr');
      });

      fireEvent.change(descriptionEngInput, { target: { value: 'test desc eng' } });
      await waitFor(() => {
        expect(descriptionEngInput).toHaveValue('test desc eng');
      });

      fireEvent.change(rejectionPointInput, { target: { value: 12 } });
      await waitFor(() => {
        expect(rejectionPointInput).toHaveValue('12');
      });

      fireEvent.change(warningPointInput, { target: { value: 12 } });
      await waitFor(() => {
        expect(warningPointInput).toHaveValue('12');
      });

      const active = screen.getByText('Active');
      userEvent.click(active);
      await waitForItemToBeSelected('Active');

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      await screen.findByText('OK');
    });
  });
});
