import path from 'path';

import { test, expect } from '@e2e/pages/LmdAndOtherExpenses/Upload/_fixture';
import { SQUAD_BRANCH_NAME_TO_TAG } from '../../../../internals/constants/squadShortNames';
import { TEST_TAG } from '../../../../internals/constants/testTag';
import {
  expectDownloadedFileToBe,
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHave,
  expectSyncSelectItemHasCorrectOptions,
} from '@e2e/common/assertions';
import { mockWarehousesWithoutFilter } from '@e2e/common/apiMocking';
import { getWarehousesMockOptions } from '@app/api/warehouse/index.mock.handler';
import {
  uploadOtherCostUrlPattern,
  uploadLogisticCostUrlPattern,
  uploadLastMileDeliveryCostUrlPattern,
} from '@e2e/pages/LmdAndOtherExpenses/apiMocking';

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - LmdAndOtherExpenses Upload`, () => {
  test(`Minimal features should work correctly ${TEST_TAG.SMOKE}`, async ({ lmdAndOtherExpensesUploadPage: currentPage }) => {
    // Check if the page title is correct
    await expect(async () => {
      expect(await currentPage.pageTitle).toContain('LMD & Other Expenses');
    }).toPass({ timeout: 5000 });

    // Check if the sidebar menu is correct
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Business Monitoring',
      menuItemsArr: ['LMD & Other Expenses'],
    });
  });

  test.describe('Detailed features ', () => {
    test('Download and Upload Actions', async ({ lmdAndOtherExpensesUploadPage: currentPage }) => {
      const {
        expenseTypeSelect,
        csvUploadFileInput,
        csvUploadButton,
        csvUploadModal,
        csvUploadModalCancelButton,
        csvUploadModalChooseFileButton,
        csvUploadModalUploadButton,
        csvUploadModalInstructionsAlert,
        csvUploadModalInstructionsAlertItems,
        csvUploadModalInstructionsAlertDescription,
        csvTemplateDownloadButton,
        csvUploadErrorAlert,
        csvUploadErrorContentLocator,
      } = currentPage;

      // Mock warehouses and wait for the response to upload button to be enabled
      await mockWarehousesWithoutFilter(currentPage.page);
      await currentPage.page.waitForResponse(resp => {
        const isExpectedResponseCame = resp.url().includes(getWarehousesMockOptions.url);
        const isExpectedResponseStatusCame = resp.status() === 200;

        return isExpectedResponseCame && isExpectedResponseStatusCame;
      });

      // Check if the main elements are visible
      await expect(expenseTypeSelect).toBeVisible();
      await expect(csvTemplateDownloadButton).toBeVisible();
      await expect(csvUploadButton).toBeVisible();

      // Check whether the options of the expense type select are correct
      const expectedExpenseTypeOptions = ['Last Mile Delivery Cost', 'Logistic Cost', 'Other Cost'];
      await expectSyncSelectItemHasCorrectOptions({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        expectedOptions: expectedExpenseTypeOptions,
      });

      // Select Logistic Cost and check the downloaded filename of the template
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Logistic Cost',
      });
      await expectDownloadedFileToBe({
        pageInstance: currentPage.page,
        downloadButton: csvTemplateDownloadButton,
        expectedFileName: 'LOGISTIC_COST.csv',
        expectedFileFormat: 'csv',
      });

      // Select LMD Cost and check the downloaded filename of the template
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Last Mile Delivery Cost',
      });
      await expectDownloadedFileToBe({
        pageInstance: currentPage.page,
        downloadButton: csvTemplateDownloadButton,
        expectedFileName: 'LMD_COST.csv',
        expectedFileFormat: 'csv',
      });

      // Select Other Cost and check the downloaded filename of the template
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Other Cost',
      });
      await expectDownloadedFileToBe({
        pageInstance: currentPage.page,
        downloadButton: csvTemplateDownloadButton,
        expectedFileName: 'OTHER_COST.csv',
        expectedFileFormat: 'csv',
      });

      // Check if the modal is visible and the necessary parts are visible
      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();
      await expect(csvUploadModalChooseFileButton).toBeVisible();
      await expect(csvUploadModalCancelButton).toBeVisible();
      await expect(csvUploadModalUploadButton).toBeVisible();

      // Check instruction alert is visible and the content of the alert is correct
      await expect(csvUploadModalInstructionsAlert).toBeVisible();

      const alertDescriptionText = await csvUploadModalInstructionsAlertDescription.textContent();
      expect(alertDescriptionText).toBe('Important instructions for the file to be uploaded;');

      const alertItemCount = await csvUploadModalInstructionsAlertItems.count();
      const alertItemsTexts = [];

      for (let idx = 0; idx < alertItemCount; idx++) {
        const listItemText = await csvUploadModalInstructionsAlertItems.nth(idx).textContent();
        alertItemsTexts.push(listItemText);
      }

      const expectedAlertDescriptionTexts = [
        '3 different cost files can be uploaded. These files; LMD Cost, Logistics Cost, Other Costs.',
        'It must be in CSV format and must not contain empty cells.',
        'Only 1 month of data should be uploaded at a time.',
        'It should contain the headings specified in the sample format, and the heading names should not be changed.',
        'Domain names should be Getir10, GetirMore, GetirFood, GetirLocals, GetirWater and GetirWaterMarketplace (For Other Cost).',
        'If the same month, year and domain data is uploaded in different files, only the data in the last file is processed into the' +
        ' system and the old data is deleted regardless of considering the included warehouse IDs.',
        'Month selection must be between 1 and 12, and year selection must be between 2016 and 2050.',
        'Financial values must not contain negative data and the decimal separator of the values must be dot (.).',
      ];

      expect(alertItemsTexts).toEqual(expect.arrayContaining(expectedAlertDescriptionTexts));

      // Check if the modal upload button is disabled when no file is selected
      await expect(csvUploadModalUploadButton).toBeDisabled();

      // Check if the modal is closed when the cancel button is clicked
      await csvUploadModalCancelButton.click();
      await expect(csvUploadModal).not.toBeVisible();

      // Select Last Mile Delivery Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Last Mile Delivery Cost',
      });

      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      // Upload the Last Mile Delivery cost file and check if the modal is closed
      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/lmdCost.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();

      const lmdCostUploadResponse = (
        await currentPage.page.waitForResponse(response => {
          return response.url().includes(uploadLastMileDeliveryCostUrlPattern);
        })
      );

      const isLmdCostUploadSuccessFully = lmdCostUploadResponse.ok();
      expect(isLmdCostUploadSuccessFully)
        .toBe(true);

      // Select Logistic Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Logistic Cost',
      });

      // Upload the Logistic Cost file and check if the modal is closed
      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/logisticCost.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();

      const logisticCostUploadResponse = (
        await currentPage.page.waitForResponse(response => {
          return response.url().includes(uploadLogisticCostUrlPattern);
        })
      );

      const isLogisticCostUploadSuccessFully = logisticCostUploadResponse.ok();
      expect(isLogisticCostUploadSuccessFully)
        .toBe(true);

      // Select Other Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Other Cost',
      });

      // Upload the Other Cost file and check if the modal is closed
      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/otherCost.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();

      const otherCostUploadResponse = (
        await currentPage.page.waitForResponse(response => {
          return response.url().includes(uploadOtherCostUrlPattern);
        })
      );

      const isOtherCostUploadSuccessFully = otherCostUploadResponse.ok();
      expect(isOtherCostUploadSuccessFully)
        .toBe(true);

      // Select Lmd Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Last Mile Delivery Cost',
      });

      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/lmdCostFail.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();
      await expect(csvUploadErrorAlert).toBeVisible();

      const errorInFailedLmdUpload = await csvUploadErrorContentLocator.nth(0).innerText();
      expect(errorInFailedLmdUpload).toBe('Check the column headings in the uploaded file.');

      // Select Logistic Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Logistic Cost',
      });

      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/logisticCostFail.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();
      await expect(csvUploadErrorAlert).toBeVisible();

      const errorInFailedLogisticUpload = await csvUploadErrorContentLocator.nth(0).innerText();
      expect(errorInFailedLogisticUpload).toBe('There is missing or incorrect information in the lines: 1,2,3');

      // Select Other Cost and check if the modal is visible when the outer upload button is clicked
      await expectSelectItemAndWaitForToBeSelected({
        pageInstance: currentPage.page,
        selectElem: expenseTypeSelect,
        search: 'Other Cost',
      });

      await csvUploadButton.click();
      await expect(csvUploadModal).toBeVisible();

      await csvUploadModalChooseFileButton.click();
      await csvUploadFileInput.setInputFiles(path.join(__dirname, './__mock__/otherCostFail.csv'));

      await csvUploadModalUploadButton.click();
      await expect(csvUploadModal).not.toBeVisible();
      await expect(csvUploadErrorAlert).toBeVisible();

      const firstErrorInFailedOtherUpload = await csvUploadErrorContentLocator.nth(0).innerText();
      const secondErrorInFailedOtherUpload = await csvUploadErrorContentLocator.nth(1).innerText();

      expect(firstErrorInFailedOtherUpload).toBe('The uploaded file must contain data for a single month only.');
      expect(secondErrorInFailedOtherUpload).toBe('The uploaded file contains data that have same month, year and domain.');
    });
  });
});
