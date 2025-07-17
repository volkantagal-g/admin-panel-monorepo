import { screen } from '@testing-library/react';

import renderApp from '@test/publicUtils/renderApp';
import mockApiPerTestCase from '../test/publicUtils/mockApiPerTestCase';

// don't wait for 3 * 2 seconds for retries
jest.mock(
  '@app/shared/constants',
  () => ({
    ...jest.requireActual('@app/shared/constants'),
    DEFAULT_RETRY_MS: 50,
    DEFAULT_RETRY_TIMES: 1,
  }),
);

const errorMsg = 'There was an error while fetching required data to open the App';

describe('In App:', () => {
  describe('For app level features', () => {
    it('should render an error if initial divisions request fail', async () => {
      mockApiPerTestCase({
        url: '/countryInfo/getDivisions',
        errorData: null,
      });
      await renderApp();
      // it is retried after delay

      await screen.findByText(errorMsg);
    });
    it('should render an error if initial countries request fail', async () => {
      mockApiPerTestCase({
        url: '/countryInfo/getCountries',
        errorData: null,
      });
      await renderApp();

      await screen.findByText(errorMsg);
    });

    it('should render an error if initial user permission request fail', async () => {
      mockApiPerTestCase({
        url: '/permission/getMyPermissions',
        errorData: null,
      });
      await renderApp();

      await screen.findByText(errorMsg);
    });
  });
});
