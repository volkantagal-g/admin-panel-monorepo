import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import {
  expectDateRange,
  waitPageToRenderSomething,
  expectSelectItemAndWaitForToBeSelected,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import waitForLoading from '@test/utils/waitForLoading';
import PageComponent from '.';

const initialUrl = '/courierPlan/new';

describe('In E2E Courier Plan Page: New', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_E2E_COURIER_PLAN_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe.skip('For page features', () => {
    it('shows a new form with editable fields', async () => {
      const planName = 'new test plan';
      const inpPlan = screen.getByPlaceholderText('Plan Name');
      userEvent.type(inpPlan, planName);
      await waitFor(() => expect(inpPlan).toHaveValue(planName));

      const ddDomainType = screen.getByLabelText(/Warehouse Domain Type/i);
      await expectSelectItemAndWaitForToBeSelected(ddDomainType, 'Getir10');
      await expectSelectItemAndWaitForToBeSelected(ddDomainType, 'GetirLocals');

      const startDate = '2022/10/14';
      const endDate = '2022/10/22';

      expectDateRange('Courier Plan Date', startDate, endDate);

      const btnSubmit = screen.getByRole('button', { name: 'Create' });
      userEvent.click(btnSubmit);

      await waitForLoading();
      await waitFor(() => expect(screen.getByText('Success')));
    });
  });
});
