import { type Page } from 'playwright';

export class HomePage {
  readonly page: Page;

  readonly url = '/';

  constructor(page: Page) {
    this.page = page;
  }

  navigateTo() {
    return this.page.goto(this.url);
  }

  async getTitle() {
    return this.page.title();
  }

  // TODO: not the ideal selector for headers, try to write html elements so that we can select with getByRole('heading'). Like h1, h2, h3, etc
  getHeader() {
    return this.page.locator('.ant-page-header');
  }

  close() {
    return this.page.close();
  }
}
