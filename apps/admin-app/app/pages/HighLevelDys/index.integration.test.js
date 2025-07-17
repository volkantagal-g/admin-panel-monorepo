import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import moment from 'moment';
import userEvent from '@testing-library/user-event';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies,
  waitForItemToBeSelected,
  expectSelectDate,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { mockedHighLevelDysByPeriodConfig } from '@shared/api/dys/index.mock.data';
import PageComponent from '.';
import { getLocalDateFormat } from '@shared/utils/localization';

const initialUrl = '/dys';

describe('High Level SPS Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_HIGH_LEVEL_DYS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'SPS Summary']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('SPS Summary');
    });
  });

  describe('For page features', () => {
    let highLevelRecordsTable;
    it('should show correct information in table', async () => {
      [highLevelRecordsTable] = await waitForAntTableBodies();

      await within(highLevelRecordsTable).findByText(mockedHighLevelDysByPeriodConfig.warehouses[0].warehouse_name);
      await within(highLevelRecordsTable).findByText(mockedHighLevelDysByPeriodConfig.warehouses[0].letter);
      await within(highLevelRecordsTable).findByText(mockedHighLevelDysByPeriodConfig.warehouses[0].total.toFixed(2));
      await within(highLevelRecordsTable).findByText(mockedHighLevelDysByPeriodConfig.avg_dys_point.toFixed(2));
      await within(highLevelRecordsTable).findByText(mockedHighLevelDysByPeriodConfig.avg_dys_letter);
    });

    it('should pagination change', async () => {
      const nextPageButton = await screen.findByTitle('Next Page');
      userEvent.click(nextPageButton);

      const limitText = await screen.findByText('10');
      userEvent.click(limitText);

      const [, selectedLimit] = await screen.findAllByText('25');
      userEvent.click(selectedLimit);

      await waitFor(() => {
        expect(screen.getAllByText('25')[1]).toBeInTheDocument();
      });
    });

    // TODO: Fix the failing tests
    it.skip('should show correct information in table after changing filter options', async () => {
      const [, , threeMonthsRangeRadioButton] = await screen.findAllByRole('radio');
      userEvent.click(threeMonthsRangeRadioButton);
      await waitFor(() => {
        expect(threeMonthsRangeRadioButton).toBeChecked();
      });

      const singleDate = await screen.findByPlaceholderText('Select date');
      expectSelectDate(singleDate, moment().format(getLocalDateFormat()));

      const [, , serviceTypeSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(serviceTypeSelectInput);
      const selectedServiceType = await screen.findByText('Getir10');
      userEvent.click(selectedServiceType);
      await waitForItemToBeSelected('Getir10');

      const submitButton = await screen.findByText('Bring');
      userEvent.click(submitButton);
    });
  });
});
