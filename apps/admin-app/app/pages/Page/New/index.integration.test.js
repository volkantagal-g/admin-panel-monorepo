import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/page/new';

describe('In Page New Page:', () => {
  it('should render successfully', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_PAGE_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });
  it('should contain core elements', async () => {
    expectToHavePageHeaderText('New Page');
    await screen.findByText('Page Info');
    await screen.findByText('Save');
  });
});
