import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import moment from 'moment';

import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  getAntTableBodies,
  getAntTableHeaderTables,
  expectSelectDate,
  waitForAntTableBodies,
} from '@test/publicUtils/assertions';
import { franchiseRequestListMock } from '@shared/api/franchiseRequest/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import { LOCAL_DATE_FORMAT } from '@shared/shared/constants';
import PageComponent from '.';

const initialUrl = '/franchiseRequest/list';

describe('In Franchise Request List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_REQUEST_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      await expectSidebarMenuToHaveV2('Field', ['Warehouse & Franchise', 'Franchise Request List']);
    });
  });
  describe('For page features', () => {
    let headerTable;
    let franchiseRequestListTable;

    it('should have table header and body', async () => {
      await waitFor(() => {
        [headerTable] = getAntTableHeaderTables();
        expect(headerTable).toBeInTheDocument();
      });
      await waitFor(() => {
        [franchiseRequestListTable] = getAntTableBodies();
        expect(franchiseRequestListTable).toBeInTheDocument();
      });
    });

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Franchise Request List');
    });

    it('should show filter panel', async () => {
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
      expect(screen.getByLabelText('cloud-download')).toBeInTheDocument();
    });

    it('should able to click bring button', async () => {
      const [bringButton] = screen.getAllByRole('button', { name: 'Bring' });
      userEvent.click(bringButton);
    });

    it('should pagination change', async () => {
      const limitText = await screen.findByText('10');
      userEvent.click(limitText);
      const [, selectedLimit] = await screen.findAllByText('25');
      userEvent.click(selectedLimit);
      await waitFor(() => {
        expect(screen.getAllByText('25')[1]).toBeInTheDocument();
      });
    });

    it('should change filters', async () => {
      const startDatePicker = screen.getByPlaceholderText(/Start Date/i);
      const endDatePicker = screen.getByPlaceholderText(/End Date/i);
      const yesterdayText = moment().format(LOCAL_DATE_FORMAT.EN);
      const previousWeekDateText = moment().subtract(6, 'months').format(LOCAL_DATE_FORMAT.EN);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Bring' })).toBeEnabled();
      });
      expectSelectDate(startDatePicker, previousWeekDateText);
      expectSelectDate(endDatePicker, yesterdayText);
    });

    let table;
    it('should match mock data', async () => {
      [table] = await waitForAntTableBodies();
      await waitFor(() => {
        within(table).getByText(franchiseRequestListMock.requests[0].applicant.email);
        within(table).getByText(franchiseRequestListMock.requests[0].applicant.cityOfResidence.name);
        within(table).getAllByText(franchiseRequestListMock.requests[0].applicant.name);
        within(table).getAllByText(franchiseRequestListMock.requests[0].applicant.lastName);
        within(table).getByText(franchiseRequestListMock.requests[0].application.management.label);
        within(table).getByText(franchiseRequestListMock.requests[0].application.haveFranchiseExperience.label);
        within(table).getByText(franchiseRequestListMock.requests[0].application.whoWillInvesment.label);
      });
    });
  });
});
