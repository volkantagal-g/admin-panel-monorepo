import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ClientDetail from '.';

describe('Order Detail Page', () => {
  afterAll(cleanup);

  it('should render without an error', async () => {
    await renderComponent({ ui: (<ClientDetail />) });
    const mainContainer = screen.getByTestId('client-details-main-container');
    expect(mainContainer).toBeInTheDocument();

    const pageHeader = screen.getByTestId('client-detail-page-header');
    expect(pageHeader).toBeInTheDocument();
  });
});
