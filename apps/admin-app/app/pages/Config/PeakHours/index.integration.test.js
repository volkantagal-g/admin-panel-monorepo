import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/config/peakHours';

describe('Peak hours Page:', () => {
  describe('For render', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_CONFIG_PEAK_HOURS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct page header', () => {
      expect(screen.getByRole('heading', { name: 'Peak Hours' })).toBeInTheDocument();
    });
  });
});
