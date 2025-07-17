import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';
import { PDF_FILE_TYPE } from './constants';

const initialUrl = '/franchiseLegal/new';

describe('Franchise Legel Upload Page', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('Should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_LEGAL_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      await waitPageToRenderSomething();
    });

    it('should show allowed forms', async () => {
      expect(screen.getByText('Franchise Legal Upload')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should upload file for Getir Legel', async () => {
      const uploadElement = screen.getByTestId(/FRANCHISE_PDF_UPLOAD/i);
      fireEvent.change(uploadElement, {
        target: {
          files: [
            new File(['test-file2'], 'test-file2.pdf', { type: PDF_FILE_TYPE }),
          ],
        },
      });

      await waitFor(() => {
        expect(screen.getByDisplayValue('test-file2.pdf')).toBeInTheDocument();
      });

      const importButton = screen.getByText('Import');
      userEvent.click(importButton);

      await waitFor(() => {
        expect(screen.queryByText('test-file2.pdf')).not.toBeInTheDocument();
      });
    });
  });
});
