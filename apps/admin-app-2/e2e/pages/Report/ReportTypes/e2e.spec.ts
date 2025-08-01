import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { test, expect } from './_fixture';
import { TEST_TAG } from '../../../../internals/constants/testTag';
import {
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHave,
  expectTableHeaderToBeSorted,
} from '@e2e/common/assertions';
import { ReportTypesPage } from '@e2e/pages/Report/ReportTypes/_page';
import { getTableHeaderColumnTitles } from '@e2e/common/locators';

const TIMEOUT_MS = 4000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Report creation flow`, () => {
  test(`minimal features of report type page should work correctly ${TEST_TAG.SMOKE}`, async ({ reportTypesPage: currentPage, baseURL }) => {
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Business Monitoring',
      menuItemsArr: ['Reports', 'Report Types'],
    });

    const {
      getReportTagSelect,
      getReportTypeNameSearch,
      getNewReportTypeButton,
      getReportTypeTable,
      reportTypeDetailButton,
      getActiveButton,
      getOptionalCheckbox,
      getEditButton,
      getAddParameterButton,
      getParameterDeleteButton,
      getSaveButton,
      getToastifyMessage,
      getDeleteButton,
      getCancelButton,
      getReportTypeDeleteModalConfirmContent,
      getCreateButton,
    } = currentPage;

    // Check if all filters and new report type button are visible
    await expect(getReportTagSelect).toBeVisible();
    await expect(getReportTypeNameSearch).toBeVisible();
    await expect(getNewReportTypeButton).toBeVisible();

    // search for a report type with name 'First Report Type'
    await getReportTypeNameSearch.fill('First Report Type');
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: getReportTagSelect.locator('input'),
      search: /dilekreport/,
    });

    // select first option because description has the same text
    await expect(currentPage.page.getByText('First Report Type from New Panel').first()).toBeVisible();

    // check table header titles
    const expectedTableTitles = ['#', 'Name', 'Description', 'Tags', 'Detail'];
    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: getReportTypeTable });
      expect(expectedTableTitles).toEqual(tableTitles);
    }).toPass({ timeout: TIMEOUT_MS });

    await expectTableHeaderToBeSorted({
      header: getReportTypeTable,
      title: 'Name',
      sortDirection: 'ascending',
    });

    // navigate to report type detail page
    await reportTypeDetailButton.click();
    const reportTypeDetailPage = new ReportTypesPage(currentPage.page);

    await expect(reportTypeDetailPage.page.getByText('Report Type Detail')).toBeVisible();

    // check if all inputs are visible (upper inputs below Parameters)
    const reportTypeDetailInputs = [
      'Name (TR)',
      'Name (EN)',
      'Description (TR)',
      'Description (EN)',
      'Instructions (TR)',
      'Instructions (EN)',
      'Script File',
      'Tags',
    ];
    await expect(async () => {
      reportTypeDetailInputs.forEach(input => {
        reportTypeDetailPage.page.getByLabel(`${input}`, { exact: true }).isVisible();
      });
    }).toPass({ timeout: TIMEOUT_MS });

    // control checkbox is disabled and checked
    await expect(getActiveButton).toBeDisabled();
    await expect(getActiveButton).toBeChecked();

    // check if all tags are visible
    const selectedTagNames = ['cmlttnEN', 'dilekreport', 'hi', 'test-en', 'test with new form', 'All'];
    for (const tagName of selectedTagNames) {
      const tag = reportTypeDetailPage.getReportTypeTagElement({ tagName });
      await expect(tag).toBeVisible({ timeout: TIMEOUT_MS });
    }

    // check parameters inputs
    await expect(reportTypeDetailPage.page.getByText('Parameters')).toBeVisible();

    const parametersInputsName = ['Variable Type', 'Variable Name', 'Parameter Name (TR)', 'Parameter Name (EN)'];

    for (const inputName of parametersInputsName) {
      await expect(reportTypeDetailPage.page.getByLabel(`${inputName}`, { exact: true })).toBeVisible();
    }

    // check if optional checkbox is visible and disabled
    await expect(getOptionalCheckbox).toBeVisible();
    await expect(getOptionalCheckbox).toBeDisabled();

    // click edit button
    // fill instructions inputs
    // test add parameter button is working
    // test delete parameter button is working
    // test save button is working
    await getEditButton.click();
    await expect(getActiveButton).toBeEnabled();
    await getAddParameterButton.click();
    await getActiveButton.click();
    await reportTypeDetailPage.page.getByLabel('Instructions (TR)').fill('Instructions TR - updated');
    await reportTypeDetailPage.page.getByLabel('Instructions (EN)').fill('Instructions EN - updated');
    await getSaveButton.click();
    await expect(reportTypeDetailPage.page.getByText('Cannot be empty')).toHaveCount(4);
    await getParameterDeleteButton.click();
    await getSaveButton.click();
    // convert format to initial values
    await getEditButton.click();
    await reportTypeDetailPage.page.getByLabel('Instructions (TR)').fill('');
    await reportTypeDetailPage.page.getByLabel('Instructions (EN)').fill('');
    await getActiveButton.click();
    await getSaveButton.click();

    // check if toastify message is visible
    await expect(getToastifyMessage).toHaveText(' Report Type Updated Successfully');

    // check delete button is working and control opening modal
    await getEditButton.click();
    await getDeleteButton.click();
    await expect(getReportTypeDeleteModalConfirmContent).toHaveText('Are you sure you want to delete this report type?');
    const cancelButton = reportTypeDetailPage.getReportTypeDeleteModalConfirmButton({ buttonName: 'Cancel' });
    await cancelButton.click();
    await expect(cancelButton).not.toBeVisible();
    await getCancelButton.click();

    // Create a new report type
    await reportTypeDetailPage.page.getByRole('img', { name: 'arrow-left' }).click();
    await getNewReportTypeButton.click();
    const newReportTypePage = new ReportTypesPage(currentPage.page);
    await expect(newReportTypePage.page.getByText('Create New Report Type')).toBeVisible();

    const newReportTypeInputs = [
      'Name (TR)',
      'Name (EN)',
      'Description (TR)',
      'Description (EN)',
      'Instructions (TR)',
      'Instructions (EN)',
      'Script File',
    ];
    for (const inputName of newReportTypeInputs) {
      await expect(newReportTypePage.page.getByLabel(`${inputName}`, { exact: true })).toBeVisible();
    }

    // fill inputs for new report type
    await newReportTypePage.getInput({ inputName: 'Name (TR)' }).fill('Name for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Name (EN)' }).fill('Name for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Description (TR)' }).fill('Description for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Description (EN)' }).fill('Description for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Instructions (TR)' }).fill('Instructions for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Instructions (EN)' }).fill('Instructions for automation test report type');
    await newReportTypePage.getInput({ inputName: 'Script File' }).fill('automation-test.py');
    await getActiveButton.click();
    await getAddParameterButton.click();
    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: newReportTypePage.page,
      selectElem: newReportTypePage.getInput({ inputName: 'Variable Type' }),
      search: 'String',
    });

    // fill parameter inputs
    await newReportTypePage.getInput({ inputName: 'Variable Name' }).fill('variableName');
    await newReportTypePage.getInput({ inputName: 'Parameter Name (TR)' }).fill('Parameter Name TR - automation test report type');
    await newReportTypePage.getInput({ inputName: 'Parameter Name (EN)' }).fill('Parameter Name EN - automation test report type');
    await getCreateButton.click();
    await newReportTypePage.page.waitForURL('**/reports/types/**');

    // back to report type detail page and find the created report type
    await reportTypeDetailPage.page.getByRole('img', { name: 'arrow-left' }).click();
    const reportTypesPage = new ReportTypesPage(currentPage.page);
    await getReportTypeNameSearch.fill('Name for automation test report type');
    await expect(reportTypesPage.page.getByText('Name for automation test report type')).toBeVisible();
    await reportTypeDetailButton.click();

    // delete the created report type
    const reportTypePageDetail = new ReportTypesPage(currentPage.page);
    await expect(reportTypePageDetail.page.getByText('Report Type Detail')).toBeVisible();
    await getEditButton.click();
    await getDeleteButton.click();
    await reportTypePageDetail.getReportTypeDeleteModalConfirmButton({ buttonName: 'Ok' }).click();
    await newReportTypePage.page.waitForURL('**/reports/types/**');
  });
});
