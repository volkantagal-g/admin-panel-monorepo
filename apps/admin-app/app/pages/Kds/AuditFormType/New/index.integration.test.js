import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/kds/auditFormType/new';

describe('In New Audit Form Type Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_KDS_AUDIT_FORM_TYPE_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getAllByText('New Audit Form Type')).toHaveLength(2);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Send it to franchise?')).toBeInTheDocument();
    });
  });
  describe('For app level', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);
      const multiLanguageInputErrorMessages = await screen.findAllByText('Required.');

      expect(multiLanguageInputErrorMessages).toHaveLength(2);
    });
    it('should be able to save everyfield', async () => {
      const checkbox = screen.getByRole('checkbox');

      userEvent.click(checkbox);
      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });

      const nameTrInput = screen.getByTestId('name-tr');
      const nameEngInput = screen.getByTestId('name-en');

      fireEvent.change(nameTrInput, { target: { value: 'test name tr' } });
      await waitFor(() => {
        expect(nameTrInput).toHaveValue('test name tr');
      });

      fireEvent.change(nameEngInput, { target: { value: 'test name eng' } });
      await waitFor(() => {
        expect(nameEngInput).toHaveValue('test name eng');
      });

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_KDS_AUDIT_FORM_TYPE_LIST]);
      });

      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/New Audit Form Type/i)).not.toBeInTheDocument();
      });
    });
  });
});
