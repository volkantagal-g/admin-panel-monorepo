import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/employee/asset/new';

describe('<AssetNewPage /> Page Integration Tests', () => {
  describe('Page Details', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_EMPLOYEE_ASSET_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should contain header text', () => {
      expectToHavePageHeaderText(/New Employee Asset/i);
    });
  });

  describe('Form features', () => {
    it('should have correct page content', async () => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/barcode/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Device Serial Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/supplier/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Invoice Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Invoice Date/i)).toBeInTheDocument();
    });

    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByRole('button', { name: /create/i });
      userEvent.click(submitButton);
      const errorMessages = await screen.findAllByRole('alert');
      expect(errorMessages).toHaveLength(12);
    });
  });
});
