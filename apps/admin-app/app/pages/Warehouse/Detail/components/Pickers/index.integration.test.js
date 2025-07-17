import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import Pickers from '.';
import renderComponent from '@test/publicUtils/renderComponent';

const pickers = [
  {
    _id: '5fe1a5912b49de16441c5a5d',
    name: 'Tuğba Gezzer',
    status: 200,
    isActivated: true,
  },
];

describe('Picker table component', () => {
  describe('component mount', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Pickers
            pickers={pickers}
          />
        ),
      });
      await screen.findByText('PICKERS');
    });
  });
});
