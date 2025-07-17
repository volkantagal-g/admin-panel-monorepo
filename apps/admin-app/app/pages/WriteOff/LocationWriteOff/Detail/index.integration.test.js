import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/writeOff/location/detail/64074226a4bc351c734a92d0';

describe('In Page Detail LocationWriteOff:', () => {
  afterAll(cleanup);

  it('should render successfully', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_LOCATION_WRITE_OFF_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });
  it('should contain core elements', async () => {
    await screen.findByText('Location write off Detail');
    await screen.findByText('Warehouse');
    await screen.findByText('Location');
    await screen.findByText('Created By');
    await screen.findByText('Status');
    await screen.findByText('Creation Date');
    await screen.findByText('Request Id');
  });
});
