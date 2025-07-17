import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
// import { expectPageToRenderWithoutError } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = 'discountCode/segmentedCodeGenerator';

describe('In Segmented Code Generator Page:', () => {
  afterAll(cleanup);

  // let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      /* renderResult = */await renderPage({
        pagePermKey: permKey.PAGE_SEGMENTED_CODE_GENERATOR,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      // expectPageToRenderWithoutError();
    });
  });
});
