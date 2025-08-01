import { TEST_TAG } from 'internals/constants/testTag';
import { test, expect } from './_fixture';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.CRPL} Login page`, () => {
  test(`should have minimal features - ${TEST_TAG.SMOKE}`, async ({ loginPage }) => {
    expect(await loginPage.getTitle()).toBe('Getir');
    const logo = loginPage.getLogo();
    await expect(logo, 'should display the getir Logo and google sign in frame').toBeVisible();
    const googleSignInFrame = loginPage.getGoogleSignInFrame();
    await expect(googleSignInFrame, 'should display google sign in frame').toBeAttached();
    const dontHaveGetirEmailButton = loginPage.getDontHaveGetirEmailButton();
    await expect(dontHaveGetirEmailButton, 'should display "dont have getir email" button').toBeVisible();
    await expect(dontHaveGetirEmailButton, '"dont have getir email" enabled').toBeEnabled();
  });
});
