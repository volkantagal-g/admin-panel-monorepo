import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/dts/setting/priority/new';

describe('In Priority Setting Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_PRIORITY_SETTING_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New Priority')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Rejection Point')).toBeInTheDocument();
      expect(screen.getByText('Warning Point')).toBeInTheDocument();
    });
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);
      const multiLanguageInputErrorMessages = await screen.findAllByText('Required.');
      expect(multiLanguageInputErrorMessages).toHaveLength(4);
    });
    it('should be able to save everyfield', async () => {
      const statusInput = screen.getByRole('combobox');
      const [rejectionPointInput, warningPointInput] = screen.getAllByRole('spinbutton');

      userEvent.click(statusInput);
      const inActive = screen.getByText('Inactive');
      userEvent.click(inActive);
      await waitForItemToBeSelected('Inactive');

      const titleTrInput = screen.getByTestId('title-tr');
      const titleEngInput = screen.getByTestId('title-en');
      const descriptionTrInput = screen.getByTestId('description-tr');
      const descriptionEngInput = screen.getByTestId('description-en');

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

      fireEvent.change(rejectionPointInput, { target: { value: 13 } });
      await waitFor(() => {
        expect(rejectionPointInput).toHaveValue('13');
      });

      fireEvent.change(warningPointInput, { target: { value: 13 } });
      await waitFor(() => {
        expect(warningPointInput).toHaveValue('13');
      });

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_PRIORITY_SETTING_LIST]);
      });

      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Disciplinary Tracking System Priority Setting List')).not.toBeInTheDocument();
      });
    });
  });
});
