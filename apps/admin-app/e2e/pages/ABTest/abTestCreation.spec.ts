import { test, expect } from './_fixture';
import { ABTestNewPage } from './_page';

test.describe('ABTest creation flow', () => {
  test('creation a abtest', async ({ abTestPage }) => {
    await expect(abTestPage.getAbTestCreateButton()).toBeVisible();

    const createButton = abTestPage.getAbTestCreateButton();
    await createButton.click();

    // navigate to create abTesting/new page url

    const abTestNewPage = new ABTestNewPage(abTestPage.page);
    await expect(abTestNewPage.page.getByTitle('A/B Test Creating')).toBeVisible();

    await abTestNewPage.abNewPageFormFill();

    await abTestNewPage.dateInput();

    await abTestNewPage.dropdownInput();

    await abTestNewPage.dropdownInputTemplateSearch();

    await abTestNewPage.numberOfAudience();

    await abTestNewPage.groupNameFill();

    // mock the create api before clicking the submit button; db ye katıt atmadan success almak
    const saveButton = abTestNewPage.saveButton();
    await saveButton.click();

    await expect(abTestNewPage.page.locator('div[class="Toastify__toast-body"]')).toHaveText('Success');
  });
});
