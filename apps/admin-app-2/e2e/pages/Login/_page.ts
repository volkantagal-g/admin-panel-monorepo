import { type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly url = '/login';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    return this.page.goto(this.url);
  }

  async getTitle() {
    return this.page.title();
  }

  getLogo() {
    return this.page
      .getByRole('img', { name: 'logo' });
  }

  getGoogleSignInFrame() {
    // iframe which has 'Sign in with Google' text
    // TODO: better locator logic
    return this.page.locator('iframe');
  }

  getDontHaveGetirEmailButton() {
    return this.page.locator('text=I do not have a Getir email');
  }
}
