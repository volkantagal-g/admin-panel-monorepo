import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/transferGroup/list';

describe('In Transfer Group Detail Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_TRANSFER_GROUP_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Transfer Groups');
    });
  });
  describe('For page features', () => {
    it('should render headers without an error', async () => {
      await screen.findAllByText('Transfer Groups');
    });
  });
});
