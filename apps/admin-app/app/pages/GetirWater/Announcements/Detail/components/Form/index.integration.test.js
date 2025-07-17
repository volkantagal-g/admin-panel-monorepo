import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { getAnnouncementDetail } from '@shared/api/water/index.mock.handler';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';

import PageComponent from '../../index';

import waitForLoading from '@test/utils/waitForLoading';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const announcementId = '63c55fd9fce5524aacb41223';
const initialUrl = '/getirWater/announcement/detail';

describe('In GetirWater Announcement Detail Page:', () => {
  mockApiPerTestCase(getAnnouncementDetail);

  // eslint-disable-next-line no-unused-vars
  let renderResult;
  afterAll(cleanup);

  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_GETIR_WATER_ANNOUNCEMENT_DETAIL,
        pageUrl: `${initialUrl}/${announcementId}`,
        pageComponent: PageComponent,
      });
      await waitForLoading();
      await waitPageToRenderSomething();
    });
  });
});
