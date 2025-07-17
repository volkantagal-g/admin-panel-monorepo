import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import LoyaltyDetails from '.';
import { loyaltyStampsSelector } from '@app/pages/Client/Detail/redux/selectors';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('LoyaltyDetails', () => {
    it('should render component without error', async () => {
      const getStampsSpy = jest.spyOn(loyaltyStampsSelector, 'getStamps');

      getStampsSpy.mockReturnValue([
        {
          loyalty: {
            id: 'rest-1',
            code: 'Ekim loyalty',
            name: {
              tr: 'GetirYemek Müdavim',
              en: 'GetirFood Müdavim',
            },
            totalStampCount: 5,
          },
          cycles: [
            {
              stamps: [
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
              ],
            },
            {
              stamps: [
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
                {
                  type: 'virtual',
                  order: null,
                  restaurant: null,
                },
              ],
            },
          ],
        },
      ]);

      await renderComponent({ ui: <LoyaltyDetails /> });
      await screen.findByText('Loyalty Details');
    });
  });
});
