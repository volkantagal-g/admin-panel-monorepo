import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

import PageComponent from '.';

describe('In SAA List Page:', () => {
  const initialUrl = '/saa/detail/5dd7c060b427196535a1f437/edit';
  afterAll(cleanup);
  it('should render successfully ', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_SERVICE_AVAILABILITY_AREA_EDIT,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
  it('should render correct page title ', async () => {
    expect(screen.getByTitle('Edit Service Availability Area')).toBeInTheDocument();
  });
});
