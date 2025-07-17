import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies, waitForItemToBeSelected,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { mockedLegalAgreementList } from '@shared/api/franchiseLegalAgreement/index.mock.data';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/franchiseLegal/list';

describe('In Franchise Legal Agreement List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_LEGAL_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'Franchise Legal List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Legal List');
    });
  });
  describe('For page features', () => {
    let agreementListTable;
    it('should match mock data informations in category table', async () => {
      [agreementListTable] = await waitForAntTableBodies();

      await within(agreementListTable).findByText(mockedLegalAgreementList.record[0].fileName);
      await within(agreementListTable).findByText('Make Active');
      await within(agreementListTable).findByText('Inactive');
    });

    it('should pagination work', async () => {
      const limit = await screen.findByRole('combobox');
      userEvent.click(limit);

      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });

    it('should show user new button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_LEGAL_NEW]);
      });
      const newLegalAgreementButton = await screen.findByText('New Franchise Legal Agreement');
      expect(newLegalAgreementButton).toBeInTheDocument();
    });

    it('should New Franchise Button navigate to new page', async () => {
      const newLegalAgreementButton = screen.getByText('New Franchise Legal Agreement');
      userEvent.click(newLegalAgreementButton);

      await waitForLoading();

      await waitFor(() => {
        expect(screen.queryByText('Make Active')).not.toBeInTheDocument();
      });
    });
  });
});
