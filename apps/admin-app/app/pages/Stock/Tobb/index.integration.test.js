import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

const url = '/stock/tobb';

describe('Tobb Gib Request Page', () => {
  it('should render Tobb Gib Request page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_TOBB_GIB_REQUEST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('TOBB Gib Request');
  });

  it('should render Upload Csv button', () => {
    expect(screen.getByRole('button', { name: /Upload Csv/i })).toBeInTheDocument();
  });

  it('should table render with no data by default', () => {
    const table = screen.getByTestId('tob-gib-request-table');
    const noDataText = within(table).getByText('No Data');
    expect(table).toBeInTheDocument();
    expect(noDataText).toBeInTheDocument();
  });
});
