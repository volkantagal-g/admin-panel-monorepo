import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  waitForItemToBeSelected,
  expectSelectItemAndWaitForToBeSelected,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

async function selectDates(start, end) {
  const first = screen.getByPlaceholderText('Start date');
  const second = screen.getByPlaceholderText('End date');
  userEvent.click(first);
  userEvent.clear(first);
  userEvent.type(first, `${start}{enter}`);

  userEvent.click(second);
  userEvent.clear(second);
  userEvent.type(second, `${end}{enter}`);

  userEvent.click(document.body);

  expect(first).toHaveValue(start);
  expect(second).toHaveValue(end);
}

describe('In Workforce Reports Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_REPORTS,
        pageUrl: '/workforceReports',
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', [
        'Field Employee',
        'Workforce Reports',
      ]);
    });
  });

  describe('For page features', () => {
    let reportType;

    it('should show report type dropdown', () => {
      expect(screen.getByText('Report Type')).toBeInTheDocument();
    });

    it('should select shift plan report', async () => {
      [reportType] = screen.getAllByRole('combobox');
      await expectSelectItemAndWaitForToBeSelected(reportType, 'Shift Plan Report');
    });

    it('should show shift plan report filters', async () => {
      expect(await screen.findByText('Date')).toBeInTheDocument();
      expect(await screen.findByText('Worker Type')).toBeInTheDocument();
      expect(await screen.findByText('Cities')).toBeInTheDocument();
      expect(await screen.findByText('Warehouse')).toBeInTheDocument();
    });

    it('should select date to be able to download shift plan report', async () => {
      const dateInput = await screen.findByPlaceholderText('Select week');
      expect(dateInput).toBeInTheDocument();
      userEvent.click(dateInput);
      const week = await screen.findByTitle(moment().format('YYYY-MM-DD'));
      userEvent.click(week);
    });

    it('should select worker type to be able to download shift plan report', async () => {
      const [, workerType] = await screen.findAllByRole('combobox');
      userEvent.click(workerType);
      const worker = await screen.findByText(/Courier/i);
      userEvent.click(worker);
      await waitForItemToBeSelected(/Courier/i);
    });

    it('should download shift plan report', async () => {
      const downloadButton = await screen.findByText('Download Report');
      expect(downloadButton).toBeEnabled();
      userEvent.click(downloadButton);
    });

    it('should select leave management report', async () => {
      await await expectSelectItemAndWaitForToBeSelected(reportType, 'Leave Management Report');
    });

    it('should show leave management report filters', async () => {
      expect(await screen.findByText('Date')).toBeInTheDocument();
      expect(await screen.findByText('Cities')).toBeInTheDocument();
      expect(await screen.findByText('Franchise')).toBeInTheDocument();
    });

    it('should select date to be able to download leave management report', async () => {
      await selectDates('2024-02-09', '2024-02-10');
    });

    it('should download leave management report', async () => {
      const downloadButton = await screen.findByText('Download Report');
      expect(downloadButton).toBeEnabled();
      userEvent.click(downloadButton);
    });

    it('should select slot performance report', async () => {
      await expectSelectItemAndWaitForToBeSelected(reportType, 'Slot Performance Report');
    });

    it('should show slot performance report filters', async () => {
      expect(await screen.findByText('Date')).toBeInTheDocument();
      expect(await screen.findByText('Domain Type')).toBeInTheDocument();
      expect(await screen.findByText('Cities')).toBeInTheDocument();
      expect(await screen.findByText('Franchise')).toBeInTheDocument();
      expect(await screen.findByText('Franchise Areas')).toBeInTheDocument();
      expect(await screen.findByText('Warehouse')).toBeInTheDocument();
    });

    it('should select date to be able to download slot performance report', async () => {
      await selectDates('2024-02-09', '2024-02-10');
    });

    it('should download slot performance report', async () => {
      const downloadButton = await screen.findByText('Download Report');
      expect(downloadButton).toBeEnabled();
      userEvent.click(downloadButton);
    });

    it('should select change log report', async () => {
      await expectSelectItemAndWaitForToBeSelected(reportType, 'Slot Change Log Report');
    });

    it('should show slot change log report filters', async () => {
      expect(await screen.findByText('Date')).toBeInTheDocument();
      expect(await screen.findByText('Domain Type')).toBeInTheDocument();
      expect(await screen.findByText('Cities')).toBeInTheDocument();
      expect(await screen.findByText('Franchise')).toBeInTheDocument();
      expect(await screen.findByText('Franchise Areas')).toBeInTheDocument();
      expect(await screen.findByText('Warehouse')).toBeInTheDocument();
    });

    it('should select date to be able to download slot change log report', async () => {
      await selectDates('2024-02-09', '2024-02-10');
    });

    it('should download slot change log report', async () => {
      const downloadButton = await screen.findByText('Download Report');
      expect(downloadButton).toBeEnabled();
      userEvent.click(downloadButton);
    });
  });
});
