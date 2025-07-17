import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import FeesTable from '.';
import renderComponent from '@test/publicUtils/renderComponent';

describe('Fees table component', () => {
  describe('component mount', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <FeesTable
            value={[{ min: 0, fee: 120 }]}
            setFieldValue={() => {}}
            disabled={false}
            domainType={1}
            title="my title"
            orderFeeType="Dynamic fee"
            feeType="levelOne"
          />
        ),
      });
      await screen.findByText('my title');
    });
  });
});
