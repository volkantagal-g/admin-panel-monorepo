import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/promo/list';

describe('In Promo List Page:', () => {
  describe('For promo details', () => { // successfu
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PROMO_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
    it('should have a correct h3', () => {
      const h3 = screen.getByText('Promos');
      expect(h3).toBeInTheDocument();
    });
  });
});
