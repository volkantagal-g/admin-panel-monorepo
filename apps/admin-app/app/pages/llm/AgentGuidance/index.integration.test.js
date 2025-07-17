import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Agent Guidance', () => {
  afterAll(cleanup);

  describe('Agent Guidance Page', () => {
    it('should render page without error', async () => {
      const pageUrl = ROUTE.LLM_AGENT_GUIDANCE_GENERATION.path;
      await renderPage({
        pagePermKey: permKey.PAGE_LLM_AGENT_GUIDANCE_GENERATION,
        pageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
