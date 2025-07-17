import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

describe('In Content Creation Page:', () => {
  it('should render successfully', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_CONTENT_CREATION,
      pageUrl: '/contentCreation',
      pageComponent: PageComponent,
    });
  });
  it('should have correct page header', () => {
    const header = screen.getByText('Content Creation');
    expect(header).toBeInTheDocument();
  });
});
