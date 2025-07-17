import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { mockedComponent } from '@shared/api/component/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/component/detail/test_comp_id';

describe('In Component Detail Page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COMPONENT_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
  it('should render page header', async () => {
    expectToHavePageHeaderText('Component Detail');
  });
  it('should render component details', async () => {
    await screen.findByDisplayValue(mockedComponent.name.en);
    await screen.findByDisplayValue(mockedComponent.name.tr);
    await screen.findByDisplayValue(mockedComponent.description.en);
    await screen.findByDisplayValue(mockedComponent.description.tr);
  });
});
