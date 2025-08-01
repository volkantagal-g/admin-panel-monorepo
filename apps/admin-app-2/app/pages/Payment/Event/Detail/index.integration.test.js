import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { eventId } from '@shared/api/payment/index.mock.data';
import PageComponent from '.';

const initialUrl = `/payment/event/detail/${eventId}`;

describe('In Event Detail Page:', () => {
  describe('For Page Detail', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_EVENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    describe('For Event Details', () => {
      it('event details section should be visible', async () => {
        const eventDetailsSection = screen.getByTestId('event-detail-section');
        expect(eventDetailsSection).toBeInTheDocument();
      });
    });
    // TODO: after API update, add mocked data test
  });
});
