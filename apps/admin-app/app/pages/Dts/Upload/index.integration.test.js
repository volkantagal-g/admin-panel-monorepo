import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { CSV_TYPES } from './constants';

const initialUrl = '/dts/upload';

describe('In Dts Bulk Upload Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_LOGS_UPDATE,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('DTS Logs Updates')).toBeInTheDocument();
      expect(screen.getByText('Select file')).toBeInTheDocument();
      expect(screen.getByText('Remove')).toBeInTheDocument();
      expect(screen.getByText('Import')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should be able to add file', async () => {
      const selectFileInput = await screen.findByLabelText(/Select file/i);
      await waitForLoading();

      fireEvent.change(selectFileInput, {
        target: {
          files: [
            new File(['test-file'], 'test-file.xlsx', { type: CSV_TYPES }),
          ],
        },
      });

      await waitFor(() => {
        expect(screen.getByText(/test-file/i)).toBeInTheDocument();
      });
    });

    it('should remove button delete file', async () => {
      const removeButton = await screen.findByText(/Remove/i);

      userEvent.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText(/test-file/i)).not.toBeInTheDocument();
      });
    });

    it('should be able to import file', async () => {
      const selectFileInput = await screen.findByLabelText(/Select file/i);
      await waitForLoading();

      fireEvent.change(selectFileInput, {
        target: {
          files: [
            new File(['test-file'], 'test-file2.xlsx', { type: CSV_TYPES }),
          ],
        },
      });

      await waitFor(() => {
        expect(screen.getByText(/test-file2/i)).toBeInTheDocument();
      });
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_SUMMARY]);
      });

      const importButton = await screen.findByRole('button', { name: /Import/i });
      userEvent.click(importButton);

      expect(importButton).toBeDisabled();

      await waitFor(() => {
        expect(screen.queryByText('Dts Logs Updates')).not.toBeInTheDocument();
      });
    });
  });
});
