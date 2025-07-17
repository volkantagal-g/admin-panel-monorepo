import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const auditFormTypeId = '61dd61e63a11b0791f27fd98';
const initialUrl = `/kds/auditFormType/detail/${auditFormTypeId}`;

describe('In Audit Form Type Detail Page:', () => {
  describe('For page features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_KDS_AUDIT_FORM_TYPE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getAllByText('Audit Form Type Detail')).toHaveLength(2);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Send it to franchise?')).toBeInTheDocument();
    });
  });
  describe('For app level', () => {
    it('should all inputs must be disabled initially', async () => {
      const nameTrInput = screen.getByTestId('name-tr');
      const nameEngInput = screen.getByTestId('name-en');
      const checkbox = screen.getByRole('checkbox');

      expect(nameTrInput).toBeDisabled();
      expect(nameEngInput).toBeDisabled();
      expect(checkbox).toBeDisabled();
    });
    it('should be able to save every field', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      userEvent.click(editButton);

      const nameTrInput = screen.getByTestId('name-tr');
      const nameEngInput = screen.getByTestId('name-en');
      const checkbox = screen.getByRole('checkbox');

      userEvent.click(checkbox);

      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });

      fireEvent.change(nameTrInput, { target: { value: 'test name tr' } });
      await waitFor(() => {
        expect(nameTrInput).toHaveValue('test name tr');
      });

      fireEvent.change(nameEngInput, { target: { value: 'test name eng' } });
      await waitFor(() => {
        expect(nameEngInput).toHaveValue('test name eng');
      });

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getAllByText('Audit Form Type Detail')).toHaveLength(2);
      });
    });
  });
});
