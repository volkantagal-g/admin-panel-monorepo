import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, waitFor, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';
import { XLSX_TYPE } from './constants';

const initialUrl = '/franchiseEarnings/upload';

describe('Franchise Earnings Upload Page', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For app level features', () => {
    it('Should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([
          permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_VEST_FOR_OPERATION,
          permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_VEST_FOR_FINANCE,
          permKey.PAGE_FRANCHISE_EARNINGS_UPLOAD_COMPONENT_GETIR_FINANCE,
        ]);
      });

      await waitPageToRenderSomething();
    });

    it('should show related menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'Franchise Earnings Upload']);
    });

    it('should show allowed forms', async () => {
      expect(screen.getByText('Franchise Earning Upload By Finance')).toBeInTheDocument();
      expect(screen.getByText('Franchise Earning Upload By Operation')).toBeInTheDocument();
      expect(screen.getByText('Franchise Earning Upload By Getir Finance Report')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should upload file for Getir Finance', async () => {
      const uploadElement = screen.getByTestId(/splitReport/i);
      fireEvent.change(uploadElement, {
        target: {
          files: [
            new File(['test-file2'], 'test-file2.xlsx', { type: XLSX_TYPE }),
          ],
        },
      });

      await waitFor(() => {
        expect(screen.getByDisplayValue('test-file2.xlsx')).toBeInTheDocument();
      });

      const [,, importButtonForGetirFinance] = screen.getAllByText('Import');
      userEvent.click(importButtonForGetirFinance);

      await waitFor(() => {
        expect(screen.queryByDisplayValue('test-file2.xlsx')).not.toBeInTheDocument();
      });
    });
  });
});
