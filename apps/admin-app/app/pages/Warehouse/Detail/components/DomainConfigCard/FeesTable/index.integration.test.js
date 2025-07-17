import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import FeesTable from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import { FEE_LAYER_TYPE, ORDER_FEE_TYPE } from '@shared/shared/constants';

describe('Fees table component', () => {
  describe('component mount', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <FeesTable
            value={{}}
            setFieldValue={() => {}}
            disabled={false}
            domainType={4}
            title="my title"
            orderFeeType={ORDER_FEE_TYPE.SERVICE_FEE}
            feeType={FEE_LAYER_TYPE.PEAK_HOURS}
          />
        ),
      });
      await screen.findByText('my title');
    });
  });
});
