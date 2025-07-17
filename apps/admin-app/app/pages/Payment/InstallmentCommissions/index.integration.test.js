import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectToHavePageHeaderText, waitForAntTableBodies, waitPageToRenderSomething, getAntTableRowByRowKey } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedInstallment } from '@shared/api/payment/index.mock.data';

const initialUrl = '/payment/installmentCommissions';

describe('In Installment Commission Page:', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_INSTALLMENT_COMMISSIONS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Installments');
    });
  });
  describe('Page features', () => {
    let installmentsTable;
    it('should show installment information in installments table', async () => {
      const tables = await waitForAntTableBodies();
      [installmentsTable] = tables;
      await within(installmentsTable).findByText(mockedInstallment.installments[0].posBank);
      await within(installmentsTable).findByText(mockedInstallment.installments[0].installment);
      await within(installmentsTable).findByText(mockedInstallment.installments[0].commission);
    });
    it('update commission rate', async () => {
      act(() => {
        renderResult.addUserPermissions(
          [permKey.PAGE_INSTALLMENT_COMMISSIONS_COMPONENT_EDIT],
        );
      });
      const commissionRate = screen.getByRole('button', { name: /5/i });
      userEvent.click(commissionRate);
      const commissionRateInput = screen.getByTestId(mockedInstallment.installments[0].id);
      userEvent.type(commissionRateInput, '1{enter}');
      const applyButton = screen.getByRole('button', { name: /apply/i });
      await waitFor(() => {
        expect(applyButton).toBeEnabled();
      });
      const firstRow = getAntTableRowByRowKey(installmentsTable, { key: mockedInstallment.installments[0].id });
      expect(firstRow).toHaveStyle('background: rgba(255, 230, 0, 0.2)');
    });
  });
});
