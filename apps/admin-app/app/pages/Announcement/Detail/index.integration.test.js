import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getAnnouncementMock } from '@app/pages/Announcement/index.mock.handler';
import { SAMPLE_ANNOUNCEMENT_ID } from '../index.mock.data';

const initialUrl = `/announcement/detail/${SAMPLE_ANNOUNCEMENT_ID}`;

describe('In Announcement Detail Page:', () => {
  mockApiPerTestCase(getAnnouncementMock);

  it.skip('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ANNOUNCEMENT_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });
});
