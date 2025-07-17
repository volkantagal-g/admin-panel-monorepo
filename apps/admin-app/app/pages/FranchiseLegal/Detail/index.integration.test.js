import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { mockedLegalAcceptanceDetail } from '../../../api/franchiseLegalAgreement/index.mock.data';

const configId = '6512b59b4e0a7e2837ae6deb';
const initialUrl = `/franchiseLegal/detail/${configId}`;

describe('In Franchise Legal Agreement Detail Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_LEGAL_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('dummy 2_')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Remind to Franchises')).toBeInTheDocument();
      expect(screen.getByText('Agreement Status')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should values visible in the table', () => {
      expect(screen.getByText(mockedLegalAcceptanceDetail.data[0].franchise)).toBeInTheDocument();
      expect(screen.getByText(moment(mockedLegalAcceptanceDetail.data[0].createdAt).format(getLocalDateFormat()))).toBeInTheDocument();
      expect(screen.getAllByText('Not Approved')).toHaveLength(2);
    });

    it('should change combobox values', async () => {
      const [selectFranchise, selectAgreementStatus] = await screen.findAllByRole('combobox');

      userEvent.click(selectFranchise);
      const selectedFranchise = screen.getByText('Sukrunun bayisi');
      userEvent.click(selectedFranchise);
      await waitForItemToBeSelected('Sukrunun bayisi');

      userEvent.click(selectAgreementStatus);
      const selectedAgreementStatus = screen.getByText('Approved');
      userEvent.click(selectedAgreementStatus);
      await waitForItemToBeSelected('Approved');

      const bringButton = screen.getByText('Bring');
      userEvent.click(bringButton);

      expect(screen.getAllByText('Not Approved')).toHaveLength(3);
    });

    it('should pagination work', async () => {
      const [,, limit] = await screen.findAllByRole('combobox');
      userEvent.click(limit);

      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });
  });
});
