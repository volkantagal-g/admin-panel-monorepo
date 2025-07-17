import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/writeOff/location/list';

describe('In Page List LocationWriteOff:', () => {
  afterAll(cleanup);

  it('should render successfully', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_LOCATION_WRITE_OFF_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });
  it('should contain core elements', async () => {
    await screen.findByText('Location write off List');
    expect(screen.getAllByText('Creation Date')).toHaveLength(2);
    expect(screen.getByText('Confirmation Date')).toBeInTheDocument();
    expect(screen.getAllByText('Warehouse')).toHaveLength(2);
    expect(screen.getAllByText('Location')).toHaveLength(2);
    expect(screen.getAllByText('Status')).toHaveLength(2);
  });
});
