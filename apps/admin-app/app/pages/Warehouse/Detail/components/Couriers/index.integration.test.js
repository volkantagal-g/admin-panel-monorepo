import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import Couriers from '.';
import renderComponent from '@test/publicUtils/renderComponent';

const couriers = [
  {
    status: 200,
    _id: '5ff1ef71bb94cd0fc592a610',
    isLoggedIn: false,
    name: 'Teasdadas',
    courierType: 9,
    gsm: '5992567858',
  },
];

describe('Courier table component', () => {
  describe('component mount', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Couriers
            couriers={couriers}
          />
        ),
      });
      await screen.findByText('COURIERS');
    });
  });
});
