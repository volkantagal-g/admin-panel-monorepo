import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/personalPromo/generator';

describe('In Personal Promo Generator Page:', () => {
  it('should render successfully ', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_PERSONAL_PROMO_GENERATOR,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });
  it('should have correct page header', () => {
    expectToHavePageHeaderText('Personal Promo Code Generator');
    screen.getByRole('main');
  });
});
