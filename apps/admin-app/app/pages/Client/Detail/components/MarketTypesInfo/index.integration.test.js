import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import MarketTypesInfo from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('MarketTypesInfo', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <MarketTypesInfo client={{
            sucOrderCount: 0,
            sucOrderCounts: 0,
            organicOrderCount: 0,
            promoOrderCount: 0,
            sucFoodOrderCount: 0,
            sucArtisanOrderCount: 0,
            sucBiTaksiTripCount: 0,
          }}
          />
        ),
      });
    });

    it('should contain core elements', async () => {
      await screen.findByText('G10 Istanbul Total');
      await screen.findByText('G10 Organic');
      await screen.findByText('G10 Promo');
      await screen.findByText('GetirFood');
      await screen.findByText('GetirLocals');
      await screen.findByText('GetirMore');
      await screen.findByText('G10 New Cities');
      await screen.findByText('GetirWater');
      await screen.findByText('GetirBiTaksi');
    });
  });
});
