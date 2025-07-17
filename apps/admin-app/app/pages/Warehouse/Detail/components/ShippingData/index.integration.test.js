import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import ShippingData from '.';
import renderComponent from '@test/publicUtils/renderComponent';

describe('', () => {
  afterAll(cleanup);
  const mockCreateShipFreq = jest.fn();
  const mockCreateShipPrep = jest.fn();
  describe('ShippingData component', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ShippingData
            shippingFrequency={[
              {
                id: '62ce82dbb8df54ce5779fe59',
                from: '2022-07-13T00:00:00.000Z',
                to: '2022-07-15T00:00:00.000Z',
                code: 10,
                description: {
                  tr: 'Haftada 6',
                  en: '6 Times Per Week',
                },
              },
            ]}
            transferPreparation={[
              {
                id: '62ce82dbb8df54ce5779fe59',
                from: '2022-07-13T00:00:00.000Z',
                to: '2022-07-15T00:00:00.000Z',
                code: 10,
                duration: 12,
              },
            ]}
            onCreateShipmentFrequency={mockCreateShipFreq}
            onCreateShipmentPreparation={mockCreateShipPrep}
          />
        ),
      });
      await screen.findByText('SHIPPING_DATA');
    });
  });
});
