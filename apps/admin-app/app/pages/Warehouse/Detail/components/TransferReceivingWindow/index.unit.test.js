import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import TransferReceiving from '.';
import renderComponent from '@test/publicUtils/renderComponent';

const warehouse = {
  timezone: 'Europe/Istanbul',
  transferReceiving: {
    cold: {
      timezone: 'Europe/Istanbul',
      availableTimes: [
        {
          startMin: 2880,
          endMin: 10080,
        },
      ],
    },
    ambient: {
      timezone: 'Europe/Istanbul',
      availableTimes: [
        {
          startMin: 0,
          endMin: 120,
        },
        {
          startMin: 120,
          endMin: 10080,
        },
      ],
    },
  },
  isWarehousePending: false,

};

describe('Transfer Receiving Windows Component', () => {
  describe('component mount', () => {
    it('should render <TransferReceiving />', async () => {
      await renderComponent({
        ui: (
          <TransferReceiving
            timezone={warehouse.timezone}
            transferReceiving={warehouse.transferReceiving}
            updateTransferReceivingWindow={jest.fn()}
            isPending={warehouse.isWarehousePending}
          />
        ),
      });
      await screen.findByText('TRANSFER_RECEIVING_WINDOWS');
      await screen.findByText('REFERENCE_STORE');
      await screen.findByText('COLD');
      await screen.findByText('AMBIENT');
    });
  });
});
