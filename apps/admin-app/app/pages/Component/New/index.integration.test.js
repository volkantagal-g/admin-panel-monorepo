import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/component/new';

describe('In Component New Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMPONENT_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
  it('should render page header', async () => {
    expectToHavePageHeaderText('New Component');
  });
  it('should render component details', async () => {
    expect(screen.getByText('Component Info')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
