import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { loyaltyMockHandler } from '@shared/api/courierGamification/index.mock.data';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/courier/loyalty?country=tr';

window.open = () => ({ focus: () => {} });

describe('In Loyalty List Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_COURIER_LOYALTY_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Courier Loyalty Listing');
    });

    describe('For Listing Table', () => {
      let loyaltyTable;

      it('should show notification information in Notification table', async () => {
        [loyaltyTable] = await waitForAntTableBodies();

        await within(loyaltyTable).findByText(loyaltyMockHandler.data[0].performanceGroup);
      });

      it('should filter on change limit', async () => {
        const [,,,, selectLimit] = screen.getAllByRole('combobox');
        userEvent.type(selectLimit, '20');
      });
    });
  });
});
