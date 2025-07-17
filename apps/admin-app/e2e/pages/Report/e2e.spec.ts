import moment, { Moment } from 'moment';

import { test, expect } from './_fixture';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import {
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHave,
  expectSyncSelectItemHasCorrectOptions,
} from '@e2e/common/assertions';
import { TEST_TAG } from 'internals/constants/testTag';
import { getTableDataRowItems, getTableDataRows, getTableHeaderColumnTitles } from '@e2e/common/locators';
import { ReportNewPage } from '@e2e/pages/Report/_page';
import { getUrlPathMatcherRegex } from '@e2e/common/stringUtils';

const ASSERTION_TIMEOUT_MS = 5000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Report Page`, () => {
  test(`Minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ reportsPage: currentPage }) => {
    // Expect the sidebar menu to have the correct items
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Business Monitoring',
      menuItemsArr: ['Reports'],
      menuGroupExact: true,
    });

    // Check if the current page url is correct
    const currentUrl = new URL(currentPage.page.url());
    const currentUrlRelativePath = currentUrl.pathname;

    expect(currentUrlRelativePath).toEqual(currentPage.url);
  });

  test.describe('Detailed Features', () => {
    test('Create New Report', async ({
      reportsPage,
      baseURL,
    }) => {
      const {
        createReportPanel,
        createReportPanelCollapseContent,
        createReportPanelCollapseButton,
      } = reportsPage;

      // Check if the new report creation panel exists and collapsible
      await expect(createReportPanel).toBeVisible();

      await expect(createReportPanelCollapseContent).toBeVisible();
      await createReportPanelCollapseButton.click();
      await expect(createReportPanelCollapseContent).not.toBeVisible();
      await createReportPanelCollapseButton.click();
      await expect(createReportPanelCollapseContent).toBeVisible();

      // Check if the report type and create button are visible
      await expect(reportsPage.page.getByLabel('Report Type')).toBeVisible();

      const createReportTypeButton = reportsPage.getReportTypeCreateButton();
      await expect(createReportTypeButton).toBeVisible();
      await expect(createReportTypeButton).toBeDisabled();

      // Check if the report type select input is visible and working
      const selectReportTypeInput = reportsPage.getReportTypeSelectInput();
      await expect(selectReportTypeInput).toBeVisible();
      await selectReportTypeInput.click();
      await reportsPage.page.waitForSelector('.ant-select-dropdown');

      // Check if the create button is still disabled
      await expect(createReportTypeButton).toBeDisabled();

      // Select a report type
      await selectReportTypeInput.fill('Auto');
      const searchResultList = reportsPage.page.locator('.rc-virtual-list');

      // Find 'For Automation' option and click it
      await searchResultList.locator('text=For Automation').click();

      // Check if the create button is enabled
      await expect(createReportTypeButton).toBeEnabled();

      // Click the create button
      await createReportTypeButton.click();

      // Wait for the create new report page to load
      const reportNewPage = new ReportNewPage(reportsPage.page);
      const regex = getUrlPathMatcherRegex(reportNewPage.url.replace(':reportTypeId', '[a-f0-9]{24}'), baseURL);

      await reportsPage.page.waitForURL((regex));

      // Wait for create new report page url

      await reportNewPage.getPageDescription().isVisible();

      const nameTR = reportNewPage.getNameTRInput();
      await nameTR.fill('Playwright Merhaba Dünya');
      const nameEN = reportNewPage.getNameENInput();
      await nameEN.fill('Playwright Hello World');

      // This is report type specific input, so it is not in the _page.ts
      const strInput = reportNewPage.page.getByPlaceholder('str1');
      await strInput.click();
      await strInput.fill('str1');

      const dropdownInput = reportNewPage.page.getByLabel('drop1');
      await dropdownInput.click();
      await dropdownInput.fill('opt');

      await reportNewPage.page.getByText('opt1').click();
      await reportNewPage.page.getByText('opt2').click();

      const dateInput = reportNewPage.page.getByLabel('date1');
      await dateInput.click();
      await reportNewPage.page.getByText('Today').click();

      const stayIn = reportNewPage.getStayInPageCheckbox();
      await stayIn.check();

      // Uncheck again so we can see the submission navigates to reports page
      await stayIn.uncheck();

      await strInput.fill('str2');
      const submitReportButton = reportNewPage.getCreateReportButton();

      // Mock the create api before clicking the submit button
      await reportNewPage.page.route('**/createReport', async (route: any) => {
        const json = { _id: 'mocked_id' };
        await route.fulfill({ json });
      });

      // After filling required inputs, submit button should be enabled
      await expect(submitReportButton).toBeVisible();
      await submitReportButton.click();

      // After clicking the submit button, it should be loading and therefore disabled
      await expect(submitReportButton).toBeDisabled();

      // Also wait for returning to reports page
      await reportsPage.page.waitForURL(getUrlPathMatcherRegex(reportsPage.url, baseURL));
    });

    test('Filter Reports', async ({ reportsPage: currentPage }) => {
      const {
        filterPanelCollapseButton,
        filterPanelCollapseContent,
        dateRangeFilter,
        dateRangeDropdown,
        listingTypeFilter,
        applyFilterButton,
      } = currentPage;

      // Check if the filter panel is not collapsed by default
      await filterPanelCollapseButton.click();
      await expect(filterPanelCollapseContent).not.toBeVisible();

      // Open the filter panel and check if the filters and apply button are visible
      await filterPanelCollapseButton.click();
      await expect(dateRangeFilter).toBeVisible();
      await expect(listingTypeFilter).toBeVisible();
      await expect(applyFilterButton).toBeVisible();

      // Check listing type has appropriate values
      const expectedListingTypeOptions = ['Created By Me', 'Created From Permitted Report Types'];
      await expectSyncSelectItemHasCorrectOptions({
        pageInstance: currentPage.page,
        selectElem: listingTypeFilter,
        expectedOptions: expectedListingTypeOptions,
      });

      const dateRangeStartInput = dateRangeFilter.locator('input').nth(0);
      const dateRangeEndInput = dateRangeFilter.locator('input').nth(1);

      // Check if the date range filter has the correct default values
      const dateRangeStartDate: string = await dateRangeStartInput.inputValue();
      const dateRangeEndDate: string = await dateRangeEndInput.inputValue();

      const today: Moment = moment();
      const todayAsString: string = today.format('YYYY-MM-DD');

      const yesterday: Moment = moment().subtract(1, 'days');
      const yesterdayAsString: string = yesterday.format('YYYY-MM-DD');

      const tomorrow: Moment = moment().add(1, 'days');
      const tomorrowAsString: string = tomorrow.format('YYYY-MM-DD');

      expect(dateRangeStartDate).toEqual(yesterdayAsString);
      expect(dateRangeEndDate).toEqual(todayAsString);

      // Refresh the page
      await currentPage.navigateTo();

      // Select the start date
      await dateRangeStartInput.click();
      await expect(dateRangeDropdown).toBeVisible();
      await dateRangeDropdown.getByTitle(yesterdayAsString).first().click();

      // Select the end date
      await dateRangeEndInput.click();
      await expect(dateRangeDropdown).toBeVisible();
      await dateRangeDropdown.getByTitle(todayAsString).first().click();

      // Check if the date range filter has the correct values
      expect(dateRangeStartDate).toEqual(yesterdayAsString);
      expect(dateRangeEndDate).toEqual(todayAsString);

      // Refresh the page
      await currentPage.navigateTo();

      // Click the date range start input and fill it with yesterday's date
      await dateRangeStartInput.click();
      await dateRangeStartInput.fill(yesterdayAsString);

      // Click the date range start input and fill it with today's date
      await dateRangeEndInput.click();
      await dateRangeStartInput.fill(todayAsString);

      // Check if the date range filter has the correct values
      expect(dateRangeStartDate).toEqual(yesterdayAsString);
      expect(dateRangeEndDate).toEqual(todayAsString);

      // Refresh the page
      await currentPage.navigateTo();

      // We are trying to verify maximum range here. But approach is a little bit different.
      // We are setting the start date to 31 days ago and end date to tomorrow by using keyboard input.
      // Then we are clicking outside the end input to close the date picker.
      // Finally, we are checking if the start date is still the same as 31 days ago.
      // If it is not, then the date picker is working correctly.
      const thirtyOneDaysAgo: Moment = moment().subtract(31, 'days');
      const thirtyOneDaysAgoAsString: string = thirtyOneDaysAgo.format('YYYY-MM-DD');

      // Click the date range start input and fill it with 31 days ago
      await dateRangeStartInput.click();
      await dateRangeStartInput.fill(thirtyOneDaysAgoAsString);

      // Click the date range start input and fill it with tomorrow
      await dateRangeEndInput.click();
      await dateRangeEndInput.fill(tomorrowAsString);

      // Click outside of end input to close the date picker
      await currentPage.page.click('body', {
        position: {
          x: 0,
          y: 0,
        },
      });

      expect(await dateRangeStartInput.inputValue()).not.toEqual(thirtyOneDaysAgoAsString);

      // Refresh the page
      await currentPage.navigateTo();

      // Select the end date as yesterday and check whether today is disabled
      await dateRangeEndInput.click();
      await expect(dateRangeDropdown).toBeVisible();
      await dateRangeDropdown.getByTitle(yesterdayAsString).first().click();
      await expect(dateRangeDropdown.getByTitle(todayAsString).first()).toHaveClass(/ant-picker-cell-disabled/);

      const threeDaysBefore: Moment = moment().subtract(3, 'days');
      const threeDaysBeforeAsString: string = threeDaysBefore.format('YYYY-MM-DD');

      const fourDaysBefore: Moment = moment().subtract(4, 'days');
      const fourDaysBeforeAsString: string = fourDaysBefore.format('YYYY-MM-DD');

      // Select the start date as 3 days before and check whether 4 days before is not disabled
      await dateRangeStartInput.click();
      await expect(dateRangeDropdown).toBeVisible();
      await dateRangeDropdown.getByTitle(threeDaysBeforeAsString).first().click();

      // Antd automatically closes the date picker when two dates are selected. Click and open the date picker again.
      await dateRangeStartInput.click();
      await expect(dateRangeDropdown).toBeVisible();

      await expect(dateRangeDropdown.getByTitle(fourDaysBeforeAsString).first()).not.toHaveClass(/ant-picker-cell-disabled/);
    });

    test('Report Table', async ({ reportsPage: currentPage }) => {
      const {
        dateRangeFilter,
        listingTypeFilter,
        applyFilterButton,
      } = currentPage;

      const expectedTableTitles = [
        '#',
        'Name',
        'Report Type',
        'Request Date',
        'Status',
        'URL',
      ];

      await expect(async () => {
        const tableTitles = await getTableHeaderColumnTitles({ containerElement: currentPage.page.locator('body') });
        expect(expectedTableTitles).toEqual(tableTitles);
      }).toPass({ timeout: ASSERTION_TIMEOUT_MS });

      // Select date range
      const todayAsString: string = moment().format('YYYY-MM-DD');
      const sevenDaysBeforeAsString = moment().subtract(7, 'days').format('YYYY-MM-DD');

      const dateRangeStartInput = dateRangeFilter.locator('input').nth(0);
      const dateRangeEndInput = dateRangeFilter.locator('input').nth(1);

      // Click the date range start input and fill it with seven days before
      await dateRangeStartInput.click();
      await dateRangeStartInput.fill(sevenDaysBeforeAsString);

      // Click the date range end input and fill it with today
      await dateRangeEndInput.click();
      await dateRangeEndInput.fill(todayAsString);

      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: listingTypeFilter,
        search: 'Created From Permitted Report Types',
      });

      await applyFilterButton.click();
      const tableDataRows = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

      for (let i = 0; i < tableDataRows.length; i++) {
        const dataRowItem = await getTableDataRowItems({
          containerElement: currentPage.page.locator('body'),
          rowIndex: i,
        });

        const reportRequestDate = dataRowItem[3];
        const reportStatus = dataRowItem[4];
        const reportURL = dataRowItem[5];

        // Check if the request date is within the selected date range
        const requestDate: Moment = moment(reportRequestDate, 'YYYY-MM-DD');

        expect(requestDate.isSameOrAfter(sevenDaysBeforeAsString)).toBeTruthy();
        expect(requestDate.isSameOrBefore(todayAsString)).toBeTruthy();

        // if request status is ready url must not be empty
        if (reportStatus === 'Ready') {
          expect(reportURL).not.toBe('-');
        }
      }
    });

    test('Pagination', async ({ reportsPage: currentPage }) => {
      const {
        paginationSelectInput,
        paginationLimitValue,
        paginationLimitSelectInput,
        paginationPageNumberInput,
      } = currentPage;

      // Check if the pagination is visible. They may not be clickable but should be visible
      await currentPage.page.getByRole('button', { name: 'left' }).isVisible();
      await currentPage.page.getByRole('button', { name: 'right', exact: true }).isVisible();

      // Check if the pagination has the correct values
      const expectedPaginationOptions = ['10', '25', '50', '100'];

      // Click the pagination select input and check if the options are correct
      await paginationSelectInput.click();
      await expectSyncSelectItemHasCorrectOptions({
        pageInstance: currentPage.page,
        selectElem: paginationSelectInput,
        expectedOptions: expectedPaginationOptions,
        isPagination: true,
      });

      // Click and wait for the pagination to be selected
      await paginationSelectInput.click();
      await currentPage.page.waitForSelector('.ant-select-dropdown');

      // Select 25 items per page and check if the pagination is updated and table has 25 rows at most
      await paginationLimitSelectInput({ limit: '25' }).click();
      const paginationValue = await paginationLimitValue.innerText();
      const tableDataRows = await getTableDataRows({ containerElement: currentPage.page.locator('body') });

      expect(Number(paginationValue)).toEqual(25);
      expect(tableDataRows.length).toBeLessThanOrEqual(25);

      // Find and fill pagination input with 3. It should be less than three or equal to three.
      await paginationPageNumberInput.fill('3');
      expect(Number(await paginationPageNumberInput.inputValue())).toBeLessThanOrEqual(3);
    });
  });
});
